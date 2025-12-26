import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createReport = async (data: any, userId: string) => {
    return prisma.transparencyReport.create({
        data: {
            ...data,
            published_by_id: userId,
            published_at: new Date(),
        },
    });
};

export const getReports = async () => {
    return prisma.transparencyReport.findMany({
        orderBy: { published_at: 'desc' },
    });
};

export const getCertifications = async () => {
    // In a real app, these might come from a specific database table or external source
    // For now, returning mock data or filtering transparency reports of type 'certification'
    return prisma.transparencyReport.findMany({
        where: { report_type: 'certification' },
        orderBy: { published_at: 'desc' },
    });
};

export const getFinancialBreakdown = async () => {
    const [donations, campaigns] = await Promise.all([
        prisma.donation.findMany({
            select: { amount: true, created_at: true }
        }),
        prisma.campaign.findMany({
            select: { title: true, goal_amount: true, raised_amount: true }
        })
    ]);

    const totalDonations = donations.reduce((sum, d) => sum + Number(d.amount), 0);
    const totalRaised = campaigns.reduce((sum, c) => sum + Number(c.raised_amount), 0);

    return {
        overall: {
            totalDonationsRequested: totalRaised,
            totalDonationsReceived: totalDonations,
            campaignCount: campaigns.length,
        },
        campaigns: campaigns.map(c => ({
            title: c.title,
            percentage: (Number(c.raised_amount) / Number(c.goal_amount)) * 100
        }))
    };
};

