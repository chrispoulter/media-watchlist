import { createRouter } from '../lib/create-router.js';

const router = createRouter();

const clientEnv = Object.fromEntries(
    Object.entries(process.env).filter(
        ([key, value]) => key.startsWith('VITE_') && value !== undefined
    )
);

const script = `window.__ENV__ = ${JSON.stringify(clientEnv)};\n`;

router.get('/env.js', (c) => {
    c.header('Content-Type', 'text/javascript; charset=utf-8');
    c.header('Cache-Control', 'no-cache');
    return c.body(script);
});

export default router;
