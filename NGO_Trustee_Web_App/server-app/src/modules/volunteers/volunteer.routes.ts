import express from 'express';
import * as VolunteerController from './volunteer.controller';
import { protect, restrictTo } from '../../middleware/auth';
import { UserRole } from '@prisma/client';

const router = express.Router();

// Public routes
router.post('/register', VolunteerController.register);

// Protected routes
router.use(protect);

// router.get('/list', VolunteerController.list);
router.get('/stats', VolunteerController.getStats);
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
router.post('/tasks/assign-bulk', restrictTo(UserRole.ADMIN, UserRole.MANAGER), VolunteerController.assignTaskBulk);

// --- Group Management ---
router.post('/groups/create', restrictTo(UserRole.ADMIN, UserRole.MANAGER), VolunteerController.createGroup);
router.get('/groups/list', restrictTo(UserRole.ADMIN, UserRole.MANAGER), VolunteerController.listGroups);
router.get('/groups/:groupId/members', restrictTo(UserRole.ADMIN, UserRole.MANAGER), VolunteerController.getGroupMembers);
router.put('/groups/:groupId/add-members', restrictTo(UserRole.ADMIN, UserRole.MANAGER), VolunteerController.addMembersToGroup);
router.put('/groups/:groupId/remove-member/:volunteerId', restrictTo(UserRole.ADMIN, UserRole.MANAGER), VolunteerController.removeMemberFromGroup);

export default router;
