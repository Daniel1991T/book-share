import { Control } from "react-hook-form";
import { FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { HTMLInputTypeAttribute } from "react";

type RegisterInputFieldProps = {
  form: {
    control: Control<
      {
        email: string;
        password: string;
        name: string;
        surname: string;
        phone: string;
        country: string;
        city: string;
      },
      any
    >; // Type this according to your form library
  };
  name:
    | "email"
    | "password"
    | "name"
    | "surname"
    | "phone"
    | "country"
    | "city";
  placeholder: string;
  typeInput: HTMLInputTypeAttribute | undefined;
};

const RegisterInputField: React.FC<RegisterInputFieldProps> = ({
  form,
  name,
  placeholder,
  typeInput,
}) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Input
              formNoValidate={name === "email"}
              type={typeInput}
              className="rounded-full"
              placeholder={placeholder}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default RegisterInputField;
