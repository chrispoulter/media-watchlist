import type { ErrorResponse } from '@media-watchlist/shared';
import { createMiddleware } from 'hono/factory';
import { withContext } from '@logtape/logtape';
import { auth, type Session, type User } from '../lib/auth.js';

export interface AuthEnv {
    Variables: {
        user: User;
        session: Session;
    };
}

export const requireAuth = createMiddleware<AuthEnv>(async (c, next) => {
    const sessionData = await auth.api.getSession({
        headers: c.req.raw.headers,
    });

    if (!sessionData) {
        return c.json<ErrorResponse>({ error: 'Unauthorized' }, 401);
    }

    c.set('user', sessionData.user);
    c.set('session', sessionData.session);

    await withContext({ userId: sessionData.user.id }, next);
});
