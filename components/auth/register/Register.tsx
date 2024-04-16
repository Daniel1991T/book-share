"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { BsFacebook, BsApple } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { OtpSchema, RegisterSchema } from "@/lib/validations";
import RegisterInputField from "@/components/form/RegisterInputField";
import { SignInButton, SignUpButton, auth, useSignUp } from "@clerk/nextjs";
import { Dispatch, SetStateAction, useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import { createUser } from "@/lib/actions/user.actions";
import { OAuthStrategy } from "@clerk/nextjs/server";

type RegisterProps = {
  closeModal: Dispatch<SetStateAction<boolean>>;
};

const Register = ({ closeModal }: RegisterProps) => {
  const router = useRouter();
  const { isLoaded, signUp, setActive } = useSignUp();
  const [isVerifying, setIsVerifying] = useState(false);

  const otpForm = useForm<z.infer<typeof OtpSchema>>({
    resolver: zodResolver(OtpSchema),
    defaultValues: {
      pin: "",
    },
  });

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
      surname: "",
      phone: "",
      city: "",
      country: "",
    },
  });

  async function onSubmit(values: z.infer<typeof RegisterSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    if (!isLoaded) return;

    try {
      await signUp.create({
        emailAddress: values.email,
        password: values.password,
      });
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setIsVerifying(true);
    } catch (error: any) {
      console.error("Error", JSON.stringify(error, null, 2));
      toast({
        title: `${error.errors[0].message}`,
        description: `${error.errors[0].longMessage}`,
        variant: "destructive",
      });
    }
  }

  const onSubmitVerify = async (values: z.infer<typeof OtpSchema>) => {
    if (!isLoaded) return;

    try {
      // Submit the code that the user provides to attempt verification
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: values.pin,
      });

      if (completeSignUp.status !== "complete") {
        // The status can also be `abandoned` or `missing_requirements`
        // Please see https://clerk.com/docs/references/react/use-sign-up#result-status for  more information
        console.log(JSON.stringify(completeSignUp, null, 2));
        if (completeSignUp.status === "abandoned") {
          toast({
            title: "Verification abandoned",
            description:
              "The verification was not completed within the allowed time. Please try again.",
            variant: "destructive",
          });
        }
        if (completeSignUp.status === "missing_requirements") {
          toast({
            title: "Missing requirements",
            description:
              "Your email requires additional verification steps. Please check your email for further instructions.",
            variant: "destructive",
          });
        }
      }

      // Check the status to see if it is complete
      // If complete, the user has been created -- set the session active
      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        // Redirect the user to a post sign-up route
        const { email, city, country, name, phone, surname } = form.getValues();
        await createUser({
          email,
          city,
          country,
          name,
          phone,
          surname,
          clerkId: completeSignUp.createdUserId!,
        });
        router.push("/");
        closeModal(false);
      }
    } catch (error: any) {
      // This can return an array of errors.
      // See https://clerk.com/docs/custom-flows/error-handling to learn about error handling
      console.error("Error:", JSON.stringify(error, null, 2));
      toast({
        title: `${error.errors[0].message}`,
        description: `${error.errors[0].longMessage}`,
        variant: "destructive",
      });
    }
  };

  const signUpWith = async (strategy: OAuthStrategy) => {
    if (!isLoaded) return;

    try {
      const result = await signUp.create({
        strategy,
        redirectUrl: "/sso-callback",
        actionCompleteRedirectUrl: "/",
      });
    } catch (error) {
      console.log(error);
    }
  };

  if (isVerifying) {
    return (
      <aside className="flex flex-col items-center justify-center h-full">
        <Form {...otpForm}>
          <form
            onSubmit={otpForm.handleSubmit(onSubmitVerify)}
            className="w-2/3 space-y-6 justify-center items-center"
          >
            <FormField
              control={otpForm.control}
              name="pin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Verification code</FormLabel>
                  <FormControl>
                    <InputOTP maxLength={6} {...field}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormDescription>
                    Please enter the verification code sent to your email.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className="w-full bg-como hover:bg-como/95 rounded-full"
              type="submit"
            >
              Submit
            </Button>
          </form>
        </Form>
      </aside>
    );
  }
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="font-bold text-black text-xl">Create account</h1>
      <div className="flex items-center gap-4 py-5">
        <SignUpButton>
          <Button
            onClick={() => signUpWith("oauth_google")}
            className="bg-alto hover:bg-gunsmoke p-1 h-12 w-12 rounded-full"
          >
            <FcGoogle className="size-6 text-black" />
          </Button>
        </SignUpButton>
        <Button
          onClick={() => signUpWith("oauth_facebook")}
          className="bg-alto hover:bg-gunsmoke p-1 h-12 w-12 rounded-full"
        >
          <BsFacebook className="size-6 text-blue-600" />
        </Button>
        <Button
          onClick={() => signUpWith("oauth_apple")}
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
