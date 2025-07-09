import { cn } from "@/lib/utils";

interface SeverityBadgeProps {
  severity: "must-fix" | "should-fix" | "nice-to-have";
  className?: string;
}

const severityConfig = {
  "must-fix": {
    label: "Must Fix",
    className: "bg-severity-must-fix text-white"
  },
  "should-fix": {
    label: "Should Fix", 
    className: "bg-severity-should-fix text-black"
  },
  "nice-to-have": {
    label: "Nice to Have",
    className: "bg-severity-nice-to-have text-white"
  }
};

export function SeverityBadge({ severity, className }: SeverityBadgeProps) {
  const config = severityConfig[severity];
  
  return (
    <span 
      className={cn(
        "inline-flex items-center px-4 py-1 rounded-full text-sm font-medium",
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  );
}