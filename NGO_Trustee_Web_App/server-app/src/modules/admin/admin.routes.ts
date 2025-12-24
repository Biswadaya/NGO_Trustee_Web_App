import express from 'express';
import * as AdminController from './admin.controller';
import { protect, restrictTo } from '../../middleware/auth';
import { UserRole } from '@prisma/client';

const router = express.Router();

router.use(protect);
router.use(restrictTo(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.MANAGER));

// Dashboard stats
router.get('/dashboard', AdminController.getDashboard);

// Volunteer management
router.get('/volunteers/pending', AdminController.getPendingVolunteers);
router.put('/volunteers/:id/approve', AdminController.approveVolunteer);
router.put('/volunteers/:id/reject', AdminController.rejectVolunteer);

export default router;

