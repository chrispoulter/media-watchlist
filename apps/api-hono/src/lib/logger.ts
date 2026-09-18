import { AsyncLocalStorage } from 'node:async_hooks';
import {
    configure,
    getConsoleSink,
    getJsonLinesFormatter,
    getLogger,
} from '@logtape/logtape';
import { redactByField } from '@logtape/redaction';
import { config } from './config.js';

const isDev = process.env['NODE_ENV'] !== 'production';

// In dev, omit `formatter` so getConsoleSink() uses its default `ConsoleFormatter`,
// which prints structured properties as an inspectable object via multi-arg
// console.log. A `TextFormatter` like getAnsiColorFormatter() only renders the
// message template and silently drops properties not referenced by `{placeholder}`.
const sink = redactByField(
    getConsoleSink(
        isDev ? {} : { formatter: getJsonLinesFormatter() }
    ),
    [/authorization/i, /cookie/i, /password/i, /token/i, /secret/i, /backupCodes/i]
);

await configure({
    sinks: { console: sink },
    loggers: [
        { category: ['api-hono'], sinks: ['console'], lowestLevel: config.LOG_LEVEL },
        { category: ['hono'], sinks: ['console'], lowestLevel: config.LOG_LEVEL },
        { category: ['logtape', 'meta'], sinks: ['console'], lowestLevel: 'warning' },
    ],
    contextLocalStorage: new AsyncLocalStorage(),
});

export const logger = getLogger(['api-hono']);
