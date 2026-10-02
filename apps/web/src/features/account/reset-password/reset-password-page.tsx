import { Link } from 'react-router';
import { Metadata } from '@/components/metadata';
import { AccountLayout } from '../account-layout';
import { ResetPasswordForm } from './reset-password-form';

export function ResetPasswordPage() {
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

            <ResetPasswordForm />
        </AccountLayout>
    );
}
