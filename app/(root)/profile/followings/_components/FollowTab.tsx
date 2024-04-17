"use client";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { followTabs } from "@/constants";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";

const FollowTab = () => {
  const pathname = usePathname();
  const [path, setPathname] = useState(pathname.split("/")[2] || "followings");

  useEffect(() => {
    setPathname(pathname.split("/")[3] || pathname.split("/")[2]);
  }, [pathname]);
  return (
    <div>
      <Tabs value={path} className="w-full bg-transparent">
        <TabsList className="bg-transparent gap-4 w-full flex justify-start">
          {followTabs.map((link) => (
            <Link key={link.label} href={link.route}>
              <TabsTrigger
                onClick={() => setPathname(link.value)}
                value={link.value}
                className="data-[state=active]:border-2 rounded-full data-[state=active]:bg-como_v-50 
                 data-[state=active]:border-como 
               w-auto  gap-2 data-[state=active]:text-como data-[state=active]:font-bold
              stroke-1 !data-[state=active]:stroke-2"
              >
                <p className="flex">{link.label}</p>
              </TabsTrigger>
            </Link>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
};
export default FollowTab;
