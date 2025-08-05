import { useState } from "react";
import { Link } from "react-router-dom";
import { GlobalNav } from "@/components/GlobalNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { ExternalLink, Calendar, Building, Users, ChartBar, Home, Globe, AlertTriangle, Settings, TrendingUp, Download } from "lucide-react";

const siteData = [
  { name: "ministry.gov.sg", compliance: 92, trend: [85, 87, 89, 92], status: "excellent" },
  { name: "agency.gov.sg", compliance: 78, trend: [70, 72, 75, 78], status: "good" },
  { name: "portal.gov.sg", compliance: 65, trend: [60, 62, 63, 65], status: "needs-work" },
  { name: "services.gov.sg", compliance: 88, trend: [82, 84, 86, 88], status: "good" },
  { name: "info.gov.sg", compliance: 45, trend: [40, 42, 43, 45], status: "critical" }
];

const issueCategories = [
  { category: "Developer", count: 156, color: "#D0E4FF" },
  { category: "Designer", count: 89, color: "#F4E0FF" },
  { category: "Content Author", count: 67, color: "#CFF9E6" }
];

export default function DashboardNew() {
  const [quickScanUrl, setQuickScanUrl] = useState("");

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-background flex">
        {/* Left Navigation Rail */}
        <Sidebar className="w-16">
          <SidebarHeader className="p-4">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <ChartBar className="h-4 w-4 text-primary-foreground" />
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton isActive tooltip="Overview">
                  <Home className="h-5 w-5" />
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Sites">
                  <Globe className="h-5 w-5" />
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Issues">
                  <AlertTriangle className="h-5 w-5" />
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Users">
                  <Users className="h-5 w-5" />
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Settings">
                  <Settings className="h-5 w-5" />
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>

        {/* Main Content */}
        <SidebarInset className="flex-1">
          <GlobalNav />
          
          <main className="container mx-auto px-20 py-8">
            <div className="max-w-6xl mx-auto">
              {/* Header with Quick Scan */}
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h1 className="text-5xl font-heading font-normal text-foreground mb-4">
                    Agency Dashboard
                  </h1>
                  <p className="text-lg text-muted-foreground">
                    Comprehensive accessibility insights for your organization
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
                      className="bg-primary hover:bg-primary-hover text-primary-foreground"
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
                  <CardTitle className="text-2xl font-heading flex items-center gap-2">
                    <Globe className="h-6 w-6" />
                    Multi-Site Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {siteData.map((site) => (
                      <Card key={site.name} className="border border-border">
                        <CardContent className="p-4">
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium text-sm">{site.name}</h4>
                              <Badge 
                                variant="outline"
                                className={
                                  site.status === "excellent" ? "border-green-200 text-green-700" :
                                  site.status === "good" ? "border-blue-200 text-blue-700" :
                                  site.status === "needs-work" ? "border-orange-200 text-orange-700" :
                                  "border-red-200 text-red-700"
                                }
                              >
                                {site.compliance}%
                              </Badge>
                            </div>
                            <div className="h-8 flex items-end gap-1">
                              {site.trend.map((value, index) => (
                                <div
                                  key={index}
                                  className="bg-primary rounded-sm flex-1"
                                  style={{ height: `${(value / 100) * 32}px` }}
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

              {/* Trend Chart */}
              <Card className="shadow-oobee mb-8">
                <CardHeader>
                  <CardTitle className="text-2xl font-heading flex items-center gap-2">
                    <TrendingUp className="h-6 w-6" />
                    Agency Score vs EMP 2030 Target
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Current Average Score</span>
                      <span className="text-2xl font-bold text-primary">73.6%</span>
                    </div>
                    <Progress value={73.6} className="h-3" />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Current: 73.6%</span>
                      <span>EMP 2030 Target: 90%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Top Recurring Issues */}
              <Card className="shadow-oobee mb-8">
                <CardHeader>
                  <CardTitle className="text-2xl font-heading flex items-center gap-2">
                    <AlertTriangle className="h-6 w-6" />
                    Top Recurring Issues
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {issueCategories.map((issue) => (
                      <div key={issue.category} className="flex items-center justify-between p-4 bg-surface rounded-lg">
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: issue.color }}
                          />
                          <span className="font-medium">{issue.category} Issues</span>
                        </div>
                        <Badge variant="secondary">{issue.count} total</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <Building className="h-8 w-8 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold text-foreground mb-2">View Full Report</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Access detailed accessibility analysis and issue tracking
                  </p>
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/reports">View Full Report</Link>
                  </Button>
                </div>
                
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <Users className="h-8 w-8 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold text-foreground mb-2">Team Management</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Coordinate accessibility efforts across your team
                  </p>
                  <Button variant="outline" className="w-full">
                    Manage Team
                  </Button>
                </div>
              </div>
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}