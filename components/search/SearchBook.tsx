import { useEffect, useRef, useState } from "react";
import { Input } from "../ui/input";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import SearchResult from "./SearchResult";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";

const SearchBook = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const query = searchParams.get("search");
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
        setSearch("");
      }
    };
    setIsOpen(false);
    document.addEventListener("click", handleOutsideClick);
    return () => {
      removeEventListener("click", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (search) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "search",
          value: search,
        });
        router.push(newUrl, { scroll: false });
      } else {
        if (query) {
          const newUrl = removeKeysFromQuery({
            params: searchParams.toString(),
            keyToRemove: ["search"],
          });
          router.push(newUrl, { scroll: false });
        }
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [search, router, pathname, searchParams, query]);

  return (
    <div className="relative w-full max-w-[600px]" ref={searchContainerRef}>
      <div
        className="bg-white w-full
      relative flex min-h-[56px] grow items-center gap-1 
      rounded-lg px-4"
      >
        <MagnifyingGlassIcon className="h-5 w-5 text-gunsmoke absolute left-6" />
        <Input
          type="text"
          placeholder="Search book in base"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            if (!isOpen) setIsOpen(true);
            if (e.target.value === "" && isOpen) setIsOpen(false);
          }}
          className="no-focus focus-visible:ring-transparent placeholder:text-alto border-gunsmoke rounded-full w-full shadow-none outline-none focus:outline-como pl-10"
        />
      </div>
      {isOpen ? <SearchResult setIsOpen={setIsOpen} /> : null}
    </div>
  );
};
export default SearchBook;
