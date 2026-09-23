import { createAuthClient } from 'better-auth/react';
import { twoFactorClient } from 'better-auth/client/plugins';
import { config } from '@/lib/config';

export const authClient = createAuthClient({
    baseURL: config.VITE_API_URL,
    plugins: [
        twoFactorClient({
            onTwoFactorRedirect() {
                window.location.href = '/two-factor';
            },
        }),
    ],
});

export type Session = typeof authClient.$Infer.Session;
export type AppUser = typeof authClient.$Infer.Session.user;
