import { Request, Response, NextFunction } from 'express';
import { UserRole } from '@prisma/client';
import { AppError } from './error';

export interface AuthRequest extends Request {
    user?: {
        userId: string;
        role: UserRole;
    };
}

export const protect = (req: Request, res: Response, next: NextFunction) => {
    // We'll implement token extraction here directly or use a separate function
    // For MVP speed, let's extract here
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return next(new AppError('Not authorized', 401));
    }

    // Verification happens in the router or a separate middleware usually
    // But let's assume valid token for now as we just need the shell
    // We need to actually verify it
    try {
        const { verifyToken } = require('../utils/jwt'); // Late import to avoid circular dependency issues if any
        const decoded = verifyToken(token);
        (req as AuthRequest).user = decoded;
        next();
    } catch (err) {
        return next(new AppError('Invalid token', 401));
    }
};

export const restrictTo = (...roles: UserRole[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const user = (req as AuthRequest).user;
        console.log(`[Auth Debug] Checking permission for ${user?.userId} (${user?.role})`);
        console.log(`[Auth Debug] Required roles: ${roles.join(', ')}`);

        if (!user || !roles.includes(user.role)) {
            console.log(`[Auth Debug] Access Denied!`);
            return next(new AppError('You do not have permission to perform this action', 403));
        }
        next();
    };
};
