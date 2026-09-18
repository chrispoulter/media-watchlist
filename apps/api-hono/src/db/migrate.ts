import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { fileURLToPath } from 'node:url';

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
    throw new Error('DATABASE_URL is required');
}

const db = drizzle(databaseUrl);
const migrationsFolder = fileURLToPath(
    new URL('../../drizzle', import.meta.url)
);

try {
    await migrate(db, { migrationsFolder });
} finally {
    await db.$client.end();
}
