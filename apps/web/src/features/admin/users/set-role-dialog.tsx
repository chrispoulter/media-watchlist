import { toast } from 'sonner';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { isAdmin } from '@/lib/auth-client';
import { useSetRole, type AdminUser } from '../admin-queries';
import { SetRoleForm, type SetRoleFormValues } from './set-role-form';

interface SetRoleDialogProps {
    user: AdminUser;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function SetRoleDialog({
    user,
    open,
    onOpenChange,
}: SetRoleDialogProps) {
    const { mutate: updateRole, isPending } = useSetRole();

    const onSubmit = ({ role }: SetRoleFormValues) =>
        updateRole(
            { userId: user.id, role },
            {
                onSuccess: () => {
                    toast.success('Role updated');
                    onOpenChange(false);
                },
                onError: (err) =>
                    toast.error(err.message || 'Failed to change role'),
            }
        );

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Change role</DialogTitle>
                    <DialogDescription>
                        Administrators can manage all user accounts.
                    </DialogDescription>
                </DialogHeader>
                <SetRoleForm
                    defaultValues={{ role: isAdmin(user) ? 'admin' : 'user' }}
                    loading={isPending}
                    onSubmit={onSubmit}
                    onCancel={() => onOpenChange(false)}
                />
            </DialogContent>
        </Dialog>
    );
}
