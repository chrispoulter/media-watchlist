import { createRoute, z } from '@hono/zod-openapi';
import { asc, eq } from 'drizzle-orm';
import { prettyJSON } from 'hono/pretty-json';
import { db } from '../db/index.js';
import { account, session, user, watchlistItem } from '../db/schema.js';
import { requireAuth } from '../middleware/require-auth.js';
import { errorResponseSchema, mediaTypeSchema } from '../types/index.js';
import { createRouter } from '../lib/create-router.js';

const router = createRouter();

router.use(requireAuth);

router.use('/personal-data', prettyJSON({ force: true }));

const personalDataSchema = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    emailVerified: z.boolean(),
    image: z.string().nullable(),
    twoFactorEnabled: z.boolean(),
    createdAt: z.string(),
    updatedAt: z.string(),
    linkedAccounts: z.array(
        z.object({ provider: z.string(), linkedAt: z.string() })
    ),
    sessions: z.array(
        z.object({
            ipAddress: z.string().nullable(),
            userAgent: z.string().nullable(),
            createdAt: z.string(),
            expiresAt: z.string(),
        })
    ),
    watchlist: z.array(
        z.object({
            providerId: z.string(),
            mediaType: mediaTypeSchema,
            title: z.string(),
            posterUrl: z.string().nullable(),
            overview: z.string().nullable(),
            releaseDate: z.string().nullable(),
            addedAt: z.string(),
        })
    ),
});

const personalDataRoute = createRoute({
    method: 'get',
    path: '/personal-data',
    tags: ['Profile'],
    summary: 'Download a copy of the personal data held for the current user',
    security: [{ cookieAuth: [] }],
    responses: {
        200: {
            description: 'Personal data, as a JSON file attachment.',
            content: { 'application/json': { schema: personalDataSchema } },
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

router.openapi(personalDataRoute, async (c) => {
    const userId = c.get('user').id;

    const [[profile], accounts, sessions, watchlist] = await Promise.all([
        db.select().from(user).where(eq(user.id, userId)),
        db
            .select({
                provider: account.providerId,
                linkedAt: account.createdAt,
            })
            .from(account)
            .where(eq(account.userId, userId))
            .orderBy(asc(account.createdAt)),
        db
            .select({
                ipAddress: session.ipAddress,
                userAgent: session.userAgent,
                createdAt: session.createdAt,
                expiresAt: session.expiresAt,
            })
            .from(session)
            .where(eq(session.userId, userId))
            .orderBy(asc(session.createdAt)),
        db
            .select()
            .from(watchlistItem)
            .where(eq(watchlistItem.userId, userId))
            .orderBy(asc(watchlistItem.position), asc(watchlistItem.id)),
    ]);

    if (!profile) {
        return c.json({ error: 'Unauthorized' }, 401);
    }

    const data: z.infer<typeof personalDataSchema> = {
        id: profile.id,
        name: profile.name,
        email: profile.email,
        emailVerified: profile.emailVerified,
        image: profile.image,
        twoFactorEnabled: profile.twoFactorEnabled ?? false,
        createdAt: profile.createdAt.toISOString(),
        updatedAt: profile.updatedAt.toISOString(),
        linkedAccounts: accounts.map((a) => ({
            provider: a.provider,
            linkedAt: a.linkedAt.toISOString(),
        })),
        sessions: sessions.map((s) => ({
            ipAddress: s.ipAddress,
            userAgent: s.userAgent,
            createdAt: s.createdAt.toISOString(),
            expiresAt: s.expiresAt.toISOString(),
        })),
        watchlist: watchlist.map((item) => ({
            providerId: item.providerId,
            mediaType: item.mediaType,
            title: item.title,
            posterUrl: item.posterUrl,
            overview: item.overview,
            releaseDate: item.releaseDate,
            addedAt: item.addedAt.toISOString(),
        })),
    };

    c.header(
        'Content-Disposition',
        'attachment; filename="media-watchlist-data.json"'
    );

    return c.json(data, 200);
});

export default router;
