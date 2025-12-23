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
