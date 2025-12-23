import { Request, Response, NextFunction } from 'express';
import * as CertificateService from './certificate.service';

export const generate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const certificate = await CertificateService.generateCertificate(req.body);
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
