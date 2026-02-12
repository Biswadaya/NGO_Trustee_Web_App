import { Router } from 'express';
import * as webhookController from './webhook.controller';

const router = Router();

router.post('/razorpay', webhookController.handleRazorpayWebhook);

export default router;
