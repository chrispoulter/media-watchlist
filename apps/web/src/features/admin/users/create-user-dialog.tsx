import { useState } from 'react';
import { toast } from 'sonner';
import { UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { useCreateUser } from '../admin-queries';
import { CreateUserForm, type CreateUserFormValues } from './create-user-form';

export function CreateUserDialog() {
    const [isOpen, setIsOpen] = useState(false);
    const { mutate: createUser, isPending } = useCreateUser();

    const onSubmit = (values: CreateUserFormValues) =>
        createUser(values, {
            onSuccess: () => {
                toast.success('User created');
                setIsOpen(false);
            },
            onError: (err) =>
                toast.error(err.message || 'Failed to create user'),
        });

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
                <CreateUserForm
                    loading={isPending}
                    onSubmit={onSubmit}
                    onCancel={() => setIsOpen(false)}
                />
            </DialogContent>
        </Dialog>
    );
}
