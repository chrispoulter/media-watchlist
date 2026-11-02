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
import { FormTextareaField } from '@/components/form/form-textarea-field';
import { useBanUser, type AdminUser } from '../admin-queries';

const DAY_IN_SECONDS = 60 * 60 * 24;

const durations = [
    { value: 'permanent', label: 'Permanent', seconds: undefined },
    { value: '1d', label: '1 day', seconds: DAY_IN_SECONDS },
    { value: '7d', label: '7 days', seconds: 7 * DAY_IN_SECONDS },
    { value: '30d', label: '30 days', seconds: 30 * DAY_IN_SECONDS },
] as const;

const banUserSchema = z.object({
    reason: z.string().max(500),
    duration: z.enum(['permanent', '1d', '7d', '30d']),
});

type BanUserFormValues = z.infer<typeof banUserSchema>;

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
                <BanUserForm user={user} onDone={() => onOpenChange(false)} />
            </DialogContent>
        </Dialog>
    );
}

interface BanUserFormProps {
    user: AdminUser;
    onDone: () => void;
}

function BanUserForm({ user, onDone }: BanUserFormProps) {
    const { mutate: banUser, isPending } = useBanUser();

    const form = useForm<BanUserFormValues>({
        resolver: zodResolver(banUserSchema),
        defaultValues: { reason: '', duration: 'permanent' },
    });

    const onSubmit = (values: BanUserFormValues) =>
        banUser(
            {
                userId: user.id,
                banReason: values.reason.trim() || undefined,
                banExpiresIn: durations.find((d) => d.value === values.duration)
                    ?.seconds,
            },
            {
                onSuccess: () => {
                    toast.success('User banned');
                    onDone();
                },
                onError: (err) =>
                    toast.error(err.message || 'Failed to ban user'),
            }
        );

    return (
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
                <FormTextareaField
                    control={form.control}
                    name="reason"
                    label="Reason (optional)"
                    rows={3}
                />
                <FormSelectField
                    control={form.control}
                    name="duration"
                    label="Duration"
                    options={durations}
                />

                <DialogFooter>
                    <Button type="button" variant="outline" onClick={onDone}>
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        variant="destructive"
                        disabled={isPending}
                    >
                        {isPending ? 'Banning...' : 'Ban User'}
                    </Button>
                </DialogFooter>
            </FieldGroup>
        </form>
    );
}
