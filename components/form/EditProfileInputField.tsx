import { EditProfileInputType } from "@/lib/validations";
import { FC } from "react";
import { UseFormReturn } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";

type EditProfileInputFieldProps = {
  form: UseFormReturn<
    {
      name: string;
      surname: string;
      phone: string;
      bio: string;
      country: string;
      city: string;
    },
    any,
    undefined
  >;
  name: EditProfileInputType;
  placeholder: string;
  label: string;
  autocomplete?: string;
};

const EditProfileInputField: FC<EditProfileInputFieldProps> = ({
  form,
  label,
  name,
  placeholder,
  autocomplete,
}) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel htmlFor={field.name}>{label}</FormLabel>
          <FormControl>
            <Input
              id={field.name}
              type="text"
              className="rounded-full"
              placeholder={placeholder}
              autoComplete={autocomplete || "off"}
              {...field}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
};
export default EditProfileInputField;
