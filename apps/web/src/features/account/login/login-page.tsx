import { Link, useLocation, useNavigate } from 'react-router';
import { toast } from 'sonner';
import { Separator } from '@/components/ui/separator';
import { Metadata } from '@/components/metadata';
import { useSignIn } from '../account-queries';
import { AccountLayout } from '../account-layout';
import { SocialLoginButtons } from '../social-login-buttons';
import { LoginForm, type LoginFormValues } from './login-form';

export function LoginPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const { mutate: signIn, isPending } = useSignIn();

    const from = location.state?.from ?? '/';

    const onSubmit = (values: LoginFormValues) =>
        signIn(values, {
            onSuccess: async (data) => {
                if ('twoFactorRedirect' in data && data.twoFactorRedirect) {
                    await navigate('/two-factor', { state: { from } });
                    return;
                }

                await navigate(from, { replace: true });
            },
            onError: (err) => toast.error(err.message || 'Sign in failed'),
        });

    return (
        <AccountLayout
            title="Welcome Back"
            description="Sign in to your account"
            className="max-w-md"
            footer={
                <>
                    Don't have an account?{' '}
                    <Link
                        className="underline underline-offset-4 hover:text-foreground"
                        to="/register"
                    >
                        Sign up
                    </Link>
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

            <LoginForm loading={isPending} onSubmit={onSubmit} />
        </AccountLayout>
    );
}
