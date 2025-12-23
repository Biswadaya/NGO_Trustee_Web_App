import express from 'express';
import * as CampaignController from './campaign.controller';
import { protect, restrictTo } from '../../middleware/auth';
import { UserRole } from '@prisma/client';

const router = express.Router();

router.get('/', CampaignController.list);

router.use(protect);
router.post('/', restrictTo(UserRole.ADMIN, UserRole.MANAGER), CampaignController.create);

export default router;
