import { serve } from '@hono/node-server';
import app from './app.js';
import { shutdown as shutdownDb } from './db/index.js';
import { shutdown as shutdownMailer } from './lib/mailer.js';
import { config } from './lib/config.js';

const SHUTDOWN_TIMEOUT_MS = 10_000;

const server = serve({ fetch: app.fetch, port: config.PORT }, (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
});

const closeServer = () =>
    new Promise<void>((resolve, reject) => {
        server.close((err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });

const shutdown = (signal: string) => {
    console.log(`Shutdown signal received: ${signal}`);

    void (async () => {
        try {
            await closeServer();
            await shutdownDb();
            shutdownMailer();
            console.log('Shutdown complete');
            process.exit(0);
        } catch (err) {
            console.error('Error during shutdown', err);
            process.exit(1);
        }
    })();

    if ('closeIdleConnections' in server) {
        server.closeIdleConnections();
    }

    setTimeout(() => {
        console.error('Shutdown timeout exceeded, forcing exit');
        process.exit(1);
    }, SHUTDOWN_TIMEOUT_MS).unref();
};

process.on('SIGTERM', () => {
    shutdown('SIGTERM');
});
process.on('SIGINT', () => {
    shutdown('SIGINT');
});
