import express from 'express';
import * as DonationController from './donation.controller';
import { protect, restrictTo } from '../../middleware/auth';
import { UserRole } from '@prisma/client';

const router = express.Router();

router.post('/', DonationController.create); // Public for now, or use token if logged in (logic in controller needs adjustment for optional auth)

router.use(protect, restrictTo(UserRole.ADMIN, UserRole.MANAGER));
router.get('/', DonationController.list);
router.get('/stats', DonationController.getStats);
router.get('/:id', DonationController.getById);
router.get('/transaction/:transaction_id', DonationController.getByTransactionId);

export default router;

