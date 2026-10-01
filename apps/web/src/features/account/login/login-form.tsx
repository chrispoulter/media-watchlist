import { useNavigate, useLocation, Link } from 'react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { FormCheckboxField } from '@/components/form/form-checkbox-field';
import { FormInputField } from '@/components/form/form-input-field';
import { Button } from '@/components/ui/button';
import { FieldGroup } from '@/components/ui/field';
import { useSignIn } from '../account-queries';

const loginSchema = z.object({
    email: z.email('Invalid email address'),
    password: z.string().min(1, 'Password is required'),
    rememberMe: z.boolean(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm() {
    const navigate = useNavigate();
    const location = useLocation();
    const { mutateAsync: signIn, isPending } = useSignIn();

    const from = location.state?.from?.pathname ?? '/';

    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: { email: '', password: '', rememberMe: false },
    });

    const onSubmit = async (values: LoginFormValues) => {
        const { error } = await signIn(values);

        if (error) {
            toast.error(error.message ?? 'Sign in failed');
            return;
        }

        await navigate(from, { replace: true });
    };

    return (
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
                <FormInputField
                    control={form.control}
                    name="email"
                    label="Email"
                    type="email"
                    placeholder="john@example.com"
                    autoComplete="username"
                />

                <FormInputField
                    control={form.control}
                    name="password"
                    label="Password"
                    type="password"
                    placeholder="••••••••"
                    autoComplete="current-password"
                />

                <div className="flex items-center justify-between">
                    <FormCheckboxField
                        control={form.control}
                        name="rememberMe"
                        label="Remember me"
                    />
                    <Link
                        to="/forgot-password"
                        className="text-sm whitespace-nowrap text-muted-foreground underline-offset-4 hover:underline"
                    >
                        Forgot password?
                    </Link>
                </div>

                <Button type="submit" disabled={isPending}>
                    {isPending ? 'Signing In...' : 'Sign In'}
                </Button>
            </FieldGroup>
        </form>
    );
}
