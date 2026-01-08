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
