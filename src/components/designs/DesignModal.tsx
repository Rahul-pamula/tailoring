import { Share2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Design } from "./DesignCard";

interface DesignModalProps {
  design: Design | null;
  isOpen: boolean;
  onClose: () => void;
}

const categoryLabels: Record<string, string> = {
  Dress: "Dress Design",
  Blouse: "Blouse Design",
  Maggam: "Maggam Work",
  dress: "Dress Design",
  blouse: "Blouse Design",
  maggam: "Maggam Work",
};

const DesignModal = ({ design, isOpen, onClose }: DesignModalProps) => {
  if (!design) return null;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${design.name} - ${design.designNumber}`,
          text: `Check out this beautiful ${categoryLabels[design.category] || design.category} from Elegant Stitch!`,
          url: window.location.href,
        });
      } catch (err) {
        // User cancelled or share failed
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl p-0 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image */}
          <div className="relative aspect-square bg-secondary">
            {design.imageUrl ? (
              <img
                src={design.imageUrl}
                alt={design.name}
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-8xl opacity-30">✨</span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-6 flex flex-col">
            <DialogHeader className="text-left">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary">{categoryLabels[design.category] || design.category}</Badge>
                <Badge variant="outline">{design.designNumber}</Badge>
              </div>
              <DialogTitle className="font-serif text-2xl">
                {design.name}
              </DialogTitle>
              {design.price && (
                <p className="text-lg font-semibold mt-2">Rs. {design.price}</p>
              )}
            </DialogHeader>

            <div className="flex-1 py-4">
              <p className="text-muted-foreground leading-relaxed">
                {design.description}
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4 border-t border-border">
              <Button onClick={handleShare} variant="outline" className="flex-1">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button onClick={onClose} className="flex-1">
                Close
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DesignModal;
