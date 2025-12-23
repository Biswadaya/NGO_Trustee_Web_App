import express from 'express';
import * as VolunteerController from './volunteer.controller';
import { protect, restrictTo } from '../../middleware/auth';
import { UserRole } from '@prisma/client';

const router = express.Router();

router.use(protect);

// Admin routes for managing volunteers
router.put('/:id/activate', restrictTo(UserRole.ADMIN, UserRole.SUPER_ADMIN), VolunteerController.activate);
router.post('/:id/generate-id', restrictTo(UserRole.ADMIN, UserRole.MANAGER), VolunteerController.generateId);
router.post('/:id/pay-membership', restrictTo(UserRole.ADMIN, UserRole.VOLUNTEER), VolunteerController.payMembership);

export default router;
