import { prisma } from '../../utils/db';


export const sendMessage = async (data: any, senderId: string) => {
    const { recipient_type, recipient_id, subject, message, priority } = data;

    const msg = await prisma.message.create({
        data: {
            sender_id: senderId,
            recipient_type,
            subject,
            message,
            priority,
        },
    });

    // Handle recipients logic (Broadcast vs Individual)
    if (recipient_type === 'individual' && recipient_id) {
        await prisma.messageRecipient.create({
            data: {
                message_id: msg.id,
                recipient_id: recipient_id,
            },
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
