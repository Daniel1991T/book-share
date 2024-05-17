import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SignOutButton, UserButton } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { LogOut, Pencil, User } from "lucide-react";
import { profileLinks } from "@/constants";
import Link from "next/link";
import UserResume from "./UserResume";

function UserProfile() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none">
        <User />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-screen md:w-full">
        <DropdownMenuLabel>
          <UserResume />
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {profileLinks.map((link) => (
          <Link href={link.route} key={link.label}>
            <DropdownMenuItem className="text-sm hover:text-como gap-2 font-light">
              <link.imgURL strokeWidth={1} />
              <p>{link.label}</p>
            </DropdownMenuItem>
          </Link>
        ))}
        <DropdownMenuSeparator />
        <Link href="/edit-profile">
          <DropdownMenuItem className="text-sm gap-2 font-light">
            <Pencil strokeWidth={1} />
            <p>Edit Profile</p>
          </DropdownMenuItem>
        </Link>
        <DropdownMenuItem>
          <SignOutButton>
            <div className="text-sm gap-2 font-light flex">
              <LogOut strokeWidth={1} />
              <p>Log out</p>
            </div>
          </SignOutButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
export default UserProfile;
