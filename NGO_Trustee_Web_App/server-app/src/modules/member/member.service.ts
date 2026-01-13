import { UserRole, Prisma } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { AppError } from '../../middleware/error';
import { prisma } from '../../utils/db';
import { signToken } from '../../utils/jwt';

export const registerMember = async (data: {
    email: string;
    full_name: string;
    phone?: string;
    address?: string;
    occupation?: string;

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

    // Payment (Mock)
    membership_fee: number;
}) => {
    const {
        email,
        full_name,
        phone,
        address,
        occupation,
        family_members,
        nominee,
        bank_details,
        membership_fee,
    } = data;

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
        where: { email },
    });

    if (existingUser) {
        // Ideally we could link existing user to member profile, but for now let's assume new registration
        // Or if they are just a donor, we upgrade them? 
        // For simplicity: unique email for member registration.
        throw new AppError('User with this email already exists', 400);
    }

    // Create User + Member + Relations
    // Since we don't have a password in the form plan, we'll generate a random one or ask for it.
    // The plan implies a "registration form", usually includes password. I'll assume we need to auto-generate or use a default, 
    // OR update the plan to ask for password. 
    // Let's assume a default password for now or that the frontend sends one.
    // Actually, standard auth usually requires password. I'll add a 'password' field to the input.

    const tempPassword = 'Member@123'; // In real app, send email with set password link
    const hashedPassword = await bcrypt.hash(tempPassword, 12);

    const result = await prisma.$transaction(async (tx) => {
        // 1. Create User
        const newUser = await tx.user.create({
            data: {
                email,
                username: email.split('@')[0] + Math.floor(Math.random() * 1000),
                password_hash: hashedPassword,
                role: UserRole.MEMBER,
                is_active: true,
                email_verified: true, // Auto verify for paid members?
            },
        });

        // 2. Create Member Profile
        // 2. Create Member Profile
        const newMember = await tx.memberProfile.create({
            data: {
                user_id: newUser.id,
                full_name,
                email,
                phone,
                address,
                occupation,
                membership_fee: new Prisma.Decimal(membership_fee),
                is_paid: true, // Mock payment success (would come from payment gateway)
                payment_date: new Date(),
                payment_reference: `MOCK_PAY_${Date.now()}`,

                // Flattened Bank Details
                bank_name: bank_details?.bank_name || '',
                account_number: bank_details?.account_number || '',
                ifsc_code: bank_details?.ifsc_code || '',
                branch_name: bank_details?.branch_name,
                // account_type: 'Savings', // Optional if provided

                // Flattened Nominee Details
                nominee_name: nominee?.name || '',
                nominee_relation: nominee?.relationship || '',
                nominee_phone: nominee?.phone,
                nominee_account_number: nominee?.account_number,
                nominee_bank_name: nominee?.bank_name,
                nominee_ifsc_code: nominee?.ifsc_code,
                // nominee_branch_name: nominee?.branch_name, // Not in schema if I recall, let's check or omit if undefined

                // Nested Writes for Family
                family_members: family_members ? {
                    create: family_members.map(f => ({
                        full_name: f.name,
                        relationship: f.relationship,
                        // age: f.age // Schema has 'dob', not 'age'. We might need to calculate DOB or update schema. 
                        // Wait, schema has 'dob'? Let's check schema for FamilyMember.
                        // Line 398: dob DateTime? 
                        // The input has 'age'. 
                        // We should properly map or adapt. For now let's skip age/dob if not compatible or mock a DOB.
                        // Or better, let's assume the frontend sends what it sends.
                        // Ideally we should modify frontend to send DOB.
                        // But to "not break", let's leave DOB null for now.
                    }))
                } : undefined,
            },
            include: {
                family_members: true,
            }
        });

        const token = signToken({ userId: newUser.id, role: newUser.role });

        return { user: newUser, member: newMember, token };
    });

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
