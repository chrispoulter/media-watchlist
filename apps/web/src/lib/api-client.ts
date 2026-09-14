import ky, { HTTPError } from 'ky';
import type { ApiErrorResponse } from '@media-watchlist/shared';
import { authClient } from '@/lib/auth-client';
import { queryClient } from '@/lib/query-client';
import { config } from '@/lib/config';

export const apiClient = ky.create({
    prefix: config.VITE_API_URL,
    credentials: 'include',
    hooks: {
        afterResponse: [
            async ({ response }) => {
                switch (response.status) {
                    case 401:
                        await authClient.signOut();
                        queryClient.clear();
                        break;
                }
                return response;
            },
        ],
        beforeError: [
            ({ error }) => {
                if (error instanceof HTTPError) {
                    const body = error.data as ApiErrorResponse;
                    error.message = body?.error || error.message;
                }
                return error;
            },
        ],
    },
});
