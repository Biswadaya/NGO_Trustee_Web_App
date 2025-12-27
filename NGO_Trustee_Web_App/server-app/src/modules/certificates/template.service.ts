import { prisma } from '../../utils/db';

export const createTemplate = async (data: any, userId: string) => {
    return prisma.certificateTemplate.create({
        data: {
            ...data,
            created_by_id: userId,
        },
    });
};

export const getTemplates = async () => {
    return prisma.certificateTemplate.findMany({
        where: { is_active: true }
    });
};
