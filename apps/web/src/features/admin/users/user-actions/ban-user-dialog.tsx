import { toast } from 'sonner';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { useBanUser, type AdminUser } from '../../admin-queries';
import { BanUserForm, type BanUserFormValues } from './ban-user-form';
import { banDurations } from '../user-utils';

interface BanUserDialogProps {
    user: AdminUser;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function BanUserDialog({
    user,
    open,
    onOpenChange,
}: BanUserDialogProps) {
    const { mutate: banUser, isPending } = useBanUser();

    const onSubmit = (values: BanUserFormValues) =>
        banUser(
            {
                userId: user.id,
                banReason: values.reason.trim() || undefined,
                banExpiresIn: banDurations.find(
                    (d) => d.value === values.duration
                )?.seconds,
            },
            {
                onSuccess: () => {
                    toast.success('User banned');
                    onOpenChange(false);
                },
                onError: (err) =>
                    toast.error(err.message || 'Failed to ban user'),
            }
        );

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Ban {user.name}?</DialogTitle>
                    <DialogDescription>
                        The user will be signed out of all sessions and won't be
                        able to sign in until the ban ends.
                    </DialogDescription>
                </DialogHeader>
                <BanUserForm
                    loading={isPending}
                    onSubmit={onSubmit}
                    onCancel={() => onOpenChange(false)}
                />
            </DialogContent>
        </Dialog>
    );
}
