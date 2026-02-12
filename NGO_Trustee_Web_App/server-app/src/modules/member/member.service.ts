import { UserRole, Prisma } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { AppError } from '../../middleware/error';
import { prisma } from '../../utils/db';
import { signToken } from '../../utils/jwt';

import { sendOTPEmail, sendMembershipConfirmationEmail } from '../../utils/email';

export const registerMember = async (data: {
    email: string;
    full_name: string;
    dob: string; // Required
    phone?: string;
    address?: string;
    occupation?: string;
    adhar_number?: string; // Optional

    // Family
    family_members?: {
        name: string;
        relationship: string;
        age?: number;
    }[];

    // Nominee
    nominee?: {
        name: string;
        relationship?: string;
        phone?: string;
        account_number?: string;
        bank_name?: string;
        ifsc_code?: string;
        branch_name?: string;
    };

    // Bank Details
    bank_details?: {
        account_number: string;
        bank_name: string;
        ifsc_code: string;
        branch_name?: string;
    };

    // Payment Info
    membership_fee: number;
    payment_info?: {
        razorpay_order_id: string;
        razorpay_payment_id: string;
        razorpay_signature: string;
    };
    password?: string;
}, bypassPayment: boolean = false) => {
    const {
        email,
        full_name,
        dob,
        phone,
        address,
        occupation,
        adhar_number,
        family_members,
        nominee,
        bank_details,
        membership_fee,
        payment_info,
        password,
    } = data;

    // Verify Payment if provided
    let is_paid = bypassPayment;
    let payment_date = bypassPayment ? new Date() : null;
    let payment_reference = null;

    if (payment_info && !bypassPayment) {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = payment_info;
        const key_secret = process.env.RAZORPAY_KEY_SECRET || process.env.TEST_KEY_SECRET; // Ensure env var is available
        if (!key_secret) throw new AppError('Server misconfiguration: Razorpay secret missing', 500);

        // Dynamic import to avoid top-level issues if crypto/razorpay not used elsewhere, but crypto is standard
        const crypto = await import('crypto');
        const hmac = crypto.createHmac('sha256', key_secret);
        hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
        const generated_signature = hmac.digest('hex');

        if (generated_signature === razorpay_signature) {
            is_paid = true;
            payment_date = new Date();
            payment_reference = razorpay_payment_id;
        } else {
            throw new AppError('Invalid payment signature', 400);
        }
    }

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
        where: { email },
        include: { member_profile: true }
    });

    let userId = '';
    let isNewUser = true;

    if (existingUser) {
        // If user exists, check role
        if (existingUser.role === 'DONOR' || existingUser.role === 'VOLUNTEER') {
            // Allow upgrade
            if (existingUser.member_profile) {
                throw new AppError('User is already a registered member', 400);
            }
            userId = existingUser.id;
            isNewUser = false;
        } else if (existingUser.role === 'MEMBER') {
            throw new AppError('User is already a member', 400);
        } else {
            // For other roles (e.g. ADMIN), maybe block or allow? Assumed block for safety unless specified
            throw new AppError('User with this email already exists', 400);
        }
    }

    // Create User + Member + Relations
    const finalPassword = password || 'Member@123';
    const hashedPassword = await bcrypt.hash(finalPassword, 12);

    const result = await prisma.$transaction(async (tx) => {
        // 1. Create User if new
        let user;
        if (isNewUser) {
            user = await tx.user.create({
                data: {
                    email,
                    username: email.split('@')[0] + Math.floor(Math.random() * 1000),
                    full_name,
                    password_hash: hashedPassword,
                    role: UserRole.MEMBER,
                    is_active: true,
                    email_verified: is_paid, // Auto verify if paid
                },
            });
            userId = user.id;
        } else {
            // Update existing user role to MEMBER
            user = await tx.user.update({
                where: { id: userId },
                data: {
                    role: UserRole.MEMBER,
                    // Optional: Update full_name if provided? Let's keep existing to be safe or update?
                    // user_details might be newer.
                    full_name: full_name || undefined
                }
            });
        }

        // 2. Create Member Profile
        const newMember = await tx.memberProfile.create({
            data: {
                user_id: userId,
                full_name,
                dob: new Date(dob), // Parse date string
                email,
                phone,
                address,
                occupation,
                adhar_number,
                membership_fee: new Prisma.Decimal(membership_fee),
                is_paid,
                payment_date,
                payment_reference,

                // Flattened Bank Details (Optional)
                bank_name: bank_details?.bank_name,
                account_number: bank_details?.account_number,
                ifsc_code: bank_details?.ifsc_code,
                branch_name: bank_details?.branch_name,

                // Flattened Nominee Details (Optional)
                nominee_name: nominee?.name,
                nominee_relation: nominee?.relationship,
                nominee_phone: nominee?.phone,
                nominee_account_number: nominee?.account_number,
                nominee_bank_name: nominee?.bank_name,
                nominee_ifsc_code: nominee?.ifsc_code,

                // Nested Writes for Family
                family_members: family_members ? {
                    create: family_members.map(f => ({
                        full_name: f.name,
                        relationship: f.relationship,
                    }))
                } : undefined,
            },
            include: {
                family_members: true,
            }
        });

        // if paid, create a payment record? 
        if (is_paid) {
            await tx.membershipPayment.create({
                data: {
                    member_id: newMember.id,
                    amount: new Prisma.Decimal(membership_fee),
                    payment_date: new Date(),
                    payment_method: 'razorpay',
                    status: 'completed',
                    payment_year: new Date().getFullYear().toString()
                }
            });
        }

        const token = signToken({ userId: userId, role: user.role });

        return { user, member: newMember, token };
    });

    // Send Confirmation Email Asynchronously
    if (result.member.is_paid && result.member.email) {
        setImmediate(async () => {
            await sendMembershipConfirmationEmail(
                result.member.email!,
                result.member.full_name,
                result.member.id,
                new Date().toLocaleDateString(),
                Number(result.member.membership_fee)
            );
        });
    }

    return result;
};

