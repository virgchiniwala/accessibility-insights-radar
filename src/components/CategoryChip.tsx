import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface CategoryChipProps {
  category: "Images" | "Colour & Contrast" | "Headings" | "Forms" | "Navigation" | "Advanced";
  className?: string;
}

const categoryColors = {
  "Images": "bg-blue-100 text-blue-800 border-blue-200",
  "Colour & Contrast": "bg-purple-100 text-purple-800 border-purple-200", 
  "Headings": "bg-green-100 text-green-800 border-green-200",
  "Forms": "bg-orange-100 text-orange-800 border-orange-200",
  "Navigation": "bg-cyan-100 text-cyan-800 border-cyan-200",
  "Advanced": "bg-gray-100 text-gray-800 border-gray-200"
};

export function CategoryChip({ category, className }: CategoryChipProps) {
  return (
    <Badge 
      variant="outline"
      className={cn(
        "text-xs font-medium",
        categoryColors[category],
        className
      )}
    >
      {category}
    </Badge>
  );
}