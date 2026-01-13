import { prisma } from '../../utils/db';
import { AppError } from '../../middleware/error';
import bcrypt from 'bcryptjs';
import { logAction } from '../audit/audit.service';

// Replaces addVolunteer with a more generic createUser or adds it alongside
export const createUser = async (data: any, adminId: string) => {
    const { email, password, full_name, role, phone, skills, bio } = data;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) throw new AppError('User already exists', 400);

    const hashedPassword = await bcrypt.hash(password || 'password123', 12);

    return prisma.$transaction(async (tx) => {
        const user = await tx.user.create({
            data: {
                email,
                password_hash: hashedPassword,
                role: role || 'VOLUNTEER', // Allow role specification
                username: email.split('@')[0]
            }
        });

        // If role is VOLUNTEER, create profile
        let volunteer = null;
        if (role === 'VOLUNTEER') {
            volunteer = await tx.volunteer.create({
                data: {
                    user_id: user.id,
                    full_name: full_name || email.split('@')[0],
                    email,
                    phone,
                    skills: Array.isArray(skills) ? skills : (skills ? skills.split(',').map((s: string) => s.trim()) : []),
                    bio,
                    status: 'ACTIVE', // Admin created volunteers are active by default
                    approval_date: new Date(),
                    activated_manually: true,
                    activated_by_id: adminId
                }
            });
        }

        // Log the action
        await logAction(adminId, 'CREATE_USER', 'USER', user.id, { role, email });

        return { user, volunteer };
    });
};

export const addVolunteer = async (data: any, adminId: string) => {
    // Legacy support or alias to createUser with VOLUNTEER role
    return createUser({ ...data, role: 'VOLUNTEER' }, adminId);
};


