import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface BuildEndpointParams {
  apiKey: string;
  searchTerm?: string;
  currentPage: number;
  itemsPerPage: number;
  apiURL: string;
}

export const buildEndpoint = ({
  apiKey,
  searchTerm,
  currentPage,
  itemsPerPage,
  apiURL,
}: BuildEndpointParams): string => {
  const params = new URLSearchParams({
    api_key: apiKey,
    limit: itemsPerPage.toString(),
    offset: ((currentPage - 1) * itemsPerPage).toString(),
    ...(searchTerm && { q: searchTerm }),
  });

  const type = searchTerm ? "search" : "trending";

  return `${apiURL}/${type}?${params}`;
};

export const replaceSpaceWithHyphens = (value: string): string => {
  return value?.replace(/(?<=\S) +(?=\S)/g, "-")?.replace(/ +/g, "");
};

export const replaceHyphensWithSpace = (value: string): string => {
  return value?.replace(/-/g, " ");
};

export const getNavigationURL = (
  searchTerm: string,
  currentPage: number
): string => {
  const modifiedSearchTerm = replaceSpaceWithHyphens(searchTerm);

  if (currentPage === 1) {
    return `/${modifiedSearchTerm}`;
  } else {
    return `/${modifiedSearchTerm}/${currentPage}`;
  }
};
