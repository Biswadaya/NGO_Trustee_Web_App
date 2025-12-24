import { prisma } from '../../utils/db';


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

    // Auto-generate certificate (Async trigger)
    // In a real app, this might be a queue job
    // await CertificateService.generateForDonation(donation.id);

    return donation;
};

export const getDonations = async () => {
    return prisma.donation.findMany({
        orderBy: { created_at: 'desc' },
        include: { campaign: true, user: true }
    });
};
