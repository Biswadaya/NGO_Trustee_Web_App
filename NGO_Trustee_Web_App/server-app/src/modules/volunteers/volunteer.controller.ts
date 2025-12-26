import { Request, Response, NextFunction } from 'express';
import * as VolunteerService from './volunteer.service';

export const activate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        // @ts-ignore - Validated by middleware
        const activatedBy = req.user.userId;

        const volunteer = await VolunteerService.activateVolunteer(id, activatedBy);

        res.status(200).json({ status: 'success', data: { volunteer } });
    } catch (error) {
        next(error);
    }
};

export const generateId = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const result = await VolunteerService.generateIdCard(id);

        res.status(200).json({ status: 'success', data: result });
    } catch (error) {
        next(error);
    }
};

export const payMembership = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const { amount } = req.body;

        const result = await VolunteerService.payMembership(id, amount);

        res.status(200).json({ status: 'success', data: result });
    } catch (error) {
        next(error);
    }
};

export const list = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const volunteers = await VolunteerService.getVolunteers();
        res.status(200).json({ status: 'success', data: { volunteers } });
    } catch (error) {
        next(error);
    }
};

export const getPersonalInfo = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const volunteer = await VolunteerService.getVolunteerPersonalInfo(req.params.id);
        res.status(200).json({ status: 'success', data: { volunteer } });
    } catch (error) {
        next(error);
    }
};

export const updateStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { status } = req.body;
        const volunteer = await VolunteerService.updateVolunteerStatus(req.params.id, status);
        res.status(200).json({ status: 'success', data: { volunteer } });
    } catch (error) {
        next(error);
    }
};

export const getIdCard = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const idCard = await VolunteerService.getVolunteerIdCard(req.params.id);
        res.status(200).json({ status: 'success', data: idCard });
    } catch (error) {
        next(error);
    }
};

export const listIdCards = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const idCards = await VolunteerService.getAllIdCards();
        res.status(200).json({ status: 'success', data: { idCards } });
    } catch (error) {
        next(error);
    }
};

export const revokeId = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const volunteer = await VolunteerService.revokeIdCard(req.params.id);
        res.status(200).json({ status: 'success', data: { volunteer } });
    } catch (error) {
        next(error);
    }
};

export const getUniqueId = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const uniqueId = await VolunteerService.getVolunteerUniqueId(req.params.id);
        res.status(200).json({ status: 'success', data: { uniqueId } });
    } catch (error) {
        next(error);
    }
};

export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const volunteer = await VolunteerService.registerVolunteer(req.body);
        res.status(201).json({ status: 'success', data: { volunteer } });
    } catch (error) {
        next(error);
    }
};

