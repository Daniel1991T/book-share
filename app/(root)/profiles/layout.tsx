import ProfilesTabs from "@/components/ProfilesTab";
import UserDetails from "@/components/UserDetails";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mt-16 w-full items-center flex-col justify-center space-y-2 flex">
      <UserDetails />
      <ProfilesTabs />
      <section className="w-full max-w-screen-xl">{children}</section>
    </div>
  );
};
export default Layout;