export const getAllMembers = async () => {
    return await prisma.memberProfile.findMany({
        include: {
            family_members: true,
        },
        orderBy: { created_at: 'desc' } // changed from join_date which doesn't exist on MemberProfile (it has created_at)
    });
};

export const getMemberById = async (id: string) => {
    const member = await prisma.memberProfile.findUnique({
        where: { id },
        include: {
            family_members: true,
        }
    });

    if (!member) throw new AppError('Member not found', 404);
    return member;
};

export const promoteToVolunteer = async (memberId: string) => {
    // 1. Get Member
    const member = await prisma.memberProfile.findUnique({
        where: { id: memberId },
        include: { user: true }
    });

    if (!member) throw new AppError('Member not found', 404);
    if (member.user.role === UserRole.VOLUNTEER) throw new AppError('User is already a volunteer', 400);

    // 2. Promote
    return await prisma.$transaction(async (tx) => {
        // Update User Role
        const updatedUser = await tx.user.update({
            where: { id: member.user_id },
            data: { role: UserRole.VOLUNTEER }
        });

        // Create Volunteer Profile from Member Data
        const newVolunteer = await tx.volunteer.create({
            data: {
                user_id: member.user_id,
                full_name: member.full_name, // Now exists in schema
                email: member.email || member.user.email, // Fallback to user email if missing
                phone: member.phone,
                status: 'PENDING',
                membership_status: 'PAID',
                membership_amount: member.membership_fee,
                membership_paid_date: member.payment_date,
            }
        });

        return { user: updatedUser, volunteer: newVolunteer };
    });
};

export const getMemberProfileByUserId = async (userId: string) => {
    const member = await prisma.memberProfile.findUnique({
        where: { user_id: userId },
        include: {
            family_members: true,
        }
    });

    if (!member) throw new AppError('Member profile not found for this user', 404);
    return member;
};

