import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import * as memberService from './member.service';
import { AppError } from '../../middleware/error';

import Razorpay from 'razorpay';

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID || process.env.TEST_KEY_ID || '',
    key_secret: process.env.RAZORPAY_KEY_SECRET || process.env.TEST_KEY_SECRET || '',
});

// Check standard bank details required for registration
const bankDetailsSchema = z.object({
    account_number: z.string().min(5),
    bank_name: z.string().min(2),
    ifsc_code: z.string().min(4),
    branch_name: z.string().optional(),
});

const registerMemberSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8, "Password must be at least 8 characters"),
    full_name: z.string().min(2),
    dob: z.string().min(1, "Date of birth is required"), // Added DOB
    phone: z.string().optional(),
    address: z.string().optional(),
    occupation: z.string().optional(),
    adhar_number: z.string().optional(), // Made Optional

    family_members: z.array(z.object({
        name: z.string(),
        relationship: z.string(),
        age: z.number().optional(),
    })).optional(),

    nominee: z.object({
        name: z.string(),
        relationship: z.string().optional(),
        phone: z.string().optional(),
        account_number: z.string().optional(),
        bank_name: z.string().optional(),
        ifsc_code: z.string().optional(),
        branch_name: z.string().optional(),
    }).optional(),

    bank_details: bankDetailsSchema.optional(),

    membership_fee: z.number().positive(),
    payment_info: z.object({
        razorpay_order_id: z.string(),
        razorpay_payment_id: z.string(),
        razorpay_signature: z.string(),
    }).optional(),
});

export const createPaymentOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log("DEBUG: createPaymentOrder called");
        console.log("DEBUG: Keys present?", {
            key_id: !!process.env.RAZORPAY_KEY_ID,
            key_secret: !!process.env.RAZORPAY_KEY_SECRET
        });

        const { amount } = req.body; // Amount in INR
        if (!amount || amount < 10) { // Keep the 10 INR limit
            throw new AppError('Minimum membership fee is 10 INR', 400);
        }

        const options = {
            amount: Math.round(amount * 100), // paise
            currency: 'INR',
            receipt: `MEM_${Date.now()}`,
            notes: {
                type: 'MEMBERSHIP_FEE'
            }
        };

        const order = await razorpay.orders.create(options);
        res.status(200).json({ status: 'success', data: order });

    } catch (error: any) {
        console.error("Razorpay Order Error Full Object:", JSON.stringify(error, null, 2));
        console.error("Razorpay Order Error Message:", error.message);
        // Check for specific authentication error
        if (error.statusCode === 401) {
            console.error("DEBUG: Authentication Failed. Check RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in server-app/.env");
        }
        next(new AppError('Failed to create payment order: ' + error.message, 500));
    }
};

export const registerMember = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log("DEBUG: registerMember called", JSON.stringify(req.body, null, 2));
        const validatedData = registerMemberSchema.parse(req.body);
        // @ts-ignore
        const result = await memberService.registerMember(validatedData);
        res.status(201).json({
            status: 'success',
            data: result
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
            next(new AppError(error.issues.map((e: any) => e.message).join(', '), 400));
        } else {
            next(error);
        }
    }
};

export const getAllMembers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const members = await memberService.getAllMembers();
        res.status(200).json({
            status: 'success',
            results: members.length,
            data: { members }
        });
    } catch (error) {
        next(error);
    }
};

export const getMemberById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const member = await memberService.getMemberById(req.params.id);
        res.status(200).json({
            status: 'success',
            data: { member }
        });
    } catch (error) {
        next(error);
    }
};

export const promoteToVolunteer = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await memberService.promoteToVolunteer(req.params.id);
        res.status(200).json({
            status: 'success',
            message: 'Member promoted to volunteer successfully',
            data: result
        });
    } catch (error) {
        next(error);
    }
};

export const getMemberProfileByUserId = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const member = await memberService.getMemberProfileByUserId(req.params.id);
        res.status(200).json({
            status: 'success',
            data: { member: member } // Ensure response structure matches frontend expectation
        });
    } catch (error) {
        next(error);
    }
};

export const getMyProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // @ts-ignore
        const userId = req.user.userId;
        const member = await memberService.getMemberProfileByUserId(userId);
        res.status(200).json({
            status: 'success',
            data: {
                member: member,
                user: (req as any).user // Start including user info if needed
            }
        });
    } catch (error) {
        next(error);
    }
};

export const approveMember = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await memberService.approveMember(req.params.id);
        res.status(200).json({
            status: 'success',
            message: 'Member approved successfully',
            data: result
        });
    } catch (error) {
        next(error);
    }
};

export const getIdCard = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // @ts-ignore
        const userId = req.user.userId;
        const idCardData = await memberService.getMemberIdCardDetails(userId);
        res.status(200).json({
            status: 'success',
            data: idCardData
        });
    } catch (error) {
        next(error);
    }
};

export const getAppointmentLetter = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // @ts-ignore
        const userId = req.user.userId;
        const letterData = await memberService.getAppointmentLetterDetails(userId);
        res.status(200).json({
            status: 'success',
            data: letterData
        });
    } catch (error) {
        next(error);
    }
};

export const updateMyProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // @ts-ignore
        const userId = req.user.userId;
        const updatedProfile = await memberService.updateMemberProfile(userId, req.body);
        res.status(200).json({
            status: 'success',
            message: 'Profile updated successfully',
            data: updatedProfile
        });
    } catch (error) {
        next(error);
    }
};
