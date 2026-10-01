import { useNavigate, useLocation } from 'react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { FormInputField } from '@/components/form/form-input-field';
import { Button } from '@/components/ui/button';
import { FieldGroup } from '@/components/ui/field';
import { useVerifyRecoveryCode } from '../account-queries';

const recoveryCodeSchema = z.object({
    code: z.string().min(1, 'Recovery code is required'),
});

type RecoveryCodeFormValues = z.infer<typeof recoveryCodeSchema>;

interface RecoveryCodeFormProps {
    onBack?: () => void;
}

export function RecoveryCodeForm({ onBack }: RecoveryCodeFormProps) {
    const navigate = useNavigate();
    const location = useLocation();

    const { mutateAsync: verifyRecoveryCode, isPending } =
        useVerifyRecoveryCode();

    const form = useForm<RecoveryCodeFormValues>({
        resolver: zodResolver(recoveryCodeSchema),
        defaultValues: { code: '' },
    });

    const onSubmit = async (values: RecoveryCodeFormValues) => {
        const { error } = await verifyRecoveryCode(values.code);

        if (error) {
            toast.error(error.message ?? 'Invalid code');
            return;
        }

        await navigate(location.state?.from ?? '/', { replace: true });
    };

    return (
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
                <FormInputField
                    control={form.control}
                    name="code"
                    label="Recovery code"
                    placeholder="xxxxx-xxxxx"
                    autoFocus
                    autoComplete="off"
                />

                <Button type="submit" disabled={isPending}>
                    {isPending ? 'Verifying...' : 'Verify'}
                </Button>
                <Button type="button" variant="link" onClick={onBack}>
                    Use Authenticator App Instead
                </Button>
            </FieldGroup>
        </form>
    );
}
