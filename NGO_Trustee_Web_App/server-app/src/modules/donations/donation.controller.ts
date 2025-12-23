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
