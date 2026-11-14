import { Link } from 'react-router';
import { toast } from 'sonner';
import type { WatchlistResponse } from '@media-watchlist/shared';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyTitle,
} from '@/components/ui/empty';
import { MediaCardSkeleton } from '@/components/media-card-skeleton';
import { Metadata } from '@/components/metadata';
import { useReorderWatchlist, useWatchlist } from './watchlist-queries';
import { WatchlistGrid } from './watchlist-grid';

export function WatchlistPage() {
    const { data: items, isLoading, error } = useWatchlist();
    const { mutate: reorderWatchlist } = useReorderWatchlist();

    const onReorder = (reordered: WatchlistResponse) =>
        reorderWatchlist(reordered, {
            onError: (err) =>
                toast.error(err.message ?? 'Failed to reorder watchlist'),
        });

    return (
        <>
            <Metadata title="My Watchlist" />
            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">
                        My Watchlist
                    </h1>
                </div>

                {isLoading ? (
                    <div
                        aria-busy="true"
                        className="grid grid-cols-1 gap-4 lg:grid-cols-2 2xl:grid-cols-4"
                    >
                        <MediaCardSkeleton />
                        <MediaCardSkeleton />
                        <MediaCardSkeleton />
                        <MediaCardSkeleton />
                    </div>
                ) : error ? (
                    <Alert variant="destructive">
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>
                            Failed to load watchlist. Please try again.
                        </AlertDescription>
                    </Alert>
                ) : !items?.length ? (
                    <Empty className="border border-dashed">
                        <EmptyHeader>
                            <EmptyTitle>Your watchlist is empty</EmptyTitle>
                            <EmptyDescription>
                                Search for movies and TV shows to add them here
                            </EmptyDescription>
                        </EmptyHeader>
                        <EmptyContent>
                            <Button asChild className="w-full sm:w-auto">
                                <Link to="/search">Browse titles</Link>
                            </Button>
                        </EmptyContent>
                    </Empty>
                ) : (
                    <WatchlistGrid items={items} onReorder={onReorder} />
                )}
            </div>
        </>
    );
}
