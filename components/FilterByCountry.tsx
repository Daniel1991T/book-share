"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EUROPE_COUNTRIES, FILTER_URL_PARAMS } from "@/constants/filter";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "./ui/button";
import { useState } from "react";

type FilterProps = {
  //   filters: typeof HomePageFilters;
  otherClasses?: string;
  containerClasses?: string;
};

const FilterByCountry = ({ containerClasses, otherClasses }: FilterProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const paramFilter = searchParams.get(FILTER_URL_PARAMS.COUNTRY);
  const [selectedCountry, setSelectedCountry] = useState(paramFilter);

  const handleUpdateParams = (value: string) => {
    setSelectedCountry(value);
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: FILTER_URL_PARAMS.COUNTRY,
      value: value.toLowerCase(),
      keyToRemove: [FILTER_URL_PARAMS.PAGE],
    });
    router.push(newUrl, { scroll: false });
  };

  const handleClearFilter = () => {
    setSelectedCountry(""); // Resetează selectarea
    const newUrl = removeKeysFromQuery({
      params: searchParams.toString(),
      keyToRemove: [FILTER_URL_PARAMS.COUNTRY, FILTER_URL_PARAMS.PAGE],
    });
    router.push(newUrl, { scroll: false });
  };

  return (
    <div className={`relative ${containerClasses}`}>
      <Select
        onValueChange={handleUpdateParams}
        value={selectedCountry ? selectedCountry : undefined}
      >
        <SelectTrigger
          className={`${otherClasses} body-regular light-border 
        background-light800_dark300 text-dark500_light700 border px-5 py-2.5`}
        >
          <div className="line-clamp-1 flex-1 text-left">
            <SelectValue placeholder="Select a Country" />
          </div>
        </SelectTrigger>
        <SelectContent
          className="text-dark500_light700 small-regular border-none
        bg-light-900 dark:bg-dark-300"
        >
          <SelectGroup>
            {EUROPE_COUNTRIES.map((item) => (
              <SelectItem
                className="cursor-pointer focus:bg-light-800 dark:focus:bg-dark-400"
                key={item}
                value={item}
              >
                {item}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Button
        onClick={handleClearFilter}
        className="hover:bg-como hover:text-white"
        variant="outline"
      >
        Clear
      </Button>
    </div>
  );
};
export default FilterByCountry;
