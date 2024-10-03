import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const GifSearch = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");

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
      </div>
    </div>
  );
};

export default GifSearch;
