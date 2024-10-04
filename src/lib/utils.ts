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
  tab: string;
}

export const buildEndpoint = ({
  apiKey,
  searchTerm,
  currentPage,
  itemsPerPage,
  apiURL,
  tab,
}: BuildEndpointParams): string => {
  const params = new URLSearchParams({
    api_key: apiKey,
    limit: itemsPerPage.toString(),
    offset: ((currentPage - 1) * itemsPerPage).toString(),
    ...(searchTerm && { q: searchTerm }),
  });

  const type = searchTerm ? "search" : "trending";

  return `${apiURL}/${tab}/${type}?${params}`;
};


export const replaceSpaceWithHyphens = (value: string): string => {
  return value?.replace(/(?<=\S) +(?=\S)/g, "-")?.replace(/ +/g, "");
};

export const replaceHyphensWithSpace = (value: string): string => {
  return value?.replace(/-/g, " ");
};

export const getNavigationURL = (
  searchTerm: string,
  currentPage: number,
  activeTab: string
): string => {
  const modifiedSearchTerm = replaceSpaceWithHyphens(searchTerm);
  const page = currentPage > 1 ? currentPage.toString() : "";

  if (searchTerm) {
    return `/${activeTab}/search/${modifiedSearchTerm}/${page}`;
  } else {
    return `/${activeTab}/${page}`;
  }
};
