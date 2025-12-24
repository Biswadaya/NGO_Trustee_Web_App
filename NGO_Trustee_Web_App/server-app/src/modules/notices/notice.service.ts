import { PrismaClient, Notice } from '@prisma/client';

const prisma = new PrismaClient();

export const createNotice = async (data: any, userId: string) => {
    return prisma.notice.create({
        data: {
            ...data,
            published_by_id: userId,
            published_at: new Date(),
        },
    });
};

export const getNotices = async (targetAudience?: string) => {
    const where: any = { is_active: true };

    // Logic: 
    // Public can see 'public'
    // Volunteers can see 'public' + 'volunteers'
    // Donors can see 'public' + 'donors'

    if (targetAudience) {
        if (targetAudience === 'VOLUNTEER') {
            where.target_audience = { in: ['public', 'volunteers'] };
        } else if (targetAudience === 'DONOR') {
            where.target_audience = { in: ['public', 'donors'] };
        } else {
            where.target_audience = 'public';
        }
    } else {
        // Admin sees all? Or default to public?
        // Let's assume this is the public list endpoint
        where.target_audience = 'public';
    }

    return prisma.notice.findMany({
        where,
        orderBy: { published_at: 'desc' },
        include: {
            published_by: {
                select: {
                    email: true,
                    volunteer_profile: { select: { full_name: true } }
                }
            }
        }
        // Actually User doesn't have full_name directly in schema, it's in Volunteer. 
        // Schema was: User -> Volunteer (full_name).
        // Let's adjust include if necessary or just return user details.
    });
};

export const getAllNoticesAdmin = async () => {
    return prisma.notice.findMany({
        orderBy: { created_at: 'desc' },
        include: { published_by: true }
    });
};
