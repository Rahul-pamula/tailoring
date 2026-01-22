import { Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export interface Design {
  id: string;
  designNumber: string;
  name: string;
  category: string;
  imageUrl: string;
  description: string;
  price?: number | null;
}

interface DesignCardProps {
  design: Design;
  onClick: () => void;
}

const categoryLabels: Record<string, string> = {
  Dress: "Dress Design",
  Blouse: "Blouse Design",
  Maggam: "Maggam Work",
  dress: "Dress Design",
  blouse: "Blouse Design",
  maggam: "Maggam Work",
};

const DesignCard = ({ design, onClick }: DesignCardProps) => {
  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();

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
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <Card
      className="group cursor-pointer overflow-hidden border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300"
      onClick={onClick}
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-muted">
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10" />

        {/* Real Image or Placeholder */}
        {design.imageUrl ? (
          <img
            src={design.imageUrl}
            alt={design.name}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-secondary">
            <span className="text-6xl opacity-30">✨</span>
          </div>
        )}

        {/* Share Button */}
        <Button
          variant="secondary"
          size="icon"
          className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity z-20 h-8 w-8"
          onClick={handleShare}
        >
          <Share2 className="h-4 w-4" />
        </Button>

        {/* Design Number Overlay */}
        <div className="absolute bottom-3 left-3 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
          <Badge className="bg-background/90 text-foreground hover:bg-background">
            {design.designNumber}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-xs text-primary font-medium mb-1">
              {categoryLabels[design.category] || design.category}
            </p>
            <h3 className="font-serif font-medium text-foreground line-clamp-1">
              {design.name}
            </h3>
            {design.price && (
              <p className="text-sm font-semibold mt-1">Rs. {design.price}</p>
            )}
          </div>
          <span className="text-xs text-muted-foreground whitespace-nowrap">
            {design.designNumber}
          </span>
        </div>
      </div>
    </Card>
  );
};

export default DesignCard;
