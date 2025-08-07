import { 
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";

interface GlossaryHoverProps {
  term: string;
  definition: string;
  className?: string;
}

const glossaryTerms = {
  "WCAG": "Web Content Accessibility Guidelines - International standards for making web content accessible to people with disabilities",
  "ARIA": "Accessible Rich Internet Applications - A set of attributes that define ways to make web content more accessible",
  "Conformance": "Meeting all requirements of a specific accessibility standard or level",
  "Contrast Ratio": "The difference in luminance between text and background, measured as a ratio (e.g., 4.5:1)"
};

export function GlossaryHover({ term, definition, className }: GlossaryHoverProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button 
          className={`inline-flex items-center text-primary underline decoration-dotted underline-offset-2 hover:text-primary-hover ${className}`}
          aria-label={`Definition of ${term}`}
        >
          {term}
          <Info className="ml-1 h-3 w-3" />
        </button>
      </TooltipTrigger>
      <TooltipContent 
        side="top"
        className="max-w-[320px] bg-primary text-white p-4 border-0"
      >
        <div>
          <div className="font-semibold mb-2">{term}</div>
          <div className="text-sm leading-relaxed">{definition}</div>
        </div>
      </TooltipContent>
    </Tooltip>
  );
}

// Pre-defined glossary terms component
export function GlossaryTerm({ term }: { term: keyof typeof glossaryTerms }) {
  return (
    <GlossaryHover 
      term={term} 
      definition={glossaryTerms[term]} 
    />
  );
}