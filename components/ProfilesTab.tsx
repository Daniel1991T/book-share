"use client";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { profilesLink } from "@/constants";
import { usePathname } from "next/navigation";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { extractDynamicSection, extractUserId } from "@/lib/utils";

const ProfilesTabs = () => {
  const pathname = usePathname();
  const [path, setPathname] = useState(pathname.split("/")[2] || "ads");

  useEffect(() => {
    setPathname(extractDynamicSection(pathname));
  }, [pathname]);

  return (
    <div>
      <Tabs value={path} className="w-full bg-transparent">
        <TabsList className="bg-transparent gap-4 w-full flex justify-center">
          {profilesLink.map((link) => (
            <Link
              key={link.label}
              href={`${link.route}/${extractUserId(pathname)}`}
            >
              <TabsTrigger
                onClick={() => setPathname(link.value)}
                value={link.value}
                className="data-[state=active]:border-b-2 data-[state=active]:border-como 
              rounded-none w-auto md:w-44 gap-2 data-[state=active]:text-como data-[state=active]:font-bold
              stroke-1 !data-[state=active]:stroke-2"
              >
                <link.imgURL />
                <p className="hidden sm:inline-block">{link.label}</p>
              </TabsTrigger>
            </Link>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
};
export default ProfilesTabs;
