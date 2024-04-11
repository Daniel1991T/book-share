"use client";

import { UserProfile } from "@clerk/nextjs";

const DotIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      fill="currentColor"
    >
      <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z" />
    </svg>
  );
};

const CustomPage = () => {
  return (
    <div>
      <h1>Custom Profile Page</h1>
      <p>This is the custom profile page</p>
    </div>
  );
};

const UserProfilePage = () => (
  <div className="mt-16 flex w-screen justify-center items-center mx-auto">
    <UserProfile
      appearance={{
        elements: {
          formButtonPrimary: "#558B78",
          footerActionLink: "text-como",
        },
      }}
      path="/edit-profile"
      routing="path"
    ></UserProfile>
  </div>
);

export default UserProfilePage;
