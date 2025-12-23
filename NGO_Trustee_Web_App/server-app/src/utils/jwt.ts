import jwt from 'jsonwebtoken';
import { UserRole } from '@prisma/client';

const SECRET = process.env.JWT_SECRET || 'secret';
const EXPIRES_IN = process.env.JWT_EXPIRES_IN || '15m';
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'refresh_secret';
const REFRESH_EXPIRES_IN = process.env.JWT_REFRESH_EXPIRES_IN || '7d';

export interface TokenPayload {
    userId: string;
    role: UserRole;
}

export const signToken = (payload: TokenPayload): string => {
    return jwt.sign(payload, SECRET, { expiresIn: EXPIRES_IN } as jwt.SignOptions);
};

export const signRefreshToken = (payload: TokenPayload): string => {
    return jwt.sign(payload, REFRESH_SECRET, { expiresIn: REFRESH_EXPIRES_IN } as jwt.SignOptions);
};

export const verifyToken = (token: string): TokenPayload => {
    return jwt.verify(token, SECRET) as TokenPayload;
};

export const verifyRefreshToken = (token: string): TokenPayload => {
    return jwt.verify(token, REFRESH_SECRET) as TokenPayload;
};
