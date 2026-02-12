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

export const sendMembershipConfirmationEmail = async (to: string, name: string, memberId: string, paymentDate: string, amount: number) => {
    try {
        const sendSmtpEmail = new brevo.SendSmtpEmail();

        sendSmtpEmail.sender = { email: FROM_EMAIL, name: FROM_NAME };
        sendSmtpEmail.to = [{ email: to }];
        sendSmtpEmail.subject = 'Welcome to NHRD - Membership Confirmation';
        sendSmtpEmail.htmlContent = `
            <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
                <!-- Header -->
                <div style="background: linear-gradient(135deg, #0f766e 0%, #0e7490 100%); padding: 30px 20px; text-align: center;">
                    <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 700; letter-spacing: 1px;">Welcome to NHRD</h1>
                    <p style="color: #ccfbf1; margin: 5px 0 0 0; font-size: 14px;">National Humanity And Rural Development</p>
                </div>

                <!-- Body -->
                <div style="padding: 30px 25px; color: #374151;">
                    <p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px;">Dear <strong>${name}</strong>,</p>
                    
                    <p style="font-size: 16px; line-height: 1.6; margin-bottom: 25px;">
                        Congratulations! We are delighted to confirm your membership with the <strong>National Humanity And Rural Development (NHRD) Trust</strong>. 
                        Your support strengthens our mission to transform lives in rural India.
                    </p>

                    <!-- Membership Details Card -->
                    <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; margin-bottom: 25px;">
                        <h3 style="color: #0f766e; margin-top: 0; margin-bottom: 15px; border-bottom: 1px solid #e2e8f0; padding-bottom: 10px;">Membership Details</h3>
                        
                        <table style="width: 100%; border-collapse: collapse;">
                            <tr>
                                <td style="padding: 8px 0; color: #64748b; font-size: 14px; width: 40%;">Member ID:</td>
                                <td style="padding: 8px 0; color: #334155; font-weight: 600; font-size: 14px;">NHRD-${memberId.substring(0, 8).toUpperCase()}</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Date Joined:</td>
                                <td style="padding: 8px 0; color: #334155; font-weight: 600; font-size: 14px;">${paymentDate}</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Membership Fee:</td>
                                <td style="padding: 8px 0; color: #059669; font-weight: 700; font-size: 14px;">₹${amount}</td>
                            </tr>
                        </table>
                    </div>

                    <p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
                        You can now log in to the <a href="${process.env.CLIENT_URL || '#'}/login" style="color: #0f766e; text-decoration: underline; font-weight: 600;">Member Portal</a> to view your ID card, access resources, and participate in our programs.
                    </p>

                    <p style="font-size: 16px; line-height: 1.6; margin-bottom: 0;">
                        Warm Regards,<br/>
                        <strong>Board of Trustees</strong><br/>
                        <span style="font-size: 14px; color: #64748b;">NHRD Trust</span>
                    </p>
                </div>

                <!-- Footer -->
                <div style="background-color: #f1f5f9; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0;">
                    <p style="margin: 0; font-size: 12px; color: #94a3b8;">
                        &copy; ${new Date().getFullYear()} National Humanity And Rural Development. All rights reserved.
                    </p>
                </div>
            </div>
        `;

        const result = await apiInstance.sendTransacEmail(sendSmtpEmail);
        logger.info(`Membership confirmation sent to ${to} (Message ID: ${result.body.messageId})`);
        return true;
    } catch (error: any) {
        logger.error('Error sending membership confirmation email:', {
            message: error?.message,
            statusCode: error?.response?.statusCode,
            body: error?.response?.body,
        });
        return false;
    }
};
