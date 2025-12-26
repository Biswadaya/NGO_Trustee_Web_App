import { prisma } from '../../utils/db';

export const sendMessage = async (data: any, senderId: string) => {
    const { recipient_type, recipient_id, subject, message, priority } = data;

    const msg = await prisma.message.create({
        data: { sender_id: senderId, recipient_type, subject, message, priority },
    });

    // Handle recipients logic (Broadcast vs Individual)
    if (recipient_type === 'individual' && recipient_id) {
        await prisma.messageRecipient.create({
            data: { message_id: msg.id, recipient_id: recipient_id },
        });
    } else if (recipient_type === 'all_volunteers') {
        const volunteers = await prisma.user.findMany({ where: { role: 'VOLUNTEER' } });
        const recipients = volunteers.map(v => ({ message_id: msg.id, recipient_id: v.id }));
        if (recipients.length > 0) {
            await prisma.messageRecipient.createMany({ data: recipients });
        }
    }

    return msg;
};

export const getMyMessages = async (userId: string) => {
    return prisma.messageRecipient.findMany({
        where: { recipient_id: userId },
        include: { message: { include: { sender: { select: { email: true } } } } },
        orderBy: { created_at: 'desc' },
    });
};

export const getMessage = async (messageId: string, userId: string) => {
    return prisma.messageRecipient.findFirst({
        where: { message_id: messageId, recipient_id: userId },
        include: { message: { include: { sender: { select: { email: true } } } } }
    });
};

export const markAsRead = async (messageId: string, userId: string) => {
    const recipient = await prisma.messageRecipient.findFirst({
        where: { message_id: messageId, recipient_id: userId }
    });

    if (!recipient) throw new Error('Message not found');

    return prisma.messageRecipient.update({
        where: { id: recipient.id },
        data: { is_read: true, read_at: new Date() }
    });
};

export const getMessageHistory = async () => {
    return prisma.message.findMany({
        orderBy: { created_at: 'desc' },
        include: { sender: { select: { email: true } }, recipients: true }
    });
};

export const deleteMessage = async (messageId: string) => {
    await prisma.messageRecipient.deleteMany({ where: { message_id: messageId } });
    return prisma.message.delete({ where: { id: messageId } });
};

export const getReadStats = async () => {
    const totalMessages = await prisma.messageRecipient.count();
    const readMessages = await prisma.messageRecipient.count({ where: { is_read: true } });

    return {
        total: totalMessages,
        read: readMessages,
        unread: totalMessages - readMessages,
        readPercentage: totalMessages > 0 ? (readMessages / totalMessages) * 100 : 0
    };
};

export const getUnreadStats = async (userId?: string) => {
    if (userId) {
        return prisma.messageRecipient.count({
            where: { recipient_id: userId, is_read: false }
        });
    }

    return prisma.messageRecipient.count({ where: { is_read: false } });
};
