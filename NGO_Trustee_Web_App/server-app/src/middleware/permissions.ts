import { Request, Response, NextFunction } from 'express';
import { PrismaClient, UserRole } from '@prisma/client';
import { AppError } from './error';
import { AuthRequest } from './auth';

const prisma = new PrismaClient();

// Define keys that match the ManagerPermission model boolean fields
export type ManagerPermissionKey =
    | 'can_add_volunteers'
    | 'can_delete_volunteers'
    | 'can_block_users'
    | 'can_view_transactions'
    | 'can_view_receipts'
    | 'can_generate_certificates'
    | 'can_send_messages'
    | 'can_create_campaigns'
    | 'can_edit_notices'
    | 'can_approve_volunteers';

export const checkPermission = (permission: ManagerPermissionKey) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const user = (req as AuthRequest).user;

        if (!user) {
            return next(new AppError('Not authorized', 401));
        }

        // Super Admin/Admin usually have all permissions, but spec says "Granular Manager Permissions"
        // Let's assume SuperAdmin/Admin bypass this check or we explicitly check against roles.
        if (user.role === UserRole.SUPER_ADMIN || user.role === UserRole.ADMIN) {
            return next();
        }

        if (user.role !== UserRole.MANAGER) {
            return next(new AppError('Permission denied. Managers only.', 403));
        }

        // Check specific permission for Manager
        const permissions = await prisma.managerPermission.findUnique({
            where: { user_id: user.userId },
        });

        if (!permissions || !permissions[permission]) {
            return next(new AppError(`Insufficient permission: ${permission} required`, 403));
        }

        next();
    };
};
