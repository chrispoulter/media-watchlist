import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { FormInputField } from '@/components/form/form-input-field';
import { Button } from '@/components/ui/button';
import { FieldGroup } from '@/components/ui/field';
import { useSignUp } from '../account-queries';

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

type RegisterFormValues = z.infer<typeof registerSchema>;

export function RegisterForm() {
    const navigate = useNavigate();
    const { mutate: signUp, isPending } = useSignUp();

    const form = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
    });

    const onSubmit = (values: RegisterFormValues) =>
        signUp(
            {
                email: values.email,
                password: values.password,
                name: values.name,
            },
            {
                onSuccess: async () => {
                    toast.success('Account created! Welcome.');
                    await navigate('/');
                },
                onError: (err) =>
                    toast.error(err.message || 'Registration failed'),
            }
        );

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

                <Button type="submit" disabled={isPending}>
                    {isPending ? 'Creating Account...' : 'Create Account'}
                </Button>
            </FieldGroup>
        </form>
    );
}
