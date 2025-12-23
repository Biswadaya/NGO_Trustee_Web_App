import express from 'express';
import * as MessageController from './message.controller';
import { protect, restrictTo } from '../../middleware/auth';
import { UserRole } from '@prisma/client';

const router = express.Router();

router.use(protect);

router.get('/inbox', MessageController.getInbox);
router.post('/send', restrictTo(UserRole.ADMIN, UserRole.MANAGER), MessageController.send);

export default router;
