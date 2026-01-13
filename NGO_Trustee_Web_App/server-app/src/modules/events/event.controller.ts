import { Request, Response, NextFunction } from 'express';
import * as EventRegistrationService from './event-registration.service';
import { prisma } from '../../utils/db'; // Direct access for simple getters if needed, or use service

export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = (req as any).user.userId;
        const { eventId } = req.body;
        const registration = await EventRegistrationService.registerForEvent(userId, eventId);
        res.status(201).json({ status: 'success', data: { registration } });
    } catch (error) {
        next(error);
    }
};

export const getMyRegistrations = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = (req as any).user.userId;
        const registrations = await EventRegistrationService.getUserRegistrations(userId);
        res.status(200).json({ status: 'success', data: { registrations } });
    } catch (error) {
        next(error);
    }
};

export const getEventRegistrations = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const registrations = await EventRegistrationService.getEventRegistrations(id);
        res.status(200).json({ status: 'success', data: { registrations } });
    } catch (error) {
        next(error);
    }
};
