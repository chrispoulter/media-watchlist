import { createRoute, z } from '@hono/zod-openapi';
import { createRouter } from '../lib/create-router.js';
import { version } from '../lib/config.js';

import { check as checkDatabase } from '../db/index.js';
import { check as checkMailer } from '../lib/mailer.js';
import { check as checkTmdb } from '../lib/tmdb.js';

const router = createRouter();

const healthResponseSchema = z.object({
    status: z.enum(['ok', 'unhealthy']),
    version: z.string().openapi({ example: '1.0.0' }),
    uptime: z.number(),
    services: z.array(
        z.object({
            name: z.string(),
            status: z.enum(['ok', 'unhealthy']),
        })
    ),
});

const healthRoute = createRoute({
    method: 'get',
    path: '/health',
    tags: ['Health'],
    summary: 'Health Check',
    description: 'Check the health of the API and its downstream services.',
    responses: {
        200: {
            description: 'OK',
            content: { 'application/json': { schema: healthResponseSchema } },
        },
        503: {
            description: 'Service Unavailable',
            content: { 'application/json': { schema: healthResponseSchema } },
        },
    },
});

router.openapi(healthRoute, async (c) => {
    const services = await Promise.all([
        checkDatabase(),
        checkMailer(),
        checkTmdb(),
    ]);

    const failing = services.some((s) => s.status !== 'ok');

    return c.json(
        {
            status: failing ? 'unhealthy' : 'ok',
            version,
            uptime: process.uptime(),
            services,
        },
        failing ? 503 : 200
    );
});

const aliveResponseSchema = z.object({
    status: z.literal('ok'),
    version: z.string().openapi({ example: '1.0.0' }),
    uptime: z.number(),
});

const aliveRoute = createRoute({
    method: 'get',
    path: '/alive',
    tags: ['Health'],
    summary: 'Liveness Check',
    description:
        'Check the API is running, without checking downstream services.',
    responses: {
        200: {
            description: 'OK',
            content: { 'application/json': { schema: aliveResponseSchema } },
        },
    },
});

router.openapi(aliveRoute, (c) => {
    return c.json(
        {
            status: 'ok' as const,
            version,
            uptime: process.uptime(),
        },
        200
    );
});

export default router;
