import { Router } from 'express';
import * as memberController from './member.controller';
import { protect, restrictTo } from '../../middleware/auth';
import { UserRole } from '@prisma/client';

const router = Router();

// Public route for registration
router.post('/register', memberController.registerMember);

// Protected routes (Admin only)
router.use(protect);
router.use(restrictTo(UserRole.ADMIN, UserRole.MANAGER));

router.get('/', memberController.getAllMembers);
router.get('/:id', memberController.getMemberById);
router.post('/:id/promote', memberController.promoteToVolunteer);
router.get('/:id/profile', memberController.getMemberProfileByUserId);
router.put('/:id/approve', memberController.approveMember);

export default router;
