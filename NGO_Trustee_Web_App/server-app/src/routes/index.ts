import express from 'express';
import authRoutes from '../modules/auth/auth.routes';
import userRoutes from '../modules/users/user.routes';
import volunteerRoutes from '../modules/volunteers/volunteer.routes';
import campaignRoutes from '../modules/campaigns/campaign.routes';
import donationRoutes from '../modules/donations/donation.routes';
import certificateRoutes from '../modules/certificates/certificate.routes';
import messageRoutes from '../modules/messages/message.routes';
import adminRoutes from '../modules/admin/admin.routes';
import noticeRoutes from '../modules/notices/notice.routes';
import fileRoutes from '../modules/files/file.routes';
import transparencyRoutes from '../modules/admin/transparency.routes';
import dashboardRoutes from '../modules/dashboard/dashboard.routes';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/volunteers', volunteerRoutes);
router.use('/campaigns', campaignRoutes);
router.use('/donations', donationRoutes);
router.use('/certificates', certificateRoutes);
router.use('/messages', messageRoutes);
router.use('/admin', adminRoutes);
router.use('/notices', noticeRoutes);
router.use('/files', fileRoutes);
router.use('/transparency', transparencyRoutes);
router.use('/dashboard', dashboardRoutes);

export default router;
