// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Hono } from 'hono';
import { OpenAPIHono } from '@hono/zod-openapi';
import { serveStatic } from '@hono/node-server/serve-static';
import { bodyLimit } from 'hono/body-limit';
import { compress } from 'hono/compress';
import { honoLogger } from '@logtape/hono';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { errorHandler } from './middleware/error-handler.js';
import { notFoundHandler } from './middleware/not-found-handler.js';
import type { ErrorResponse } from './types/index.js';

import './lib/logger.js';

import { registerDocRoutes } from './routes/doc-routes.js';
import healthRoutes from './routes/health-routes.js';
import envRoutes from './routes/env-routes.js';
import authRoutes from './routes/auth-routes.js';
import profileRoutes from './routes/profile-routes.js';
import searchRoutes from './routes/search-routes.js';
import watchlistRoutes from './routes/watchlist-routes.js';

const app = new OpenAPIHono();

app.onError(errorHandler);
app.notFound(notFoundHandler);

app.use(
    bodyLimit({
        maxSize: 10 * 1024 * 1024,
        onError: (c) =>
            c.json<ErrorResponse>({ error: 'Payload Too Large' }, 413),
    })
);

app.use(compress());

app.use(
    honoLogger({
        skip: (c) => c.req.path === '/health' || c.req.path === '/alive',
        context: true,
    })
);

app.route('/api/auth', authRoutes);
app.route('/api/profile', profileRoutes);
app.route('/api/search', searchRoutes);
app.route('/api/watchlist', watchlistRoutes);
app.all('/api/*', notFoundHandler);

app.route('/', healthRoutes);
app.route('/', envRoutes);

registerDocRoutes(app);

const publicDir = fileURLToPath(new URL('../public', import.meta.url));

app.get(
    '*',
    serveStatic({ root: publicDir }),
    serveStatic({ path: join(publicDir, 'index.html') })
);

export default app;
