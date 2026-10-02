import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type {
    WatchlistResponse,
    SearchResponse,
    AddWatchlistItemRequest,
    AddWatchlistItemResponse,
} from '@media-watchlist/shared';
import { searchKeys } from '@/features/search/search-queries';
import { apiClient } from '@/lib/api-client';

const watchlistKeys = {
    all: ['watchlist'] as const,
};

export function useWatchlist() {
    return useQuery({
        queryKey: watchlistKeys.all,
        queryFn: ({ signal }) =>
            apiClient.get('/watchlist', { signal }).json<WatchlistResponse>(),
    });
}

export function useAddToWatchlist() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (item: AddWatchlistItemRequest) =>
            apiClient
                .post('/watchlist', { json: item })
                .json<AddWatchlistItemResponse>(),
        onSuccess: (data, variables) => {
            queryClient.setQueryData<WatchlistResponse>(
                watchlistKeys.all,
                (old) => (old ? [...old, data] : old)
            );

            queryClient.setQueriesData<SearchResponse>(
                { queryKey: searchKeys.all },
                (old) =>
                    old?.map((r) =>
                        r.providerId === variables.providerId &&
                        r.mediaType === variables.mediaType
                            ? { ...r, watchlistItemId: data.id }
                            : r
                    )
            );
        },
    });
}

export function useReorderWatchlist() {
    const queryClient = useQueryClient();

    return useMutation({
        // Run reorders one at a time so the last drop is always the last write
        scope: { id: 'watchlist-reorder' },
        mutationFn: (items: WatchlistResponse) =>
            apiClient.put('/watchlist/order', {
                json: { ids: items.map((item) => item.id) },
            }),
        onMutate: (items) => {
            queryClient.setQueryData<WatchlistResponse>(
                watchlistKeys.all,
                items
            );
        },
        onError: () =>
            queryClient.invalidateQueries({ queryKey: watchlistKeys.all }),
    });
}

export function useRemoveFromWatchlist() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => apiClient.delete(`/watchlist/${id}`),
        onSuccess: (_, id) => {
            queryClient.setQueryData<WatchlistResponse>(
                watchlistKeys.all,
                (old) => old?.filter((item) => item.id !== id)
            );

            queryClient.setQueriesData<SearchResponse>(
                { queryKey: searchKeys.all },
                (old) =>
                    old?.map((r) =>
                        r.watchlistItemId === id
                            ? { ...r, watchlistItemId: undefined }
                            : r
                    )
            );
        },
    });
}
