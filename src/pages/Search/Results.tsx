import { Card, CardContent } from "@/components/ui/card";
import { Gif } from "@/types/common";
import GifCard from "./GifCard";
import GifModal from "./GifModal";
import { useState } from "react";

interface ResultsProps {
  gifs: Gif[];
  loading: boolean;
  itemsPerPage: number;
  error: string | null;
}

const Results = ({ gifs, loading, itemsPerPage, error }: ResultsProps) => {
  const [selectedGif, setSelectedGif] = useState<Gif | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  if (error) {
    return <div className="text-red-400 text-center mb-4">{error}</div>;
  }

  if (!loading && gifs.length === 0) {
    return (
      <div className="text-gray-500 text-center mb-4">
        No GIFs found for your search.
      </div>
    );
  }

  const handleGifClick = (gif: Gif) => {
    setSelectedGif(gif);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedGif(null);
  };

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
        : gifs.map((gif) => (
            <GifCard gif={gif} key={gif.id} onGifClick={handleGifClick} />
          ))}
      <GifModal
        gif={selectedGif}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default Results;
