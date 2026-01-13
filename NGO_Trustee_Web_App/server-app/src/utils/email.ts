import nodemailer from 'nodemailer';
import logger from './logger';

const transporter = nodemailer.createTransport({
    service: 'gmail', // Or use host/port from env
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS // App Password
    }
});

export const sendOTPEmail = async (to: string, otp: string) => {
    try {
        const mailOptions = {
            from: `"NHRD Trust Security" <${process.env.EMAIL_USER}>`,
            to,
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
        };

        await transporter.sendMail(mailOptions);
        logger.info(`OTP sent to ${to}`);
        return true;
    } catch (error) {
        logger.error('Error sending OTP email', error);
        return false;
    }
};
