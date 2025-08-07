import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface EffortBadgeProps {
  effort: "Easy" | "Medium" | "Complex";
  className?: string;
}

const effortStyles = {
  "Easy": "bg-warn-yellow text-black font-semibold",
  "Medium": "bg-info-grey text-white font-semibold", 
  "Complex": "bg-black text-white font-semibold"
};

export function EffortBadge({ effort, className }: EffortBadgeProps) {
  return (
    <Badge 
      className={cn(
        "text-xs px-2 py-1",
        effortStyles[effort],
        className
      )}
    >
      {effort}
    </Badge>
  );
}