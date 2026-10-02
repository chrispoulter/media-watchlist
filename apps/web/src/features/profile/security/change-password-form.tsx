import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { FormInputField } from '@/components/form/form-input-field';
import { Button } from '@/components/ui/button';
import { FieldGroup } from '@/components/ui/field';
import { useChangePassword } from '../profile-queries';

const changePasswordSchema = z
    .object({
        currentPassword: z.string().min(1, 'Current password is required'),
        newPassword: z
            .string()
            .min(8, 'Password must be at least 8 characters'),
        confirmPassword: z.string(),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: 'Passwords do not match',
        path: ['confirmPassword'],
    });

type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>;

export function ChangePasswordForm() {
    const { mutate: changePassword, isPending } = useChangePassword();

    const form = useForm<ChangePasswordFormValues>({
        resolver: zodResolver(changePasswordSchema),
        defaultValues: {
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
        },
    });

    const onSubmit = (values: ChangePasswordFormValues) =>
        changePassword(
            {
                currentPassword: values.currentPassword,
                newPassword: values.newPassword,
            },
            {
                onSuccess: () => {
                    toast.success('Password changed successfully');
                    form.reset();
                },
                onError: (err) =>
                    toast.error(err.message || 'Failed to change password'),
            }
        );

    return (
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
                <FormInputField
                    control={form.control}
                    name="currentPassword"
                    label="Current password"
                    type="password"
                    placeholder="••••••••"
                    autoComplete="current-password"
                />

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

                <div className="flex flex-col-reverse gap-2 sm:flex-row">
                    <Button type="submit" disabled={isPending}>
                        {isPending ? 'Changing...' : 'Change Password'}
                    </Button>
                </div>
            </FieldGroup>
        </form>
    );
}
