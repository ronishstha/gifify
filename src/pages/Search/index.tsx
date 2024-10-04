import { useEffect, useState } from "react";
import { GIPHY_API_KEY, GIPHY_API_URL } from "@/config/config";
import { Gif } from "@/types/common";
import Results from "./Results";
import PaginationControls from "./PaginationControls";
import {
  buildEndpoint,
  getNavigationURL,
  replaceHyphensWithSpace,
} from "@/lib/utils";
import { useNavigate, useParams } from "react-router-dom";
import { useDebounce } from "use-debounce";
import SearchInput from "./SearchInput";
import ThemeToggler from "@/components/ThemeToggler";

const ITEMS_PER_PAGE = 12;

const GifSearch = () => {
  const navigate = useNavigate();
  const { search, page } = useParams();
  const [searchTerm, setSearchTerm] = useState<string>(
    replaceHyphensWithSpace(search || "")
  );
  const [currentPage, setCurrentPage] = useState<number>(parseInt(page || "1"));
  const [loading, setLoading] = useState<boolean>(false);
  const [gifs, setGifs] = useState<Gif[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [error, setError] = useState<string | null>(null);
  const [debouncedSearchTerm] = useDebounce(searchTerm, 400);

  useEffect(() => {
    fetchGifs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchTerm, currentPage]);

  const fetchGifs = async () => {
    setError(null);
    setLoading(true);
    try {
      const endpoint = buildEndpoint({
        apiKey: GIPHY_API_KEY,
        apiURL: GIPHY_API_URL,
        itemsPerPage: ITEMS_PER_PAGE,
        currentPage,
        searchTerm: debouncedSearchTerm,
      });
      const response = await fetch(endpoint);
      const data = await response.json();

      if (data.meta.status === 200) {
        setGifs(data.data);
        setTotalPages(Math.ceil(data.pagination.total_count / ITEMS_PER_PAGE));
        const navigationURL = getNavigationURL(searchTerm, currentPage);

        navigate(navigationURL, { replace: true });
      } else {
        throw new Error(data.meta.msg);
      }
    } catch (error) {
      console.error("Error fetching GIFs:", error);
      setError("Failed to fetch GIFs. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    const navigationURL = getNavigationURL(searchTerm, currentPage);
    navigate(navigationURL);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">GIFIFY</h1>
          <ThemeToggler />
        </div>
        <SearchInput
          value={searchTerm}
          placeholder="Search GIFs"
          onInputChange={handleSearchTermChange}
        />
        <Results
          gifs={gifs}
          loading={loading}
          itemsPerPage={ITEMS_PER_PAGE}
          error={error}
        />
        {totalPages > 1 && (
          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
};

export default GifSearch;
