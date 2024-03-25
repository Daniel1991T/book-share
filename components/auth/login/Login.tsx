"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { BsFacebook, BsApple } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { LoginSchema } from "@/lib/validations";
import { Form } from "@/components/ui/form";
import LoginInputField from "@/components/form/LoginInputField";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import { OAuthStrategy } from "@clerk/nextjs/server";

type LoginProps = {
  closeModal: Dispatch<SetStateAction<boolean>>;
};

const Login = ({ closeModal }: LoginProps) => {
  const { isLoaded, signIn, setActive } = useSignIn();
  const router = useRouter();
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const signInWith = (strategy: OAuthStrategy) => {
    return signIn!!.authenticateWithRedirect({
      strategy,
      redirectUrl: "/sso-callback",
      redirectUrlComplete: "/",
    });
  };

  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    if (!isLoaded) {
      return;
    }

    // Start the sign-in process using the email and password provided
    try {
      const completeSignIn = await signIn.create({
        identifier: values.email,
        password: values.password,
      });

      if (completeSignIn.status !== "complete") {
        // The status can also be `needs_factor_on', 'needs_factor_two', or 'needs_identifier'
        // Please see https://clerk.com/docs/references/react/use-sign-in#result-status for  more information
        console.log(JSON.stringify(completeSignIn, null, 2));
      }

      if (completeSignIn.status === "complete") {
        // If complete, user exists and provided password match -- set session active
        await setActive({ session: completeSignIn.createdSessionId });

        // Redirect the user to a post sign-in route
        router.push("/");
        router.refresh();
        closeModal(true);
      }
    } catch (err: any) {
      // This can return an array of errors.
      // See https://clerk.com/docs/custom-flows/error-handling to learn about error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <h1 className="font-bold text-black text-xl">Log in to Book Share</h1>
      <div className="flex items-center gap-4 py-5">
        <Button
          onClick={() => signInWith("oauth_google")}
          className="bg-alto hover:bg-gunsmoke p-1 h-12 w-12 rounded-full"
        >
          <FcGoogle className="size-6 text-black" />
        </Button>
        <Button
          onClick={() => signInWith("oauth_facebook")}
          className="bg-alto hover:bg-gunsmoke p-1 h-12 w-12 rounded-full"
        >
          <BsFacebook className="size-6 text-blue-600" />
        </Button>
        <Button
          onClick={() => signInWith("oauth_apple")}
          className="bg-alto hover:bg-gunsmoke p-1 h-12 w-12 rounded-full"
        >
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
          <Button
            className="w-full bg-como hover:bg-como/90 rounded-full"
            type="submit"
          >
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};
export default Login;
