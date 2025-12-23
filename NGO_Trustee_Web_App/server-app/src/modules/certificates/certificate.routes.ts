import express from 'express';
import * as CertificateController from './certificate.controller';
import { protect, restrictTo } from '../../middleware/auth';
import { UserRole } from '@prisma/client';

const router = express.Router();

router.use(protect);
router.get('/', restrictTo(UserRole.ADMIN, UserRole.MANAGER), CertificateController.list);
router.post('/generate', restrictTo(UserRole.ADMIN, UserRole.MANAGER), CertificateController.generate);

export default router;
