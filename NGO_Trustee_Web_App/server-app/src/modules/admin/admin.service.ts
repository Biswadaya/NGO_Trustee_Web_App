import { prisma } from '../../utils/db';
import { AppError } from '../../middleware/error';
import bcrypt from 'bcryptjs';

export const addVolunteer = async (data: any, adminId: string) => {
    const { email, password, full_name, phone, skills, bio } = data;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) throw new AppError('User already exists', 400);

    const hashedPassword = await bcrypt.hash(password || 'password123', 12);

    return prisma.$transaction(async (tx) => {
        const user = await tx.user.create({
            data: {
                email,
                password_hash: hashedPassword,
                role: 'VOLUNTEER',
                username: email.split('@')[0]
            }
        });

        const volunteer = await tx.volunteer.create({
            data: {
                user_id: user.id,
                full_name,
                email,
                phone,
                skills: Array.isArray(skills) ? skills : (skills ? skills.split(',').map((s: string) => s.trim()) : []),
                bio,
                status: 'ACTIVE',
                approval_date: new Date(),
                activated_manually: true,
                activated_by_id: adminId
            }
        });

        return { user, volunteer };
    });
};


export const getDashboardStats = async () => {
    const [
        totalVolunteers,
        pendingVolunteers,
        totalFunds,
        donationsCount,
        certificatesIssued
    ] = await Promise.all([
        prisma.volunteer.count({ where: { status: 'ACTIVE' } }),
        prisma.volunteer.count({ where: { status: 'PENDING' } }),
        prisma.campaign.aggregate({ _sum: { raised_amount: true } }),
        prisma.donation.count(),
        prisma.certificate.count()
    ]);

    return {
        volunteers: {
            active: totalVolunteers,
            pending: pendingVolunteers,
        },
        funds: {
            total: totalFunds._sum.raised_amount || 0,
            donations: donationsCount,
        },
        certificates: {
            total: certificatesIssued,
        },
        recentActivity: [],
    };
};

export const getPendingVolunteers = async () => {
    return prisma.volunteer.findMany({
        where: { status: 'PENDING' },
        include: { user: { select: { id: true, email: true, role: true, created_at: true } } },
        orderBy: { created_at: 'desc' },
    });
};

export const approveVolunteer = async (volunteerId: string, approvedById: string) => {
    const volunteer = await prisma.volunteer.findUnique({ where: { id: volunteerId } });
    if (!volunteer) throw new AppError('Volunteer not found', 404);
    if (volunteer.status !== 'PENDING') throw new AppError('Volunteer is not in pending status', 400);

    return prisma.volunteer.update({
        where: { id: volunteerId },
        data: { status: 'ACTIVE', approval_date: new Date(), activated_manually: true, activated_by_id: approvedById },
        include: { user: { select: { id: true, email: true, role: true } } },
    });
};

export const rejectVolunteer = async (volunteerId: string) => {
    const volunteer = await prisma.volunteer.findUnique({ where: { id: volunteerId } });
    if (!volunteer) throw new AppError('Volunteer not found', 404);
    if (volunteer.status !== 'PENDING') throw new AppError('Volunteer is not in pending status', 400);

    return prisma.volunteer.update({
        where: { id: volunteerId },
        data: { status: 'INACTIVE' },
    });
};

// NEW ADMIN ENDPOINTS
export const getFundsSummary = async () => {
    const [totalDonations, totalCampaigns, aggregates] = await Promise.all([
        prisma.donation.count(),
        prisma.campaign.count(),
        prisma.donation.aggregate({ _sum: { amount: true }, _avg: { amount: true } })
    ]);

    return {
        totalDonations,
        totalCampaigns,
        totalAmount: aggregates._sum.amount || 0,
        averageAmount: aggregates._avg.amount || 0
    };
};

export const getExpenses = async () => {
    // Placeholder - implement based on actual expense tracking logic
    return {
        totalExpenses: 0,
        categories: [],
        message: 'Expense tracking not yet implemented'
    };
};

export const getVolunteerStats = async () => {
    const [total, active, pending, inactive, blocked] = await Promise.all([
        prisma.volunteer.count(),
        prisma.volunteer.count({ where: { status: 'ACTIVE' } }),
        prisma.volunteer.count({ where: { status: 'PENDING' } }),
        prisma.volunteer.count({ where: { status: 'INACTIVE' } }),
        prisma.volunteer.count({ where: { status: 'BLOCKED' } })
    ]);

    return { total, active, pending, inactive, blocked };
};

export const getUnpaidVolunteers = async () => {
    return prisma.volunteer.findMany({
        where: { membership_status: 'UNPAID' },
        select: { id: true, full_name: true, email: true, created_at: true }
    });
};

export const getVolunteerPaymentStats = async (id: string) => {
    const volunteer = await prisma.volunteer.findUnique({
        where: { id },
        select: { membership_status: true, membership_amount: true, membership_paid_date: true }
    });

    if (!volunteer) throw new AppError('Volunteer not found', 404);
    return volunteer;
};

export const updateUserRole = async (userId: string, role: string) => {
    return prisma.user.update({
        where: { id: userId },
        data: { role: role as any }
    });
};

export const blockUser = async (userId: string, blockedById: string, reason: string) => {
    return prisma.user.update({
        where: { id: userId },
        data: { is_blocked: true, blocked_by_id: blockedById, blocked_reason: reason, blocked_at: new Date() }
    });
};

export const unblockUser = async (userId: string) => {
    return prisma.user.update({
        where: { id: userId },
        data: { is_blocked: false, blocked_by_id: null, blocked_reason: null, blocked_at: null }
    });
};

export const getBlockedUsers = async () => {
    return prisma.user.findMany({
        where: { is_blocked: true },
        select: { id: true, email: true, role: true, blocked_reason: true, blocked_at: true }
    });
};

export const listUsers = async (limit: number = 100) => {
    return prisma.user.findMany({
        take: limit,
        select: { id: true, email: true, role: true, is_blocked: true, created_at: true, username: true },
        orderBy: { created_at: 'desc' }
    });
};

export const getAuditLogs = async (limit: number = 50) => {
    return prisma.auditLog.findMany({
        take: limit,
        orderBy: { timestamp: 'desc' },
        include: { user: { select: { email: true, role: true } } }
    });
};

// Event management (using Notice model with event type)
export const createEvent = async (data: any, publishedById: string) => {
    return prisma.notice.create({
        data: {
            title: data.title,
            content: data.content,
            notice_type: 'event',
            target_audience: data.target_audience || 'public',
            attachments: data.attachments,
            expiry_date: data.expiry_date,
            published_by_id: publishedById
        }
    });
};

export const updateEvent = async (id: string, data: any) => {
    return prisma.notice.update({
        where: { id },
        data: {
            title: data.title,
            content: data.content,
            target_audience: data.target_audience,
            attachments: data.attachments,
            expiry_date: data.expiry_date
        }
    });
};

export const getEvent = async (id: string) => {
    const event = await prisma.notice.findUnique({
        where: { id },
        include: { published_by: { select: { email: true, role: true } } }
    });

    if (!event) throw new AppError('Event not found', 404);
    return event;
};

export const deleteEvent = async (id: string) => {
    return prisma.notice.delete({ where: { id } });
};
