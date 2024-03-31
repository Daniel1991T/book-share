"use client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useRouter, useSearchParams } from "next/navigation";
import { getBookByName } from "@/lib/actions/book.actions";
import { Button } from "../ui/button";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";

type SearchResultType = {
  books: {
    _id: string;
    title: string;
    author: string;
    cover_url: string[];
  }[];
};

type SearchResultProps = {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};
const SearchResult = ({ setIsOpen }: SearchResultProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<SearchResultType>({ books: [] });

  const searchBook = searchParams.get("search");

  useEffect(() => {
    const fetchResult = async () => {
      setResult({ books: [] });
      setIsLoading(true);
      try {
        // Everything everywhere all at once -> global search
        const globalResult = await getBookByName({ searchQuery: searchBook! });
        setResult(globalResult as unknown as SearchResultType);
      } catch (error) {
        console.log(error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    };
    fetchResult();
  }, [searchBook]);

  const handleBookClick = (bookId: string) => {
    const removedUrl = removeKeysFromQuery({
      params: searchParams.toString(),
      keyToRemove: ["search"],
    });
    router.push(removedUrl, { scroll: false });
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "book_id",
      value: bookId,
    });
    router.push(newUrl, { scroll: false });
    setIsOpen(false);
  };

  return (
    <div
      className="absolute top-full z-20 mt-3 w-full rounded-xl bg-light-800
    py-1 shadow-sm "
    >
      <div className="space-y-5">
        {isLoading ? (
          <div className="flex-center flex-col px-1">
            <ReloadIcon className="my-2 size-10 animate-spin text-como" />
            <p className="text-black body-regular">
              Browsing the entire database!
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-1">
            {result.books.length > 0 ? (
              result.books.map((book) => (
                <Button
                  variant="outline"
                  key={book._id}
                  onClick={() => handleBookClick(book._id)}
                >
                  <div className="flex items-center gap-2 px-5 py-3 rounded-lg">
                    <p className="text-como body-regular">{book.title}</p>
                  </div>
                </Button>
              ))
            ) : (
              <div className="flex-center flex-col px-5">
                <p className="text-dark200_light800 body-regular">
                  Oops, no result found!
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
export default SearchResult;
