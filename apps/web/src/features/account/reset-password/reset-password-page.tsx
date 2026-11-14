import { Link, useNavigate, useSearchParams } from 'react-router';
import { toast } from 'sonner';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Metadata } from '@/components/metadata';
import { useResetPassword } from '../account-queries';
import { AccountLayout } from '../account-layout';
import {
    ResetPasswordForm,
    type ResetPasswordFormValues,
} from './reset-password-form';

export function ResetPasswordPage() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { mutate: resetPassword, isPending } = useResetPassword();

    const token = searchParams.get('token') ?? '';

    const onSubmit = (values: ResetPasswordFormValues) =>
        resetPassword(
            { newPassword: values.newPassword, token },
            {
                onSuccess: async () => {
                    toast.success(
                        'Password reset successfully. Please sign in.'
                    );
                    await navigate('/login');
                },
                onError: (err) =>
                    toast.error(err.message || 'Failed to reset password'),
            }
        );

    return (
        <AccountLayout
            title="Reset your password"
            description="Enter your new password below"
            footer={
                <Link
                    className="underline underline-offset-4 hover:text-foreground"
                    to="/login"
                >
                    Back to sign in
                </Link>
            }
        >
            <Metadata title="Reset Password" />

            {token ? (
                <ResetPasswordForm loading={isPending} onSubmit={onSubmit} />
            ) : (
                <Alert variant="destructive">
                    <AlertDescription>
                        Invalid or expired reset link. Please request a new one.
                    </AlertDescription>
                </Alert>
            )}
        </AccountLayout>
    );
}
