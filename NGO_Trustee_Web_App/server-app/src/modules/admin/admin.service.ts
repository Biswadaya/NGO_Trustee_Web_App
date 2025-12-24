import { prisma } from '../../utils/db';
import { AppError } from '../../middleware/error';


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
        // Add activity log summary needed
        recentActivity: [], // Placeholder
    };
};

export const getPendingVolunteers = async () => {
    const volunteers = await prisma.volunteer.findMany({
        where: { status: 'PENDING' },
        include: {
            user: {
                select: {
                    id: true,
                    email: true,
                    role: true,
                    created_at: true,
                },
            },
        },
        orderBy: { created_at: 'desc' },
    });

    return volunteers;
};

export const approveVolunteer = async (volunteerId: string, approvedById: string) => {
    const volunteer = await prisma.volunteer.findUnique({
        where: { id: volunteerId },
    });

    if (!volunteer) {
        throw new AppError('Volunteer not found', 404);
    }

    if (volunteer.status !== 'PENDING') {
        throw new AppError('Volunteer is not in pending status', 400);
    }

    const updatedVolunteer = await prisma.volunteer.update({
        where: { id: volunteerId },
        data: {
            status: 'ACTIVE',
            approval_date: new Date(),
            activated_manually: true,
            activated_by_id: approvedById,
        },
        include: {
            user: {
                select: {
                    id: true,
                    email: true,
                    role: true,
                },
            },
        },
    });

    return updatedVolunteer;
};

export const rejectVolunteer = async (volunteerId: string) => {
    const volunteer = await prisma.volunteer.findUnique({
        where: { id: volunteerId },
    });

    if (!volunteer) {
        throw new AppError('Volunteer not found', 404);
    }

    if (volunteer.status !== 'PENDING') {
        throw new AppError('Volunteer is not in pending status', 400);
    }

    const updatedVolunteer = await prisma.volunteer.update({
        where: { id: volunteerId },
        data: {
            status: 'INACTIVE',
        },
    });

    return updatedVolunteer;
};

