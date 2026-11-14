import { Link } from 'react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FormCheckboxField } from '@/components/form/form-checkbox-field';
import { FormInputField } from '@/components/form/form-input-field';
import { Button } from '@/components/ui/button';
import { FieldGroup } from '@/components/ui/field';

const loginSchema = z.object({
    email: z.email('Invalid email address'),
    password: z.string().min(1, 'Password is required'),
    rememberMe: z.boolean(),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

interface LoginFormProps {
    loading?: boolean;
    onSubmit: (values: LoginFormValues) => void;
}

export function LoginForm({ loading, onSubmit }: LoginFormProps) {
    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: { email: '', password: '', rememberMe: false },
    });

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

                <Button type="submit" disabled={loading}>
                    {loading ? 'Signing In...' : 'Sign In'}
                </Button>
            </FieldGroup>
        </form>
    );
}
