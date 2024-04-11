import Redis from 'ioredis';
import Redlock from 'redlock';
import { moduleLogger } from '@sliit-foss/module-logger';

const logger = moduleLogger('Redis');

export const redis = new Redis(process.env.REDIS_CONNECTION_STRING);

export const redlock = new Redlock([redis]);

redis.on('connect', () => logger.info('Redis connected'));
redis.on('error', (err) => logger.error(`Redis error - message: ${err.message}`, err));

redis.setKey = redis.set;

redis.set = (key, value, ttl) => redis.setKey(key, value, 'EX', ttl ?? 30);

export default { redis, redlock };
