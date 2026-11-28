import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';
import { FieldGroup } from '@/components/ui/field';
import { FormSelectField } from '@/components/form/form-select-field';
import { FormTextareaField } from '@/components/form/form-textarea-field';
import { banDurations } from '../user-utils';

const banUserSchema = z.object({
    reason: z.string().max(500),
    duration: z.enum(['permanent', '1d', '7d', '30d']),
});

export type BanUserFormValues = z.infer<typeof banUserSchema>;

interface BanUserFormProps {
    loading?: boolean;
    onSubmit: (values: BanUserFormValues) => void;
    onCancel: () => void;
}

export function BanUserForm({ loading, onSubmit, onCancel }: BanUserFormProps) {
    const form = useForm<BanUserFormValues>({
        resolver: zodResolver(banUserSchema),
        defaultValues: { reason: '', duration: 'permanent' },
    });

    return (
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
                <FormTextareaField
                    control={form.control}
                    name="reason"
                    label="Reason (optional)"
                    rows={3}
                />
                <FormSelectField
                    control={form.control}
                    name="duration"
                    label="Duration"
                    options={banDurations}
                />

                <DialogFooter>
                    <Button type="button" variant="outline" onClick={onCancel}>
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        variant="destructive"
                        disabled={loading}
                    >
                        {loading ? 'Banning...' : 'Ban User'}
                    </Button>
                </DialogFooter>
            </FieldGroup>
        </form>
    );
}
