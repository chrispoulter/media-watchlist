import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { FormInputField } from '@/components/form/form-input-field';
import { Button } from '@/components/ui/button';
import { FieldGroup } from '@/components/ui/field';
import { useGenerateRecoveryCodes } from '../../profile-queries';

const generateRecoveryCodesSchema = z.object({
    password: z.string().min(1, 'Password is required'),
});

type GenerateRecoveryCodesFormValues = z.infer<typeof generateRecoveryCodesSchema>;

interface TwoFactorConfirmRecoveryCodesProps {
    onRegenerated: (newCodes: string[]) => void;
    onCancel: () => void;
}

export function TwoFactorConfirmRecoveryCodes({
    onRegenerated,
    onCancel,
}: TwoFactorConfirmRecoveryCodesProps) {
    const { mutateAsync: generateRecoveryCodes, isPending } =
        useGenerateRecoveryCodes();

    const form = useForm<GenerateRecoveryCodesFormValues>({
        resolver: zodResolver(generateRecoveryCodesSchema),
        defaultValues: { password: '' },
    });

    const onSubmit = async (values: GenerateRecoveryCodesFormValues) => {
        const result = await generateRecoveryCodes(values.password);

        if (result.error) {
            toast.error(
                result.error.message ?? 'Failed to regenerate recovery codes'
            );
            return;
        }

        onRegenerated(result.data?.backupCodes ?? []);
    };

    return (
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
                <FormInputField
                    control={form.control}
                    name="password"
                    label="Confirm with your password"
                    type="password"
                    placeholder="••••••••"
                    autoComplete="current-password"
                />

                <div className="flex flex-col-reverse gap-2 sm:flex-row">
                    <Button type="button" variant="outline" onClick={onCancel}>
                        Cancel
                    </Button>
                    <Button type="submit" disabled={isPending}>
                        {isPending ? 'Regenerating...' : 'Regenerate Codes'}
                    </Button>
                </div>
            </FieldGroup>
        </form>
    );
}
