import { Card, CardContent } from "@/components/ui/card";
import { Gif } from "@/types/common";

interface GifCardProps {
  gif: Gif;
}

const GifCard = ({ gif }: GifCardProps) => {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0 relative group">
        <div className="w-full h-48 bg-muted animate-pulse absolute top-0 left-0"></div>
        <img
          src={gif.images.fixed_height.url}
          alt={gif.title}
          className="w-full h-48 object-cover relative z-10 opacity-0 transition-opacity duration-300"
          onLoad={(e) =>
            (e.target as HTMLImageElement).classList.remove("opacity-0")
          }
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20"></div>
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-30">
          <p className="text-sm font-medium line-clamp-2">{gif.title}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default GifCard;
