import { Link } from 'react-router';
import { Separator } from '@/components/ui/separator';
import { Metadata } from '@/components/metadata';
import { AccountLayout } from '../account-layout';
import { SocialLoginButtons } from '../social-login-buttons';
import { RegisterForm } from './register-form';

export function RegisterPage() {
    return (
        <AccountLayout
            title="Create an Account"
            description="Enter your details to get started"
            className="max-w-md"
            footer={
                <>
                    Already have an account?{' '}
                    <Link
                        className="underline underline-offset-4 hover:text-foreground"
                        to="/login"
                    >
                        Sign in
                    </Link>
                </>
            }
        >
            <Metadata title="Register" />

            <SocialLoginButtons />

            <div className="relative">
                <Separator />
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-2 text-xs text-muted-foreground">
                    or
                </span>
            </div>

            <RegisterForm />
        </AccountLayout>
    );
}