export const getMemberIdCardDetails = async (userId: string) => {
    const member = await getMemberProfileByUserId(userId);
    const QRCode = require('qrcode');

    // Generate validity (e.g., 1 year from payment or join date)
    const validFrom = member.payment_date || member.created_at;
    const validUntil = new Date(validFrom);
    validUntil.setFullYear(validUntil.getFullYear() + 1);

    // QR Code Data (JSON string for transparency/verification)
    const qrData = JSON.stringify({
        id: member.id,
        name: member.full_name,
        type: 'MEMBER',
        valid_until: validUntil.toISOString()
    });

    const qrCodeUrl = await QRCode.toDataURL(qrData);

    return {
        memberId: member.id.substring(0, 8).toUpperCase(), // Short ID for display
        name: member.full_name,
        memberType: 'Official Member',
        validFrom: validFrom,
        validUntil: validUntil,
        bloodGroup: null, // Add to schema if needed later
        qrCode: qrCodeUrl,
        photo: null // Add profile photo URL if available later
    };
};

export const getAppointmentLetterDetails = async (userId: string) => {
    const member = await getMemberProfileByUserId(userId);

    // Generate Reference Number
    // Format: NHRD/MEM/<YEAR>/<ID_LAST_4>
    const year = new Date().getFullYear();
    const shortId = member.id.substring(0, 4).toUpperCase();
    const refNo = `NHRD/MEM/${year}/${shortId}`;

    return {
        refNo,
        date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }),
        name: member.full_name,
        address: member.address || 'Address on file',
        role: 'Official Member',
        joinDate: new Date(member.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }),
        status: 'Active' // Hardcode for now or fetch from user if needed, as memberProfile might not have status field
    };
};

export const approveMember = async (userId: string) => {
    // 1. Get Member to verify existence
    const member = await prisma.memberProfile.findUnique({
        where: { user_id: userId },
        include: { user: true }
    });

    if (!member) throw new AppError('Member not found', 404);

    // 2. Approve
    return await prisma.$transaction(async (tx) => {
        // Activate user
        const updatedUser = await tx.user.update({
            where: { id: userId },
            data: { is_active: true }
        });

        // If member profile has a status field (it doesn't currently, only is_paid), we'd update it here.
        // Assuming approval means activating the user account.

        return { user: updatedUser, member };
    });
};

export const deleteMember = async (userId: string) => {
    // Soft Delete: Deactivate the user
    // This allows keeping all related records (MemberProfile, Donations etc.)
    const user = await prisma.user.update({
        where: { id: userId },
        data: { is_active: false }
    });

    if (!user) throw new AppError('User not found', 404);

    return user;
};

export const updateMemberProfile = async (userId: string, data: any) => {
    // 1. Get existing profile
    const member = await prisma.memberProfile.findUnique({
        where: { user_id: userId }
    });

    if (!member) throw new AppError('Member profile not found', 404);

    // 2. Update allowed fields
    const {
        full_name,
        phone,
        address,
        occupation,
        adhar_number,
        dob,
        bank_details,
        nominee
    } = data;

    const updatedMember = await prisma.memberProfile.update({
        where: { user_id: userId },
        data: {
            full_name,
            phone,
            address,
            occupation,
            adhar_number,
            dob: dob ? new Date(dob) : undefined,

            // Flattened Bank Details
            bank_name: bank_details?.bank_name,
            account_number: bank_details?.account_number,
            ifsc_code: bank_details?.ifsc_code,
            branch_name: bank_details?.branch_name,

            // Flattened Nominee Details
            nominee_name: nominee?.name,
            nominee_relation: nominee?.relationship,
            nominee_phone: nominee?.phone,
            nominee_account_number: nominee?.account_number,
            nominee_bank_name: nominee?.bank_name,
            nominee_ifsc_code: nominee?.ifsc_code,
        },
        include: {
            family_members: true
        }
    });

    // 3. Update User table name if changed
    if (full_name) {
        await prisma.user.update({
            where: { id: userId },
            data: { full_name }
        });
    }

    return updatedMember;
};
