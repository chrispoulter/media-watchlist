import { createAuthClient } from 'better-auth/react';
import { twoFactorClient } from 'better-auth/client/plugins';
import { queryClient } from './query-client';

export const authClient = createAuthClient({
    baseURL: window.location.origin,
    plugins: [twoFactorClient()],
    fetchOptions: {
        throw: true,
        async onError({ error, response }): Promise<never> {
            if (
                error.status === 401 &&
                error.code === 'UNAUTHORIZED' &&
                !response.url.endsWith('/sign-out')
            ) {
                await authClient.signOut().catch(() => {});
                queryClient.clear();
            }

            throw Object.assign(
                new Error(error.message || error.statusText),
                error
            );
        },
    },
});

export type Session = typeof authClient.$Infer.Session;

// Extended user type including additional fields from the API
export type AppUser = Session['user'] & {};
