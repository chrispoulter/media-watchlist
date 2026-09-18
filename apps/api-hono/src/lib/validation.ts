import type { Hook } from '@hono/zod-openapi';
import type { ErrorResponse } from '@media-watchlist/shared';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const validationHook: Hook<any, any, any, any> = (result, c) => {
    if (result.success) {
        return;
    }

    return c.json(
        {
            error: 'Validation failed',
            details: result.error.issues,
        } satisfies ErrorResponse,
        400
    );
};
