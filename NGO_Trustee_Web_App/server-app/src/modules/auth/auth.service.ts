import { User, Volunteer, UserRole } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { AppError } from '../../middleware/error';
import { signToken, signRefreshToken } from '../../utils/jwt';
import { prisma } from '../../utils/db';


export const registerUser = async (data: {
    email: string;
    password: string;
    full_name: string;
}) => {
    const { email, password, full_name } = data;

    const existingUser = await prisma.user.findUnique({
        where: { email },
    });

    if (existingUser) {
        throw new AppError('User already exists', 400);
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    // Transaction to create User and Volunteer profile together
    const result = await prisma.$transaction(async (tx) => {
        const newUser = await tx.user.create({
            data: {
                email,
                password_hash: hashedPassword,
                role: UserRole.VOLUNTEER, // Default role
            },
        });

        const volunteer = await tx.volunteer.create({
            data: {
                user_id: newUser.id,
                email: newUser.email,
                full_name,
                status: 'PENDING',
                skills: [],
            },
        });

        const token = signToken({ userId: newUser.id, role: newUser.role });
        const refreshToken = signRefreshToken({ userId: newUser.id, role: newUser.role });

        return { user: { ...newUser, status: volunteer.status }, token, refreshToken };
    });

    return result;
};

export const loginUser = async (data: { email: string; password: string }) => {
    const { email, password } = data;

    const user = await prisma.user.findUnique({
        where: { email },
    });

    if (!user || !(await bcrypt.compare(password, user.password_hash))) {
        throw new AppError('Invalid email or password', 401);
    }

    if (user.is_blocked) {
        throw new AppError(`Account blocked: ${user.blocked_reason}`, 403);
    }

    let status = 'ACTIVE';
    if (user.role === UserRole.VOLUNTEER) {
        const volunteer = await prisma.volunteer.findFirst({
            where: { user_id: user.id },
            select: { status: true }
        });
        status = volunteer?.status || 'PENDING';
    }

    const token = signToken({ userId: user.id, role: user.role });
    const refreshToken = signRefreshToken({ userId: user.id, role: user.role });

    return {
        user: { ...user, status },
        token,
        refreshToken
    };
};
