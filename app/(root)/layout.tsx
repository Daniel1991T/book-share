import Navbar from "@/components/shared/navbar/Navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="bg-white relative">
      <Navbar />
      <section>{children}</section>
    </main>
  );
};
export default Layout;
