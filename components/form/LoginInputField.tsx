import { Control } from "react-hook-form";
import { FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { HTMLInputTypeAttribute } from "react";

type LoginInputFieldProps = {
  form: {
    control: Control<{ email: string; password: string }, any>; // Type this according to your form library
  };
  name: "email" | "password";
  placeholder: string;
  typeInput: HTMLInputTypeAttribute | undefined;
};

const LoginInputField: React.FC<LoginInputFieldProps> = ({
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

export default LoginInputField;
