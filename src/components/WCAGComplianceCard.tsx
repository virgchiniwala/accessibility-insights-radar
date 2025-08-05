import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, AlertTriangle, XCircle } from "lucide-react";

interface WCAGComplianceCardProps {
  variant?: "pass" | "needs-improvement" | "fail";
  score?: number;
  className?: string;
}

export function WCAGComplianceCard({ 
  variant = "needs-improvement", 
  score = 85,
  className = ""
}: WCAGComplianceCardProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case "pass":
        return {
          icon: CheckCircle,
          iconColor: "text-green-600",
          bgColor: "bg-green-50 border-green-200",
          textColor: "text-green-800"
        };
      case "fail":
        return {
          icon: XCircle,
          iconColor: "text-error",
          bgColor: "bg-red-50 border-red-200",
          textColor: "text-red-800"
        };
      default:
        return {
          icon: AlertTriangle,
          iconColor: "text-warning",
          bgColor: "bg-yellow-50 border-yellow-200",
          textColor: "text-yellow-800"
        };
    }
  };

  const { icon: Icon, iconColor, bgColor, textColor } = getVariantStyles();

  return (
    <Card className={`shadow-oobee ${bgColor} ${className}`}>
      <CardHeader>
        <CardTitle className="text-[32px] leading-[40px] font-heading flex items-center gap-3">
          <Icon className={`h-6 w-6 ${iconColor}`} />
          WCAG Compliance
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-lg">Overall Score</span>
            <span className={`text-3xl font-bold ${textColor}`}>{score}%</span>
          </div>
          <Progress value={score} className="h-1" />
          <div className="flex justify-between text-base text-muted-foreground">
            <span>Current: {score}%</span>
            <span className="font-semibold">Target: 90%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}