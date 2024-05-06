import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <SignIn
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
