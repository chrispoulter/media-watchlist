import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';
import { FieldGroup } from '@/components/ui/field';
import { FormInputField } from '@/components/form/form-input-field';

const editUserSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.email('Enter a valid email address'),
});

export type EditUserFormValues = z.infer<typeof editUserSchema>;

interface EditUserFormProps {
    defaultValues: EditUserFormValues;
    loading?: boolean;
    onSubmit: (values: EditUserFormValues) => void;
    onCancel: () => void;
}

export function EditUserForm({
    defaultValues,
    loading,
    onSubmit,
    onCancel,
}: EditUserFormProps) {
    const form = useForm<EditUserFormValues>({
        resolver: zodResolver(editUserSchema),
        defaultValues,
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

                <DialogFooter>
                    <Button type="button" variant="outline" onClick={onCancel}>
                        Cancel
                    </Button>
                    <Button type="submit" disabled={loading}>
                        {loading ? 'Saving...' : 'Save Changes'}
                    </Button>
                </DialogFooter>
            </FieldGroup>
        </form>
    );
}
