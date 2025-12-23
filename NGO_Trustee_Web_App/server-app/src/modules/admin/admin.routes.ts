import express from 'express';
import * as AdminController from './admin.controller';
import { protect, restrictTo } from '../../middleware/auth';
import { UserRole } from '@prisma/client';

const router = express.Router();

router.use(protect);
router.use(restrictTo(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.MANAGER));

router.get('/dashboard', AdminController.getDashboard);

export default router;
