import ky, { HTTPError } from 'ky';
import { authClient } from './auth-client';
import { queryClient } from './query-client';

interface ErrorResponse {
    error?: string;
}

export const apiClient = ky.create({
    prefix: '/api',
    hooks: {
        beforeError: [
            async ({ error }) => {
                if (error instanceof HTTPError) {
                    const body = error.data as ErrorResponse;
                    error.message = body?.error || error.message;
                }
                return error;
            },
        ],
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
    },
});
