import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Gif } from "@/types/common";

interface GifModalProps {
  isOpen: boolean;
  gif: Gif | null;
  onClose: () => void;
}

const GifModal = ({ isOpen, gif, onClose }: GifModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{gif?.title}</DialogTitle>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <img
            src={gif?.images.fixed_height.url}
            alt={gif?.title}
            className="w-full max-h-[600px] object-cover z-10"
            loading="lazy"
          />
        </div>
        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default GifModal;
