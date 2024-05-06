import ProfileTabs from "@/components/ProfileTabs";
import UserDetails from "@/components/UserDetails";

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
