import express from 'express';
import * as AdminController from './admin.controller';
import { protect, restrictTo } from '../../middleware/auth';
import { UserRole } from '@prisma/client';

const router = express.Router();

// Auth (Public for admin login)
router.post('/login', AdminController.login);

router.use(protect);
router.use(restrictTo(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.MANAGER));

// Dashboard stats

router.get('/dashboard', AdminController.getDashboard);
router.get('/dashboard/overview', AdminController.getDashboard); // Alias

// Volunteer management
router.get('/volunteers/pending', AdminController.getPendingVolunteers);
router.post('/volunteers', AdminController.addVolunteer);
router.put('/volunteers/:id/approve', AdminController.approveVolunteer);
router.put('/volunteers/:id/reject', AdminController.rejectVolunteer);
router.put('/volunteer/:id/active-manual', AdminController.approveVolunteer); // Alias for manual activation

// Funds & Expenses
router.get('/funds/summary', AdminController.getFundsSummary);
router.get('/funds/expenses', AdminController.getExpenses);

// Volunteer stats
router.get('/volunteer/stats', AdminController.getVolunteerStats);
router.get('/volunteer/unpaid', AdminController.getUnpaidVolunteers);
router.get('/users', AdminController.listUsers);
router.get('/users/blocked', AdminController.getBlockedUsers);
router.get('/volunteer/:id/payment_stats', AdminController.getVolunteerPaymentStats);


// User management
router.put('/users/:id/role', AdminController.updateUserRole);
router.put('/users/:id/block', AdminController.blockUser);
router.put('/users/:id/unblock', AdminController.unblockUser);
router.get('/users/blocked-users', AdminController.getBlockedUsers);

// Events
router.post('/events/create', AdminController.createEvent);
router.get('/events/:id', AdminController.getEvent);
router.put('/events/:id', AdminController.updateEvent);
router.delete('/events/:id', AdminController.deleteEvent);

// Audit logs
router.get('/audit-logs', AdminController.getAuditLogs);

export default router;
