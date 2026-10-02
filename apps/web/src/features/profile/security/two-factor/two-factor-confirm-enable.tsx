import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { FormInputField } from '@/components/form/form-input-field';
import { Button } from '@/components/ui/button';
import { FieldGroup } from '@/components/ui/field';
import { useEnableTwoFactor } from '../../profile-queries';

const enableTwoFactorSchema = z.object({
    password: z.string().min(1, 'Password is required'),
});

type EnableTwoFactorFormValues = z.infer<typeof enableTwoFactorSchema>;

interface TwoFactorConfirmEnableProps {
    onTotpSetup: (totpUri: string, recoveryCodes: string[]) => void;
    onCancel: () => void;
}

export function TwoFactorConfirmEnable({
    onTotpSetup,
    onCancel,
}: TwoFactorConfirmEnableProps) {
    const { mutate: enableTwoFactor, isPending } = useEnableTwoFactor();

    const form = useForm<EnableTwoFactorFormValues>({
        resolver: zodResolver(enableTwoFactorSchema),
        defaultValues: { password: '' },
    });

    const onSubmit = (values: EnableTwoFactorFormValues) =>
        enableTwoFactor(values.password, {
            onSuccess: (data) => {
                if (data.method === 'totp') {
                    onTotpSetup(data.totpURI, data.backupCodes);
                }
            },
            onError: (err) =>
                toast.error(err.message || 'Failed to enable 2FA'),
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
                    <Button type="submit" disabled={isPending}>
                        {isPending ? 'Continuing...' : 'Continue'}
                    </Button>
                </div>
            </FieldGroup>
        </form>
    );
}