export const getDashboardStats = async () => {
    const [
        totalVolunteers,
        pendingVolunteers,
        totalFunds,
        donationsCount,
        certificatesIssued,
        allUsers
    ] = await Promise.all([
        prisma.volunteer.count({ where: { status: 'ACTIVE' } }),
        prisma.volunteer.count({ where: { status: 'PENDING' } }),
        prisma.campaign.aggregate({ _sum: { raised_amount: true } }),
        prisma.donation.count(),
        prisma.certificate.count(),
        prisma.user.findMany({
            where: {
                role: {
                    notIn: ['ADMIN', 'SUPER_ADMIN']
                }
            },
            select: {
                id: true,
                email: true,
                role: true,
                full_name: true,
                created_at: true,
                is_active: true,
                is_blocked: true,
                volunteer_profile: {
                    select: { status: true, full_name: true }
                },
                member_profile: {
                    select: { is_paid: true, full_name: true }
                }
            },
            orderBy: { created_at: 'desc' }
        })
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
        users: allUsers,
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

    const updatedVolunteer = await prisma.volunteer.update({
        where: { id: volunteerId },
        data: { status: 'ACTIVE', approval_date: new Date(), activated_manually: true, activated_by_id: approvedById },
        include: { user: { select: { id: true, email: true, role: true } } },
    });

    await logAction(approvedById, 'APPROVE_VOLUNTEER', 'VOLUNTEER', volunteerId, null);
    return updatedVolunteer;
};

export const rejectVolunteer = async (volunteerId: string) => {
    const volunteer = await prisma.volunteer.findUnique({ where: { id: volunteerId } });
    if (!volunteer) throw new AppError('Volunteer not found', 404);
    if (volunteer.status !== 'PENDING') throw new AppError('Volunteer is not in pending status', 400);

    await logAction(null, 'REJECT_VOLUNTEER', 'VOLUNTEER', volunteerId, null);
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

    const totalRevenue = Number(aggregates._sum.amount || 0);
    const averageDonation = Number(aggregates._avg.amount || 0);

    // Mock expenses logic (e.g. 15% of revenue)
    const totalExpenses = totalRevenue * 0.15;
    const netBalance = totalRevenue - totalExpenses;

    return {
        totalDonations: totalRevenue,
        totalExpenses,
        netBalance,
        averageDonation,
        totalCampaigns
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
    // Fetch current user to get old role
    const currentUser = await prisma.user.findUnique({ where: { id: userId } });
    if (!currentUser) throw new AppError('User not found', 404);

    const oldRole = currentUser.role;

    const user = await prisma.user.update({
        where: { id: userId },
        data: { role: role as any }
    });

    await logAction(null, 'UPDATE_USER_ROLE', 'USER', userId, { oldRole, newRole: role });
    return user;
};

export const revertUserRole = async (userId: string) => {
    // Find the last role update action for this user
    const lastUpdate = await prisma.auditLog.findFirst({
        where: {
            entity_id: userId,
            action: 'UPDATE_USER_ROLE'
        },
        orderBy: { timestamp: 'desc' }
    });

    if (!lastUpdate || !lastUpdate.action_details) {
        throw new AppError('No previous role history found', 404);
    }

    const details = lastUpdate.action_details as any;
    const oldRole = details.oldRole;

    if (!oldRole) {
        throw new AppError('Previous role not recorded in history', 400);
    }

    // Revert to old role
    const user = await prisma.user.update({
        where: { id: userId },
        data: { role: oldRole }
    });

    await logAction(null, 'REVERT_USER_ROLE', 'USER', userId, { revertedTo: oldRole });
    return user;
};

export const blockUser = async (userId: string, blockedById: string, reason: string) => {
    const user = await prisma.user.update({
        where: { id: userId },
        data: { is_blocked: true, blocked_by_id: blockedById, blocked_reason: reason, blocked_at: new Date() }
    });
    await logAction(blockedById, 'BLOCK_USER', 'USER', userId, { reason });
    return user;
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

export const listUsers = async (limit?: number) => {
    return prisma.user.findMany({
        ...(limit ? { take: limit } : {}),
        where: {
            role: {
                notIn: ['ADMIN', 'SUPER_ADMIN']
            }
        },
        select: {
            id: true,
            email: true,
            role: true,
            full_name: true,
            is_active: true,
            is_blocked: true,
            created_at: true,
            username: true,
            volunteer_profile: {
                select: {
                    id: true,
                    full_name: true,
                    phone: true,
                    status: true
                }
            },
            member_profile: {
                select: {
                    id: true,
                    full_name: true,
                    phone: true,
                    is_paid: true,
                    membership_fee: true
                }
            }
        },
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
// Event management (using dedicated Event model)
export const createEvent = async (data: any, publishedById: string) => {
    const event = await prisma.event.create({
        data: {
            title: data.title,
            description: data.description || data.content, // Handle legacy content field
            date: new Date(data.date || data.expiry_date), // Handle legacy expiry_date
            time: data.time,
            location: data.location,
            category: data.category,
            capacity: data.capacity ? Number(data.capacity) : 100,
            is_free: data.is_free !== undefined ? data.is_free : true,
            image_url: data.image_url || data.attachments, // Mapping attachments to image_url if string
            attachments: data.attachments, // Keep compatibility
            created_by_id: publishedById
        }
    });

    await logAction(publishedById, 'CREATE_EVENT', 'EVENT', event.id, { title: event.title });
    return event;
};

export const updateEvent = async (id: string, data: any) => {
    return prisma.event.update({
        where: { id },
        data: {
            title: data.title,
            description: data.description || data.content,
            date: data.date ? new Date(data.date) : undefined,
            time: data.time,
            location: data.location,
            category: data.category,
            capacity: data.capacity ? Number(data.capacity) : undefined,
            is_free: data.is_free,
            image_url: data.image_url,
            attachments: data.attachments
        }
    });
};

export const getEvent = async (id: string) => {
    const event = await prisma.event.findUnique({
        where: { id },
        include: { created_by: { select: { email: true, role: true } } }
    });

    if (!event) throw new AppError('Event not found', 404);
    return event;
};

export const deleteEvent = async (id: string) => {
    // Delete validation could be added here
    return prisma.event.delete({ where: { id } });
};

export const getPublicEvents = async () => {
    return prisma.event.findMany({
        orderBy: { date: 'asc' }, // Sort by upcoming dates usually
        include: { created_by: { select: { email: true, role: true } } }
    });
};
