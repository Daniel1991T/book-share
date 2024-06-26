import Auth from "@/components/auth/Auth";
import Search from "@/components/search/Search";
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { BookOpenIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import UserProfile from "../UserProfile";

const Navbar = () => {
  return (
    <nav
      className="flex z-50 h-16 border-b-[1px] items-center justify-center w-full
     border-gunsmoke text-como fixed top-0 bg-white !scrollbar-none !no-scrollbar"
    >
      <div className="flex justify-between px-4 md:px-0 w-full max-w-4xl items-center scrollbar-track-transparent">
        <Link href="/">
          <div className="flex items-end">
            <p className="text-como flex text-4xl">B</p>
            <BookOpenIcon className="text-como mb-[2px] w-8 h-8" />
            <p className="text-como flex text-4xl ">kShare</p>
          </div>
        </Link>
        <div className=" hidden md:block items-center gap-4 max-w-[600px] flex-1">
          <Search placeHolder="Search by Title or Author..." />
        </div>
        <div className="flex gap-4">
          <SignedIn>
            <Link href="/add-book">
              <Button className="bg-como hover:bg-timber_green gap-2 rounded-full md:w-40 font-semibold">
                + <span className="hidden md:inline-block">Place an ad</span>
              </Button>
            </Link>
            <UserProfile />
          </SignedIn>

          <SignedOut>
            <Auth />
          </SignedOut>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
