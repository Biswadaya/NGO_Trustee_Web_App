import { Request, Response, NextFunction } from 'express';
import * as NoticeService from './notice.service';
import { AuthRequest } from '../../middleware/auth';

export const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = (req as AuthRequest).user?.userId;
        // @ts-ignore
        const notice = await NoticeService.createNotice(req.body, userId);
        res.status(201).json({ status: 'success', data: { notice } });
    } catch (error) {
        next(error);
    }
};

export const listPublic = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const notices = await NoticeService.getNotices('public');
        res.status(200).json({ status: 'success', data: { notices } });
    } catch (error) {
        next(error);
    }
};

export const listMyNotices = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const role = (req as AuthRequest).user?.role;
        // @ts-ignore
        const notices = await NoticeService.getNotices(role);
        res.status(200).json({ status: 'success', data: { notices } });
    } catch (error) {
        next(error);
    }
};

export const listAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const notices = await NoticeService.getAllNoticesAdmin();
        res.status(200).json({ status: 'success', data: { notices } });
    } catch (error) {
        next(error);
    }
};

export const updateNotice = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const notice = await NoticeService.updateNotice(req.params.id, req.body);
        res.status(200).json({ status: 'success', data: { notice } });
    } catch (error) {
        next(error);
    }
};

export const deleteNotice = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await NoticeService.deleteNotice(req.params.id);
        res.status(204).json({ status: 'success', data: null });
    } catch (error) {
        next(error);
    }
};
