import { Request, Response, NextFunction } from 'express';
import * as AuthService from './auth.service';

export const register = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { user, token, refreshToken } = await AuthService.registerUser(
            req.body
        );

        res.status(201).json({
            status: 'success',
            token,
            refreshToken,
            data: {
                user: {
                    id: user.id,
                    email: user.email,
                    full_name: user.full_name,
                    role: user.role,
                },
            },
        });
    } catch (error) {
        next(error);
    }
};

import redisClient from '../../utils/redis';
import { sendOTPEmail } from '../../utils/email';
import { randomInt } from 'crypto';

export const login = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        // 1. Verify credentials (but don't get token yet)
        const user = await AuthService.validateUser(req.body); // We need to expose a method that just validates password

        // BYPASS: Check for Razorpay Test Account
        if (user.email === 'razorpay_test@ngo.com') {
            // 2. Generate Tokens Immediately
            const { user: userWithStatus, token, refreshToken } = await AuthService.generateTokens(user.email);

            // 3. Return Success Response (matching verifyOtp structure)
            return res.status(200).json({
                status: 'success',
                token,
                refreshToken,
                data: {
                    user: {
                        id: userWithStatus.id,
                        email: userWithStatus.email,
                        full_name: userWithStatus.full_name,
                        role: userWithStatus.role,
                        status: userWithStatus.status
                    }
                }
            });
        }

        // 2. Generate OTP
        const otp = randomInt(100000, 999999).toString();

        // 3. Store in Redis (TTL 5 mins)
        // Ensure Redis is connected. In production, error handling if Redis is down is critical (maybe fail-open or fail-closed). 
        // Here we fail-closed (user cannot login if Redis is down).
        await redisClient.set(`auth:otp:${user.email}`, otp, { EX: 300 });

        // 4. Send Email
        const emailSent = await sendOTPEmail(user.email, otp);
        if (!emailSent) {
            throw new Error("Failed to send OTP email.");
        }

        // 5. Response
        res.status(200).json({
            status: 'OTP_REQUIRED',
            message: 'Six-digit code sent to your email.',
            data: {
                email: user.email
            }
        });
    } catch (error) {
        next(error);
    }
};

export const verifyOtp = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { email, otp } = req.body;

        // 1. Check Redis
        const storedOtp = await redisClient.get(`auth:otp:${email}`);

        // 2. Validate
        if (!storedOtp) {
            return res.status(400).json({ status: 'error', message: 'OTP expired or invalid' });
        }
        if (storedOtp !== otp) {
            return res.status(400).json({ status: 'error', message: 'Incorrect code' });
        }

        // 3. Cleanup (Prevent replay)
        await redisClient.del(`auth:otp:${email}`);

        // 4. Issue Token (Now we call the service to get the token as we trust the user)
        // We might need a service method `generateTokensForUser(email)`
        const { user, token, refreshToken } = await AuthService.generateTokens(email);

        res.status(200).json({
            status: 'success',
            token,
            refreshToken,
            data: {
                user: {
                    id: user.id,
                    email: user.email,
                    full_name: user.full_name,
                    role: user.role,
                    status: user.status
                }
            }
        });
    } catch (error) {
        next(error);
    }
};
