import 'reflect-metadata';
import dotenv from 'dotenv';
dotenv.config();

import app from './app';
import Logger from './utils/logger';
import { prisma } from './utils/db';

const PORT = process.env.PORT || 5000;


const startServer = async () => {
    try {
        await prisma.$connect();
        Logger.info('Database connected successfully');

        const server = app.listen(PORT, () => {
            Logger.info(`Server is running @ http://localhost:${PORT}`);
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
