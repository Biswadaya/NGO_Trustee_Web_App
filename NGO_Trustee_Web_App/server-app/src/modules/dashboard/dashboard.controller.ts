import { Request, Response, NextFunction } from 'express';
import * as DashboardService from './dashboard.service';

export const getOverview = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const overview = await DashboardService.getDashboardOverview();
        res.status(200).json({
            success: true,
            data: overview,
        });
    } catch (error) {
        next(error);
    }
};

export const getAnalytics = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { period = '30d' } = req.query;
        const analytics = await DashboardService.getDashboardAnalytics(
            period as string
        );
        res.status(200).json({
            success: true,
            data: analytics,
        });
    } catch (error) {
        next(error);
    }
};

export const getRecentActivity = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { limit = '20' } = req.query;
        const activities = await DashboardService.getRecentActivity(
            parseInt(limit as string)
        );
        res.status(200).json({
            success: true,
            data: activities,
        });
    } catch (error) {
        next(error);
    }
};
