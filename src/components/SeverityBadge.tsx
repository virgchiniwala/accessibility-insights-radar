import { cn } from "@/lib/utils";

interface SeverityBadgeProps {
  severity: "must-fix" | "should-fix" | "nice-to-have";
  className?: string;
}

const severityConfig = {
  "must-fix": {
    label: "Must Fix",
    className: "bg-error text-white font-semibold"
  },
  "should-fix": {
    label: "Should Fix", 
    className: "bg-warning text-black font-semibold"
  },
  "nice-to-have": {
    label: "Nice to Have",
    className: "bg-info text-white font-semibold"
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