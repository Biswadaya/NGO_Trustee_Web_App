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
