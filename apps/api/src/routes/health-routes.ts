import { createRouter } from '../lib/create-router.js';

import { check as checkDatabase } from '../db/index.js';
import { check as checkMailer } from '../lib/mailer.js';
import { check as checkTmdb } from '../lib/tmdb.js';

const router = createRouter();

router.get('/health', async (c) => {
    const services = await Promise.all([
        checkDatabase(),
        checkMailer(),
        checkTmdb(),
    ]);

    const failing = services.some((s) => s.status !== 'ok');
    const response = failing ? 'Unhealthy' : 'Healthy';
    const statusCode = failing ? 503 : 200;
    return c.text(response, statusCode);
});

router.get('/alive', (c) => {
    return c.text('Healthy', 200);
});

export default router;
