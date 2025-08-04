import { GlobalNav } from "@/components/GlobalNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, TrendingUp, TrendingDown, Minus, FileText } from "lucide-react";
import { Link } from "react-router-dom";

const scanHistory = [
  {
    id: 1,
    date: "2024-01-15",
    time: "14:30",
    website: "ministry.gov.sg",
    issues: {
      total: 127,
      mustFix: 45,
      shouldFix: 62,
      niceToHave: 20
    },
    compliance: 85,
    changes: {
      total: -12,
      mustFix: -8,
      shouldFix: -3,
      niceToHave: -1
    },
    status: "completed"
  },
  {
    id: 2,
    date: "2024-01-08",
    time: "16:45",
    website: "ministry.gov.sg",
    issues: {
      total: 139,
      mustFix: 53,
      shouldFix: 65,
      niceToHave: 21
    },
    compliance: 78,
    changes: {
      total: +5,
      mustFix: +2,
      shouldFix: +3,
      niceToHave: 0
    },
    status: "completed"
  },
  {
    id: 3,
    date: "2024-01-02",
    time: "10:15",
    website: "ministry.gov.sg",
    issues: {
      total: 134,
      mustFix: 51,
      shouldFix: 62,
      niceToHave: 21
    },
    compliance: 72,
    changes: {
      total: -8,
      mustFix: -5,
      shouldFix: -2,
      niceToHave: -1
    },
    status: "completed"
  },
  {
    id: 4,
    date: "2023-12-25",
    time: "09:30",
    website: "ministry.gov.sg",
    issues: {
      total: 142,
      mustFix: 56,
      shouldFix: 64,
      niceToHave: 22
    },
    compliance: 68,
    changes: null, // First scan
    status: "completed"
  }
];

function DiffBadge({ change }: { change: number | null }) {
  if (change === null) return <Badge variant="secondary">Initial</Badge>;
  if (change === 0) return (
    <Badge variant="secondary" className="bg-gray-100 text-gray-600">
      <Minus className="h-3 w-3 mr-1" />
      No change
    </Badge>
  );
  if (change > 0) return (
    <Badge variant="destructive" className="bg-red-100 text-red-700 border-red-300">
      <TrendingUp className="h-3 w-3 mr-1" />
      +{change}
    </Badge>
  );
  return (
    <Badge variant="default" className="bg-green-100 text-green-700 border-green-300">
      <TrendingDown className="h-3 w-3 mr-1" />
      {change}
    </Badge>
  );
}

export default function ScanHistoryNew() {
  return (
    <div className="min-h-screen bg-background">
      <GlobalNav />
      
      <main className="container mx-auto px-20 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-5xl font-heading font-normal text-foreground mb-4">
                Scan History
              </h1>
              <p className="text-lg text-muted-foreground">
                Track accessibility improvements over time
              </p>
            </div>
            
            <Link to="/report-details">
              <Button size="lg" className="bg-primary hover:bg-primary-hover text-primary-foreground">
                <FileText className="mr-2 h-5 w-5" />
                View Latest Report
              </Button>
            </Link>
          </div>

          {/* Timeline */}
          <div className="space-y-6">
            {scanHistory.map((scan, index) => (
              <Card key={scan.id} className="shadow-oobee relative">
                {/* Timeline connector */}
                {index < scanHistory.length - 1 && (
                  <div className="absolute left-8 bottom-0 w-0.5 h-6 bg-border transform translate-y-full" />
                )}
                
                <CardContent className="p-8">
                  <div className="flex items-start gap-6">
                    {/* Timeline dot */}
                    <div className="flex-shrink-0 w-4 h-4 bg-primary rounded-full mt-6" />
                    
                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <Calendar className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="text-lg font-semibold">
                              {new Date(scan.date).toLocaleDateString('en-US', { 
                                weekday: 'long', 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric' 
                              })}
                            </p>
                            <p className="text-sm text-muted-foreground">{scan.time} • {scan.website}</p>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <p className="text-2xl font-bold text-primary">{scan.compliance}%</p>
                          <p className="text-sm text-muted-foreground">WCAG Compliance</p>
                        </div>
                      </div>

                      {/* Issues breakdown */}
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                        {/* Total Issues */}
                        <div className="bg-surface rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-sm font-medium">Total Issues</p>
                            <DiffBadge change={scan.changes?.total || null} />
                          </div>
                          <p className="text-2xl font-bold">{scan.issues.total}</p>
                        </div>

                        {/* Must Fix */}
                        <div className="bg-surface rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-sm font-medium text-error">Must Fix</p>
                            <DiffBadge change={scan.changes?.mustFix || null} />
                          </div>
                          <p className="text-2xl font-bold text-error">{scan.issues.mustFix}</p>
                        </div>

                        {/* Should Fix */}
                        <div className="bg-surface rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-sm font-medium text-warning">Should Fix</p>
                            <DiffBadge change={scan.changes?.shouldFix || null} />
                          </div>
                          <p className="text-2xl font-bold text-warning">{scan.issues.shouldFix}</p>
                        </div>

                        {/* Nice to Have */}
                        <div className="bg-surface rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-sm font-medium text-info">Nice to Have</p>
                            <DiffBadge change={scan.changes?.niceToHave || null} />
                          </div>
                          <p className="text-2xl font-bold text-info">{scan.issues.niceToHave}</p>
                        </div>
                      </div>

                      {/* Progress bar */}
                      <div className="w-full h-2 bg-surface rounded-full overflow-hidden mb-4">
                        <div 
                          className="h-full bg-primary transition-all"
                          style={{ width: `${scan.compliance}%` }}
                        />
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-3">
                        <Link to="/report-details">
                          <Button variant="ghost" size="sm">
                            View Report
                          </Button>
                        </Link>
                        {index < scanHistory.length - 1 && (
                          <Link to="/history-comparison">
                            <Button variant="ghost" size="sm">
                              Compare with Previous
                            </Button>
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}