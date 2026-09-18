import type { ErrorResponse } from '@media-watchlist/shared';
import { createMiddleware } from 'hono/factory';
import { auth   } from '../lib/auth.js';
import type {Session, User} from '../lib/auth.js';

export interface AuthEnv {
    Variables: {
        user: User;
        session: Session;
    };
}

export const requireAuth = createMiddleware<AuthEnv>(async (c, next) => {
    const sessionData = await auth.api.getSession({ headers: c.req.raw.headers });

    if (!sessionData) {
        return c.json({ error: 'Unauthorized' } satisfies ErrorResponse, 401);
    }

    c.set('user', sessionData.user);
    c.set('session', sessionData.session);

    await next();
});
