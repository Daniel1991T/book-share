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

/**
 * Extracts and returns the profile feature based on the URL.
 * @param url - The URL string indicating the user profile feature.
 * @returns The name of the profile feature.
 */

export const extractDynamicSection = (url: string): string => {
  const regex = /\/profiles\/([^\/]+)\/user_/;
  const match = url.match(regex);
  return match ? match[1] : "ads";
};

/**
 * Converts a date string to a readable relative time format (e.g., "1 day ago").
 * @param dateString - The input date string.
 * @returns A string representing how long ago the date was, in readable form.
 */
export const timeAgo = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.round((now.getTime() - date.getTime()) / 1000);
  const minutes = Math.round(seconds / 60);
  const hours = Math.round(minutes / 60);
  const days = Math.round(hours / 24);

  if (seconds < 60) {
    return "just now";
  } else if (minutes < 60) {
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  } else if (hours < 24) {
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else {
    return `${days} day${days > 1 ? "s" : ""} ago`;
  }
};

import { formatDistanceToNow } from "date-fns";

/**
 * Converts an ISO date string to a relative time string.
 * @param isoDateString - The ISO date string to convert.
 * @returns A string representing the time since the date.
 */
export const formatIsoDateToRelative = (isoDateString: string): string => {
  const date = new Date(isoDateString);
  return formatDistanceToNow(date, { addSuffix: true });
};
