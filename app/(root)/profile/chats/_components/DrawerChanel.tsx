import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { FILTER_URL_PARAMS } from "@/constants/filter";
import { removeKeysFromQuery } from "@/lib/utils";
import { ArrowRightToLine } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

type DrawerChannelProps = {
  children: React.ReactNode;
};

export default function DrawerChanel({ children }: DrawerChannelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (searchParams.get(FILTER_URL_PARAMS.DRAWER) === "false") {
      console.log("drawer is close");
      const newUrl = removeKeysFromQuery({
        keyToRemove: [FILTER_URL_PARAMS.DRAWER],
        params: searchParams.toString(),
      });
      router.push(newUrl, { scroll: false });
      setIsOpen(false);
    }
  }, [searchParams, router]);

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen} direction="left">
      <DrawerTrigger className="w-full flex -translate-y-5 gap-2">
        More chats <ArrowRightToLine className="text-como" />
      </DrawerTrigger>
      <DrawerContent className="h-[calc(100vh-6rem)]">{children}</DrawerContent>
    </Drawer>
  );
}
