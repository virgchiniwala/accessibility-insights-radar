import { useState } from "react";
import { GlobalNav } from "@/components/GlobalNav";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, TrendingUp, RefreshCcw } from "lucide-react";

const scanOptions = [
  { value: "scan-jul-1", label: "Jul 1, 2025 - Baseline Scan" },
  { value: "scan-jul-15", label: "Jul 15, 2025 - Latest Scan" },
  { value: "scan-jun-15", label: "Jun 15, 2025 - Previous Scan" },
  { value: "scan-jun-1", label: "Jun 1, 2025 - Initial Scan" }
];

const scanData = {
  "scan-jul-1": {
    date: "Jul 1, 2025",
    mustFix: 8,
    shouldFix: 12,
    niceToHave: 15,
    score: 67,
    label: "Baseline"
  },
  "scan-jul-15": {
    date: "Jul 15, 2025", 
    mustFix: 3,
    shouldFix: 8,
    niceToHave: 12,
    score: 85,
    label: "Latest"
  },
  "scan-jun-15": {
    date: "Jun 15, 2025",
    mustFix: 12,
    shouldFix: 18,
    niceToHave: 20,
    score: 52,
    label: "Previous"
  },
  "scan-jun-1": {
    date: "Jun 1, 2025",
    mustFix: 15,
    shouldFix: 22,
    niceToHave: 25,
    score: 45,
    label: "Initial"
  }
};

