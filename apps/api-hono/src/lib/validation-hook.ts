import type { Hook } from '@hono/zod-openapi';
import type { ErrorResponse } from '@media-watchlist/shared';

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- matches the library's own OpenAPIHonoOptions['defaultHook'] shape
export const defaultHook: Hook<any, any, any, any> = (result, c) => {
    if (!result.success) {
        const message =
            result.target === 'query'
                ? 'Invalid request query'
                : result.target === 'param'
                  ? 'Invalid request parameters'
                  : 'Invalid request body';

        return c.json(
            {
                error: message,
                details: result.error.issues,
            } satisfies ErrorResponse,
            400
        );
    }
};
