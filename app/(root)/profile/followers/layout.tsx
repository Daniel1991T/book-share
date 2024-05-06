import FollowTab from "../followings/_components/FollowTab";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full mx-auto items-start flex-col justify-start max-w-4xl p-2 space-y-2 flex">
      <FollowTab />
      <section className="w-full">{children}</section>
    </div>
  );
};
export default Layout;
