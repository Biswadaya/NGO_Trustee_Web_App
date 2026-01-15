import * as brevo from '@getbrevo/brevo';
import logger from './logger';

// Initialize Brevo API
const apiInstance = new brevo.TransactionalEmailsApi();
apiInstance.setApiKey(
    brevo.TransactionalEmailsApiApiKeys.apiKey,
    process.env.BREVO_API_KEY || ''
);

// Sender email (must be verified in Brevo dashboard)
const FROM_EMAIL = process.env.EMAIL_FROM || '';
const FROM_NAME = process.env.EMAIL_FROM_NAME || 'NHRD Trust';

export const sendOTPEmail = async (to: string, otp: string) => {
    try {
        const sendSmtpEmail = new brevo.SendSmtpEmail();

        sendSmtpEmail.sender = { email: FROM_EMAIL, name: FROM_NAME };
        sendSmtpEmail.to = [{ email: to }];
        sendSmtpEmail.subject = 'Your Login Verification Code';
        sendSmtpEmail.htmlContent = `
            <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
                <h2 style="color: #2563eb;">Verification Code</h2>
                <p>Please use the following OTP to complete your login:</p>
                <h1 style="letter-spacing: 5px; background: #f3f4f6; padding: 10px 20px; display: inline-block; border-radius: 8px;">${otp}</h1>
                <p>This code expires in 5 minutes.</p>
                <p style="font-size: 12px; color: #666;">If you did not request this, please ignore this email.</p>
            </div>
        `;

        const result = await apiInstance.sendTransacEmail(sendSmtpEmail);
        logger.info(`OTP sent to ${to} (Message ID: ${result.body.messageId})`);
        return true;
    } catch (error: any) {
        logger.error('Error sending OTP email:', {
            message: error?.message,
            statusCode: error?.response?.statusCode,
            body: error?.response?.body,
        });
        return false;
    }
};
