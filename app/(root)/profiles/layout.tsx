import ProfileTabs from "@/components/ProfileTabs";
import UserDetail from "@/components/UserDetail";
import UserDetails from "@/components/UserDetails";
import Image from "next/image";
import { Suspense } from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mt-16 w-full items-center flex-col justify-center space-y-2 flex">
      <UserDetails />
      <ProfileTabs />
      <section className="w-full">{children}</section>
    </div>
  );
};
export default Layout;
