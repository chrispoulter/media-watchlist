import { Link, useNavigate } from 'react-router';
import { toast } from 'sonner';
import { Separator } from '@/components/ui/separator';
import { Metadata } from '@/components/metadata';
import { useSignUp } from '../account-queries';
import { AccountLayout } from '../account-layout';
import { SocialLoginButtons } from '../social-login-buttons';
import { RegisterForm, type RegisterFormValues } from './register-form';

export function RegisterPage() {
    const navigate = useNavigate();
    const { mutate: signUp, isPending } = useSignUp();

    const onSubmit = ({ name, email, password }: RegisterFormValues) =>
        signUp(
            { email, password, name },
            {
                onSuccess: async () => {
                    await navigate('/');
                },
                onError: (err) =>
                    toast.error(err.message || 'Registration failed'),
            }
        );

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

            <RegisterForm loading={isPending} onSubmit={onSubmit} />
        </AccountLayout>
    );
}
