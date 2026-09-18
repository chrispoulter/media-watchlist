import 'dotenv/config';
import { z } from 'zod';

const configSchema = z.object({
    PORT: z.coerce.number().default(3001),
    DATABASE_URL: z.url(),
    BETTER_AUTH_SECRET: z.string().min(32),
    BETTER_AUTH_URL: z.url().default('http://localhost:3001'),
    CLIENT_ORIGIN: z.string().default('http://localhost:5173'),
    GOOGLE_CLIENT_ID: z.string().optional(),
    GOOGLE_CLIENT_SECRET: z.string().optional(),
    SMTP_HOST: z.string().default('localhost'),
    SMTP_PORT: z.coerce.number().default(587),
    SMTP_SECURE: z.coerce.boolean().default(false),
    SMTP_USER: z.string().optional(),
    SMTP_PASS: z.string().optional(),
    SMTP_FROM: z.email(),
});

export const config = configSchema.parse(process.env);
