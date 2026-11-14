import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FormInputField } from '@/components/form/form-input-field';
import { Button } from '@/components/ui/button';
import { FieldGroup } from '@/components/ui/field';

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

export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

interface ResetPasswordFormProps {
    loading?: boolean;
    onSubmit: (values: ResetPasswordFormValues) => void;
}

export function ResetPasswordForm({
    loading,
    onSubmit,
}: ResetPasswordFormProps) {
    const form = useForm<ResetPasswordFormValues>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: { newPassword: '', confirmPassword: '' },
    });

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

                <Button type="submit" disabled={loading}>
                    {loading ? 'Resetting...' : 'Reset Password'}
                </Button>
            </FieldGroup>
        </form>
    );
}
