import { DragDropProvider, type DragEndEvent } from '@dnd-kit/react';
import { move } from '@dnd-kit/helpers';
import type { WatchlistResponse } from '@media-watchlist/shared';
import { WatchlistCard } from './watchlist-card';

interface WatchlistGridProps {
    items: WatchlistResponse;
    onReorder: (items: WatchlistResponse) => void;
}

export function WatchlistGrid({ items, onReorder }: WatchlistGridProps) {
    const handleDragEnd = (event: DragEndEvent) => {
        if (event.canceled) {
            return;
        }

        const reordered = move(items, event);

        if (reordered.every((item, index) => item.id === items[index]?.id)) {
            return;
        }

        onReorder(reordered);
    };

    return (
        <DragDropProvider onDragEnd={handleDragEnd}>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 2xl:grid-cols-4">
                {items.map((item, index) => (
                    <WatchlistCard key={item.id} item={item} index={index} />
                ))}
            </div>
        </DragDropProvider>
    );
}
