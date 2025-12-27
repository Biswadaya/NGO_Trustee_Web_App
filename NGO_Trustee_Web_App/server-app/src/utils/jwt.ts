import jwt from 'jsonwebtoken';
import { UserRole } from '@prisma/client';

const getSecret = () => process.env.JWT_SECRET || 'secret';
const getRefreshSecret = () => process.env.JWT_REFRESH_SECRET || 'refresh_secret';

const EXPIRES_IN = process.env.JWT_EXPIRES_IN || '24h';
const REFRESH_EXPIRES_IN = process.env.JWT_REFRESH_EXPIRES_IN || '7d';

export interface TokenPayload {
    userId: string;
    role: UserRole;
}

export const signToken = (payload: TokenPayload): string => {
    return jwt.sign(payload, getSecret(), { expiresIn: EXPIRES_IN } as jwt.SignOptions);
};

export const signRefreshToken = (payload: TokenPayload): string => {
    return jwt.sign(payload, getRefreshSecret(), { expiresIn: REFRESH_EXPIRES_IN } as jwt.SignOptions);
};

export const verifyToken = (token: string): TokenPayload => {
    return jwt.verify(token, getSecret()) as TokenPayload;
};

export const verifyRefreshToken = (token: string): TokenPayload => {
    return jwt.verify(token, getRefreshSecret()) as TokenPayload;
};
