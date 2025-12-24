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

export const getPendingVolunteers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const volunteers = await AdminService.getPendingVolunteers();
        res.status(200).json({ status: 'success', data: { volunteers } });
    } catch (error) {
        next(error);
    }
};

export const approveVolunteer = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const approvedById = (req as any).user?.userId;
        const volunteer = await AdminService.approveVolunteer(id, approvedById);
        res.status(200).json({
            status: 'success',
            message: 'Volunteer approved successfully',
            data: { volunteer }
        });
    } catch (error) {
        next(error);
    }
};

export const rejectVolunteer = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const volunteer = await AdminService.rejectVolunteer(id);
        res.status(200).json({
            status: 'success',
            message: 'Volunteer rejected',
            data: { volunteer }
        });
    } catch (error) {
        next(error);
    }
};

