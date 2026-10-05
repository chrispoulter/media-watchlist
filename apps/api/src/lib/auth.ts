import { betterAuth } from 'better-auth/minimal';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { twoFactor, openAPI } from 'better-auth/plugins';
import { createElement } from 'react';
import { db } from '../db/index.js';
import * as schema from '../db/schema.js';
import { config } from './config.js';
import { sendMail } from './mailer.js';

export const auth = betterAuth({
    baseURL: config.BETTER_AUTH_URL,
    secret: config.BETTER_AUTH_SECRET,
    trustedOrigins: config.TRUSTED_ORIGINS,
    database: drizzleAdapter(db, {
        provider: 'pg',
        schema,
    }),
    user: {
        changeEmail: { enabled: true },
        deleteUser: { enabled: true },
    },
    account: {
        accountLinking: { allowDifferentEmails: true },
    },
    emailAndPassword: {
        enabled: true,
        revokeSessionsOnPasswordReset: true,
        sendResetPassword: async ({ user, url }) => {
            const { default: ResetPasswordEmail } =
                await import('../emails/reset-password-email.js');

            await sendMail({
                to: user.email,
                subject: 'Reset your password | Media Watchlist',
                template: createElement(ResetPasswordEmail, {
                    username: user.name,
                    url,
                }),
            });
        },
    },
    emailVerification: {
        sendVerificationEmail: async ({ user, url }) => {
            const { default: VerificationEmail } =
                await import('../emails/verification-email.js');

            await sendMail({
                to: user.email,
                subject: 'Verify your email address | Media Watchlist',
                template: createElement(VerificationEmail, {
                    username: user.name,
                    url,
                }),
            });
        },
    },
    socialProviders: {
        google: {
            enabled: !!config.GOOGLE_CLIENT_ID && !!config.GOOGLE_CLIENT_SECRET,
            clientId: config.GOOGLE_CLIENT_ID ?? '',
            clientSecret: config.GOOGLE_CLIENT_SECRET ?? '',
        },
    },
    plugins: [
        twoFactor({ issuer: 'Media Watchlist' }),
        openAPI({ disableDefaultReference: true }),
    ],
});

export type User = typeof auth.$Infer.Session.user;
export type Session = typeof auth.$Infer.Session.session;
