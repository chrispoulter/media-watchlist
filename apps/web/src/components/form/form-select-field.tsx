import { useId } from 'react';
import {
    Controller,
    type Control,
    type FieldPath,
    type FieldValues,
} from 'react-hook-form';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

interface FormSelectFieldProps<T extends FieldValues> {
    control: Control<T>;
    name: FieldPath<T>;
    label: React.ReactNode;
    options: readonly { value: string; label: React.ReactNode }[];
}

export function FormSelectField<T extends FieldValues>({
    control,
    name,
    label,
    options,
}: FormSelectFieldProps<T>) {
    const id = useId();

    const errorId = `${id}-error`;

    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={id}>{label}</FieldLabel>
                    <Select
                        name={field.name}
                        value={field.value}
                        onValueChange={field.onChange}
                    >
                        <SelectTrigger
                            id={id}
                            ref={field.ref}
                            onBlur={field.onBlur}
                            aria-invalid={fieldState.invalid}
                            aria-describedby={
                                fieldState.invalid ? errorId : undefined
                            }
                            className="w-full"
                        >
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {options.map((option) => (
                                <SelectItem
                                    key={option.value}
                                    value={option.value}
                                >
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {fieldState.invalid && (
                        <FieldError id={errorId} errors={[fieldState.error]} />
                    )}
                </Field>
            )}
        />
    );
}
