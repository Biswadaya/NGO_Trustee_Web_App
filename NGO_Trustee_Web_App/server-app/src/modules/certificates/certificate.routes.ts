import express from 'express';
import * as CertificateController from './certificate.controller';
import { protect, restrictTo } from '../../middleware/auth';
import { UserRole } from '@prisma/client';

const router = express.Router();

// General routes
router.get('/test-gen', CertificateController.testGenerate); // Temporary Test Route - Public for testing
router.get('/:id/certificates', CertificateController.getEntityCertificates); // Public to allow guest validation

router.use(protect);

router.get('/list', CertificateController.list);

// Admin routes
router.post('/create', restrictTo(UserRole.ADMIN, UserRole.MANAGER), CertificateController.create);
router.post('/generate', restrictTo(UserRole.ADMIN, UserRole.MANAGER), CertificateController.generate);

// Template routes
router.post('/templates', restrictTo(UserRole.ADMIN), CertificateController.createTemplate);
router.get('/templates', CertificateController.listTemplates);

export default router;
