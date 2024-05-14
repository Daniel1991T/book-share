"use client";
import { Input } from "@/components/ui/input";
import { FILTER_URL_PARAMS } from "@/constants/filter";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type SearchRoomProps = {
  placeholder: string;
  route: string;
};

export default function SearchRoom({ placeholder, route }: SearchRoomProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const query = searchParams.get(FILTER_URL_PARAMS.ROOM);
  const [search, setSearch] = useState(query || "");

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (search) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: FILTER_URL_PARAMS.ROOM,
          value: search,
        });
        router.push(newUrl, { scroll: false });
      } else {
        if (pathname !== route) {
          const newUrl = removeKeysFromQuery({
            params: searchParams.toString(),
            keyToRemove: [FILTER_URL_PARAMS.ROOM],
          });
          router.push(newUrl, { scroll: false });
        }
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [search, route, pathname, router, searchParams, query]);
  return (
    <div className="relative z-10 w-full">
      <div
        className="bg-white w-full
      relative flex min-h-[56px] grow items-center gap-1 
      rounded-3xl px-4"
      >
        <Search className="h-5 w-5 text-gunsmoke absolute left-6" />
        <Input
          name="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="no-focus focus-visible:ring-transparent placeholder:text-alto border-transparent rounded-full w-full shadow-none outline-none focus:outline-como pl-10"
          type="search"
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}
