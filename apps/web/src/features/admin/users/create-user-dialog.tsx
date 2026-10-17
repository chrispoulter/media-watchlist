import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { FieldGroup } from '@/components/ui/field';
import { FormInputField } from '@/components/form/form-input-field';
import { FormSelectField } from '@/components/form/form-select-field';
import { useCreateUser } from '../admin-queries';
import { roleOptions } from './user-utils';

const createUserSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.email('Enter a valid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    role: z.enum(['user', 'admin']),
});

type CreateUserFormValues = z.infer<typeof createUserSchema>;

export function CreateUserDialog() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button>
                    <UserPlus aria-hidden="true" />
                    Create User
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create user</DialogTitle>
                    <DialogDescription>
                        Create a new account with an email and password.
                    </DialogDescription>
                </DialogHeader>
                <CreateUserForm onDone={() => setIsOpen(false)} />
            </DialogContent>
        </Dialog>
    );
}

function CreateUserForm({ onDone }: { onDone: () => void }) {
    const { mutate: createUser, isPending } = useCreateUser();

    const form = useForm<CreateUserFormValues>({
        resolver: zodResolver(createUserSchema),
        defaultValues: { name: '', email: '', password: '', role: 'user' },
    });

    const onSubmit = (values: CreateUserFormValues) =>
        createUser(values, {
            onSuccess: () => {
                toast.success('User created');
                onDone();
            },
            onError: (err) =>
                toast.error(err.message || 'Failed to create user'),
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
                    <Button type="button" variant="outline" onClick={onDone}>
                        Cancel
                    </Button>
                    <Button type="submit" disabled={isPending}>
                        {isPending ? 'Creating...' : 'Create'}
                    </Button>
                </DialogFooter>
            </FieldGroup>
        </form>
    );
}
