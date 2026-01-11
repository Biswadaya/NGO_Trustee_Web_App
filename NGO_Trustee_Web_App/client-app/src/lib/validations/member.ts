import * as z from 'zod';

export const familyMemberSchema = z.object({
    full_name: z.string().min(2, "Name is required"),
    relationship: z.string().min(2, "Relationship is required"),
    dob: z.string().optional(),
    occupation: z.string().optional(),
    is_dependent: z.boolean().optional(),
});

export const memberApplicationSchema = z.object({
    // Account Basics (for guests)
    user_details: z.object({
        full_name: z.string().min(2, "Name is required"),
        email: z.string().email("Invalid email address"),
        password: z.string().min(6, "Password must be at least 6 characters"),
    }).optional(),

    // Bank Details
    bank_name: z.string().min(2, "Bank name is required"),
    account_number: z.string().regex(/^[0-9]{9,18}$/, "Account number must be 9-18 digits"),
    ifsc_code: z.string().regex(/^[A-Z]{4}0[A-Z0-9]{6}$/, "Invalid IFSC Code"),
    branch_name: z.string().optional(),
    account_type: z.enum(['SAVINGS', 'CURRENT']),

    // Nominee
    nominee_name: z.string().min(2, "Nominee name is required"),
    nominee_relation: z.string().min(2, "Relationship is required"),
    nominee_dob: z.string().min(1, "Date of birth is required"),
    nominee_phone: z.string().optional(),
    nominee_address: z.string().optional(),

    // Nominee Bank
    nominee_bank_name: z.string().optional(),
    nominee_account_number: z.string().optional(),
    nominee_ifsc_code: z.string().optional(),

    // Family
    family_members: z.array(familyMemberSchema).optional(),
});

export type MemberApplicationFormValues = z.infer<typeof memberApplicationSchema>;
export type FamilyMemberFormValues = z.infer<typeof familyMemberSchema>;
