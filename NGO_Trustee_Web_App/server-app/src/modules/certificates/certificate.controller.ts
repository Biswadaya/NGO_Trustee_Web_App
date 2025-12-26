import { Request, Response, NextFunction } from 'express';
import * as CertificateService from './certificate.service';
import * as TemplateService from './template.service';
import { AuthRequest } from '../../middleware/auth';

export const generate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const certificate = await CertificateService.generateCertificate(req.body);
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
