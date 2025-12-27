import { prisma } from '../../utils/db';

export const logAction = async (
    userId: string | undefined | null,
    action: string,
    entityType: string,
    entityId: string | undefined | null,
    details: any = null,
    req?: any
) => {
    try {
        const ip_address = req?.ip || req?.connection?.remoteAddress;
        const user_agent = req?.headers?.['user-agent'];

        await prisma.auditLog.create({
            data: {
                user_id: userId || null,
                action,
                entity_type: entityType,
                entity_id: entityId,
                action_details: details,
                ip_address,
                user_agent
            }
        });
    } catch (error) {
        console.error('Failed to create audit log:', error);
        // Do not throw error to avoid disrupting the main flow
    }
};
