import type { Request, Response } from 'express';
import type { ErrorResponse } from '@media-watchlist/shared';

export const notFoundHandler = (req: Request, res: Response) => {
    req.log.warn({ path: req.path }, 'Request to unknown endpoint');
    res.status(404).json({ error: 'Not Found' } satisfies ErrorResponse);
};
