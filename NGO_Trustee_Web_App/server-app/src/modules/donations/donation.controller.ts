import { Request, Response, NextFunction } from 'express';
import * as DonationService from './donation.service';
import * as CertificateService from '../certificates/certificate.service';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import { AppError } from '../../middleware/error';

const getKeyId = () => process.env.TEST_KEY_ID || process.env.RAZORPAY_KEY_ID;
const getKeySecret = () => process.env.TEST_KEY_SECRET || process.env.RAZORPAY_KEY_SECRET;

const razorpay = new Razorpay({
    key_id: getKeyId() || '',
    key_secret: getKeySecret() || '',
});

export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { amount } = req.body;

        if (!amount) {
            throw new AppError('Amount is required', 400);
        }

        const options = {
            amount: Math.round(Number(amount) * 100), // amount in lowest denomination (paise)
            currency: 'INR',
            receipt: `receipt_${Date.now()}`,
        };

        const order = await razorpay.orders.create(options);

        res.status(200).json({ status: 'success', data: order });
    } catch (error) {
        console.error('Razorpay Order Creation Error:', error);
        next(error);
    }
};

export const verifyPayment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, donation_data } = req.body;

        console.log('[DEBUG] verifyPayment received data:', {
            razorpay_payment_id,
            user_id: donation_data?.user_id,
            donor_name: donation_data?.donor_name
        });

        const secret = getKeySecret();
        if (!secret) {
            throw new AppError('Server configuration error: Key Secret missing', 500);
        }

        const shasum = crypto.createHmac('sha256', secret);
        shasum.update(`${razorpay_order_id}|${razorpay_payment_id}`);
        const digest = shasum.digest('hex');

        if (digest !== razorpay_signature) {
            throw new AppError('Transaction verification failed', 400);
        }

        // Payment verified, create donation record
        const donation = await DonationService.createDonation({
            ...donation_data,
            transaction_id: razorpay_payment_id,
            status: 'completed'
        });

        // --- Certificate Generation Trigger ---
        try {
            await CertificateService.generateForDonation(donation.id);
        } catch (certError) {
            console.error('Failed to generate certificate via donation webhook:', certError);
            // Don't fail the donation process if certificate fails
        }

        res.status(200).json({ status: 'success', data: { donation } });
    } catch (error) {
        next(error);
    }
};

export const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const donation = await DonationService.createDonation(req.body);
        res.status(201).json({ status: 'success', data: { donation } });
    } catch (error) {
        next(error);
    }
};

export const list = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const donations = await DonationService.getDonations();
        res.status(200).json({ status: 'success', data: { donations } });
    } catch (error) {
        next(error);
    }
};

export const getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const donation = await DonationService.getDonationById(req.params.id);
        res.status(200).json({ status: 'success', data: { donation } });
    } catch (error) {
        next(error);
    }
};

export const getByTransactionId = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const donation = await DonationService.getDonationByTransactionId(req.params.transaction_id);
        res.status(200).json({ status: 'success', data: { donation } });
    } catch (error) {
        next(error);
    }
};

export const getStats = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const stats = await DonationService.getDonationStats();
        res.status(200).json({ status: 'success', data: stats });
    } catch (error) {
        next(error);
    }
};
export const getMyDonations = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // @ts-ignore
        const userId = req.user.userId;
        const donations = await DonationService.getMyDonations(userId);
        res.status(200).json({ status: 'success', data: { donations } });
    } catch (error) {
        next(error);
    }
};
