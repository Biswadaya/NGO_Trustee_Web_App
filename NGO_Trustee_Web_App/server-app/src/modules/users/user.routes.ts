import express from 'express';
import * as UserController from './user.controller';
import { protect, restrictTo } from '../../middleware/auth';
import { UserRole } from '@prisma/client';

const router = express.Router();

import { checkPermission } from '../../middleware/permissions';

// Admin/Manager routes
router.put('/:userId/block',
    protect,
    restrictTo(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.MANAGER),
    checkPermission('can_block_users'),
    UserController.blockUser
);

router.put('/:userId/unblock',
    protect,
    restrictTo(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.MANAGER),
    checkPermission('can_block_users'),
    UserController.unblockUser
);

export default router;
