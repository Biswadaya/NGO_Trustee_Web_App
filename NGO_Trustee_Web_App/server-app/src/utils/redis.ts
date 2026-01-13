import { createClient } from 'redis';
import logger from './logger';

const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';

const redisClient = createClient({
    url: redisUrl
});

redisClient.on('error', (err) => logger.error('Redis Client Error', err));
redisClient.on('connect', () => logger.info('Redis Client Connected'));

// Connect immediately
(async () => {
    try {
        await redisClient.connect();
    } catch (error) {
        logger.error('Failed to connect to Redis', error);
    }
})();

export default redisClient;
