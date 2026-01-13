import 'dotenv/config';
import { createClient } from 'redis';

const testRedis = async () => {
    const redisUrl = process.env.REDIS_URL;
    console.log('Testing Redis connection...');
    console.log(`URL provided: ${redisUrl ? 'Yes (Hidden)' : 'No'}`);

    if (!redisUrl) {
        console.error('ERROR: REDIS_URL is not defined in .env');
        return;
    }

    const client = createClient({
        url: redisUrl,
        socket: {
            // Force IPv4 if IPv6 is causing issues
            family: 4,
            connectTimeout: 10000,
            tls: redisUrl.startsWith('rediss://'),
            rejectUnauthorized: false
        }
    });

    client.on('error', (err) => console.error('Redis Client Error:', err));
    client.on('connect', () => console.log('Redis Client Connected!'));
    client.on('ready', () => console.log('Redis Client Ready!'));
    client.on('end', () => console.log('Redis Client Disconnected'));

    try {
        console.log('Attempting to connect...');
        await client.connect();

        console.log('Pinging Redis...');
        const result = await client.ping();
        console.log(`Ping result: ${result}`);

        await client.quit();
        console.log('Test completed successfully.');
    } catch (error) {
        console.error('Connection failed:', error);
    }
};

testRedis();
