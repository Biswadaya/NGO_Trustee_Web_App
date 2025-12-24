import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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
