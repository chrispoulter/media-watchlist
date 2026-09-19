import { drizzle } from 'drizzle-orm/node-postgres';
import { type Logger, sql } from 'drizzle-orm';
import { Pool } from 'pg';
import { getLogger } from '@logtape/logtape';
import { config } from '../lib/config.js';
import type { HealthStatus } from '../types/index.js';

const logger = getLogger(['api', 'db']);

class DrizzleQueryLogger implements Logger {
    logQuery(query: string, params: unknown[]): void {
        logger.debug('{query} {params}', { query, params });
    }
}

export const db = drizzle(config.DATABASE_URL, {
    logger: new DrizzleQueryLogger(),
});

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
