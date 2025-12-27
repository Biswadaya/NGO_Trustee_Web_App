import { Request, Response, NextFunction } from 'express';
import * as DonationService from './donation.service';

export const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const donation = await DonationService.createDonation(req.body);
        res.status(201).json({ status: 'success', data: { donation } });
    } catch (error) {
        next(error);
    }
};

export const list = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const donations = await DonationService.getDonations();
        res.status(200).json({ status: 'success', data: { donations } });
    } catch (error) {
        next(error);
    }
};

export const getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const donation = await DonationService.getDonationById(req.params.id);
        res.status(200).json({ status: 'success', data: { donation } });
    } catch (error) {
        next(error);
    }
};

export const getByTransactionId = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const donation = await DonationService.getDonationByTransactionId(req.params.transaction_id);
        res.status(200).json({ status: 'success', data: { donation } });
    } catch (error) {
        next(error);
    }
};

export const getStats = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const stats = await DonationService.getDonationStats();
        res.status(200).json({ status: 'success', data: stats });
    } catch (error) {
        next(error);
    }
};
export const getMyDonations = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // @ts-ignore
        const userId = req.user.userId;
        const donations = await DonationService.getMyDonations(userId);
        res.status(200).json({ status: 'success', data: { donations } });
    } catch (error) {
        next(error);
    }
};
