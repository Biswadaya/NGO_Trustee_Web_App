import { createClient } from 'redis';
import logger from './logger';

const redisUrl = process.env.REDIS_URL || 'redis://127.0.0.1:6379';

// In-memory store for fallback
const distinctStore = new Map<string, any>();

let isRedisConnected = false;

const redisClient = createClient({
    url: redisUrl,
    socket: {
        connectTimeout: 10000,
        keepAlive: 5000,

        reconnectStrategy: (retries) => {
            if (retries > 5) {
                logger.warn('Redis reconnection limit reached. Switching to In-Memory mode.');
                return false; // Stop retrying, we will handle this gracefully
            }
            return Math.min(retries * 100, 1000);
        },
        tls: redisUrl.startsWith('rediss://'),
        rejectUnauthorized: false
    }
});

redisClient.on('error', (err) => {
    // Only log if we haven't already switched to fallback mode to avoid noise
    if (isRedisConnected) {
        logger.error('Redis Client Error', err);
        isRedisConnected = false;
    }
});

redisClient.on('connect', () => {
    logger.info('Redis Client Connected');
    isRedisConnected = true;
});

// Connect immediately but don't crash if it fails
(async () => {
    try {
        await redisClient.connect();
    } catch (error) {
        logger.warn('Failed to connect to Redis. Using In-Memory Fallback for this session.');
        isRedisConnected = false;
    }
})();

// Wrapper interface to transparently switch between Redis and In-Memory
export default {
    get: async (key: string) => {
        if (isRedisConnected && redisClient.isOpen) {
            try {
                return await redisClient.get(key);
            } catch (e) { isRedisConnected = false; }
        }
        return distinctStore.get(key) || null;
    },
    set: async (key: string, value: string, options?: any) => {
        if (isRedisConnected && redisClient.isOpen) {
            try {
                return await redisClient.set(key, value, options);
            } catch (e) { isRedisConnected = false; }
        }
        distinctStore.set(key, value);
        return 'OK';
    },
    setEx: async (key: string, seconds: number, value: string) => {
        if (isRedisConnected && redisClient.isOpen) {
            try {
                return await redisClient.setEx(key, seconds, value);
            } catch (e) { isRedisConnected = false; }
        }
        distinctStore.set(key, value);
        // Simple timeout for expiry simulation
        setTimeout(() => distinctStore.delete(key), seconds * 1000);
        return 'OK';
    },
    del: async (key: string) => {
        if (isRedisConnected && redisClient.isOpen) {
            try {
                return await redisClient.del(key);
            } catch (e) { isRedisConnected = false; }
        }
        distinctStore.delete(key);
        return 1;
    },
    quit: async () => {
        if (isRedisConnected) await redisClient.quit();
    },
    on: (event: string, cb: any) => redisClient.on(event, cb)
};
