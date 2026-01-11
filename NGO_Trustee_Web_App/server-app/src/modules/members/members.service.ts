import { prisma } from '../../utils/db';
import { Prisma } from '@prisma/client';
import { CreateMemberDto } from './dto/create-member.dto';
import bcrypt from 'bcryptjs';

export class MembersService {

    /**
     * Create a new membership application.
     * Handles both existing users and new guest registrations.
     */
    async createMember(data: CreateMemberDto, loggedInUserId?: string) {
        return await prisma.$transaction(async (tx) => {
            let userId = loggedInUserId;

            // 1. Handle User Creation if Guest (Guest MUST provide user_details)
            if (!userId) {
                if (!data.user_details) {
                    throw new Error("User details are required for new registrations.");
                }

                // Check if user already exists
                const existingUser = await tx.user.findFirst({
                    where: { OR: [{ email: data.user_details.email }] }
                });

                if (existingUser) {
                    throw new Error("User with this email already exists. Please login to apply.");
                }

                const hashedPassword = await bcrypt.hash(data.user_details.password, 10);

                const newUser = await tx.user.create({
                    data: {
                        email: data.user_details.email,
                        password_hash: hashedPassword,
                        role: 'DONOR', // Default role for new members until approved? Or maybe just DONOR.
                        is_active: false // Require admin approval
                    }
                });

                // Also create a Volunteer profile placeholder if we want unified user management? 
                // For now, let's stick to just User. 
                // Actually, schema has `volunteer_profile` as separate. 
                // If they "Become a Member", usually this implies a role update or status.
                // Let's keep them as 'DONOR' initially.

                userId = newUser.id;
            }

            // 2. Check if Member Profile already exists
            const existingProfile = await tx.memberProfile.findUnique({
                where: { user_id: userId }
            });

            if (existingProfile) {
                throw new Error("Membership profile already exists for this user.");
            }

            // 3. Create Member Profile
            const memberProfile = await tx.memberProfile.create({
                data: {
                    user_id: userId!,
                    bank_name: data.bank_name,
                    account_number: data.account_number,
                    ifsc_code: data.ifsc_code,
                    branch_name: data.branch_name,
                    account_type: data.account_type,

                    nominee_name: data.nominee_name,
                    nominee_relation: data.nominee_relation,
                    nominee_dob: new Date(data.nominee_dob),
                    nominee_phone: data.nominee_phone,
                    nominee_address: data.nominee_address,

                    nominee_bank_name: data.nominee_bank_name,
                    nominee_account_number: data.nominee_account_number,
                    nominee_ifsc_code: data.nominee_ifsc_code,
                }
            });

            // 4. Create Family Members
            if (data.family_members && data.family_members.length > 0) {
                await tx.familyMember.createMany({
                    data: data.family_members.map(fam => ({
                        member_id: memberProfile.id,
                        full_name: fam.full_name,
                        relationship: fam.relationship,
                        dob: fam.dob ? new Date(fam.dob) : null,
                        occupation: fam.occupation,
                        is_dependent: fam.is_dependent || false
                    }))
                });
            }

            return memberProfile;
        });
    }

    async getMemberProfile(userId: string) {
        return await prisma.memberProfile.findUnique({
            where: { user_id: userId },
            include: {
                family_members: true,
                user: {
                    select: {
                        email: true,
                        username: true,
                        role: true,
                        is_active: true
                    }
                }
            }
        });
    }

    async approveMember(userId: string) {
        return await prisma.user.update({
            where: { id: userId },
            data: { is_active: true }
        });
    }
}
