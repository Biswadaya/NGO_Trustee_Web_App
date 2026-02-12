import { Request, Response, NextFunction } from 'express';
import * as CertificateService from './certificate.service';
import * as TemplateService from './template.service';
import { AuthRequest } from '../../middleware/auth';
import { prisma } from '../../utils/db'; // Import prisma


export const generate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const certificate = await CertificateService.generateCertificate(req.body);
        res.status(201).json({ status: 'success', data: { certificate } });
    } catch (error) {
        next(error);
    }
};

export const testGenerate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Fetch a real user to avoid FK constraint errors
        const user = await prisma.user.findFirst();
        const userId = user?.id || 'test-user-id'; // Fallback only if no users exist

        const dummyData = {
            recipient_name: 'John Doe',
            recipient_email: 'john@example.com',
            issued_for: 'Education Support Campaign',
            template_id: 'test-template-v1',
            certificate_type: 'APPRECIATION', // Added required field
            user_id: userId
        };

        const certificate = await CertificateService.generateCertificate(dummyData);
        res.status(201).json({ status: 'success', data: { certificate } });
    } catch (error) {
        next(error);
    }
};

export const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const certificate = await CertificateService.createCertificate(req.body);
        res.status(201).json({ status: 'success', data: { certificate } });
    } catch (error) {
        next(error);
    }
};

export const list = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const certificates = await CertificateService.getCertificates();
        res.status(200).json({ status: 'success', data: { certificates } });
    } catch (error) {
        next(error);
    }
};

export const getEntityCertificates = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.setHeader('Cache-Control', 'no-store'); // Prevent caching of stale empty lists
        const certificates = await CertificateService.getEntityCertificates(req.params.id);
        res.status(200).json({ status: 'success', data: { certificates } });
    } catch (error) {
        next(error);
    }
};

export const createTemplate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = (req as AuthRequest).user?.userId;
        // @ts-ignore
        const template = await TemplateService.createTemplate(req.body, userId);
        res.status(201).json({ status: 'success', data: { template } });
    } catch (error) {
        next(error);
    }
};

export const listTemplates = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const templates = await TemplateService.getTemplates();
        res.status(200).json({ status: 'success', data: { templates } });
    } catch (error) {
        next(error);
    }
};
