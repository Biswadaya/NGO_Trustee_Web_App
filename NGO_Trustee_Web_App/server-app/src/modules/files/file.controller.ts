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

export const listFiles = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const files = await prisma.file.findMany({
            orderBy: { created_at: 'desc' },
            include: { uploaded_by: { select: { email: true, role: true } } }
        });
        res.status(200).json({ status: 'success', data: { files } });
    } catch (error) {
        next(error);
    }
};

export const updateFile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { filename } = req.body;
        const file = await prisma.file.update({
            where: { id: req.params.id },
            data: { filename },
        });
        res.status(200).json({ status: 'success', data: { file } });
    } catch (error) {
        next(error);
    }
};

export const deleteFile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await prisma.file.delete({
            where: { id: req.params.id },
        });
        res.status(204).json({ status: 'success', data: null });
    } catch (error) {
        next(error);
    }
};

