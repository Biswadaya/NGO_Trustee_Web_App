import express from 'express';
import * as NoticeController from './notice.controller';
import { protect, restrictTo } from '../../middleware/auth';
import { UserRole } from '@prisma/client';

const router = express.Router();

// Public routes
router.get('/notices/list', NoticeController.listPublic);

// Protected routes
router.use(protect);
router.get('/my-notices', NoticeController.listMyNotices);

// Admin routes
router.post('/admin/notices/create', restrictTo(UserRole.ADMIN, UserRole.MANAGER), NoticeController.create);
router.get('/admin/notice/history', restrictTo(UserRole.ADMIN, UserRole.MANAGER), NoticeController.listAdmin);
router.put('/admin/notice/:id/edit', restrictTo(UserRole.ADMIN, UserRole.MANAGER), NoticeController.updateNotice);
router.delete('/admin/notice/:id', restrictTo(UserRole.ADMIN, UserRole.MANAGER), NoticeController.deleteNotice);

export default router;
