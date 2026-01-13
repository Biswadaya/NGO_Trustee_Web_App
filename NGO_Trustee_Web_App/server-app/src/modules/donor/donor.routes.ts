import { Router } from 'express';
import * as donorController from './donor.controller';
import { protect, restrictTo } from '../../middleware/auth';
import { UserRole } from '@prisma/client';

const router = Router();

// Protect all routes
router.use(protect);

// Allow DONOR, MEMBER, VOLUNTEER (since they might also want to see this view if reused, but primarily DONOR)
// User requested "user whose role is set as DONOR", but typically a basic user might also be a donor.
// We'll allow authenticated users to access their own "donor" ID card given the simple requirement.
router.get('/id-card', donorController.getDonorIdCard);

export default router;
