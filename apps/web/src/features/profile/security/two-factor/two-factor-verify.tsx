import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { FormOtpField } from '@/components/form/form-otp-field';
import { Button } from '@/components/ui/button';
import { FieldGroup } from '@/components/ui/field';
import { useVerifyTotpSetup } from '../../profile-queries';

const verifyTotpSchema = z.object({
    code: z.string().length(6, 'Code must be 6 digits'),
});

type VerifyTotpFormValues = z.infer<typeof verifyTotpSchema>;

interface TwoFactorVerifyProps {
    onSuccess: () => void;
    onCancel: () => void;
}

export function TwoFactorVerify({ onSuccess, onCancel }: TwoFactorVerifyProps) {
    const { mutate: verifyTotp, isPending } = useVerifyTotpSetup();

    const form = useForm<VerifyTotpFormValues>({
        resolver: zodResolver(verifyTotpSchema),
        defaultValues: { code: '' },
        // HACK: prevent RHF from auto-focusing the first invalid field on submit, which breaks error state render
        shouldFocusError: false,
    });

    const onSubmit = (values: VerifyTotpFormValues) =>
        verifyTotp(values.code, {
            onSuccess: () => {
                toast.success('Two-factor authentication enabled');
                onSuccess();
            },
            onError: (err) => toast.error(err.message || 'Invalid code'),
        });

    return (
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
                <FormOtpField
                    control={form.control}
                    name="code"
                    label="Enter the 6-digit code from your app"
                    autoFocus
                />

                <div className="flex flex-col-reverse gap-2 sm:flex-row">
                    <Button type="button" variant="outline" onClick={onCancel}>
                        Back
                    </Button>
                    <Button type="submit" disabled={isPending}>
                        {isPending ? 'Verifying...' : 'Verify & Enable'}
                    </Button>
                </div>
            </FieldGroup>
        </form>
    );
}
