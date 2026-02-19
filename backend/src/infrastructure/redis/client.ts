import { createClient, RedisClientType } from "redis";
import { Env } from "../../config/env";
import logger from "../logging/logger";

let redisClient: RedisClientType | null = null;

export const getRedisClient = async (): Promise<RedisClientType | null> => {
    if (redisClient && redisClient.isOpen) {
        return redisClient;
    }

    try {
        redisClient = createClient({
            url: Env.REDIS_URL,
            socket: {
                connectTimeout: 5000,
                reconnectStrategy: false // Disable auto-reconnect
            }
        });

        redisClient.on("error", (err: Error) => {
            logger.warn("Redis client error (optional service)", { error: err.message });
        });

        redisClient.on("connect", () => {
            logger.info("Redis client connecting...");
        });

        redisClient.on("ready", () => {
            logger.info("Redis client ready");
        });

        await redisClient.connect();
        logger.info("Redis connected successfully");
        return redisClient;
    } catch (error) {
        logger.warn("Redis connection failed - continuing without cache", { 
            error: error instanceof Error ? error.message : "Unknown error" 
        });
        redisClient = null;
        return null;
    }
};

export const closeRedisClient = async (): Promise<void> => {
    if (redisClient && redisClient.isOpen) {
        await redisClient.quit();
        logger.info("Redis client disconnected");
        redisClient = null;
    }
};

export { redisClient };
