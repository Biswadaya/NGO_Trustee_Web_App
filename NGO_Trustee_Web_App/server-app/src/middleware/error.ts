import { Request, Response, NextFunction } from 'express';
import Logger from '../utils/logger';

// Define a custom error class for operational errors
export class AppError extends Error {
    statusCode: number;
    status: string;
    isOperational: boolean;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}

const errorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    Logger.error(
        `${statusCode} - ${message} - ${req.originalUrl} - ${req.method} - ${req.ip}`
    );

    res.status(statusCode).json({
        status: err.status || 'error',
        message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    });
};

export default errorHandler;
