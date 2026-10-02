import { Link } from 'react-router';
import { Metadata } from '@/components/metadata';
import { AccountLayout } from '../account-layout';
import { ForgotPasswordForm } from './forgot-password-form';

export function ForgotPasswordPage() {
    return (
        <AccountLayout
            title="Forgot Your Password?"
            description="Enter your email and we'll send you a reset link"
            footer={
                <Link
                    className="underline underline-offset-4 hover:text-foreground"
                    to="/login"
                >
                    Back to sign in
                </Link>
            }
        >
            <Metadata title="Forgot Password" />

            <ForgotPasswordForm />
        </AccountLayout>
    );
}
