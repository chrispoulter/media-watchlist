import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { FormOtpField } from '@/components/form/form-otp-field';
import { Button } from '@/components/ui/button';
import { FieldGroup } from '@/components/ui/field';
import { useVerifyTotpLogin } from '../account-queries';

const twoFactorSchema = z.object({
    code: z.string().length(6, 'Code must be 6 digits'),
});

type TwoFactorFormValues = z.infer<typeof twoFactorSchema>;

interface TwoFactorFormProps {
    onBack?: () => void;
}

export function TwoFactorForm({ onBack }: TwoFactorFormProps) {
    const navigate = useNavigate();
    const { mutateAsync: verifyTotp, isPending } = useVerifyTotpLogin();

    const form = useForm<TwoFactorFormValues>({
        resolver: zodResolver(twoFactorSchema),
        defaultValues: { code: '' },
        // HACK: prevent RHF from auto-focusing the first invalid field on submit, which breaks error state render
        shouldFocusError: false,
    });

    const onSubmit = async (values: TwoFactorFormValues) => {
        const { error } = await verifyTotp(values.code);

        if (error) {
            toast.error(error.message ?? 'Invalid code');
            return;
        }

        await navigate('/');
    };

    return (
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
                <FormOtpField
                    control={form.control}
                    name="code"
                    label="Authentication code"
                    autoFocus
                    className="items-center *:w-auto"
                />

                <Button type="submit" disabled={isPending}>
                    {isPending ? 'Verifying...' : 'Verify'}
                </Button>
                <Button type="button" variant="link" onClick={onBack}>
                    Use Recovery Code Instead
                </Button>
            </FieldGroup>
        </form>
    );
}
