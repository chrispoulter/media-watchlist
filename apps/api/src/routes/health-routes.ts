import { createRouter } from '../lib/create-router.js';
import { check as checkDatabase } from '../db/index.js';

const router = createRouter();

router.get('/health', async (c) => {
    const services = await Promise.all([checkDatabase()]);
    const failing = services.some((s) => s.status !== 'ok');
    const response = failing ? 'Unhealthy' : 'Healthy';
    const statusCode = failing ? 503 : 200;
    return c.text(response, statusCode);
});

router.get('/alive', (c) => {
    return c.text('Healthy', 200);
});

export default router;
