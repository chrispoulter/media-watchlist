import { useSearchParams, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { FormInputField } from '@/components/form/form-input-field';
import { Button } from '@/components/ui/button';
import { FieldGroup } from '@/components/ui/field';
import { useResetPassword } from '../account-queries';

const resetPasswordSchema = z
    .object({
        newPassword: z
            .string()
            .min(8, 'Password must be at least 8 characters'),
        confirmPassword: z.string(),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: 'Passwords do not match',
        path: ['confirmPassword'],
    });

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

export function ResetPasswordForm() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { mutateAsync: resetPassword, isPending } = useResetPassword();

    const token = searchParams.get('token') ?? '';

    const form = useForm<ResetPasswordFormValues>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: { newPassword: '', confirmPassword: '' },
    });

    const onSubmit = async (values: ResetPasswordFormValues) => {
        const { error } = await resetPassword({
            newPassword: values.newPassword,
            token,
        });

        if (error) {
            toast.error(error.message ?? 'Failed to reset password');
            return;
        }

        toast.success('Password reset successfully. Please sign in.');
        await navigate('/login');
    };

    if (!token) {
        return (
            <Alert variant="destructive">
                <AlertDescription>
                    Invalid or expired reset link. Please request a new one.
                </AlertDescription>
            </Alert>
        );
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
                <FormInputField
                    control={form.control}
                    name="newPassword"
                    label="New password"
                    type="password"
                    placeholder="••••••••"
                    autoComplete="new-password"
                />

                <FormInputField
                    control={form.control}
                    name="confirmPassword"
                    label="Confirm new password"
                    type="password"
                    placeholder="••••••••"
                    autoComplete="new-password"
                />

                <Button type="submit" disabled={isPending}>
                    {isPending ? 'Resetting...' : 'Reset Password'}
                </Button>
            </FieldGroup>
        </form>
    );
}
