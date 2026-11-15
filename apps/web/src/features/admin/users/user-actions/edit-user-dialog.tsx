import { toast } from 'sonner';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { useUpdateAdminUser, type AdminUser } from '../../admin-queries';
import { EditUserForm, type EditUserFormValues } from './edit-user-form';

interface EditUserDialogProps {
    user: AdminUser;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function EditUserDialog({
    user,
    open,
    onOpenChange,
}: EditUserDialogProps) {
    const { mutate: updateUser, isPending } = useUpdateAdminUser();

    const onSubmit = (values: EditUserFormValues) =>
        updateUser(
            { userId: user.id, ...values },
            {
                onSuccess: () => {
                    toast.success('User updated');
                    onOpenChange(false);
                },
                onError: (err) =>
                    toast.error(err.message || 'Failed to update user'),
            }
        );

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit user</DialogTitle>
                    <DialogDescription>
                        Update the name and email address for this account.
                    </DialogDescription>
                </DialogHeader>
                <EditUserForm
                    defaultValues={{ name: user.name, email: user.email }}
                    loading={isPending}
                    onSubmit={onSubmit}
                    onCancel={() => onOpenChange(false)}
                />
            </DialogContent>
        </Dialog>
    );
}
