import Navbar from "@/components/shared/navbar/Navbar";
import { Toaster } from "@/components/ui/toaster";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="bg-white relative">
      <Navbar />
      <section>{children}</section>
      <Toaster />
    </main>
  );
};
export default Layout;
