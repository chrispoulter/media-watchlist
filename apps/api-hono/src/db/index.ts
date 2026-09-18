import { sql } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { getLogger } from '@logtape/logtape';
import { config } from '../lib/config.js';
import type { HealthStatus } from '../types/index.js';

const logger = getLogger(['api-hono', 'db']);

export const db = drizzle(config.DATABASE_URL);

export const shutdown = async () => {
    const client = db.$client;
    if (client instanceof Pool) {
        await client.end();
    }
};

export const check = async (): Promise<HealthStatus> => {
    try {
        await db.execute(sql`SELECT 1`);
        return { name: 'database', status: 'ok' };
    } catch (err) {
        logger.error('Database health check failed {*}', { err });
        return { name: 'database', status: 'unhealthy' };
    }
};
