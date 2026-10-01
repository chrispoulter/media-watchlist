import { Metadata } from '@/components/metadata';
import { AccountLayout, AccountLink } from '../account-layout';
import { ResetPasswordForm } from './reset-password-form';

export function ResetPasswordPage() {
    return (
        <AccountLayout
            title="Reset your password"
            description="Enter your new password below"
            footer={<AccountLink to="/login">Back to sign in</AccountLink>}
        >
            <Metadata title="Reset Password" />

            <ResetPasswordForm />
        </AccountLayout>
    );
}
