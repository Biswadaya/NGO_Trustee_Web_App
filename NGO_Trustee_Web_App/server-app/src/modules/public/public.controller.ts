import { Request, Response, NextFunction } from 'express';
import * as PublicService from './public.service';

export const submitFundingInquiry = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await PublicService.createFundingInquiry(req.body);
        res.status(201).json({
            status: 'success',
            message: 'Funding proposal submitted successfully',
            data: result
        });
    } catch (error) {
        next(error);
    }
};

export const submitInvestmentInquiry = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await PublicService.createInvestmentInquiry(req.body);
        res.status(201).json({
            status: 'success',
            message: 'Investment proposal submitted successfully',
            data: result
        });
    } catch (error) {
        next(error);
    }
};
