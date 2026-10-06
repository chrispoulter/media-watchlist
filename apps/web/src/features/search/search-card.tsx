import { memo } from 'react';
import { toast } from 'sonner';
import type { SearchResponse } from '@media-watchlist/shared';
import { Button } from '@/components/ui/button';
import { MediaCard } from '@/components/media-card';
import { RemoveFromWatchlistDialog } from '@/features/watchlist/remove-from-watchlist-dialog';
import { useAddToWatchlist } from '@/features/watchlist/watchlist-queries';

interface SearchCardProps {
    result: SearchResponse[number];
}

function SearchCardComponent({ result }: SearchCardProps) {
    const { mutate: addToWatchlist, isPending: isAdding } = useAddToWatchlist();

    const handleAdd = () => {
        addToWatchlist(
            {
                providerId: result.providerId,
                mediaType: result.mediaType,
                title: result.title,
                posterUrl: result.posterUrl,
                overview: result.overview,
                releaseDate: result.releaseDate,
            },
            {
                onSuccess: () =>
                    toast.success(`"${result.title}" added to watchlist`),
                onError: (err) =>
                    toast.error(err.message ?? 'Failed to add to watchlist'),
            }
        );
    };

    return (
        <MediaCard
            title={result.title}
            posterUrl={result.posterUrl}
            overview={result.overview}
            releaseDate={result.releaseDate}
            mediaType={result.mediaType}
            actions={
                <>
                    {result.watchlistItemId ? (
                        <RemoveFromWatchlistDialog
                            itemId={result.watchlistItemId}
                            title={result.title}
                            triggerClassName="w-full"
                        />
                    ) : (
                        <Button
                            size="sm"
                            variant="outline"
                            className="w-full"
                            onClick={handleAdd}
                            disabled={isAdding}
                        >
                            Add to Watchlist
                        </Button>
                    )}
                </>
            }
        />
    );
}

export const SearchCard = memo(SearchCardComponent);
