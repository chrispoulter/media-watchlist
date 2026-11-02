import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { useUnbanUser, type AdminUser } from '../admin-queries';

interface UnbanUserDialogProps {
    user: AdminUser;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function UnbanUserDialog({
    user,
    open,
    onOpenChange,
}: UnbanUserDialogProps) {
    const { mutate: unbanUser, isPending } = useUnbanUser();

    const handleUnban = () =>
        unbanUser(user.id, {
            onSuccess: () => {
                onOpenChange(false);
                toast.success('User unbanned');
            },
            onError: (err) =>
                toast.error(err.message || 'Failed to unban user'),
        });

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Unban {user.name}?</DialogTitle>
                    <DialogDescription>
                        The user will be able to sign in again.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                    >
                        Cancel
                    </Button>
                    <Button onClick={handleUnban} disabled={isPending}>
                        {isPending ? 'Unbanning...' : 'Unban'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
