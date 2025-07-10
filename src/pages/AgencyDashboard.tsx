import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Users, Award, TrendingUp, Mail } from "lucide-react";

const agencies = [
  {
    name: "Ministry of Health",
    scansRun: 24,
    issuesFixed: 156,
    badge: "Accessibility Champion",
    score: 92,
    trend: "+15"
  },
  {
    name: "IRAS",
    scansRun: 18,
    issuesFixed: 89,
    badge: "Gold Standard",
    score: 88,
    trend: "+12"
  },
  {
    name: "SportSG", 
    scansRun: 12,
    issuesFixed: 67,
    badge: "Rising Star",
    score: 78,
    trend: "+8"
  },
  {
    name: "NEA",
    scansRun: 8,
    issuesFixed: 34,
    badge: "Getting Started",
    score: 65,
    trend: "+5"
  },
  {
    name: "LTA",
    scansRun: 3,
    issuesFixed: 12,
    badge: "Needs Support",
    score: 45,
    trend: "+2"
  }
];

const kpiData = [
  { name: "Digital Accessibility", progress: 78, target: 85 },
  { name: "Inclusive Design", progress: 65, target: 80 },
  { name: "WCAG AA Compliance", progress: 82, target: 90 },
  { name: "User Testing Coverage", progress: 56, target: 75 }
];

export default function AgencyDashboard() {
  const [filter, setFilter] = useState("all");

  const filteredAgencies = filter === "low-engagement" 
    ? agencies.filter(agency => agency.scansRun < 5)
    : agencies;

  const actionButtons = (
    <Button variant="secondary">
      <Mail className="h-4 w-4" />
      Invite low-engagement agencies to onboarding workshop
    </Button>
  );

  return (
    <Layout actionButtons={actionButtons}>
      <div className="space-y-8">
        {/* Page Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-heading font-normal mb-2">Agency Dashboard</h1>
            <p className="text-lg text-muted-foreground">
              Track accessibility progress across government agencies
            </p>
            <Badge variant="outline" className="mt-2">Beta</Badge>
          </div>
        </div>

        {/* EMP 2030 Tracker */}
        <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              EMP 2030 Progress Tracker
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {kpiData.map((kpi) => (
                <div key={kpi.name} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{kpi.name}</span>
                    <span className="text-sm text-muted-foreground">
                      {kpi.progress}% / {kpi.target}%
                    </span>
                  </div>
                  <Progress value={kpi.progress} className="h-2" />
                  <div className="text-xs text-muted-foreground">
                    Target: {kpi.target}% by 2030
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Overview Stats */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Agencies</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{agencies.length}</div>
              <p className="text-xs text-muted-foreground">Active in accessibility program</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Scans</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{agencies.reduce((sum, a) => sum + a.scansRun, 0)}</div>
              <p className="text-xs text-muted-foreground">Last 30 days</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Issues Fixed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{agencies.reduce((sum, a) => sum + a.issuesFixed, 0)}</div>
              <p className="text-xs text-muted-foreground">Last 30 days</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Leaderboard */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Agency Leaderboard</CardTitle>
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger className="w-64">
                  <SelectValue placeholder="Filter agencies" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All agencies</SelectItem>
                  <SelectItem value="low-engagement">Show agencies with &lt; 5 scans</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Table Header */}
              <div className="grid grid-cols-6 gap-4 pb-3 border-b border-border text-sm font-medium text-muted-foreground">
                <div className="col-span-2">Agency Name</div>
                <div>Scans Run</div>
                <div>Issues Fixed</div>
                <div>Score</div>
                <div>Badge Status</div>
              </div>

              {/* Table Rows */}
              <div className="space-y-3">
                {filteredAgencies.map((agency, index) => (
                  <div key={agency.name} className="grid grid-cols-6 gap-4 p-3 rounded-lg hover:bg-surface/50 transition-colors">
                    <div className="col-span-2 flex items-center gap-3">
                      <div className="flex items-center justify-center w-8 h-8 bg-primary text-primary-foreground rounded-full text-sm font-semibold">
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-medium">{agency.name}</div>
                        <div className="text-sm text-muted-foreground">.gov.sg</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <span className="font-semibold">{agency.scansRun}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{agency.issuesFixed}</span>
                      <Badge variant="outline" className="text-green-600 border-green-200 text-xs">
                        {agency.trend}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{agency.score}%</span>
                        <div className="w-16 bg-surface rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full" 
                            style={{ width: `${agency.score}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <Badge 
                        variant="outline"
                        className={
                          agency.badge === "Accessibility Champion" ? "border-green-200 text-green-700" :
                          agency.badge === "Gold Standard" ? "border-yellow-200 text-yellow-700" :
                          agency.badge === "Rising Star" ? "border-blue-200 text-blue-700" :
                          agency.badge === "Getting Started" ? "border-orange-200 text-orange-700" :
                          "border-red-200 text-red-700"
                        }
                      >
                        {agency.badge === "Accessibility Champion" && <Award className="h-3 w-3 mr-1" />}
                        {agency.badge}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Your Next Milestone */}
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="flex-1">
                <h3 className="font-semibold text-green-800 mb-2">Your Next Milestone</h3>
                <p className="text-green-700 mb-4">
                  Fix 34 more issues to reach Gold Standard (90% accessibility score).
                </p>
                <Button variant="default">
                  View open must-fix issues
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-800">Next Steps</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-between border-blue-200 hover:bg-primary-hover hover:border-primary-hover hover:text-white">
              Run monthly scan now
              <TrendingUp className="h-4 w-4" />
            </Button>
            <Button variant="outline" className="w-full justify-between border-blue-200 hover:bg-primary-hover hover:border-primary-hover hover:text-white">
              Download vendor report (PDF)
              <TrendingUp className="h-4 w-4" />
            </Button>
            <Button variant="outline" className="w-full justify-between border-blue-200 hover:bg-primary-hover hover:border-primary-hover hover:text-white">
              Invite teammate
              <TrendingUp className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}