"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery } from "@/lib/utils";
import { Button } from "./ui/button";
import { FILTER_URL_PARAMS } from "@/constants/filter";

type PaginationProps = {
  pageNumber: number;
  isNext: boolean;
};

const Pagination = ({ isNext = false, pageNumber = 1 }: PaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleNavigation = (direction: "next" | "prev") => {
    const nextPageNumber =
      direction === "prev" ? pageNumber - 1 : pageNumber + 1;

    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: FILTER_URL_PARAMS.PAGE,
      value: nextPageNumber.toString(),
    });
    router.push(newUrl);
  };

  if (!isNext && pageNumber === 1) return null;

  return (
    <div className="flex w-full items-center justify-center gap-2">
      <Button
        className="light-border-2 bg-como hover:bg-timber_green flex min-h-[36px] items-center justify-center
        gap-2 border"
        disabled={pageNumber === 1}
        onClick={() => handleNavigation("prev")}
      >
        <p className="body-medium text-light-900">Prev</p>
      </Button>
      <div
        className="flex items-center justify-center rounded-md bg-slate-200
      px-3.5 py-2 "
      >
        <p className="body-semibold text-light-900">{pageNumber}</p>
      </div>
      <Button
        className="light-border-2 bg-como hover:bg-timber_green flex min-h-[36px] items-center justify-center
        gap-2 border"
        disabled={!isNext}
        onClick={() => handleNavigation("next")}
      >
        <p className="body-medium text-light-900">Next</p>
      </Button>
    </div>
  );
};
export default Pagination;
