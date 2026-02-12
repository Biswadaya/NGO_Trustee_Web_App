import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';
import { prisma } from '../../utils/db';
import { Prisma } from '@prisma/client';

export const handleRazorpayWebhook = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

        // If no secret is set, we cannot verify. 
        // In production, this should be an error or handled gracefully.
        if (!secret) {
            console.warn("RAZORPAY_WEBHOOK_SECRET is not set. Webhook verification skipped (unsafe).");
            // If we don't return here, we might process unverified requests. 
            // Better to return 200 to acknowledge but do nothing, or log error.
            // For now, let's log error and return.
            return res.status(500).send("Webhook secret not configured");
        }

        const shasum = crypto.createHmac('sha256', secret);
        shasum.update(JSON.stringify(req.body));
        const digest = shasum.digest('hex');

        const razorpaySignature = req.headers['x-razorpay-signature'];

        if (digest !== razorpaySignature) {
            console.error("Invalid Razorpay Webhook Signature");
            return res.status(400).send("Invalid signature");
        }

        const event = req.body.event;
        const payload = req.body.payload;

        console.log(`Received Razorpay Webhook: ${event}`);

        if (event === 'payment.captured' || event === 'order.paid') {
            const payment = payload.payment.entity;
            const orderId = payment.order_id;
            const paymentId = payment.id;
            const amount = payment.amount; // In paise

            // Notes often contain our metadata
            // But we might need to find the member by something else if we didn't save orderId yet.
            // In our `createPaymentOrder`, we added `receipt` and `notes`.
            // But member registration happens AFTER payment in the frontend flow?
            // Wait, the frontend flow is:
            // 1. Create Order (backend)
            // 2. Pay (Razorpay)
            // 3. Register Member (backend) with payment info.

            // If step 3 fails (e.g. browser closed), we have a paid order but no member.
            // This is tricky. The webhook might arrive BEFORE the member is created if the user is slow, 
            // OR if the user dropped off, we have an orphan payment.

            // IF the user registered first, we could update. But they don't.

            // HOWEVER, we might want to record the payment generically in MembershipPayment 
            // even if likely member doesn't exist yet? No, `member_id` is required.

            // Strategy:
            // If the frontend flow is "Pay first, then Register", relying on Webhook to "Update" member status is 
            // only possible if we can link it.
            // But we don't have a member_id yet.

            // If we want "Real" robust implementation, we should probably:
            // 1. Create Member (PENDING/UNPAID) first.
            // 2. Create Order.
            // 3. Pay.
            // 4. Webhook updates Member to PAID.

            // But the current flow is "Fill form -> Pay -> Submit everything".
            // Changing that flow is a bigger refactor.

            // For this specific task, "Real Razorpay Implementation" implies using real keys and verifying signatures.
            // The Webhook is useful if we store the `order_id` somewhere. 
            // But we don't store it until registration.

            // If we receive a webhook for an order we don't know about (because it's in the browser form), 
            // we can't do much linking.

            // UNLESS: We log it in a `PaymentLog` table for reconciliation.
            // Let's create a generic Payment Log if we can, or just log to console for now 
            // since we don't want to change the database schema massively.

            // Actually, `MembershipPayment` table exists. But it needs `member_id`.

            // Let's assume for now the Webhook is primarily for:
            // 1. Logging.
            // 2. Future proofing.
            // 3. If we change flow later to "Register then Pay".

            console.log(`Payment captured: ${paymentId} for Order: ${orderId}`);
        }

        res.status(200).json({ status: 'ok' });
    } catch (error) {
        console.error("Webhook Error:", error);
        next(error);
    }
};
