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

    // Adhar (Optional)
    adhar_number: z.string().optional(),

    // Personal
    dob: z.string().min(1, "Date of birth is required"),
    phone: z.string().optional(),
    address: z.string().optional(),
    occupation: z.string().optional(),

    // Bank Details (Optional)
    bank_name: z.string().optional(),
    account_number: z.string().optional(), // regex(/^[0-9]{9,18}$/) removed for optional
    ifsc_code: z.string().optional(), // regex removed for optional
    branch_name: z.string().optional(),
    account_type: z.enum(['SAVINGS', 'CURRENT']).optional(),

    // Nominee (Optional)
    nominee_name: z.string().optional(),
    nominee_relation: z.string().optional(),
    nominee_dob: z.string().optional(),
    nominee_phone: z.string().optional(),
    nominee_address: z.string().optional(),

    // Nominee Bank (Optional)
    nominee_bank_name: z.string().optional(),
    nominee_account_number: z.string().optional(),
    nominee_ifsc_code: z.string().optional(),

    // Family (Optional)
    family_members: z.array(familyMemberSchema).optional(),

    // Payment (Required > 10)
    membership_fee: z.coerce.number().min(10, "Minimum membership fee is 10"),
    payment_info: z.object({
        razorpay_order_id: z.string(),
        razorpay_payment_id: z.string(),
        razorpay_signature: z.string(),
    }).optional(), // Optional in schema but logically required for submission validation
});

export type MemberApplicationFormValues = z.infer<typeof memberApplicationSchema>;
export type FamilyMemberFormValues = z.infer<typeof familyMemberSchema>;
