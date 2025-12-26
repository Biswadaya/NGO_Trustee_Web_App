import { Request, Response, NextFunction } from 'express';
import * as TransparencyService from './transparency.service';
import { AuthRequest } from '../../middleware/auth';

export const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = (req as AuthRequest).user?.userId;
        // @ts-ignore
        const report = await TransparencyService.createReport(req.body, userId);
        res.status(201).json({ status: 'success', data: { report } });
    } catch (error) {
        next(error);
    }
};

export const list = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const reports = await TransparencyService.getReports();
        res.status(200).json({ status: 'success', data: { reports } });
    } catch (error) {
        next(error);
    }
};

export const getCertifications = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const certifications = await TransparencyService.getCertifications();
        res.status(200).json({ status: 'success', data: { certifications } });
    } catch (error) {
        next(error);
    }
};

export const getFinancialBreakdown = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const breakdown = await TransparencyService.getFinancialBreakdown();
        res.status(200).json({ status: 'success', data: { breakdown } });
    } catch (error) {
        next(error);
    }
};

