import { Request, Response, NextFunction } from 'express';
import * as AuthService from './auth.service';

export const register = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { user, token, refreshToken } = await AuthService.registerUser(
            req.body
        );

        res.status(201).json({
            status: 'success',
            token,
            refreshToken,
            data: {
                user: {
                    id: user.id,
                    email: user.email,
                    role: user.role,
                },
            },
        });
    } catch (error) {
        next(error);
    }
};

export const login = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { user, token, refreshToken } = await AuthService.loginUser(req.body);

        res.status(200).json({
            status: 'success',
            token,
            refreshToken,
            data: {
                user: {
                    id: user.id,
                    email: user.email,
                    role: user.role,
                },
            },
        });
    } catch (error) {
        next(error);
    }
};
