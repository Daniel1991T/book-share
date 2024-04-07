import { Input } from "../ui/input";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

type SearchProps = {
  placeHolder: string;
};

const Search = ({ placeHolder }: SearchProps) => {
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
          placeholder={placeHolder}
        />
      </div>
    </div>
  );
};

export default Search;
