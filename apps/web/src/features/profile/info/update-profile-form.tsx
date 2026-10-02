import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { FormInputField } from '@/components/form/form-input-field';
import { Button } from '@/components/ui/button';
import { FieldGroup } from '@/components/ui/field';
import { authClient } from '@/lib/auth-client';
import { useUpdateUser } from '../profile-queries';

const updateProfileSchema = z.object({
    name: z.string().min(1, 'Name is required'),
});

type UpdateProfileFormValues = z.infer<typeof updateProfileSchema>;

export function UpdateProfileForm() {
    const { data: session } = authClient.useSession();
    const { mutate: updateUser, isPending } = useUpdateUser();

    const user = session?.user;

    const form = useForm<UpdateProfileFormValues>({
        resolver: zodResolver(updateProfileSchema),
        defaultValues: {
            name: user?.name ?? '',
        },
    });

    const onSubmit = (values: UpdateProfileFormValues) =>
        updateUser(
            { name: values.name },
            {
                onSuccess: () => toast.success('Profile updated'),
                onError: (err) =>
                    toast.error(err.message || 'Failed to update profile'),
            }
        );

    return (
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
                <FormInputField
                    control={form.control}
                    name="name"
                    label="Name"
                    autoComplete="name"
                />

                <div className="flex flex-col-reverse gap-2 sm:flex-row">
                    <Button type="submit" disabled={isPending}>
                        {isPending ? 'Saving...' : 'Save Changes'}
                    </Button>
                </div>
            </FieldGroup>
        </form>
    );
}
