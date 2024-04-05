import { BookType } from "@/lib/validations";

export type UrlQueryParams = {
  params: string;
  key: string;
  value: string | null;
  keyToRemove?: string[];
};

export type RemoveUrlQueryParams = {
  params: string;
  keyToRemove: string[];
};

export interface SearchParamsProps {
  searchParams: { [key: string]: string | undefined };
}

export type ListingBooksType = {
  _id: string;
  clerk_id: string;
  condition: string;
  price: string;
  for_trade: boolean;
  listed_at: Date;
  book_id: BookType;
};
