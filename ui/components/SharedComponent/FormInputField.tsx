import { Control, FieldValues, Path } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";

interface FormInputFieldProps<T extends FieldValues> {
  label: string;
  type: string;
  placeholder?: string;
  name: Path<T>;
  control: Control<T>;
  disabled: boolean;
}

const FormInputField = <T extends FieldValues>({
  label,
  type,
  placeholder,
  control,
  disabled,
  name,
}: FormInputFieldProps<T>) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel>{label}</FormLabel>
        <FormControl>
          <Input
            {...field}
            placeholder={placeholder}
            type={type}
            disabled={disabled}
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);

export default FormInputField;
