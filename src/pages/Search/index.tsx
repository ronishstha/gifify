import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { GIPHY_API_KEY, GIPHY_API_URL } from "@/config/config";
import { Gif } from "@/types/common";
import Results from "./Results";

const ITEMS_PER_PAGE = 8;

const GifSearch = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [gifs, setGifs] = useState<Gif[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    fetchGifs();
  }, [searchTerm, currentPage]);

  const buildEndpoint = () => {
    const params = new URLSearchParams({
      api_key: GIPHY_API_KEY,
      limit: ITEMS_PER_PAGE.toString(),
      offset: ((currentPage - 1) * ITEMS_PER_PAGE).toString(),
      ...(searchTerm && { q: searchTerm }),
    });

    const type = searchTerm ? "search" : "trending";

    return `${GIPHY_API_URL}/${type}?${params}`;
  };

  const fetchGifs = async () => {
    setLoading(true);
    try {
      const endpoint = buildEndpoint();
      const response = await fetch(endpoint);
      const data = await response.json();
      setGifs(data.data);
      setTotalPages(Math.ceil(data.pagination.total_count / ITEMS_PER_PAGE));
    } catch (error) {
      console.error("Error fetching GIFs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold">GIFIFY</h1>
        </div>
        <div className="mb-8 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search GIFs"
            className="w-full pl-10 pr-4"
          />
        </div>
        <Results gifs={gifs} loading={loading} itemsPerPage={ITEMS_PER_PAGE} />
      </div>
    </div>
  );
};

export default GifSearch;
