import { memo } from 'react';
import { useSortable } from '@dnd-kit/react/sortable';
import { GripVertical } from 'lucide-react';
import type { WatchlistResponse } from '@media-watchlist/shared';
import { Button } from '@/components/ui/button';
import { MediaCard } from '@/components/media-card';
import { cn } from '@/lib/utils';
import { RemoveFromWatchlistDialog } from './remove-from-watchlist-dialog';

interface WatchlistCardProps {
    item: WatchlistResponse[number];
    index: number;
}

function WatchlistCardComponent({ item, index }: WatchlistCardProps) {
    const { ref, handleRef, isDragging } = useSortable({
        id: item.id,
        index,
        data: { title: item.title },
    });

    return (
        <div
            ref={ref}
            className={cn(
                'rounded-xl transition-shadow',
                isDragging && 'opacity-80 shadow-lg'
            )}
        >
            <MediaCard
                title={item.title}
                posterUrl={item.posterUrl}
                overview={item.overview}
                releaseDate={item.releaseDate}
                mediaType={item.mediaType}
                actions={
                    <div className="flex items-center gap-2">
                        <Button
                            ref={handleRef}
                            type="button"
                            size="icon-sm"
                            variant="ghost"
                            aria-label={`Reorder "${item.title}"`}
                            // Enlarge the touch target to 44px and stop the page scrolling while dragging
                            className="relative shrink-0 cursor-grab touch-none after:absolute after:-inset-1.5 active:cursor-grabbing"
                        >
                            <GripVertical />
                        </Button>
                        <RemoveFromWatchlistDialog
                            itemId={item.id}
                            title={item.title}
                            triggerClassName="min-w-0 flex-1 shrink"
                        />
                    </div>
                }
            />
        </div>
    );
}

export const WatchlistCard = memo(WatchlistCardComponent);
