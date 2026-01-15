import { Resend } from 'resend';
import logger from './logger';

const resend = new Resend(process.env.RESEND_API_KEY);

// Default sender - Resend provides a free testing domain
const FROM_EMAIL = process.env.EMAIL_FROM || 'NHRD Trust <onboarding@resend.dev>';

export const sendOTPEmail = async (to: string, otp: string) => {
    try {
        const { data, error } = await resend.emails.send({
            from: FROM_EMAIL,
            to: [to],
            subject: 'Your Login Verification Code',
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
                    <h2 style="color: #2563eb;">Verification Code</h2>
                    <p>Please use the following OTP to complete your login:</p>
                    <h1 style="letter-spacing: 5px; background: #f3f4f6; padding: 10px 20px; display: inline-block; border-radius: 8px;">${otp}</h1>
                    <p>This code expires in 5 minutes.</p>
                    <p style="font-size: 12px; color: #666;">If you did not request this, please ignore this email.</p>
                </div>
            `
        });

        if (error) {
            logger.error('Resend Error:', error);
            return false;
        }

        logger.info(`OTP sent to ${to} (ID: ${data?.id})`);
        return true;
    } catch (error) {
        logger.error('Error sending OTP email', error);
        return false;
    }
};
