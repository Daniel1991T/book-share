import Auth from "@/components/auth/Auth";
import Search from "@/components/search/Search";
import { Button } from "@/components/ui/button";
import { BookOpenIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="flex h-20 border-b-[1px] border-gunsmoke text-como w-full fixed bg-white">
      <div className="flex justify-between w-full px-52 py-5 items-center">
        <Link href="/">
          <div className="flex items-end">
            <p className="text-como flex text-4xl">B</p>
            <BookOpenIcon className="text-como mb-[2px] w-8 h-8" />
            <p className="text-como flex text-4xl ">kShare</p>
          </div>
        </Link>
        <div className="flex items-center gap-4 max-w-[600px] flex-1">
          <Search />
        </div>
        <div className="flex gap-4">
          <Link href="/add-book">
            <Button className="bg-como hover:bg-timber_green rounded-full w-40 font-semibold">
              + Place an ad
            </Button>
          </Link>
          <div>
            <Auth />
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
