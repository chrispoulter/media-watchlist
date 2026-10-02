import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { FormInputField } from '@/components/form/form-input-field';
import { Button } from '@/components/ui/button';
import { FieldGroup } from '@/components/ui/field';
import { useDisableTwoFactor } from '../../profile-queries';

const disableTwoFactorSchema = z.object({
    password: z.string().min(1, 'Password is required'),
});

type DisableTwoFactorFormValues = z.infer<typeof disableTwoFactorSchema>;

interface TwoFactorConfirmDisableProps {
    onDisabled: () => void;
    onCancel: () => void;
}

export function TwoFactorConfirmDisable({
    onDisabled,
    onCancel,
}: TwoFactorConfirmDisableProps) {
    const { mutate: disableTwoFactor, isPending } = useDisableTwoFactor();

    const form = useForm<DisableTwoFactorFormValues>({
        resolver: zodResolver(disableTwoFactorSchema),
        defaultValues: { password: '' },
    });

    const onSubmit = (values: DisableTwoFactorFormValues) =>
        disableTwoFactor(values.password, {
            onSuccess: () => {
                toast.success('Two-factor authentication disabled');
                onDisabled();
            },
            onError: (err) =>
                toast.error(err.message || 'Failed to disable 2FA'),
        });

    return (
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
                <FormInputField
                    control={form.control}
                    name="password"
                    label="Confirm with your password"
                    type="password"
                    placeholder="••••••••"
                    autoComplete="current-password"
                />

                <div className="flex flex-col-reverse gap-2 sm:flex-row">
                    <Button type="button" variant="outline" onClick={onCancel}>
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        variant="destructive"
                        disabled={isPending}
                    >
                        {isPending ? 'Disabling...' : 'Disable 2FA'}
                    </Button>
                </div>
            </FieldGroup>
        </form>
    );
}
