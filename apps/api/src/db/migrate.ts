import 'dotenv/config';
import { fileURLToPath } from 'node:url';
import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';

console.log('Migrating database...');

const db = drizzle(process.env.DATABASE_URL!);
const migrationsFolder = fileURLToPath(new URL('../../drizzle', import.meta.url));

try {
  await migrate(db, { migrationsFolder });
  console.log('Database migrated successfully');
} finally {
  await db.$client.end();
}
