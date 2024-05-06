import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <SignUp
      appearance={{
        variables: {
          colorPrimary: "#558B78",
        },
      }}
      path="/sign-up"
    />
  );
}
