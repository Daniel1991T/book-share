"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Input } from "../ui/input";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { FILTER_URL_PARAMS } from "@/constants/filter";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";

type SearchProps = {
  placeHolder: string;
};

const Search = ({ placeHolder }: SearchProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const query = searchParams.get(FILTER_URL_PARAMS.GLOBAL) || "";
  const [search, setSearch] = useState(query);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (search) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: FILTER_URL_PARAMS.GLOBAL,
          value: search,
        });
        router.push(newUrl, { scroll: false });
      } else {
        if (query) {
          const newUrl = removeKeysFromQuery({
            params: searchParams.toString(),
            keyToRemove: [FILTER_URL_PARAMS.GLOBAL],
          });
          router.push(newUrl, { scroll: false });
        }
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [search, pathname, router, searchParams, query]);

  return (
    <div className="relative z-10 w-full w-max-[400px] p-4">
      <div
        className="bg-white w-full
      relative flex min-h-[56px] grow items-center gap-1 
      rounded-lg px-4"
      >
        <MagnifyingGlassIcon className="h-5 w-5 text-gunsmoke absolute left-6" />
        <Input
          name="search"
          className="no-focus focus-visible:ring-transparent placeholder:text-alto border-gunsmoke rounded-full w-full shadow-none outline-none focus:outline-como pl-10"
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={placeHolder}
        />
      </div>
    </div>
  );
};

export default Search;
