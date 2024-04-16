import ProfileTabs from "@/components/ProfileTabs";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mt-16 w-full items-center flex-col justify-center space-y-2 flex">
      <ProfileTabs />
      <section className="w-full">{children}</section>
    </div>
  );
};
export default Layout;
