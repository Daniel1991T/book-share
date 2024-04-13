"use client";

import { EditProfileSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import EditProfileInputField from "./form/EditProfileInputField";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import Image from "next/image";
import { FC, useState } from "react";
import { toast } from "./ui/use-toast";
import { usePathname, useRouter } from "next/navigation";
import { updateUser } from "@/lib/actions/user.actions";

type EditProfileFormProps = {
  clerkId: string;
  user: string;
};

const EditProfileForm: FC<EditProfileFormProps> = ({ clerkId, user }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { name, surname, phone, bio, country, city } = JSON.parse(user);
  const form = useForm<z.infer<typeof EditProfileSchema>>({
    resolver: zodResolver(EditProfileSchema),
    defaultValues: {
      name: name || "",
      surname: surname || "",
      phone: phone || "",
      bio: bio || "",
      country: country || "",
      city: city || "",
    },
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (values: z.infer<typeof EditProfileSchema>) => {
    setIsSubmitting(true);
    try {
      await updateUser({
        clerkId,
        path: pathname,
        updateData: values,
      });
      router.back();
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Something went wrong",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-8 mt-4"
        >
          <div className="flex flex-col w-full gap-3 md:flex-row">
            <EditProfileInputField
              form={form}
              name="name"
              label="Name"
              placeholder="Name"
              autocomplete="given-name"
            />
            <EditProfileInputField
              form={form}
              name="surname"
              label="Surname"
              placeholder="Surname"
              autocomplete="family-name"
            />
          </div>
          <EditProfileInputField
            form={form}
            name="phone"
            label="Phone"
            placeholder="Phone"
            autocomplete="Phone Number"
          />
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="bio">Description</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    id="bio"
                    placeholder="Description"
                    className="w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <EditProfileInputField
            form={form}
            name="country"
            label="Country"
            placeholder="Country"
          />
          <EditProfileInputField
            form={form}
            name="city"
            label="City"
            placeholder="City"
          />
          <Button
            disabled={isSubmitting}
            className="w-full bg-como hover:bg-como/90 rounded-full"
            type="submit"
          >
            {!isSubmitting ? (
              [<span key="1">Submit</span>]
            ) : (
              <div className="flex justify-center">
                <Image
                  src="../assets/icons/spinner.svg"
                  alt="spinner"
                  width={40}
                  height={40}
                  className="object-contain stroke-slate-50 fill-slate-50"
                />
              </div>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};
export default EditProfileForm;
