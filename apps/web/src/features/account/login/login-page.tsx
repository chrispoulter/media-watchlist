import { Separator } from '@/components/ui/separator';
import { Metadata } from '@/components/metadata';
import { AccountLayout, AccountLink } from '../account-layout';
import { SocialLoginButtons } from '../social-login-buttons';
import { LoginForm } from './login-form';

export function LoginPage() {
    return (
        <AccountLayout
            title="Welcome Back"
            description="Sign in to your account"
            className="max-w-md"
            footer={
                <>
                    Don't have an account?{' '}
                    <AccountLink to="/register">Sign up</AccountLink>
                </>
            }
        >
            <Metadata title="Sign In" />

            <SocialLoginButtons />

            <div className="relative">
                <Separator />
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-2 text-xs text-muted-foreground">
                    or
                </span>
            </div>

            <LoginForm />
        </AccountLayout>
    );
}
