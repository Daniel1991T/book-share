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
