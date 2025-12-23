import { Request, Response, NextFunction } from 'express';
import * as AdminService from './admin.service';

export const getDashboard = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const stats = await AdminService.getDashboardStats();
        res.status(200).json({ status: 'success', data: { stats } });
    } catch (error) {
        next(error);
    }
};
