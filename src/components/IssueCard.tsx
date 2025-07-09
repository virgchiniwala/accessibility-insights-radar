import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SeverityBadge } from "@/components/SeverityBadge";
import { ChevronDown, ChevronUp, Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface Issue {
  id: string;
  title: string;
  description: string;
  severity: "must-fix" | "should-fix" | "nice-to-have";
  impact: string;
  whoCanFix: "Designer" | "Developer" | "Content Author";
  occurrences: number;
  details?: string;
  codeSnippet?: string;
  fixGuidance?: string[];
}

interface IssueCardProps {
  issue: Issue;
  isExpanded?: boolean;
  onToggle?: () => void;
  showDetails?: boolean;
}

export function IssueCard({ issue, isExpanded = false, onToggle, showDetails = true }: IssueCardProps) {
  const [expanded, setExpanded] = useState(isExpanded);
  
  const handleToggle = () => {
    if (onToggle) {
      onToggle();
    } else {
      setExpanded(!expanded);
    }
  };

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold text-foreground">{issue.title}</h3>
                <Info className="h-4 w-4 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground">{issue.description}</p>
              <p className="text-base font-medium text-foreground">{issue.impact}</p>
            </div>
            
            <div className="flex items-center gap-3">
              <SeverityBadge severity={issue.severity} />
              <Button
                variant="pill"
                size="sm"
                className="bg-secondary text-secondary-foreground"
              >
                {issue.whoCanFix}
              </Button>
              {showDetails && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleToggle}
                  className="flex-shrink-0"
                >
                  {(onToggle ? isExpanded : expanded) ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>
              )}
            </div>
          </div>
          
          {/* Expanded Content */}
          {(onToggle ? isExpanded : expanded) && showDetails && (
            <div className="mt-6 pt-6 border-t border-border space-y-4">
              {issue.details && (
                <div>
                  <h4 className="font-semibold mb-2">Details</h4>
                  <p className="text-muted-foreground">{issue.details}</p>
                </div>
              )}
              
              {issue.codeSnippet && (
                <div>
                  <h4 className="font-semibold mb-2">Code Example</h4>
                  <pre className="bg-surface p-4 rounded-lg text-sm overflow-x-auto">
                    <code>{issue.codeSnippet}</code>
                  </pre>
                </div>
              )}
              
              {issue.fixGuidance && (
                <div>
                  <h4 className="font-semibold mb-2">How to Fix</h4>
                  <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
                    {issue.fixGuidance.map((step, index) => (
                      <li key={index}>{step}</li>
                    ))}
                  </ol>
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}