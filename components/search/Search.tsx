import { Input } from "../ui/input";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const Search = () => {
  return (
    <div className="relative w-full w-max-[400px] p-4">
      <div
        className="bg-white w-full
      relative flex min-h-[56px] grow items-center gap-1 
      rounded-lg px-4"
      >
        <MagnifyingGlassIcon className="h-5 w-5 text-gunsmoke absolute left-6" />
        <Input
          className="no-focus focus-visible:ring-transparent placeholder:text-alto border-gunsmoke rounded-full w-full shadow-none outline-none focus:outline-como pl-10"
          type="search"
          placeholder="Search by Title or Author..."
        />
      </div>
    </div>
  );
};

export default Search;
