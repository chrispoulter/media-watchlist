import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';
import { FieldGroup } from '@/components/ui/field';
import { FormInputField } from '@/components/form/form-input-field';
import { FormSelectField } from '@/components/form/form-select-field';
import { roleOptions } from './user-utils';

const createUserSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.email('Enter a valid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    role: z.enum(['user', 'admin']),
});

export type CreateUserFormValues = z.infer<typeof createUserSchema>;

interface CreateUserFormProps {
    loading?: boolean;
    onSubmit: (values: CreateUserFormValues) => void;
    onCancel: () => void;
}

export function CreateUserForm({
    loading,
    onSubmit,
    onCancel,
}: CreateUserFormProps) {
    const form = useForm<CreateUserFormValues>({
        resolver: zodResolver(createUserSchema),
        defaultValues: { name: '', email: '', password: '', role: 'user' },
    });

    return (
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
                <FormInputField
                    control={form.control}
                    name="name"
                    label="Name"
                    autoComplete="off"
                />
                <FormInputField
                    control={form.control}
                    name="email"
                    label="Email"
                    type="email"
                    autoComplete="off"
                />
                <FormInputField
                    control={form.control}
                    name="password"
                    label="Password"
                    type="password"
                    autoComplete="new-password"
                />
                <FormSelectField
                    control={form.control}
                    name="role"
                    label="Role"
                    options={roleOptions}
                />

                <DialogFooter>
                    <Button type="button" variant="outline" onClick={onCancel}>
                        Cancel
                    </Button>
                    <Button type="submit" disabled={loading}>
                        {loading ? 'Creating...' : 'Create'}
                    </Button>
                </DialogFooter>
            </FieldGroup>
        </form>
    );
}
