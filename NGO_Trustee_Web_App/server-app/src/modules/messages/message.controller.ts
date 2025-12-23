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
