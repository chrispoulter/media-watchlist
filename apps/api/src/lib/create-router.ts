import { OpenAPIHono } from '@hono/zod-openapi';
import type { AuthEnv } from '../middleware/require-auth.js';
import { validationHook } from './validation-hook.js';

export const createRouter = () =>
    new OpenAPIHono<AuthEnv>({ defaultHook: validationHook });
