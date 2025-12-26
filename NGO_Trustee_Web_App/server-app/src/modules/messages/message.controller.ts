import { Request, Response, NextFunction } from 'express';
import * as MessageService from './message.service';

export const send = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // @ts-ignore
        const senderId = req.user.userId;
        const message = await MessageService.sendMessage(req.body, senderId);
        res.status(201).json({ status: 'success', data: { message } });
    } catch (error) {
        next(error);
    }
};

export const getInbox = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // @ts-ignore
        const userId = req.user.userId;
        const messages = await MessageService.getMyMessages(userId);
        res.status(200).json({ status: 'success', data: { messages } });
    } catch (error) {
        next(error);
    }
};

export const getMessage = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // @ts-ignore
        const userId = req.user.userId;
        const message = await MessageService.getMessage(req.params.id, userId);
        res.status(200).json({ status: 'success', data: { message } });
    } catch (error) {
        next(error);
    }
};

export const markAsRead = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // @ts-ignore
        const userId = req.user.userId;
        const message = await MessageService.markAsRead(req.body.messageId, userId);
        res.status(200).json({ status: 'success', data: { message } });
    } catch (error) {
        next(error);
    }
};

export const getHistory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const messages = await MessageService.getMessageHistory();
        res.status(200).json({ status: 'success', data: { messages } });
    } catch (error) {
        next(error);
    }
};

export const deleteMessage = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await MessageService.deleteMessage(req.params.id);
        res.status(204).json({ status: 'success', data: null });
    } catch (error) {
        next(error);
    }
};

export const getReadStats = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const stats = await MessageService.getReadStats();
        res.status(200).json({ status: 'success', data: stats });
    } catch (error) {
        next(error);
    }
};

export const getUnreadStats = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // @ts-ignore
        const userId = req.user?.userId;
        const count = await MessageService.getUnreadStats(userId);
        res.status(200).json({ status: 'success', data: { unreadCount: count } });
    } catch (error) {
        next(error);
    }
};