export default function ScanHistoryComparison() {
  const [scanA, setScanA] = useState("scan-jul-1");
  const [scanB, setScanB] = useState("scan-jul-15");

  const dataA = scanData[scanA as keyof typeof scanData];
  const dataB = scanData[scanB as keyof typeof scanData];
  
  const improvement = dataA.mustFix - dataB.mustFix;
  const scoreIncrease = dataB.score - dataA.score;
  const hasImprovement = improvement > 0 && scoreIncrease > 0;

  const maxIssues = Math.max(
    dataA.mustFix + dataA.shouldFix + dataA.niceToHave,
    dataB.mustFix + dataB.shouldFix + dataB.niceToHave,
    35
  );

  const ProgressBar = ({ value, max, color, label, count }: { 
    value: number; 
    max: number; 
    color: string; 
    label: string;
    count: number;
  }) => (
    <div className="flex items-center gap-2">
      <div className="w-20 text-xs font-medium">{label}</div>
      <div className="flex-1 bg-surface rounded-full h-3 relative">
        <div 
          className={`${color} h-3 rounded-full transition-all duration-300`}
          style={{ width: `${(value / max) * 100}%` }}
        />
        <div className="absolute inset-0 flex items-center justify-end pr-2">
          <span className="text-xs font-medium text-foreground">{count}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <GlobalNav />
      
      <main className="max-w-[1440px] mx-auto px-6 py-8">
        <div className="space-y-8">
          {/* Page Header */}
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-heading font-normal mb-2">Scan History Comparison</h1>
              <p className="text-lg text-muted-foreground">
                Track your accessibility improvements over time
              </p>
            </div>
            
            <Button>
              <RefreshCcw className="h-4 w-4 mr-2" />
              Rescan now
            </Button>
          </div>

          {/* Scan Selection */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Select Scan A (Baseline)</CardTitle>
              </CardHeader>
              <CardContent>
                <Select value={scanA} onValueChange={setScanA}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {scanOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Select Scan B (Comparison)</CardTitle>
              </CardHeader>
              <CardContent>
                <Select value={scanB} onValueChange={setScanB}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {scanOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>
          </div>

          {/* Success Banner */}
          {hasImprovement && (
            <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <TrendingUp className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h2 className="text-xl font-semibold text-green-800 mb-2">Great Progress!</h2>
                    <p className="text-lg text-green-700">
                      <strong>You fixed {improvement} Must-Fix issues (+{scoreIncrease} accessibility score).</strong>
                    </p>
                    <p className="text-green-600 mt-2">
                      Your site is now more accessible to users with disabilities. Keep up the excellent work!
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Empty State */}
          {scanA === scanB && (
            <Card className="bg-surface/50">
              <CardContent className="p-12 text-center">
                <div className="text-4xl mb-4">📊</div>
                <h3 className="text-xl font-semibold mb-2">Select Different Scans to Compare</h3>
                <p className="text-muted-foreground">
                  Choose two different scans from the dropdowns above to see your accessibility progress over time.
                </p>
              </CardContent>
            </Card>
          )}

          {/* Comparison Grid */}
          {scanA !== scanB && (
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Scan A */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      Scan A ({dataA.date})
                    </CardTitle>
                    <Badge variant="outline">{dataA.label}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Score */}
                  <div className="text-center">
                    <div className="text-4xl font-bold text-muted-foreground mb-2">{dataA.score}%</div>
                    <div className="text-sm text-muted-foreground">Accessibility Score</div>
                  </div>

                  {/* Issues Breakdown */}
                  <div className="space-y-4">
                    <h4 className="font-semibold">Issues Found</h4>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-severity-must-fix rounded-full"></div>
                          <span>Must Fix</span>
                        </div>
                        <span className="font-semibold">{dataA.mustFix}</span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-severity-should-fix rounded-full"></div>
                          <span>Should Fix</span>
                        </div>
                        <span className="font-semibold">{dataA.shouldFix}</span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-severity-nice-to-have rounded-full"></div>
                          <span>Nice to Have</span>
                        </div>
                        <span className="font-semibold">{dataA.niceToHave}</span>
                      </div>
                    </div>

                    {/* Bar Chart */}
                    <div className="space-y-2 mt-4">
                      <div className="text-sm font-medium">Issue Distribution</div>
                      <div className="space-y-2">
                        <ProgressBar 
                          value={dataA.mustFix} 
                          max={maxIssues} 
                          color="bg-severity-must-fix" 
                          label="Must Fix"
                          count={dataA.mustFix}
                        />
                        <ProgressBar 
                          value={dataA.shouldFix} 
                          max={maxIssues} 
                          color="bg-severity-should-fix" 
                          label="Should Fix"
                          count={dataA.shouldFix}
                        />
                        <ProgressBar 
                          value={dataA.niceToHave} 
                          max={maxIssues} 
                          color="bg-severity-nice-to-have" 
                          label="Nice to Have"
                          count={dataA.niceToHave}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Scan B */}
              <Card className={hasImprovement ? "border-green-200" : ""}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      Scan B ({dataB.date})
                    </CardTitle>
                    <Badge className={hasImprovement ? "bg-green-100 text-green-800 hover:bg-green-100" : ""}>
                      {dataB.label}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Score */}
                  <div className="text-center">
                    <div className={`text-4xl font-bold mb-2 ${hasImprovement ? 'text-green-600' : 'text-muted-foreground'}`}>
                      {dataB.score}%
                    </div>
                    <div className="text-sm text-muted-foreground">Accessibility Score</div>
                    {hasImprovement && (
                      <Badge variant="outline" className="mt-2 text-green-600 border-green-200">
                        +{scoreIncrease} improvement
                      </Badge>
                    )}
                  </div>

                  {/* Issues Breakdown */}
                  <div className="space-y-4">
                    <h4 className="font-semibold">Issues Found</h4>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-severity-must-fix rounded-full"></div>
                          <span>Must Fix</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{dataB.mustFix}</span>
                          {hasImprovement && (
                            <Badge variant="outline" className="text-green-600 border-green-200 text-xs">
                              -{improvement}
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-severity-should-fix rounded-full"></div>
                          <span>Should Fix</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{dataB.shouldFix}</span>
                          {hasImprovement && dataA.shouldFix > dataB.shouldFix && (
                            <Badge variant="outline" className="text-green-600 border-green-200 text-xs">
                              -{dataA.shouldFix - dataB.shouldFix}
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-severity-nice-to-have rounded-full"></div>
                          <span>Nice to Have</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{dataB.niceToHave}</span>
                          {hasImprovement && dataA.niceToHave > dataB.niceToHave && (
                            <Badge variant="outline" className="text-green-600 border-green-200 text-xs">
                              -{dataA.niceToHave - dataB.niceToHave}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Bar Chart */}
                    <div className="space-y-2 mt-4">
                      <div className="text-sm font-medium">Issue Distribution</div>
                      <div className="space-y-2">
                        <ProgressBar 
                          value={dataB.mustFix} 
                          max={maxIssues} 
                          color="bg-severity-must-fix" 
                          label="Must Fix"
                          count={dataB.mustFix}
                        />
                        <ProgressBar 
                          value={dataB.shouldFix} 
                          max={maxIssues} 
                          color="bg-severity-should-fix" 
                          label="Should Fix"
                          count={dataB.shouldFix}
                        />
                        <ProgressBar 
                          value={dataB.niceToHave} 
                          max={maxIssues} 
                          color="bg-severity-nice-to-have" 
                          label="Nice to Have"
                          count={dataB.niceToHave}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Key Improvements */}
          {hasImprovement && (
            <Card>
              <CardHeader>
                <CardTitle>Key Improvements Made</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h4 className="font-semibold text-green-600">✅ Issues Fixed</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          Added alt text to 5 key images
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          Improved color contrast on navigation
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          Fixed form label associations
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          Added H1 headings to 2 pages
                        </li>
                      </ul>
                    </div>
                    
                    <div className="space-y-3">
                      <h4 className="font-semibold text-orange-600">⚠️ Still Needs Attention</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                          {dataB.mustFix} images still missing alt text
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                          Some form validation messages
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                          Focus indicators on custom buttons
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Next Steps */}
          <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-3">Recommended Next Steps</h3>
              <div className="space-y-2 text-sm">
                <p>• Focus on the remaining {dataB.mustFix} Must-Fix issues for maximum impact</p>
                <p>• Consider manual testing with screen readers</p>
                <p>• Schedule regular scans to maintain accessibility standards</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}