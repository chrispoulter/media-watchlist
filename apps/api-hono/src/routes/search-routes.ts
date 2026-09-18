import { OpenAPIHono, createRoute, z } from '@hono/zod-openapi';
import { mediaTypeSchema  } from '@media-watchlist/shared';
import type {SearchResponse} from '@media-watchlist/shared';
import { and, eq, inArray } from 'drizzle-orm';
import { db } from '../db/index.js';
import { watchlistItem } from '../db/schema.js';
import { authSecurity } from '../lib/openapi-security.js';
import { search } from '../lib/tmdb.js';
import { defaultHook } from '../lib/validation-hook.js';
import { requireAuth  } from '../middleware/require-auth.js';
import type {AuthEnv} from '../middleware/require-auth.js';

const errorResponseSchema = z.object({
    error: z.string(),
    details: z.array(z.record(z.string(), z.unknown())).optional(),
});

const searchResponseSchema = z.array(
    z.object({
        providerId: z.string(),
        mediaType: mediaTypeSchema,
        title: z.string(),
        posterUrl: z.string().optional(),
        overview: z.string().optional(),
        releaseDate: z.string().optional(),
        watchlistItemId: z.number().optional(),
    })
);

const searchRoutes = new OpenAPIHono<AuthEnv>({ defaultHook });

searchRoutes.use('*', requireAuth);

const searchRoute = createRoute({
    method: 'get',
    path: '/',
    tags: ['Search'],
    summary: 'Search for movies and TV shows',
    security: authSecurity,
    request: {
        query: z.object({
            query: z.string().min(1),
        }),
    },
    responses: {
        200: {
            description: 'Search results.',
            content: { 'application/json': { schema: searchResponseSchema } },
        },
        400: {
            description: 'Invalid request query.',
            content: { 'application/json': { schema: errorResponseSchema } },
        },
        401: {
            description: 'Unauthorized.',
            content: { 'application/json': { schema: errorResponseSchema } },
        },
        500: {
            description: 'Internal Server Error.',
            content: { 'application/json': { schema: errorResponseSchema } },
        },
    },
});

searchRoutes.openapi(searchRoute, async (c) => {
    const { query } = c.req.valid('query');

    const data = await search(query);

    const providerIds = data.map((item) => item.providerId);

    const watchlistItems = await db
        .select()
        .from(watchlistItem)
        .where(
            and(
                eq(watchlistItem.userId, c.get('user').id),
                inArray(watchlistItem.providerId, providerIds)
            )
        );

    const watchlistMap = new Map(
        watchlistItems.map((w) => [`${w.providerId}-${w.mediaType}`, w.id])
    );

    return c.json(
        data.map((item) => ({
            providerId: item.providerId,
            mediaType: item.mediaType,
            title: item.title,
            posterUrl: item.posterUrl ?? undefined,
            overview: item.overview ?? undefined,
            releaseDate: item.releaseDate ?? undefined,
            watchlistItemId: watchlistMap.get(`${item.providerId}-${item.mediaType}`) ?? undefined,
        })) satisfies SearchResponse,
        200
    );
});

export default searchRoutes;
