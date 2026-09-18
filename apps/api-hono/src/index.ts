import { serve } from '@hono/node-server';
import { OpenAPIHono, createRoute, z } from '@hono/zod-openapi';
import { Scalar } from '@scalar/hono-api-reference';

const app = new OpenAPIHono();

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

app.get('/reference', Scalar({ url: '/openapi.json', pageTitle: 'Media Watchlist API' }));

serve(
    {
        fetch: app.fetch,
        port: 3001,
    },
    (info) => {
        console.log(`Server is running on http://localhost:${info.port}`);
    }
);
