import express from 'express';
import * as UserController from './user.controller';
import { protect, restrictTo } from '../../middleware/auth';
import { UserRole } from '@prisma/client';

const router = express.Router();

// Admin only routes
router.use(protect, restrictTo(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.MANAGER));

router.put('/:userId/block', UserController.blockUser);
router.put('/:userId/unblock', UserController.unblockUser);

export default router;
