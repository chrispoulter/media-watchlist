import { useId } from 'react';
import {
    Controller,
    type Control,
    type FieldPath,
    type FieldValues,
} from 'react-hook-form';
import { Textarea } from '@/components/ui/textarea';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';

type FormTextareaFieldProps<T extends FieldValues> = {
    control: Control<T>;
    name: FieldPath<T>;
    label: React.ReactNode;
} & Omit<
    React.ComponentProps<typeof Textarea>,
    'name' | 'id' | 'value' | 'onChange' | 'onBlur' | 'ref'
>;

export function FormTextareaField<T extends FieldValues>({
    control,
    name,
    label,
    ...textareaProps
}: FormTextareaFieldProps<T>) {
    const id = useId();

    const errorId = `${id}-error`;

    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={id}>{label}</FieldLabel>
                    <Textarea
                        id={id}
                        aria-invalid={fieldState.invalid}
                        aria-describedby={
                            fieldState.invalid ? errorId : undefined
                        }
                        {...textareaProps}
                        {...field}
                    />
                    {fieldState.invalid && (
                        <FieldError id={errorId} errors={[fieldState.error]} />
                    )}
                </Field>
            )}
        />
    );
}
