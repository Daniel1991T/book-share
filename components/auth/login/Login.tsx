"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { BsFacebook, BsApple } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { LoginSchema } from "@/lib/validations";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import LoginInputField from "@/components/form/LoginInputField";

const Login = () => {
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof LoginSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="font-bold text-black text-xl">Log in to Book Share</h1>
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
          className="space-y-8 mt-4 w-full"
        >
          <LoginInputField
            form={form}
            typeInput="email"
            name="email"
            placeholder="Email..."
          />
          <LoginInputField
            form={form}
            name="password"
            placeholder="Password..."
            typeInput="password"
          />
          <Button className="w-full bg-como rounded-full" type="submit">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};
export default Login;
