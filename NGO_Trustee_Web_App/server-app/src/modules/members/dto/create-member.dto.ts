import { IsString, IsNotEmpty, IsOptional, IsDateString, ValidateNested, IsArray, IsEnum, Matches, IsEmail } from 'class-validator';
import { Type } from 'class-transformer';

export class FamilyMemberDto {
    @IsString()
    @IsNotEmpty()
    full_name!: string;

    @IsString()
    @IsNotEmpty()
    relationship!: string;

    @IsDateString()
    @IsOptional()
    dob?: string;

    @IsString()
    @IsOptional()
    occupation?: string;

    @IsOptional()
    is_dependent?: boolean;
}

export class UserRegistrationDto {
    @IsString()
    @IsNotEmpty()
    full_name!: string;

    @IsEmail()
    @IsNotEmpty()
    email!: string;

    @IsString()
    @IsNotEmpty()
    password!: string;
}

export class CreateMemberDto {
    // --- Account Details (For new users) ---
    @IsOptional()
    @ValidateNested()
    @Type(() => UserRegistrationDto)
    user_details?: UserRegistrationDto;

    // --- Bank Details ---
    @IsString()
    @IsNotEmpty()
    bank_name!: string;

    @IsString()
    @IsNotEmpty()
    @Matches(/^[0-9]{9,18}$/, { message: 'Account number must be between 9 and 18 digits' })
    account_number!: string;

    @IsString()
    @IsNotEmpty()
    @Matches(/^[A-Z]{4}0[A-Z0-9]{6}$/, { message: 'Invalid IFSC Code format' })
    ifsc_code!: string;

    @IsString()
    @IsOptional()
    branch_name?: string;

    @IsString()
    @IsNotEmpty()
    @IsEnum(['SAVINGS', 'CURRENT'], { message: 'Account type must be SAVINGS or CURRENT' })
    account_type!: string;

    // --- Nominee Details ---
    @IsString()
    @IsNotEmpty()
    nominee_name!: string;

    @IsString()
    @IsNotEmpty()
    nominee_relation!: string;

    @IsDateString()
    @IsNotEmpty()
    nominee_dob!: string;

    @IsString()
    @IsOptional()
    nominee_phone?: string;

    @IsString()
    @IsOptional()
    nominee_address?: string;

    // --- Nominee Bank Details ---
    @IsString()
    @IsOptional()
    nominee_bank_name?: string;

    @IsString()
    @IsOptional()
    nominee_account_number?: string;

    @IsString()
    @IsOptional()
    nominee_ifsc_code?: string;

    // --- Family Members ---
    @IsArray()
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => FamilyMemberDto)
    family_members?: FamilyMemberDto[];
}
