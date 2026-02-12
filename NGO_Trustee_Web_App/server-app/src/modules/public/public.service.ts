import { prisma } from '../../utils/db';
import { FundingRecord, Investment, FundingType } from '@prisma/client';

export const createFundingInquiry = async (data: {
    type: FundingType;
    beneficiary_name: string;
    beneficiary_address: string;
    sanction_amount: number;
    sanction_authority: string;
    project_name: string;
    description?: string;
}) => {
    return prisma.fundingRecord.create({
        data: {
            type: data.type,
            beneficiary_name: data.beneficiary_name,
            beneficiary_address: data.beneficiary_address,
            sanction_amount: data.sanction_amount,
            sanction_authority: data.sanction_authority,
            project_name: data.project_name,
            description: data.description,
            status: 'pending' // Default to pending for public inquiries
        }
    });
};

export const createInvestmentInquiry = async (data: {
    amount: number;
    investment_limit: number;
    period: string;
    rate_of_interest: number;
    authority_name: string;
    organization_name: string;
    authority_address: string;
    investment_date: string; // ISO string from frontend
}) => {
    return prisma.investment.create({
        data: {
            amount: data.amount,
            investment_limit: data.investment_limit,
            period: data.period,
            rate_of_interest: data.rate_of_interest,
            authority_name: data.authority_name,
            organization_name: data.organization_name,
            authority_address: data.authority_address,
            investment_date: new Date(data.investment_date),
            status: 'pending' // Default to pending/active needs review
        }
    });
};
