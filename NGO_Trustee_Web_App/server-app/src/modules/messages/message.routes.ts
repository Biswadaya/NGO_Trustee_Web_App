import express from 'express';
import * as MessageController from './message.controller';
import { protect, restrictTo } from '../../middleware/auth';
import { UserRole } from '@prisma/client';

const router = express.Router();

router.use(protect);

// User routes (inbox, read, etc.)
router.get('/inbox', MessageController.getInbox);
router.get('/messages/:id', MessageController.getMessage);
router.put('/message/mark-read', MessageController.markAsRead);

// Admin routes
router.post('/admin/message/send', restrictTo(UserRole.ADMIN, UserRole.MANAGER), MessageController.send);
router.get('/admin/message/history', restrictTo(UserRole.ADMIN, UserRole.MANAGER), MessageController.getHistory);
router.get('/admin/message/:id', restrictTo(UserRole.ADMIN, UserRole.MANAGER), MessageController.getMessage);
router.delete('/admin/message/:id', restrictTo(UserRole.ADMIN, UserRole.MANAGER), MessageController.deleteMessage);
router.get('/admin/message/read-stats', restrictTo(UserRole.ADMIN, UserRole.MANAGER), MessageController.getReadStats);
router.get('/admin/message/unread-stats', restrictTo(UserRole.ADMIN, UserRole.MANAGER), MessageController.getUnreadStats);

export default router;
