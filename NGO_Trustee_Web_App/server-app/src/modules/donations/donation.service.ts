import { prisma } from '../../utils/db';


import * as CertificateService from '../certificates/certificate.service';

export const createDonation = async (data: any) => {
    const { campaign_id, amount, user_id } = data;

    return prisma.$transaction(async (tx) => {
        let validUserId = user_id;

        // Validate user existence if user_id is provided
        if (validUserId) {
            const userExists = await tx.user.findUnique({ where: { id: validUserId } });
            console.log(`[DEBUG] Validating User ID ${validUserId}: ${userExists ? 'Found' : 'Not Found'}`);
            if (!userExists) {
                console.warn(`Donation attempt with invalid User ID: ${validUserId}. Proceeding as guest donation.`);
                validUserId = null;
            }
        }

        const donation = await tx.donation.create({
            data: {
                ...data,
                user_id: validUserId, // Use validated (or nullified) ID
                status: 'completed', // Assuming we only call this after verification
            },
        });

        // Update campaign raised amount if applicable
        if (campaign_id) {
            await tx.campaign.update({
                where: { id: campaign_id },
                data: {
                    raised_amount: {
                        increment: Number(amount)
                    }
                }
            });
        }

        // Auto-generate certificate for both authenticated and guest users
        if (donation.user_id || donation.donor_email || donation.donor_name) {
            try {
                // Note: CertificateService might need to be adjusted to accept tx or we handle outside
                // For now, we keep it as is, but ideally it should be part of the transaction or safe to fail
                await CertificateService.generateForDonation(donation.id);
            } catch (error) {
                console.error('Failed to generate certificate:', error);
            }
        }

        return donation;
    });
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
    // 1. Fetch Donations
    const donations = await prisma.donation.findMany({
        where: { user_id: userId },
        orderBy: { created_at: 'desc' },
        include: { campaign: true }
    });

    // 2. Fetch Membership Payments
    const memberProfile = await prisma.memberProfile.findUnique({
        where: { user_id: userId },
        include: { payments: true }
    });

    const membershipPayments = memberProfile?.payments || [];

    // 3. Map Membership Payments
    const formattedMembershipPayments = membershipPayments.map(payment => ({
        id: payment.id,
        transaction_id: `MEM-${payment.id.split('-')[0].toUpperCase()}`, // Generate a readable ID
        created_at: payment.payment_date,
        amount: payment.amount,
        status: payment.status,
        currency: 'INR',
        campaign: {
            title: `Membership Fee (${payment.payment_year || new Date(payment.payment_date).getFullYear()})`
        },
        // Donation specific fields for compatibility
        is_anonymous: false,
        tax_exemption_claimed: false,
    }));

    // 4. Combine and Sort
    const allTransactions = [...donations, ...formattedMembershipPayments].sort((a, b) => {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });

    return allTransactions;
};

