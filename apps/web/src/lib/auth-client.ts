import type { ClientFetchOption } from 'better-auth';
import { createAuthClient } from 'better-auth/react';
import { twoFactorClient } from 'better-auth/client/plugins';
import { queryClient } from './query-client';

export const authClient = createAuthClient({
    baseURL: window.location.origin,
    plugins: [twoFactorClient()],
});

export const fetchOptions: ClientFetchOption = {
    async onError({ error }) {
        if (error.status === 401 && error.code === 'UNAUTHORIZED') {
            await authClient.signOut();
            queryClient.clear();
        }
    },
};

export type Session = typeof authClient.$Infer.Session;

// Extended user type including additional fields from the API
export type AppUser = Session['user'] & {};
