import type { OpenAPIHono } from '@hono/zod-openapi';
import { Scalar } from '@scalar/hono-api-reference';
import { auth } from '../lib/auth.js';

export function registerDocRoutes(app: OpenAPIHono) {
    app.openAPIRegistry.registerComponent('securitySchemes', 'bearerAuth', {
        type: 'http',
        scheme: 'bearer',
        description:
            'Pass the session token from the sign-in response body as `Authorization: Bearer <token>`.',
    });

    app.doc('/openapi.json', {
        openapi: '3.0.3',
        info: {
            title: 'Media Watchlist API',
            version: '1.0.0',
        },
    });

    app.get('/auth-openapi.json', async (c) =>
        c.json(await auth.api.generateOpenAPISchema())
    );

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
