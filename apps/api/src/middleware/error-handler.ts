import type { Env, ErrorHandler } from 'hono';
import type { ErrorResponse } from '@media-watchlist/shared';
import { getLogger } from '@logtape/logtape';

const logger = getLogger(['api', 'error-handler']);

export const errorHandler: ErrorHandler<Env> = (err, c) => {
    logger.error('Unhandled error {*}', { err });
    return c.json<ErrorResponse>({ error: 'Internal Server Error' }, 500);
};
