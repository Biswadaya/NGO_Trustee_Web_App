import { Request, Response, NextFunction } from 'express';
import * as CampaignService from './campaign.service';

export const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // @ts-ignore
        const userId = req.user.userId;
        const campaign = await CampaignService.createCampaign(req.body, userId);
        res.status(201).json({ status: 'success', data: { campaign } });
    } catch (error) {
        next(error);
    }
};

export const list = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const campaigns = await CampaignService.getCampaigns();
        res.status(200).json({ status: 'success', data: { campaigns } });
    } catch (error) {
        next(error);
    }
};
