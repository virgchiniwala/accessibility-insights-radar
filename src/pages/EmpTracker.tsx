import { useState } from "react";
import { GlobalNav } from "@/components/GlobalNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { 
  Globe, 
  TrendingUp, 
  TrendingDown, 
  Calendar, 
  Download,
  ChartBar,
  Users,
  AlertCircle
} from "lucide-react";

const siteData = [
  { name: "ministry.gov.sg", compliance: 92, trend: [85, 87, 89, 92], status: "excellent" },
  { name: "agency.gov.sg", compliance: 78, trend: [70, 72, 75, 78], status: "good" },
  { name: "portal.gov.sg", compliance: 65, trend: [60, 62, 63, 65], status: "needs-work" },
  { name: "services.gov.sg", compliance: 88, trend: [82, 84, 86, 88], status: "good" },
  { name: "info.gov.sg", compliance: 45, trend: [40, 42, 43, 45], status: "critical" }
];

const fastestImprovers = [
  { name: "ministry.gov.sg", improvement: "+15%", trend: "up" },
  { name: "services.gov.sg", improvement: "+8%", trend: "up" },
  { name: "portal.gov.sg", improvement: "+5%", trend: "up" },
  { name: "agency.gov.sg", improvement: "+3%", trend: "up" },
  { name: "info.gov.sg", improvement: "+2%", trend: "up" }
];

const leastImproved = [
  { name: "old.gov.sg", improvement: "-2%", trend: "down" },
  { name: "legacy.gov.sg", improvement: "0%", trend: "stagnant" },
  { name: "archive.gov.sg", improvement: "+1%", trend: "stagnant" },
  { name: "temp.gov.sg", improvement: "+1%", trend: "stagnant" },
  { name: "beta.gov.sg", improvement: "+2%", trend: "stagnant" }
];

const unseannedSites = [
  { name: "forgotten.gov.sg", lastScan: "78 days ago" },
  { name: "inactive.gov.sg", lastScan: "65 days ago" },
  { name: "outdated.gov.sg", lastScan: "62 days ago" }
];

export default function EmpTracker() {
  const [quickScanUrl, setQuickScanUrl] = useState("");

  const getBadgeVariant = (compliance: number) => {
    if (compliance >= 90) return "bg-green-500 text-white";
    if (compliance >= 75) return "bg-yellow-500 text-white";
    return "bg-red-500 text-white";
  };

  return (
    <div className="min-h-screen bg-background">
      <GlobalNav />
      
      <main className="container mx-auto px-20 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-[56px] leading-[64px] font-heading text-foreground mb-4">
                EMP 2030 Tracker
              </h1>
              <p className="text-lg text-muted-foreground">
                Monitor accessibility progress across government agencies
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Input
                  placeholder="Quick scan URL..."
                  value={quickScanUrl}
                  onChange={(e) => setQuickScanUrl(e.target.value)}
                  className="w-64"
                />
                <Button 
                  disabled={!quickScanUrl.trim()}
                  onClick={() => window.location.href = '/scan-modal'}
                >
                  Scan
                </Button>
              </div>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export to WOGAA CSV
              </Button>
            </div>
          </div>

          {/* Multi-Site Overview */}
          <Card className="shadow-oobee mb-8">
            <CardHeader>
              <CardTitle className="text-[40px] leading-[48px] font-heading flex items-center gap-3">
                <Globe className="h-8 w-8" />
                Multi-Site Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {siteData.map((site) => (
                  <Card key={site.name} className="border border-border hover:shadow-oobee transition-shadow">
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold text-base">{site.name}</h4>
                          <Badge 
                            className={`${getBadgeVariant(site.compliance)} font-semibold`}
                          >
                            {site.compliance}%
                          </Badge>
                        </div>
                        <div className="h-12 flex items-end gap-1">
                          {site.trend.map((value, index) => (
                            <div
                              key={index}
                              className="bg-primary rounded-sm flex-1 transition-all hover:opacity-80"
                              style={{ height: `${(value / 100) * 48}px` }}
                              tabIndex={0}
                              role="button"
                              aria-label={`Month ${index + 1}: ${value}%`}
                            />
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Agency Score vs EMP 2030 Target */}
          <Card className="shadow-oobee mb-8">
            <CardHeader>
              <CardTitle className="text-[40px] leading-[48px] font-heading flex items-center gap-3">
                <ChartBar className="h-8 w-8" />
                Agency Score vs EMP 2030 Target
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-lg">Current Average Score</span>
                  <span className="text-3xl font-bold text-primary">73.6%</span>
                </div>
                <Progress value={73.6} className="h-4" />
                <div className="flex justify-between text-base text-muted-foreground">
                  <span>Current: 73.6%</span>
                  <span className="font-semibold">EMP 2030 Target: 90%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Leaderboard */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <Card className="shadow-oobee">
              <CardHeader>
                <CardTitle className="text-[32px] leading-[40px] font-heading flex items-center gap-3">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                  Fastest Improvers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {fastestImprovers.map((site, index) => (
                    <div key={site.name} className="flex items-center justify-between p-4 bg-surface rounded-lg">
                      <div className="flex items-center gap-3">
                        <span className="text-lg font-bold text-primary">#{index + 1}</span>
                        <span className="font-medium">{site.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-green-600 font-semibold">{site.improvement}</span>
                        <TrendingUp className="h-4 w-4 text-green-600" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-oobee">
              <CardHeader>
                <CardTitle className="text-[32px] leading-[40px] font-heading flex items-center gap-3">
                  <TrendingDown className="h-6 w-6 text-orange-600" />
                  Least Improved
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {leastImproved.map((site, index) => (
                    <div key={site.name} className="flex items-center justify-between p-4 bg-surface rounded-lg">
                      <div className="flex items-center gap-3">
                        <span className="text-lg font-bold text-muted-foreground">#{index + 1}</span>
                        <span className="font-medium">{site.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`font-semibold ${
                          site.trend === 'down' ? 'text-red-600' : 'text-orange-600'
                        }`}>
                          {site.improvement}
                        </span>
                        {site.trend === 'down' ? 
                          <TrendingDown className="h-4 w-4 text-red-600" /> :
                          <div className="h-4 w-4 bg-orange-600 rounded-full" />
                        }
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Engagement Panel */}
          <Card className="shadow-oobee">
            <CardHeader>
              <CardTitle className="text-[32px] leading-[40px] font-heading flex items-center gap-3">
                <AlertCircle className="h-6 w-6 text-warning" />
                Engagement Panel
              </CardTitle>
              <p className="text-muted-foreground mt-2">Sites not scanned in ≥ 60 days</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {unseannedSites.map((site) => (
                  <div key={site.name} className="flex items-center justify-between p-4 bg-surface rounded-lg">
                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-warning" />
                      <div>
                        <span className="font-medium block">{site.name}</span>
                        <span className="text-sm text-muted-foreground">Last scan: {site.lastScan}</span>
                      </div>
                    </div>
                    <Button 
                      variant="outline"
                      onClick={() => window.location.href = `/scan-modal?url=${encodeURIComponent(site.name)}`}
                    >
                      Schedule Scan
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}