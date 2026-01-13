import express from 'express';
import * as EventController from './event.controller';
import { protect, restrictTo } from '../../middleware/auth';
import { UserRole } from '@prisma/client';

const router = express.Router();

router.use(protect);

router.post('/register', EventController.register);
router.get('/my-registrations', EventController.getMyRegistrations);

// Admin only
router.get('/:id/registrations', restrictTo(UserRole.ADMIN, UserRole.MANAGER, UserRole.SUPER_ADMIN), EventController.getEventRegistrations);

export default router;
