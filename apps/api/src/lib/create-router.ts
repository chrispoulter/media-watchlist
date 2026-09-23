import { OpenAPIHono } from '@hono/zod-openapi';
import type { AuthEnv } from './auth.js';
import { validationHook } from './validation-hook.js';

export const createRouter = () =>
    new OpenAPIHono<AuthEnv>({ defaultHook: validationHook });
