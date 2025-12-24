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
