import { RemoveUrlQueryParams, UrlQueryParams } from "@/types";
import { type ClassValue, clsx } from "clsx";
import qs from "query-string";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const convertBase64 = (file: Blob) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      resolve(fileReader.result);
    };

    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};

export const formUrlQuery = ({
  key,
  params,
  value,
  keyToRemove,
}: UrlQueryParams) => {
  const currentUrl = qs.parse(params);
  currentUrl[key] = value;
  keyToRemove?.forEach((key) => {
    delete currentUrl[key];
  });
  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  );
};

export const removeKeysFromQuery = ({
  keyToRemove,
  params,
}: RemoveUrlQueryParams) => {
  const currentUrl = qs.parse(params);
  keyToRemove.forEach((key) => {
    delete currentUrl[key];
  });
  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  );
};

export const extractUserId = (url: string): string | null => {
  const regex = /user_([a-zA-Z0-9]+)/;
  const match = url.match(regex);
  return match ? match[0] : null;
};

export const extractDynamicSection = (url: string): string => {
  const regex = /\/profiles\/([^\/]+)\/user_/;
  const match = url.match(regex);
  return match ? match[1] : "ads";
};
