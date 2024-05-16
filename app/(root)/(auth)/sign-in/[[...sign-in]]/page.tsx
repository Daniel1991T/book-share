import { SearchParamsProps } from "@/types";
import { SignIn } from "@clerk/nextjs";

export default function Page({ searchParams }: SearchParamsProps) {
  return (
    <SignIn
      afterSignInUrl={searchParams?.redirect}
      appearance={{
        variables: {
          colorPrimary: "#558B78",
        },
        elements: {
          footerActionLink: "text-como hover:text-timber_green",
          formButtonPrimary: "bg-como hover:bg-timber_green",
        },
      }}
      path="/sign-in"
    />
  );
}
