import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface WCAGComplianceCardProps {
  passedChecks: number;
  totalChecks: number;
  overallCompliance: number;
  variant?: "pass" | "needs-improvement" | "fail";
}

export function WCAGComplianceCard({ 
  passedChecks, 
  totalChecks, 
  overallCompliance,
  variant = "needs-improvement" 
}: WCAGComplianceCardProps) {
  const failedChecks = totalChecks - passedChecks;
  const progressPercentage = (passedChecks / totalChecks) * 100;
  
  const getVariantStyles = () => {
    switch (variant) {
      case "pass":
        return {
          ringColor: "text-green-600",
          labelColor: "text-green-700",
          labelText: "Pass",
          subText: "All automated checks passing"
        };
      case "fail":
        return {
          ringColor: "text-red-600", 
          labelColor: "text-red-700",
          labelText: "Fail",
          subText: `${failedChecks} checks failing • Critical issues need attention`
        };
      default:
        return {
          ringColor: "text-primary",
          labelColor: "text-foreground",
          labelText: "Needs Improvement", 
          subText: `${failedChecks} checks failing • Focus on Must-Fix issues`
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <Card>
      <CardHeader>
        <CardTitle>WCAG Compliance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-6">
          {/* Circular Progress Ring */}
          <div className="relative w-20 h-20">
            <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 80 80">
              {/* Background circle */}
              <circle
                cx="40"
                cy="40"
                r="32"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                className="text-surface"
              />
              {/* Progress circle */}
              <circle
                cx="40"
                cy="40"
                r="32"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                strokeDasharray={`${progressPercentage * 2.01} 201`}
                className={styles.ringColor}
                strokeLinecap="round"
              />
            </svg>
            {/* Center text */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-sm font-bold text-foreground">
                {passedChecks} / {totalChecks}
              </span>
            </div>
          </div>

          {/* Right side content */}
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-3">
              <h3 className={`text-lg font-semibold ${styles.labelColor}`}>
                WCAG A & AA: {styles.labelText}
              </h3>
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                {overallCompliance}% overall compliance
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              {styles.subText}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}