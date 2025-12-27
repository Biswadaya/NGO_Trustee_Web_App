import express from 'express';
import * as VolunteerController from './volunteer.controller';
import { protect, restrictTo } from '../../middleware/auth';
import { UserRole } from '@prisma/client';

const router = express.Router();

// Public routes
router.post('/register', VolunteerController.register);

// Protected routes
router.use(protect);

router.get('/list', VolunteerController.list);
router.get('/id-card/list', VolunteerController.listIdCards);
router.get('/:id/personal-info', VolunteerController.getPersonalInfo);
router.get('/:id/id-card', VolunteerController.getIdCard);
router.get('/:id/get-unique-id', VolunteerController.getUniqueId);
router.post('/:id/generate-id', restrictTo(UserRole.ADMIN, UserRole.MANAGER), VolunteerController.generateId);
router.post('/payment', VolunteerController.payMembership);
router.put('/:id/status', restrictTo(UserRole.ADMIN, UserRole.MANAGER), VolunteerController.updateStatus);
router.put('/:id/activate', restrictTo(UserRole.ADMIN, UserRole.MANAGER), VolunteerController.activate);
router.put('/:id/revoke', restrictTo(UserRole.ADMIN, UserRole.MANAGER), VolunteerController.revokeId);

// --- Task Management ---
router.get('/:id/tasks', VolunteerController.getTasks);
router.get('/tasks/all', restrictTo(UserRole.ADMIN, UserRole.MANAGER), VolunteerController.listAllTasks);
router.post('/tasks/create', restrictTo(UserRole.ADMIN, UserRole.MANAGER), VolunteerController.createTask);
router.put('/tasks/:taskId/status', VolunteerController.updateTaskStatus);

export default router;
