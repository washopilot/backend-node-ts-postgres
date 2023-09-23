require('dotenv').config();
import { PrismaClient } from '@prisma/client';
import config from 'config';
import express, { Response } from 'express';
import redisClient from './utils/connectRedis';
import validateEnv from './utils/validateEnv';

validateEnv();

const prisma = new PrismaClient();
const app = express();

const bootstrap = async () => {
    // Testing
    app.get('/api/healtchecker', async (_, res: Response) => {
        const message = await redisClient.get('try');
        res.status(200).json({
            status: 'success',
            message
        });
    });

    const port = config.get<number>('port');
    app.listen(port, () => {
        console.log(`Server on port: ${port}`);
    });
};

bootstrap()
    .catch((err) => {
        throw err;
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
