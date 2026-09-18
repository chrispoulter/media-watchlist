import { OpenAPIHono, createRoute, z } from '@hono/zod-openapi';
import { Scalar } from '@scalar/hono-api-reference';
import { cors } from 'hono/cors';
import { auth } from './lib/auth.js';
import { config } from './lib/config.js';

const app = new OpenAPIHono();

app.use(
    '/api/auth/*',
    cors({
        origin: config.CLIENT_ORIGIN.split(','),
        credentials: true,
    })
);

app.on(['GET', 'POST'], '/api/auth/*', (c) => auth.handler(c.req.raw));

const helloRoute = createRoute({
    method: 'get',
    path: '/',
    responses: {
        200: {
            description: 'Greeting message.',
            content: {
                'text/plain': { schema: z.string().openapi({ example: 'Hello Hono!' }) },
            },
        },
    },
});

app.openapi(helloRoute, (c) => c.text('Hello Hono!'));

app.doc('/openapi.json', {
    openapi: '3.0.3',
    info: {
        title: 'Media Watchlist API',
        version: '1.0.0',
    },
});

app.get('/auth-openapi.json', async (c) => c.json(await auth.api.generateOpenAPISchema()));

app.get(
    '/reference',
    Scalar({
        pageTitle: 'Media Watchlist API',
        sources: [
            { url: '/openapi.json', title: 'Media Watchlist API' },
            { url: '/auth-openapi.json', title: 'Better Auth' },
        ],
    })
);

export default app;
