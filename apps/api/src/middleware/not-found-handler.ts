import type { NotFoundHandler } from 'hono';
import type { ErrorResponse } from '@media-watchlist/shared';
import { getLogger } from '@logtape/logtape';

const logger = getLogger(['api', 'not-found-handler']);

export const notFoundHandler: NotFoundHandler = (c) => {
    logger.warn('Request to unknown endpoint {path}', { path: c.req.path });
    return c.json<ErrorResponse>({ error: 'Not Found' }, 404);
};
