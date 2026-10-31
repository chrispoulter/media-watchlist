import type { OpenAPIHono } from '@hono/zod-openapi';
import { Scalar } from '@scalar/hono-api-reference';
import { auth } from '../lib/auth.js';
import { config, version } from '../lib/config.js';

export function registerDocRoutes(app: OpenAPIHono) {
    const cookiePrefix = config.BETTER_AUTH_URL.startsWith('https://')
        ? '__Secure-'
        : '';

    app.openAPIRegistry.registerComponent('securitySchemes', 'cookieAuth', {
        type: 'apiKey',
        in: 'cookie',
        name: `${cookiePrefix}better-auth.session_token`,
        description: 'Session cookie set on login.',
    });

    app.doc('/openapi.json', {
        openapi: '3.0.3',
        info: {
            title: 'Media Watchlist API',
            version,
        },
    });

    app.get('/auth-openapi.json', async (c) => {
        const authSchema = await auth.api.generateOpenAPISchema();

        return c.json(
            {
                ...authSchema,
                servers: [{ url: '/api/auth' }],
            },
            200
        );
    });

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
}
