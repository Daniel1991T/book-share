import { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { HTMLInputTypeAttribute } from "react";
import {
  BookPrice,
  BookSchemaProp,
  ConditionBook,
  GenderBook,
} from "@/lib/validations";
import { Input } from "../ui/input";

type AddBookFieldProps = {
  form: UseFormReturn<
    {
      isGenerate: boolean;
      title: string;
      description: string;
      author: string;
      gender: GenderBook;
      publisher: string;
      publication_year: string;
      language: string;
      print_length: string;
      condition: ConditionBook;
      isFree: BookPrice;
      cover_url: [string, string, string];
      price?: string | undefined;
    },
    any,
    undefined
  >;
  name: BookSchemaProp;
  placeholder: string;
  typeInput: HTMLInputTypeAttribute | undefined;
  label: string;
};

const AddBookInputField: React.FC<AddBookFieldProps> = ({
  form,
  name,
  placeholder,
  typeInput,
  label,
}) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel htmlFor={field.name}>{label}</FormLabel>
          <FormControl>
            <Input
              id={field.name}
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

export default AddBookInputField;
