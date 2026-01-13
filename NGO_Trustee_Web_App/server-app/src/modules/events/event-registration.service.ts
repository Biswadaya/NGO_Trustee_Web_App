import { prisma } from '../../utils/db';
import { EventRegistration } from '@prisma/client';
import { AppError } from '../../middleware/error';
import { randomInt } from 'crypto';


export const registerForEvent = async (userId: string, eventId: string) => {
    // 1. Check if event exists
    const event = await prisma.event.findUnique({
        where: { id: eventId },
    });
    if (!event) throw new AppError('Event not found', 404);

    // 2. Check if already registered
    const existing = await prisma.eventRegistration.findUnique({
        where: {
            event_id_user_id: {
                event_id: eventId,
                user_id: userId,
            },
        },
    });
    if (existing) throw new AppError('User already registered for this event', 400);

    // 3. Check capacity
    if (event.registered >= event.capacity) {
        throw new AppError('Event is fully booked', 400);
    }

    // 4. Generate Ticket ID
    const ticketId = `EVT-${new Date().getFullYear()}-${randomInt(1000, 9999)}`;

    // 5. Register User (Transaction to update event count)
    const result = await prisma.$transaction(async (tx) => {
        const registration = await tx.eventRegistration.create({
            data: {
                user_id: userId,
                event_id: eventId,
                ticket_id: ticketId,
            },
            include: {
                event: true,
                user: { select: { full_name: true, email: true } }
            }
        });

        await tx.event.update({
            where: { id: eventId },
            data: { registered: { increment: 1 } },
        });

        return registration;
    });

    return result;
};

export const getUserRegistrations = async (userId: string) => {
    return prisma.eventRegistration.findMany({
        where: { user_id: userId },
        include: {
            event: true,
        },
        orderBy: { registered_at: 'desc' },
    });
};

export const getEventRegistrations = async (eventId: string) => {
    return prisma.eventRegistration.findMany({
        where: { event_id: eventId },
        include: {
            user: {
                select: {
                    id: true,
                    full_name: true,
                    email: true,
                    role: true,
                },
            },
        },
        orderBy: { registered_at: 'desc' },
    });
};
