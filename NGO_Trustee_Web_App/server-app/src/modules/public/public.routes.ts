import express from 'express';
import * as PublicController from './public.controller';

const router = express.Router();

// Public routes (No auth required)
router.post('/submit/funding', PublicController.submitFundingInquiry);
router.post('/submit/investment', PublicController.submitInvestmentInquiry);

export default router;
