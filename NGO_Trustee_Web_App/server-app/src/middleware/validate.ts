import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';
import { AppError } from './error';

export const validate =
    (schema: ZodSchema) =>
        async (req: Request, res: Response, next: NextFunction) => {
            try {
                await schema.parseAsync({
                    body: req.body,
                    query: req.query,
                    params: req.params,
                });
                next();
            } catch (error) {
                if (error instanceof ZodError) {
                    const errorMessages = error.errors.map((issue: any) => ({
                        field: issue.path.join('.'),
                        message: issue.message,
                    }));
                    res.status(400).json({ status: 'fail', errors: errorMessages });
                    return;
                }
                next(new AppError('Validation failed', 400));
            }
        };
