import { Card, CardContent } from "@/components/ui/card";
import { Gif } from "@/types/common";
import GifCard from "./GifCard";

interface ResultsProps {
  gifs: Gif[];
  loading: boolean;
  itemsPerPage: number;
}

const Results = ({ gifs, loading, itemsPerPage }: ResultsProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
      {loading
        ? Array.from({ length: itemsPerPage }).map((_, index) => (
            <Card key={index} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="w-full h-48 bg-muted animate-pulse"></div>
              </CardContent>
            </Card>
          ))
        : gifs.map((gif) => <GifCard gif={gif} key={gif.id} />)}
    </div>
  );
};

export default Results;
