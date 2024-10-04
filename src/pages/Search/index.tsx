import { useEffect, useState } from "react";
import { GIPHY_API_KEY, GIPHY_API_URL } from "@/config/config";
import { Gif } from "@/types/common";
import Results from "./Results";
import PaginationControls from "./PaginationControls";
import { buildEndpoint } from "@/lib/utils";
import { useNavigate, useParams } from "react-router-dom";
import { useDebounce } from "use-debounce";
import SearchInput from "./SearchInput";

const ITEMS_PER_PAGE = 1;

const GifSearch = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [gifs, setGifs] = useState<Gif[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [debouncedSearchTerm] = useDebounce(searchTerm, 400);
  const navigate = useNavigate();
  const { search, page } = useParams();

  useEffect(() => {
    if (search) {
      setSearchTerm(search.replace(/-/g, " "));
      if (page) {
        setCurrentPage(parseInt(page) || 1);
      }
    }
  }, [search, page]);

  useEffect(() => {
    fetchGifs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchTerm, currentPage]);

  const fetchGifs = async () => {
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
        const modifiedSearchTerm = searchTerm.replace(/(?<=\S) +/g, "-");
        navigate(
          currentPage === 1
            ? `/${modifiedSearchTerm}`
            : `/${modifiedSearchTerm}/${currentPage}`,
          { replace: true }
        );
      } else {
        throw new Error(data.meta.msg);
      }
      
    } catch (error) {
      console.error("Error fetching GIFs:", error);
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
    navigate(newPage === 1 ? `/${searchTerm}` : `/${searchTerm}/${newPage}`);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold">GIFIFY</h1>
        </div>
        <SearchInput
          value={searchTerm}
          placeholder="Search GIFs"
          onInputChange={handleSearchTermChange}
        />
        <Results gifs={gifs} loading={loading} itemsPerPage={ITEMS_PER_PAGE} />
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
