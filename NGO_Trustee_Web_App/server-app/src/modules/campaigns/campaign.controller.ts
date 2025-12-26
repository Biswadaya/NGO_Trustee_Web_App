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

export const getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const campaign = await CampaignService.getCampaignById(req.params.id);
        res.status(200).json({ status: 'success', data: { campaign } });
    } catch (error) {
        next(error);
    }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const campaign = await CampaignService.updateCampaign(req.params.id, req.body);
        res.status(200).json({ status: 'success', data: { campaign } });
    } catch (error) {
        next(error);
    }
};

export const remove = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await CampaignService.deleteCampaign(req.params.id);
        res.status(204).json({ status: 'success', data: null });
    } catch (error) {
        next(error);
    }
};

export const getProgress = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const progress = await CampaignService.getCampaignProgress(req.params.id);
        res.status(200).json({ status: 'success', data: progress });
    } catch (error) {
        next(error);
    }
};

export const getDonors = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const donors = await CampaignService.getCampaignDonors(req.params.id);
        res.status(200).json({ status: 'success', data: { donors } });
    } catch (error) {
        next(error);
    }
};

