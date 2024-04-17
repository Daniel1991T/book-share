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

export type ParamsProps = {
  params: { id: string };
};

export type ListingBooksType = {
  _id: string;
  clerk_id: string;
  condition: string;
  price: string;
  for_trade: boolean;
  listed_at: Date;
  book_id: BookType;
};

export type FollowResponseType = {
  _id: string;
  clerkId: string;
  mongoUserId: string;
  name: string;
  surname: string;
  country: string;
  city: string;
  imageAvatar: string;
  firstListing: FirstListingBook[];
};

export type FirstListingBook = {
  _id: string;
  book_id: Pick<BookType, "title" | "cover_url">;
  listed_at: Date;
};
