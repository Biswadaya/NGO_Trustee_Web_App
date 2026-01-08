import { Request, Response, NextFunction } from 'express';
import * as AdminService from './admin.service';
import * as AuthController from '../auth/auth.controller';

export const login = AuthController.login;

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
        res.status(200).json({ status: 'success', message: 'Volunteer approved successfully', data: { volunteer } });
    } catch (error) {
        next(error);
    }
};

export const rejectVolunteer = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const volunteer = await AdminService.rejectVolunteer(id);
        res.status(200).json({ status: 'success', message: 'Volunteer rejected', data: { volunteer } });
    } catch (error) {
        next(error);
    }
};

export const addVolunteer = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const adminId = (req as any).user?.userId;
        const result = await AdminService.addVolunteer(req.body, adminId);
        res.status(201).json({ status: 'success', message: 'Volunteer created and activated', data: result });
    } catch (error) {
        next(error);
    }
};

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const adminId = (req as any).user?.userId;
        const result = await AdminService.createUser(req.body, adminId);
        res.status(201).json({ status: 'success', message: 'User created successfully', data: result });
    } catch (error) {
        next(error);
    }
};

// NEW ADMIN CONTROLLERS
export const getFundsSummary = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const summary = await AdminService.getFundsSummary();
        res.status(200).json({ status: 'success', data: summary });
    } catch (error) {
        next(error);
    }
};

export const getExpenses = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const expenses = await AdminService.getExpenses();
        res.status(200).json({ status: 'success', data: expenses });
    } catch (error) {
        next(error);
    }
};

export const getVolunteerStats = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const stats = await AdminService.getVolunteerStats();
        res.status(200).json({ status: 'success', data: stats });
    } catch (error) {
        next(error);
    }
};

export const getUnpaidVolunteers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const volunteers = await AdminService.getUnpaidVolunteers();
        res.status(200).json({ status: 'success', data: { volunteers } });
    } catch (error) {
        next(error);
    }
};

export const getVolunteerPaymentStats = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const stats = await AdminService.getVolunteerPaymentStats(req.params.id);
        res.status(200).json({ status: 'success', data: stats });
    } catch (error) {
        next(error);
    }
};

export const updateUserRole = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { role } = req.body;
        const user = await AdminService.updateUserRole(req.params.id, role);
        res.status(200).json({ status: 'success', data: { user } });
    } catch (error) {
        next(error);
    }
};

export const revertUserRole = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await AdminService.revertUserRole(req.params.id);
        res.status(200).json({ status: 'success', message: `Role reverted to ${user.role}`, data: { user } });
    } catch (error) {
        next(error);
    }
};

export const blockUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { reason } = req.body;
        const blockedById = (req as any).user?.userId;
        const user = await AdminService.blockUser(req.params.id, blockedById, reason);
        res.status(200).json({ status: 'success', data: { user } });
    } catch (error) {
        next(error);
    }
};

export const unblockUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await AdminService.unblockUser(req.params.id);
        res.status(200).json({ status: 'success', data: { user } });
    } catch (error) {
        next(error);
    }
};

export const getBlockedUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await AdminService.getBlockedUsers();
        res.status(200).json({ status: 'success', data: { users } });
    } catch (error) {
        next(error);
    }
};

export const listUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await AdminService.listUsers();
        res.status(200).json({ status: 'success', data: { users } });
    } catch (error) {
        next(error);
    }
};

export const getAuditLogs = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { limit = '50' } = req.query;
        const logs = await AdminService.getAuditLogs(parseInt(limit as string));
        res.status(200).json({ status: 'success', data: { logs } });
    } catch (error) {
        next(error);
    }
};

export const createEvent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const publishedById = (req as any).user?.userId;
        const event = await AdminService.createEvent(req.body, publishedById);
        res.status(201).json({ status: 'success', data: { event } });
    } catch (error) {
        next(error);
    }
};

export const updateEvent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const event = await AdminService.updateEvent(req.params.id, req.body);
        res.status(200).json({ status: 'success', data: { event } });
    } catch (error) {
        next(error);
    }
};

export const getEvent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const event = await AdminService.getEvent(req.params.id);
        res.status(200).json({ status: 'success', data: { event } });
    } catch (error) {
        next(error);
    }
};

export const deleteEvent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await AdminService.deleteEvent(req.params.id);
        res.status(204).json({ status: 'success', data: null });
    } catch (error) {
        next(error);
    }
};

export const getPublicEvents = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const events = await AdminService.getPublicEvents();
        res.status(200).json({ status: 'success', data: { events } });
    } catch (error) {
        next(error);
    }
};
