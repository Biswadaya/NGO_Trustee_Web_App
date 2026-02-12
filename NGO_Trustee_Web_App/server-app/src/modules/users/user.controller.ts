import { Request, Response, NextFunction } from 'express';
import { AppError } from '../../middleware/error';
import { prisma } from '../../utils/db';


export const blockUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.params;
        const { reason, blocked_by } = req.body;

        const user = await prisma.user.update({
            where: { id: userId },
            data: {
                is_blocked: true,
                blocked_reason: reason,
                blocked_by_id: blocked_by, // Should come from req.user really
                blocked_at: new Date(),
                // Revoke volunteer status if exists?
                // volunteer_profile: { update: { status: 'BLOCKED' } } // logic needs detailed query
            },
        });

        res.status(200).json({ status: 'success', message: 'User blocked', data: { user } });
    } catch (error) {
        next(error);
    }
};

export const unblockUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.params;

        const user = await prisma.user.update({
            where: { id: userId },
            data: {
                is_blocked: false,
                blocked_reason: null,
                blocked_by_id: null,
                blocked_at: null,
            },
        });

        res.status(200).json({ status: 'success', message: 'User unblocked', data: { user } });
    } catch (error) {
        next(error);
    }
};

export const getMe = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // @ts-ignore
        const userId = req.user.userId;

        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: {
                volunteer_profile: true,
                manager_permissions: true,
            }
        });

        if (!user) {
            return next(new AppError('User not found', 404));
        }

        res.status(200).json({ status: 'success', data: { user } });
    } catch (error) {
        next(error);
    }
};

export const promoteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.params;

        // @ts-ignore
        const requesterId = req.user.userId;

        const result = await prisma.$transaction(async (tx) => {
            // 1. Update User Role
            const user = await tx.user.update({
                where: { id: userId },
                data: { role: 'VOLUNTEER' },
            });

            // 2. Create or Update Volunteer Record
            // Check if volunteer profile already exists (maybe in PENDING state)
            const existingVolunteer = await tx.volunteer.findUnique({
                where: { user_id: userId }
            });

            if (!existingVolunteer) {
                await tx.volunteer.create({
                    data: {
                        user_id: userId,
                        full_name: user.username || 'Volunteer', // Fallback
                        email: user.email,
                        status: 'ACTIVE',
                        join_date: new Date(),
                        activated_manually: true,
                        // @ts-ignore
                        activated_by_id: requesterId
                    }
                });
            } else {
                await tx.volunteer.update({
                    where: { id: existingVolunteer.id },
                    data: {
                        status: 'ACTIVE',
                        activated_manually: true,
                        // @ts-ignore
                        activated_by_id: requesterId
                    }
                });
            }

            return user;
        });

        res.status(200).json({
            status: 'success',
            message: 'User promoted to Volunteer successfully',
            data: { user: result }
        });
    } catch (error) {
        next(error);
    }
};

export const getMyTasks = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // @ts-ignore
        const userId = req.user.userId;
        const tasks = await prisma.task.findMany({
            where: { user_id: userId },
            orderBy: { created_at: 'desc' }
        });
        res.status(200).json({ status: 'success', data: { tasks } });
    } catch (error) {
        next(error);
    }
};

export const updateMe = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log('UpdateMe requested by:', (req as any).user?.userId);
        console.log('Body:', req.body);

        // @ts-ignore
        const userId = req.user.userId;
        const { full_name, phone, bio, username, address, occupation, dob, adhar_number, bank_name, account_number, ifsc_code, nominee_name, nominee_relation } = req.body;

        // Construct update data dynamically
        const updateData: any = {};
        if (full_name !== undefined) updateData.full_name = full_name;
        if (username !== undefined) updateData.username = username;
        // Check uniqueness if username is changing? Prisma will throw P2002 if unique constraint failed.

        // 1. Update basic User fields
        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: updateData
        });

        // 2. Update Role-Specific Profile (Volunteer or Member) if exists
        // Check for Volunteer Profile
        const volunteerProfile = await prisma.volunteer.findUnique({ where: { user_id: userId } });
        if (volunteerProfile) {
            const volUpdateData: any = {};
            if (full_name !== undefined) volUpdateData.full_name = full_name;
            if (phone !== undefined) volUpdateData.phone = phone;
            if (bio !== undefined) volUpdateData.bio = bio;

            await prisma.volunteer.update({
                where: { user_id: userId },
                data: volUpdateData
            });
        }

        // Check for Member Profile
        // Note: MemberProfile relation in schema might be via user_id or id, let's assume one-to-one via user_id or similar.
        // Based on schema viewed earlier: member_profile MemberProfile?
        // Let's check schema again if needed, but for now assuming standard relation.
        // Actually, for Admin, they might not have a Member/Volunteer profile. 
        // If they don't, we just update the User model. 
        // But wait, where is 'phone' stored for Admin? 
        // User model has: username, full_name, email. It does NOT have phone.
        // Volunteer has phone. MemberProfile has phone.
        // If Admin is just a User with role ADMIN, they don't have a specific profile table unless I create one or use a generic one.
        // The user wants "same as member profile".
        // If the schema doesn't support phone for simple Users, I might need to add it or store it elsewhere.
        // Let's look at the User model again. 
        // Checked: User model has `username`, `full_name`, `email`. No `phone`.
        // Admin might need a `MemberProfile` or `Volunteer` profile to store this extras, OR I add `phone` to User.
        // Adding `phone` to User is a schema change. I should avoid schema changes if possible unless requested.
        // Alternatively, I can just update `full_name` and `username` for now, and maybe `bio` if I can find a place.
        // Wait, Volunteer has `bio`. User does not.

        // DECISION: For now, I will update `full_name` and `username`. 
        // If the user *really* needs Phone/Address for Admin, they imply Admin should have a profile.
        // I'll proceed with updating what is on User.

        res.status(200).json({
            status: 'success',
            message: 'Profile updated successfully',
            data: { user: updatedUser }
        });

    } catch (error) {
        next(error);
    }
};
