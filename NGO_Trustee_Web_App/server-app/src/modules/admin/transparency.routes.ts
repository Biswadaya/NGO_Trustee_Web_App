import express from 'express';
import * as TransparencyController from './transparency.controller';
import { protect, restrictTo } from '../../middleware/auth';
import { UserRole } from '@prisma/client';

const router = express.Router();

// Public read access
router.get('/reports', TransparencyController.list);
router.get('/certifications', TransparencyController.getCertifications);
router.get('/financial-breakdown', TransparencyController.getFinancialBreakdown);


// Admin write access
router.use(protect);
router.post('/', restrictTo(UserRole.ADMIN, UserRole.SUPER_ADMIN), TransparencyController.create);

export default router;
