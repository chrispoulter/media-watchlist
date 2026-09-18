import { OpenAPIHono } from '@hono/zod-openapi';
// import type { ErrorResponse } from '@media-watchlist/shared';
import { cors } from 'hono/cors';
import { auth } from './lib/auth.js';
import { config } from './lib/config.js';

import { registerDocRoutes } from './routes/doc-routes.js';
import healthRoutes from './routes/health-routes.js';
import searchRoutes from './routes/search-routes.js';
import watchlistRoutes from './routes/watchlist-routes.js';

const app = new OpenAPIHono();

app.use(
    '*',
    cors({
        origin: config.CLIENT_ORIGIN.split(','),
        allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        credentials: true,
    })
);

// app.onError((err, c) => {
//     console.error('Unhandled error', err);
//     return c.json(
//         { error: 'Internal Server Error' } satisfies ErrorResponse,
//         500
//     );
// });

app.on(['GET', 'POST'], '/api/auth/*', (c) => auth.handler(c.req.raw));

app.route('/api/search', searchRoutes);
app.route('/api/watchlist', watchlistRoutes);
app.route('/', healthRoutes);

registerDocRoutes(app);

app.get('/', (c) => c.redirect('/reference'));

export default app;
