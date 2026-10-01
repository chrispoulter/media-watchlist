import { Metadata } from '@/components/metadata';
import { AccountLayout, AccountLink } from '../account-layout';
import { ForgotPasswordForm } from './forgot-password-form';

export function ForgotPasswordPage() {
    return (
        <AccountLayout
            title="Forgot Your Password?"
            description="Enter your email and we'll send you a reset link"
            footer={<AccountLink to="/login">Back to sign in</AccountLink>}
        >
            <Metadata title="Forgot Password" />

            <ForgotPasswordForm />
        </AccountLayout>
    );
}
