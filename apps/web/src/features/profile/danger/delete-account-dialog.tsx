import { useState } from 'react';
import { useNavigate } from 'react-router';
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
import { useDeleteUser } from '../profile-queries';

export function DeleteAccountDialog() {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const { mutate: deleteUser, isPending } = useDeleteUser();

    const handleDelete = () =>
        deleteUser(undefined, {
            onSuccess: async () => {
                setIsOpen(false);
                toast.success('Account deleted');
                await navigate('/login');
            },
            onError: (err) =>
                toast.error(err.message || 'Failed to delete account'),
        });

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="destructive" className="w-full sm:w-auto">
                    Delete Account
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Delete account?</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. Your account and all
                        associated data will be permanently deleted.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setIsOpen(false)}>
                        Cancel
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={handleDelete}
                        disabled={isPending}
                    >
                        {isPending ? 'Deleting...' : 'Delete'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
