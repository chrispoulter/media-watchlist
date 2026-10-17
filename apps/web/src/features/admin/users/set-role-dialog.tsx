import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
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
import { FieldGroup } from '@/components/ui/field';
import { FormSelectField } from '@/components/form/form-select-field';
import { isAdmin } from '@/lib/auth-client';
import { useSetRole, type AdminUser } from '../admin-queries';
import { roleOptions } from './user-utils';

const setRoleSchema = z.object({
    role: z.enum(['user', 'admin']),
});

type SetRoleFormValues = z.infer<typeof setRoleSchema>;

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
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Change role</DialogTitle>
                    <DialogDescription>
                        Administrators can manage all user accounts.
                    </DialogDescription>
                </DialogHeader>
                <SetRoleForm user={user} onDone={() => onOpenChange(false)} />
            </DialogContent>
        </Dialog>
    );
}

interface SetRoleFormProps {
    user: AdminUser;
    onDone: () => void;
}

function SetRoleForm({ user, onDone }: SetRoleFormProps) {
    const { mutate: updateRole, isPending } = useSetRole();

    const form = useForm<SetRoleFormValues>({
        resolver: zodResolver(setRoleSchema),
        defaultValues: { role: isAdmin(user) ? 'admin' : 'user' },
    });

    const onSubmit = ({ role }: SetRoleFormValues) =>
        updateRole(
            { userId: user.id, role },
            {
                onSuccess: () => {
                    toast.success('Role updated');
                    onDone();
                },
                onError: (err) =>
                    toast.error(err.message || 'Failed to change role'),
            }
        );

    return (
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
                <FormSelectField
                    control={form.control}
                    name="role"
                    label="Role"
                    options={roleOptions}
                />

                <DialogFooter>
                    <Button type="button" variant="outline" onClick={onDone}>
                        Cancel
                    </Button>
                    <Button type="submit" disabled={isPending}>
                        {isPending ? 'Saving...' : 'Save'}
                    </Button>
                </DialogFooter>
            </FieldGroup>
        </form>
    );
}
