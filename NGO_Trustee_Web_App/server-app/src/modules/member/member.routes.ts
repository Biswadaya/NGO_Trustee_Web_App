import { Router } from 'express';
import * as memberController from './member.controller';
import { protect, restrictTo } from '../../middleware/auth';
import { UserRole } from '@prisma/client';

const router = Router();

// Public route for registration
router.post('/register', memberController.registerMember);
router.post('/payment/create-order', memberController.createPaymentOrder);



// Protected routes (Authenticated)
router.use(protect);

// My Profile (Accessible to Member, Donor, Volunteer, Admin)
router.get('/me', protect, memberController.getMyProfile);
router.put('/me', protect, memberController.updateMyProfile);
router.get('/me/id-card', protect, memberController.getIdCard);
router.get('/me/appointment-letter', memberController.getAppointmentLetter);

// Admin/Manager Only Routes
router.use(restrictTo(UserRole.ADMIN, UserRole.MANAGER));

router.get('/', memberController.getAllMembers);
router.get('/:id', memberController.getMemberById);
router.post('/:id/promote', memberController.promoteToVolunteer);
router.get('/:id/profile', memberController.getMemberProfileByUserId);
router.put('/:id/approve', memberController.approveMember);

export default router;
