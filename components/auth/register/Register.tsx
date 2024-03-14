"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { BsFacebook, BsApple } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { RegisterSchema } from "@/lib/validations";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import LoginInputField from "@/components/form/LoginInputField";
import RegisterInputField from "@/components/form/RegisterInputField";

const Register = () => {
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof RegisterSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="font-bold text-black text-xl">Create account</h1>
      <div className="flex items-center gap-4 py-5">
        <Button className="bg-alto hover:bg-gunsmoke p-1 h-12 w-12 rounded-full">
          <FcGoogle className="size-6 text-black" />
        </Button>
        <Button className="bg-alto hover:bg-gunsmoke p-1 h-12 w-12 rounded-full">
          <BsFacebook className="size-6 text-blue-600" />
        </Button>
        <Button className="bg-alto hover:bg-gunsmoke p-1 h-12 w-12 rounded-full">
          <BsApple className="size-6 text-black" />
        </Button>
      </div>
      <hr className="bg-como h-[1px] w-full" />
      <Form {...form}>
        <form
          noValidate
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 mt-4 w-full"
        >
          <RegisterInputField
            form={form}
            typeInput="email"
            name="email"
            placeholder="Email..."
          />
          <RegisterInputField
            form={form}
            name="password"
            placeholder="Password..."
            typeInput="password"
          />
          <div>
            <h2 className="font-bold">Personal information</h2>
            <p className="">
              You can always change your personal information in profile.
            </p>
          </div>
          <div className="flex gap-2">
            <RegisterInputField
              form={form}
              name="name"
              placeholder="Name"
              typeInput="text"
            />
            <RegisterInputField
              form={form}
              name="surname"
              placeholder="Surname"
              typeInput="text"
            />
          </div>
          <RegisterInputField
            form={form}
            name="phone"
            placeholder="Phone"
            typeInput="tel"
          />
          <RegisterInputField
            form={form}
            name="country"
            placeholder="Country"
            typeInput="text"
          />
          <RegisterInputField
            form={form}
            name="city"
            placeholder="City"
            typeInput="text"
          />

          <Button
            className="w-full bg-como hover:bg-como/95 rounded-full"
            type="submit"
          >
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};
export default Register;
