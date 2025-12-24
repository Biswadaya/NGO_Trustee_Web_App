import { prisma } from '../../utils/db';


export const createCampaign = async (data: any, userId: string) => {
    return prisma.campaign.create({
        data: {
            ...data,
            created_by_id: userId,
        },
    });
};

export const getCampaigns = async () => {
    return prisma.campaign.findMany({
        where: { status: 'active' },
        orderBy: { created_at: 'desc' },
    });
};

export const getCampaignById = async (id: string) => {
    return prisma.campaign.findUnique({
        where: { id },
        include: { donations: true },
    });
};
