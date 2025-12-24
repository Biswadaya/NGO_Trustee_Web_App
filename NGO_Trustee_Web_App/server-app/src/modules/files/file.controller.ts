import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../../middleware/auth';

const prisma = new PrismaClient();

export const uploadFile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.file) {
            return res.status(400).json({ status: 'fail', message: 'No file uploaded' });
        }

        const userId = (req as AuthRequest).user?.userId;

        const fileRecord = await prisma.file.create({
            data: {
                filename: req.file.filename,
                url: `/uploads/${req.file.filename}`, // Relative Access URL
                mimetype: req.file.mimetype,
                size: req.file.size,
                uploaded_by_id: userId,
            },
        });

        res.status(201).json({
            status: 'success',
            data: {
                file: fileRecord,
                url: fileRecord.url
            }
        });
    } catch (error) {
        next(error);
    }
};
