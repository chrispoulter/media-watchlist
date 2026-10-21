import { createRouter } from '../lib/create-router.js';
import { version } from '../lib/config.js';

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

    return c.json(
        {
            status: failing ? 'unhealthy' : 'ok',
            version,
            uptime: process.uptime(),
            services,
        },
        failing ? 503 : 200
    );
});

router.get('/alive', (c) => {
    return c.json({
        status: 'ok',
        version,
        uptime: process.uptime(),
    });
});

export default router;
