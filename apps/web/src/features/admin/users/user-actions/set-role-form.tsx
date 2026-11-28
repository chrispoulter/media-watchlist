import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';
import { FieldGroup } from '@/components/ui/field';
import { FormSelectField } from '@/components/form/form-select-field';
import { roleOptions } from '../user-utils';

const setRoleSchema = z.object({
    role: z.enum(['user', 'admin']),
});

export type SetRoleFormValues = z.infer<typeof setRoleSchema>;

interface SetRoleFormProps {
    defaultValues: SetRoleFormValues;
    loading?: boolean;
    onSubmit: (values: SetRoleFormValues) => void;
    onCancel: () => void;
}

export function SetRoleForm({
    defaultValues,
    loading,
    onSubmit,
    onCancel,
}: SetRoleFormProps) {
    const form = useForm<SetRoleFormValues>({
        resolver: zodResolver(setRoleSchema),
        defaultValues,
    });

    return (
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
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
                        {loading ? 'Saving...' : 'Save'}
                    </Button>
                </DialogFooter>
            </FieldGroup>
        </form>
    );
}
