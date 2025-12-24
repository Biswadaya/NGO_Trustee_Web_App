import express from 'express';
import * as CertificateController from './certificate.controller';
import { protect, restrictTo } from '../../middleware/auth';
import { checkPermission } from '../../middleware/permissions';
import { UserRole } from '@prisma/client';

const router = express.Router();

router.use(protect);

// Certificates
router.get('/', restrictTo(UserRole.ADMIN, UserRole.MANAGER), CertificateController.list);
router.post('/generate',
    restrictTo(UserRole.ADMIN, UserRole.MANAGER),
    checkPermission('can_generate_certificates'),
    CertificateController.generate
);

// Templates
router.get('/templates', restrictTo(UserRole.ADMIN, UserRole.MANAGER), CertificateController.listTemplates);
router.post('/templates',
    restrictTo(UserRole.ADMIN, UserRole.MANAGER),
    CertificateController.createTemplate // Could add specific permission if needed
);

export default router;
