import { PrismaClient, Notice } from '@prisma/client';

const prisma = new PrismaClient();

export const createNotice = async (data: any, userId: string) => {
    return prisma.notice.create({
        data: { ...data, published_by_id: userId, published_at: new Date() },
    });
};

export const getNotices = async (targetAudience?: string) => {
    const where: any = { is_active: true };

    if (targetAudience) {
        if (targetAudience === 'VOLUNTEER') {
            where.target_audience = { in: ['public', 'volunteers'] };
        } else if (targetAudience === 'DONOR') {
            where.target_audience = { in: ['public', 'donors'] };
        } else {
            where.target_audience = 'public';
        }
    } else {
        where.target_audience = 'public';
    }

    return prisma.notice.findMany({
        where,
        orderBy: { published_at: 'desc' },
        include: { published_by: { select: { email: true, volunteer_profile: { select: { full_name: true } } } } }
    });
};

export const getAllNoticesAdmin = async () => {
    return prisma.notice.findMany({
        orderBy: { created_at: 'desc' },
        include: { published_by: true }
    });
};

export const updateNotice = async (id: string, data: any) => {
    return prisma.notice.update({
        where: { id },
        data: { title: data.title, content: data.content, notice_type: data.notice_type, target_audience: data.target_audience, attachments: data.attachments, expiry_date: data.expiry_date }
    });
};

export const deleteNotice = async (id: string) => {
    return prisma.notice.delete({ where: { id } });
};
