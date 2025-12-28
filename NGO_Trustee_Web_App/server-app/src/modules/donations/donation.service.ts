import { prisma } from '../../utils/db';


import * as CertificateService from '../certificates/certificate.service';

export const createDonation = async (data: any) => {
    // Logic to process payment would go here (Stripe)
    // For MVP, we record the transaction directly

    const donation = await prisma.donation.create({
        data: {
            ...data,
            status: 'completed',
            // If payment gateway was used, we'd store transaction_id here
            transaction_id: `TXN-${Date.now()}`
        },
    });

    // Auto-generate certificate if user is authenticated
    if (donation.user_id) {
        try {
            await CertificateService.generateForDonation(donation.id);
        } catch (error) {
            console.error('Failed to generate certificate:', error);
            // Don't fail the donation if certificate fails
        }
    }

    return donation;
};

export const getDonations = async () => {
    return prisma.donation.findMany({
        orderBy: { created_at: 'desc' },
        include: { campaign: true, user: true }
    });
};

export const getDonationById = async (id: string) => {
    const donation = await prisma.donation.findUnique({
        where: { id },
        include: {
            campaign: true,
            user: true,
            certificate: true
        }
    });

    if (!donation) {
        throw new Error('Donation not found');
    }

    return donation;
};

export const getDonationByTransactionId = async (transactionId: string) => {
    const donation = await prisma.donation.findUnique({
        where: { transaction_id: transactionId },
        include: {
            campaign: true,
            user: true,
            certificate: true
        }
    });

    if (!donation) {
        throw new Error('Donation not found');
    }

    return donation;
};

export const getDonationStats = async () => {
    const [totalDonations, totalAmount, byCampaign, byMonth] = await Promise.all([
        prisma.donation.count(),
        prisma.donation.aggregate({
            _sum: { amount: true },
            _avg: { amount: true },
            _max: { amount: true }
        }),
        prisma.donation.groupBy({
            by: ['campaign_id'],
            _sum: { amount: true },
            _count: true
        }),
        prisma.donation.groupBy({
            by: ['created_at'],
            _sum: { amount: true },
            _count: true
        })
    ]);

    return {
        totalDonations,
        totalAmount: totalAmount._sum.amount || 0,
        averageAmount: totalAmount._avg.amount || 0,
        largestDonation: totalAmount._max.amount || 0,
        byCampaign: byCampaign.map(c => ({
            campaignId: c.campaign_id,
            totalAmount: c._sum.amount || 0,
            count: c._count
        })),
        byMonth: byMonth.map(m => ({
            month: m.created_at,
            totalAmount: m._sum.amount || 0,
            count: m._count
        }))
    };
};

export const getMyDonations = async (userId: string) => {
    return prisma.donation.findMany({
        where: { user_id: userId },
        orderBy: { created_at: 'desc' },
        include: { campaign: true }
    });
};

