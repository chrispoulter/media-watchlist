import { Hono } from 'hono';
import { auth } from '../lib/auth.js';

const router = new Hono();

router.on(['GET', 'POST'], '/*', (c) => auth.handler(c.req.raw));

export default router;
