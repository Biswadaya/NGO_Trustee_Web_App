import app from './app';
import Logger from './utils/logger';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const PORT = process.env.PORT || 3000;
const prisma = new PrismaClient();

const startServer = async () => {
    try {
        // Attempt to connect to DB
        // await prisma.$connect(); // Cannot connect without running DB, skipping explicit connect in MVP init
        // Logger.info('Database connected successfully');

        app.listen(PORT, () => {
            Logger.info(`Server is running @ http://localhost:${PORT}`);
        });
    } catch (error) {
        Logger.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();
