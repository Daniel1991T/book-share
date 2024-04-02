"use client";

import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";
import { useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import {
  FILTER_URL_PARAMS,
  GENDER_BOOK_FILTER,
  GENDER_BOOK_FILTER_ITEMS,
} from "@/constants/filter";
import Image from "next/image";

const FilterByGender = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const paramFilter =
    searchParams.get(FILTER_URL_PARAMS.GENDER) ||
    GENDER_BOOK_FILTER.RECENT_ADDED;

  const handleUpdateParams = (value: string) => {
    console.log(`value -> ${value}`, paramFilter);

    if (value === paramFilter || !value) {
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: FILTER_URL_PARAMS.GENDER,
        value: GENDER_BOOK_FILTER.RECENT_ADDED,
        keyToRemove: [FILTER_URL_PARAMS.PAGE],
      });
      router.push(newUrl, { scroll: false });
      return;
    }
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: FILTER_URL_PARAMS.GENDER,
      value,
      keyToRemove: [FILTER_URL_PARAMS.PAGE],
    });
    router.push(newUrl, { scroll: false });
  };
  return (
    <ToggleGroup
      id="gender"
      onValueChange={(value) => {
        handleUpdateParams(value);
      }}
      value={paramFilter as string}
      type="single"
      className="flex mb-2 w-full md:w-auto flex-wrap items-center justify-center md:flex-nowrap md:justify-start md:py-2 md:items-start md:flex-col"
    >
      {GENDER_BOOK_FILTER_ITEMS.map((gender, index) => {
        return (
          <ToggleGroupItem
            id={gender.id.toString()}
            key={index}
            className="border-2 data-[state=on]:text-como w-10 h-10 data-[state=on]:border-como flex flex-col gap-1  items-center justify-center md:w-20 md:h-20 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors duration-300 ease-in-out"
            value={gender.value}
            aria-label={gender.value}
          >
            <Image
              alt={gender.value}
              src={gender.iconURL}
              width={25}
              height={25}
              className="first:text-como"
            />
            <p className="hidden md:inline-block">{gender.value}</p>
          </ToggleGroupItem>
        );
      })}
    </ToggleGroup>
  );
};
export default FilterByGender;
