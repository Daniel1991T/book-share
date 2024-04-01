export type UrlQueryParams = {
  params: string;
  key: string;
  value: string | null;
};

export type RemoveUrlQueryParams = {
  params: string;
  keyToRemove: string[];
};

export interface SearchParamsProps {
  searchParams: { [key: string]: string | undefined };
}