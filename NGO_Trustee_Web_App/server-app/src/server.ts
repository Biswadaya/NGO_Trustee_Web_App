import 'reflect-metadata';
import dotenv from 'dotenv';
dotenv.config();

import app from './app';
import Logger from './utils/logger';
import { prisma } from './utils/db';

const PORT = process.env.PORT || 5000;


const startServer = async () => {
    try {
        Logger.info(`Attempting database connection... (URL defined: ${!!process.env.DATABASE_URL})`);
        // Log masked URL for debugging (safe to show)
        if (process.env.DATABASE_URL) {
            const masked = process.env.DATABASE_URL.replace(/:[^:@]*@/, ':****@');
            Logger.info(`Connecting to: ${masked}`);
        } else {
            Logger.error('DATABASE_URL is NOT defined!');
        }

        Logger.info(`BREVO_API_KEY status: ${process.env.BREVO_API_KEY ? 'Present, Length: ' + process.env.BREVO_API_KEY.length : 'MISSING'}`);
        if (process.env.BREVO_API_KEY && process.env.BREVO_API_KEY.length > 5) {
            Logger.info(`BREVO_API_KEY prefix: ${process.env.BREVO_API_KEY.substring(0, 5)}...`);
        }

        Logger.info(`RAZORPAY_KEY_ID status: ${process.env.RAZORPAY_KEY_ID ? 'Present' : 'MISSING'}`);

        await prisma.$connect();
        Logger.info('Database connected successfully');

        const server = app.listen(Number(PORT), '0.0.0.0', () => {
            Logger.info(`Server is running @ http://0.0.0.0:${PORT}`);
        });

        // Graceful shutdown logic
        const shutdown = async () => {
            Logger.info('Shutting down server...');
            server.close(async () => {
                Logger.info('HTTP server closed');
                await prisma.$disconnect();
                Logger.info('Database disconnected');
                process.exit(0);
            });
        };

        process.on('SIGINT', shutdown);
        process.on('SIGTERM', shutdown);

    } catch (error) {
        Logger.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();
