import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getDashboardStats = async () => {
    const [
        totalVolunteers,
        pendingVolunteers,
        totalFunds,
        donationsCount,
        certificatesIssued
    ] = await Promise.all([
        prisma.volunteer.count({ where: { status: 'ACTIVE' } }),
        prisma.volunteer.count({ where: { status: 'PENDING' } }),
        prisma.campaign.aggregate({ _sum: { raised_amount: true } }),
        prisma.donation.count(),
        prisma.certificate.count()
    ]);

    return {
        volunteers: {
            active: totalVolunteers,
            pending: pendingVolunteers,
        },
        funds: {
            total: totalFunds._sum.raised_amount || 0,
            donations: donationsCount,
        },
        certificates: {
            total: certificatesIssued,
        },
        // Add activity log summary needed
        recentActivity: [], // Placeholder
    };
};
