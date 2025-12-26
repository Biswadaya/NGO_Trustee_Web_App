import express from 'express';
import * as DashboardController from './dashboard.controller';
import { protect } from '../../middleware/auth';

const router = express.Router();

router.use(protect);

router.get('/overview', DashboardController.getOverview);
router.get('/analytics', DashboardController.getAnalytics);
router.get('/recent-activity', DashboardController.getRecentActivity);

export default router;
