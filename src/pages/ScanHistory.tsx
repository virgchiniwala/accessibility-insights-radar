import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, TrendingUp, RefreshCcw } from "lucide-react";

const scanData = {
  scanA: {
    date: "Jul 1, 2025",
    mustFix: 8,
    shouldFix: 12,
    niceToHave: 15,
    score: 67
  },
  scanB: {
    date: "Jul 15, 2025", 
    mustFix: 3,
    shouldFix: 8,
    niceToHave: 12,
    score: 85
  }
};

export default function ScanHistory() {
  const actionButtons = (
    <Button>
      <RefreshCcw className="h-4 w-4" />
      Rescan now
    </Button>
  );

  const improvement = scanData.scanA.mustFix - scanData.scanB.mustFix;
  const scoreIncrease = scanData.scanB.score - scanData.scanA.score;

  return (
    <Layout actionButtons={actionButtons}>
      <div className="space-y-8">
        {/* Page Header */}
        <div>
          <h1 className="text-4xl font-heading font-normal mb-2">Scan History Comparison</h1>
          <p className="text-lg text-muted-foreground">
            Track your accessibility improvements over time
          </p>
        </div>

        {/* Success Banner */}
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

        {/* Comparison Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Scan A */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Scan A ({scanData.scanA.date})
                </CardTitle>
                <Badge variant="outline">Baseline</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Score */}
              <div className="text-center">
                <div className="text-4xl font-bold text-muted-foreground mb-2">{scanData.scanA.score}%</div>
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
                    <span className="font-semibold">{scanData.scanA.mustFix}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-severity-should-fix rounded-full"></div>
                      <span>Should Fix</span>
                    </div>
                    <span className="font-semibold">{scanData.scanA.shouldFix}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-severity-nice-to-have rounded-full"></div>
                      <span>Nice to Have</span>
                    </div>
                    <span className="font-semibold">{scanData.scanA.niceToHave}</span>
                  </div>
                </div>

                {/* Bar Chart */}
                <div className="space-y-2 mt-4">
                  <div className="text-sm font-medium">Issue Distribution</div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-16 text-xs">Must Fix</div>
                      <div className="flex-1 bg-surface rounded-full h-2">
                        <div 
                          className="bg-severity-must-fix h-2 rounded-full" 
                          style={{ width: `${(scanData.scanA.mustFix / 35) * 100}%` }}
                        ></div>
                      </div>
                      <div className="w-8 text-xs text-right">{scanData.scanA.mustFix}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-16 text-xs">Should Fix</div>
                      <div className="flex-1 bg-surface rounded-full h-2">
                        <div 
                          className="bg-severity-should-fix h-2 rounded-full" 
                          style={{ width: `${(scanData.scanA.shouldFix / 35) * 100}%` }}
                        ></div>
                      </div>
                      <div className="w-8 text-xs text-right">{scanData.scanA.shouldFix}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-16 text-xs">Nice to Have</div>
                      <div className="flex-1 bg-surface rounded-full h-2">
                        <div 
                          className="bg-severity-nice-to-have h-2 rounded-full" 
                          style={{ width: `${(scanData.scanA.niceToHave / 35) * 100}%` }}
                        ></div>
                      </div>
                      <div className="w-8 text-xs text-right">{scanData.scanA.niceToHave}</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Scan B */}
          <Card className="border-green-200">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Scan B ({scanData.scanB.date})
                </CardTitle>
                <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Latest</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Score */}
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">{scanData.scanB.score}%</div>
                <div className="text-sm text-muted-foreground">Accessibility Score</div>
                <Badge variant="outline" className="mt-2 text-green-600 border-green-200">
                  +{scoreIncrease} improvement
                </Badge>
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
                      <span className="font-semibold">{scanData.scanB.mustFix}</span>
                      <Badge variant="outline" className="text-green-600 border-green-200 text-xs">
                        -{improvement}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-severity-should-fix rounded-full"></div>
                      <span>Should Fix</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{scanData.scanB.shouldFix}</span>
                      <Badge variant="outline" className="text-green-600 border-green-200 text-xs">
                        -{scanData.scanA.shouldFix - scanData.scanB.shouldFix}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-severity-nice-to-have rounded-full"></div>
                      <span>Nice to Have</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{scanData.scanB.niceToHave}</span>
                      <Badge variant="outline" className="text-green-600 border-green-200 text-xs">
                        -{scanData.scanA.niceToHave - scanData.scanB.niceToHave}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Bar Chart */}
                <div className="space-y-2 mt-4">
                  <div className="text-sm font-medium">Issue Distribution</div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-16 text-xs">Must Fix</div>
                      <div className="flex-1 bg-surface rounded-full h-2">
                        <div 
                          className="bg-severity-must-fix h-2 rounded-full" 
                          style={{ width: `${(scanData.scanB.mustFix / 35) * 100}%` }}
                        ></div>
                      </div>
                      <div className="w-8 text-xs text-right">{scanData.scanB.mustFix}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-16 text-xs">Should Fix</div>
                      <div className="flex-1 bg-surface rounded-full h-2">
                        <div 
                          className="bg-severity-should-fix h-2 rounded-full" 
                          style={{ width: `${(scanData.scanB.shouldFix / 35) * 100}%` }}
                        ></div>
                      </div>
                      <div className="w-8 text-xs text-right">{scanData.scanB.shouldFix}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-16 text-xs">Nice to Have</div>
                      <div className="flex-1 bg-surface rounded-full h-2">
                        <div 
                          className="bg-severity-nice-to-have h-2 rounded-full" 
                          style={{ width: `${(scanData.scanB.niceToHave / 35) * 100}%` }}
                        ></div>
                      </div>
                      <div className="w-8 text-xs text-right">{scanData.scanB.niceToHave}</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Key Improvements */}
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
                      3 images still missing alt text
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

        {/* Next Steps */}
        <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-3">Recommended Next Steps</h3>
            <div className="space-y-2 text-sm">
              <p>• Focus on the remaining 3 Must-Fix issues for maximum impact</p>
              <p>• Consider manual testing with screen readers</p>
              <p>• Schedule regular scans to maintain accessibility standards</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}