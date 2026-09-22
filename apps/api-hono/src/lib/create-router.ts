import { OpenAPIHono } from '@hono/zod-openapi';
import type { Env } from 'hono';
import { validationHook } from '../middleware/validation-hook.js';

export function createRouter<E extends Env = Env>() {
    return new OpenAPIHono<E>({ defaultHook: validationHook });
}
