import express from 'express';
import * as CampaignController from './campaign.controller';
import { protect, restrictTo } from '../../middleware/auth';
import { UserRole } from '@prisma/client';

const router = express.Router();

router.get('/', CampaignController.list);
router.get('/:id', CampaignController.getById);
router.get('/:id/progress', CampaignController.getProgress);
router.get('/:id/donors', CampaignController.getDonors);

router.use(protect);
router.post('/', restrictTo(UserRole.ADMIN, UserRole.MANAGER), CampaignController.create);
router.put('/:id', restrictTo(UserRole.ADMIN, UserRole.MANAGER), CampaignController.update);
router.delete('/:id', restrictTo(UserRole.ADMIN, UserRole.MANAGER), CampaignController.remove);

export default router;

