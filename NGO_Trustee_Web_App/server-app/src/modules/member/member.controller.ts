import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import * as memberService from './member.service';
import { AppError } from '../../middleware/error';

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
    phone: z.string().optional(),
    address: z.string().optional(),
    occupation: z.string().optional(),

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
});

export const registerMember = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validatedData = registerMemberSchema.parse(req.body);
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
