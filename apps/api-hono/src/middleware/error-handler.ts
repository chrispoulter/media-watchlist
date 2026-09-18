import type { Env, ErrorHandler } from 'hono';
import type { ErrorResponse } from '@media-watchlist/shared';

export const errorHandler: ErrorHandler<Env> = (err, c) => {
    console.error('Unhandled error', err);

    return c.json(
        { error: 'Internal Server Error' } satisfies ErrorResponse,
        500
    );
};
