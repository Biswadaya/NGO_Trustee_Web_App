import nodemailer from 'nodemailer';
import logger from './logger';

// Create SMTP transporter for Gmail
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // Use Gmail App Password (not regular password)
    },
});

// Default sender
const FROM_EMAIL = process.env.EMAIL_FROM || process.env.EMAIL_USER;

export const sendOTPEmail = async (to: string, otp: string) => {
    try {
        const info = await transporter.sendMail({
            from: FROM_EMAIL,
            to: to,
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

        logger.info(`OTP sent to ${to} (Message ID: ${info.messageId})`);
        return true;
    } catch (error: any) {
        logger.error('Error sending OTP email:', {
            message: error?.message,
            code: error?.code,
            command: error?.command,
            responseCode: error?.responseCode,
            response: error?.response,
        });
        return false;
    }
};
