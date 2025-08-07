import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, AlertTriangle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface WCAGComplianceCardProps {
  variant?: "compliant" | "needs-improvement" | "fail";
  score?: number;
  className?: string;
}

export function WCAGComplianceCard({ 
  variant, 
  score = 85,
  className = ""
}: WCAGComplianceCardProps) {
  // Auto-determine variant based on score if not provided
  const cardVariant = variant || (score === 100 ? "compliant" : score < 90 ? "needs-improvement" : "fail");
  
  const getVariantStyles = () => {
    switch (cardVariant) {
      case "compliant":
        return {
          icon: CheckCircle,
          iconColor: "text-pass-green",
          bgColor: "bg-surface-green",
          textColor: "text-pass-green",
          label: "Compliant"
        };
      case "fail":
        return {
          icon: XCircle,
          iconColor: "text-error-red",
          bgColor: "bg-red-50",
          textColor: "text-error-red",
          label: null
        };
      default: // needs-improvement
        return {
          icon: AlertTriangle,
          iconColor: "text-error-red",
          bgColor: "bg-surface-yellow",
          textColor: "text-foreground",
          label: null
        };
    }
  };

  const { icon: Icon, iconColor, bgColor, textColor, label } = getVariantStyles();
  const checksNeeded = Math.ceil((90 - score) / 5);

  return (
    <Card className={cn("shadow-oobee border-0", bgColor, className)}>
      <CardHeader>
        <CardTitle className="text-[32px] leading-[40px] font-heading flex items-center gap-3">
          <Icon className={`h-6 w-6 ${iconColor}`} />
          WCAG Compliance
          {label && (
            <span className={`ml-auto text-lg font-semibold ${textColor}`}>
              {label}
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-lg text-foreground">Overall Score</span>
            <span className="text-right">
              <span className="font-semibold text-muted-foreground text-sm block">Target 90%</span>
            </span>
          </div>
          <div className={cn("p-4 rounded-lg", bgColor === "bg-surface-yellow" ? "bg-surface-yellow" : "bg-white")}>
            <Progress value={score} className="h-2 mb-3" />
            <div className="flex justify-between items-center">
              <span className={`text-3xl font-bold ${textColor}`}>{score}%</span>
            </div>
          </div>
          
          {score < 90 && (
            <div className="flex items-start gap-2 text-sm">
              <XCircle className="h-4 w-4 text-error-red mt-0.5 flex-shrink-0" />
              <p className="text-muted-foreground">
                You're missing <span className="font-bold text-foreground">{checksNeeded} checks</span> — fix all to comply with IM8.
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}