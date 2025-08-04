import { useState } from "react";
import { GlobalNav } from "@/components/GlobalNav";
import { SeverityBadge } from "@/components/SeverityBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { AlertTriangle, Search, Link2, Download, FileText, FileSpreadsheet, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

const topIssues = [
  {
    id: 1,
    title: "Images missing alternative text",
    description: "Screen readers cannot describe images to visually impaired users",
    severity: "must-fix" as const,
    impact: "Affects 89% of your pages",
    pages: 42
  },
  {
    id: 2,
    title: "Form controls missing labels",
    description: "Form fields cannot be identified by assistive technologies",
    severity: "must-fix" as const,
    impact: "Affects 67% of your forms",
    pages: 18
  },
  {
    id: 3,
    title: "Insufficient color contrast",
    description: "Text may be difficult to read for users with visual impairments",
    severity: "should-fix" as const,
    impact: "Affects 45% of your content",
    pages: 28
  }
];

const allIssues = [
  {
    id: 1,
    rule: "Image Alternative Text",
    title: "Images missing alternative text",
    severity: "must-fix" as const,
    pages: 42,
    roles: ["Content Author", "Developer"],
    description: "Screen readers cannot describe images to visually impaired users"
  },
  {
    id: 2,
    rule: "Form Label",
    title: "Form controls missing labels",
    severity: "must-fix" as const,
    pages: 18,
    roles: ["Developer"],
    description: "Form fields cannot be identified by assistive technologies"
  },
  {
    id: 3,
    rule: "Color Contrast",
    title: "Insufficient color contrast",
    severity: "should-fix" as const,
    pages: 28,
    roles: ["Designer"],
    description: "Text may be difficult to read for users with visual impairments"
  },
  {
    id: 4,
    rule: "Focus Visible",
    title: "Missing focus indicators",
    severity: "should-fix" as const,
    pages: 15,
    roles: ["Developer", "Designer"],
    description: "Keyboard users cannot see which element has focus"
  },
  {
    id: 5,
    rule: "Heading Structure",
    title: "Improper heading hierarchy",
    severity: "nice-to-have" as const,
    pages: 23,
    roles: ["Content Author"],
    description: "Screen readers rely on proper heading structure for navigation"
  }
];

const roleChipColors = {
  "Developer": "bg-blue-100 text-blue-800 border-blue-300",
  "Designer": "bg-purple-100 text-purple-800 border-purple-300",
  "Content Author": "bg-green-100 text-green-800 border-green-300"
};

export default function ReportDetail() {
  const [activeTab, setActiveTab] = useState("highlights");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredIssues = allIssues.filter(issue =>
    issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    issue.rule.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <GlobalNav />
      
      <main className="container mx-auto px-20 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-5xl font-heading font-normal text-foreground mb-2">
                Accessibility Report
              </h1>
              <p className="text-lg text-muted-foreground">
                ministry.gov.sg • Scanned January 15, 2024
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <Button variant="ghost" className="text-foreground">
                <Link2 className="mr-2 h-4 w-4" />
                Copy Link
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="bg-primary hover:bg-primary-hover text-primary-foreground">
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <FileText className="mr-2 h-4 w-4" />
                    PDF (Light ≤ 3 MB)
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <FileSpreadsheet className="mr-2 h-4 w-4" />
                    CSV
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Jira Tickets (BETA)
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <FileText className="mr-2 h-4 w-4" />
                    Copy Markdown
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="bg-muted">
              <TabsTrigger value="highlights">Highlights</TabsTrigger>
              <TabsTrigger value="all-details">All Details</TabsTrigger>
            </TabsList>

            <TabsContent value="highlights" className="mt-8 space-y-8">
              {/* Top 3 Issues Card */}
              <Card className="shadow-oobee bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200">
                <CardHeader className="pb-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-purple-200 rounded-lg flex items-center justify-center">
                      <AlertTriangle className="h-6 w-6 text-purple-700" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl font-heading text-purple-900 mb-2">
                        Top 3 Issues
                      </CardTitle>
                      <p className="text-purple-700 text-base">
                        Fixing these issues first will improve accessibility for most visitors with the least effort.
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {topIssues.map((issue) => (
                    <Link to="/issue-detail" key={issue.id}>
                      <Card className="hover:shadow-md transition-shadow cursor-pointer bg-white">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-3">
                            <h3 className="text-lg font-semibold text-foreground">
                              {issue.title}
                            </h3>
                            <SeverityBadge severity={issue.severity} />
                          </div>
                          <p className="text-muted-foreground mb-2">
                            {issue.description}
                          </p>
                          <p className="text-sm font-medium text-primary">
                            {issue.impact} • {issue.pages} pages affected
                          </p>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </CardContent>
              </Card>

              {/* WCAG Compliance */}
              <Card className="shadow-oobee">
                <CardHeader>
                  <CardTitle className="text-2xl font-heading">WCAG 2.1 AA Compliance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-medium">Overall Compliance</span>
                      <span className="text-2xl font-bold text-primary">85%</span>
                    </div>
                    <Progress value={85} className="h-2" />
                    <p className="text-sm text-muted-foreground">
                      Your website meets 85% of WCAG 2.1 AA accessibility guidelines
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="all-details" className="mt-8">
              {/* Search */}
              <div className="mb-6">
                <div className="relative max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search issues..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Issues Table */}
              <Card className="shadow-oobee">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Issue</TableHead>
                      <TableHead>Severity</TableHead>
                      <TableHead>Pages</TableHead>
                      <TableHead>Who Can Fix</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredIssues.map((issue) => (
                      <TableRow key={issue.id} className="hover:bg-surface">
                        <TableCell>
                          <div>
                            <p className="font-medium text-foreground">{issue.title}</p>
                            <p className="text-sm text-muted-foreground">{issue.rule}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <SeverityBadge severity={issue.severity} />
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">{issue.pages} pages</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {issue.roles.map((role) => (
                              <span
                                key={role}
                                className={`px-2 py-1 text-xs font-medium rounded-md border ${roleChipColors[role as keyof typeof roleChipColors]}`}
                              >
                                {role}
                              </span>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Link to="/issue-detail">
                            <Button variant="ghost" size="sm">
                              View Details
                            </Button>
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>

              {/* Re-scan CTA */}
              <div className="mt-8 text-center">
                <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                  Re-scan selected pages
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}