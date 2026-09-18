import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { config } from '../lib/config.js';

export const db = drizzle(config.DATABASE_URL);

export const shutdown = async () => {
    const client = db.$client;
    if (client instanceof Pool) {
        await client.end();
    }
};
