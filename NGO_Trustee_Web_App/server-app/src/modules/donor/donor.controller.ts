import { Request, Response, NextFunction } from 'express';
import * as donorService from './donor.service';

export const getDonorIdCard = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = (req as any).user;
        if (!user) {
            return next(new Error('User not authenticated'));
        }

        const idCardData = await donorService.getDonorIdCard(user.userId);

        res.status(200).json({
            status: 'success',
            data: idCardData
        });
    } catch (error) {
        next(error);
    }
};
