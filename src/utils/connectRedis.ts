import { createClient } from 'redis';

const redisUrl = 'redis://localhost:6379';

const redisClient = createClient({
    url: redisUrl
});

const connectRedis = async () => {
    try {
        await redisClient.connect();
        console.log('Redis client connect successfully');
        await redisClient.set('try', 'Welcome to Express and TypeScript with Prisma');
    } catch (error) {
        console.log(error);
        setTimeout(connectRedis, 5000);
    }
};

connectRedis();

export default redisClient;
