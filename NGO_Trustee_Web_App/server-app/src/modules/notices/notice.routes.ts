import express from 'express';
import * as NoticeController from './notice.controller';
import { protect, restrictTo } from '../../middleware/auth';
import { checkPermission } from '../../middleware/permissions';
import { UserRole } from '@prisma/client';

const router = express.Router();

// Public routes
router.get('/public', NoticeController.listPublic);

// Authenticated routes
router.use(protect);
router.get('/my-notices', NoticeController.listMyNotices);

// Admin routes
router.get('/admin/all',
    restrictTo(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.MANAGER),
    NoticeController.listAdmin
);

router.post('/',
    restrictTo(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.MANAGER),
    checkPermission('can_edit_notices'),
    NoticeController.create
);

export default router;
