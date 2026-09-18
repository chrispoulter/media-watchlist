import type { Env, ErrorHandler } from 'hono';
import type { ErrorResponse } from '@media-watchlist/shared';

export const errorHandler: ErrorHandler<Env> = (err, c) => {
    console.error('Unhandled error', err);
    return c.json<ErrorResponse>({ error: 'Internal Server Error' }, 500);
};
