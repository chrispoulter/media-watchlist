import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FormInputField } from '@/components/form/form-input-field';
import { Button } from '@/components/ui/button';
import { FieldGroup } from '@/components/ui/field';

const recoveryCodeSchema = z.object({
    code: z.string().min(1, 'Recovery code is required'),
});

export type RecoveryCodeFormValues = z.infer<typeof recoveryCodeSchema>;

interface RecoveryCodeFormProps {
    loading?: boolean;
    onSubmit: (values: RecoveryCodeFormValues) => void;
    onUseAuthenticator: () => void;
}

export function RecoveryCodeForm({
    loading,
    onSubmit,
    onUseAuthenticator,
}: RecoveryCodeFormProps) {
    const form = useForm<RecoveryCodeFormValues>({
        resolver: zodResolver(recoveryCodeSchema),
        defaultValues: { code: '' },
    });

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

                <Button type="submit" disabled={loading}>
                    {loading ? 'Verifying...' : 'Verify'}
                </Button>
                <Button
                    type="button"
                    variant="link"
                    onClick={onUseAuthenticator}
                >
                    Use Authenticator App Instead
                </Button>
            </FieldGroup>
        </form>
    );
}
