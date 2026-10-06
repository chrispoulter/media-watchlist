import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { useRemoveFromWatchlist } from './watchlist-queries';

interface RemoveFromWatchlistDialogProps {
    itemId: number;
    title: string;
    triggerClassName?: string;
}

export function RemoveFromWatchlistDialog({
    itemId,
    title,
    triggerClassName,
}: RemoveFromWatchlistDialogProps) {
    const [isOpen, setIsOpen] = useState(false);
    const { mutate: removeFromWatchlist, isPending } = useRemoveFromWatchlist();

    const handleRemove = () =>
        removeFromWatchlist(itemId, {
            onSuccess: () => {
                setIsOpen(false);
                toast.success(`"${title}" removed from watchlist`);
            },
            onError: (err) =>
                toast.error(err.message ?? 'Failed to remove from watchlist'),
        });

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button
                    size="sm"
                    variant="outline"
                    className={triggerClassName}
                >
                    Remove
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Remove from watchlist?</DialogTitle>
                    <DialogDescription>
                        &quot;{title}&quot; will be removed from your watchlist.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setIsOpen(false)}>
                        Cancel
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={handleRemove}
                        disabled={isPending}
                    >
                        {isPending ? 'Removing...' : 'Remove'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
