import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FormInputField } from '@/components/form/form-input-field';
import { Button } from '@/components/ui/button';
import { FieldGroup } from '@/components/ui/field';

const registerSchema = z
    .object({
        name: z.string().min(1, 'Name is required'),
        email: z.email('Invalid email address'),
        password: z.string().min(8, 'Password must be at least 8 characters'),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Passwords do not match',
        path: ['confirmPassword'],
    });

export type RegisterFormValues = z.infer<typeof registerSchema>;

interface RegisterFormProps {
    loading?: boolean;
    onSubmit: (values: RegisterFormValues) => void;
}

export function RegisterForm({ loading, onSubmit }: RegisterFormProps) {
    const form = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
    });

    return (
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
                <FormInputField
                    control={form.control}
                    name="name"
                    label="Name"
                    placeholder="John Smith"
                    autoComplete="name"
                />

                <FormInputField
                    control={form.control}
                    name="email"
                    label="Email"
                    type="email"
                    placeholder="john@example.com"
                    autoComplete="email"
                />

                <FormInputField
                    control={form.control}
                    name="password"
                    label="Password"
                    type="password"
                    placeholder="••••••••"
                    autoComplete="new-password"
                />

                <FormInputField
                    control={form.control}
                    name="confirmPassword"
                    label="Confirm password"
                    type="password"
                    placeholder="••••••••"
                    autoComplete="new-password"
                />

                <Button type="submit" disabled={loading}>
                    {loading ? 'Creating Account...' : 'Create Account'}
                </Button>
            </FieldGroup>
        </form>
    );
}
