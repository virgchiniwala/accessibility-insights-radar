import { useState } from "react";
import { Layout } from "@/components/Layout";
import { IssueCard } from "@/components/IssueCard";
import { SeverityBadge } from "@/components/SeverityBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const allIssues = [
  {
    id: "WCAG-1.1.1",
    rule: "Non-text Content",
    title: "Images missing alt text",
    severity: "must-fix" as const,
    pages: 23,
    description: "Images must have alternative text for screen readers"
  },
  {
    id: "WCAG-1.4.3", 
    rule: "Contrast (Minimum)",
    title: "Insufficient color contrast 3.5:1",
    severity: "must-fix" as const,
    pages: 15,
    description: "Text color contrast does not meet WCAG AA standards"
  },
  {
    id: "WCAG-1.3.1",
    rule: "Info and Relationships", 
    title: "Form labels not associated",
    severity: "should-fix" as const,
    pages: 8,
    description: "Form inputs lack proper label associations"
  },
  {
    id: "WCAG-1.3.1b",
    rule: "Info and Relationships",
    title: "Page missing H1 heading", 
    severity: "should-fix" as const,
    pages: 3,
    description: "Pages must have a clear heading hierarchy"
  },
  {
    id: "WCAG-2.4.4",
    rule: "Link Purpose",
    title: "Links lack descriptive text",
    severity: "nice-to-have" as const, 
    pages: 12,
    description: "Link text should describe the destination or purpose"
  },
  {
    id: "WCAG-3.2.2",
    rule: "On Input",
    title: "Unexpected context changes",
    severity: "should-fix" as const,
    pages: 2,
    description: "Form inputs should not cause unexpected page changes"
  }
];

const topIssues = [
  {
    id: "1",
    title: "Images missing alt text", 
    description: "Up to 10% of visitors may not understand what these images show",
    severity: "must-fix" as const,
    impact: "Up to 10% of visitors may not read this button",
    whoCanFix: "Developer" as const,
    occurrences: 23
  },
  {
    id: "2",
    title: "Insufficient color contrast 3.5:1",
    description: "Text may be hard to read for users with visual impairments", 
    severity: "must-fix" as const,
    impact: "Up to 8% of visitors may struggle to read this text",
    whoCanFix: "Designer" as const,
    occurrences: 15
  },
  {
    id: "3", 
    title: "Form labels not associated",
    description: "Screen readers cannot connect form fields with their labels",
    severity: "should-fix" as const,
    impact: "Up to 5% of visitors may not understand form fields", 
    whoCanFix: "Developer" as const,
    occurrences: 8
  }
];

export default function ReportSummaryFull() {
  const [activeTab, setActiveTab] = useState("highlights");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredIssues = allIssues.filter(issue =>
    issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    issue.rule.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <div className="space-y-8">
        {/* Page Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-heading font-normal mb-2">Accessibility Site Report</h1>
            <p className="text-lg text-muted-foreground">
              Scan completed on July 15, 2025 • Singapore Time GMT+8
            </p>
          </div>
          
          {/* Dual Mode Toggle */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-auto">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="highlights">Highlights</TabsTrigger>
              <TabsTrigger value="all-details">All Details</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <TabsContent value="highlights" className="space-y-6">
          {/* Hero Summary */}
          <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
            <CardHeader>
              <CardTitle className="text-2xl font-heading">Top 3 Issues to Fix First</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-muted-foreground mb-6">
                Fixing these issues will improve accessibility for the most visitors with the least effort.
              </p>
            </CardContent>
          </Card>

          {/* Top Issues */}
          <div className="space-y-4">
            {topIssues.map((issue) => (
              <IssueCard 
                key={issue.id} 
                issue={issue}
                showDetails={false}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="all-details" className="space-y-6">
          {/* Search and Filters */}
          <div className="flex gap-4 items-center">
            <div className="relative flex-1 max-w-md">
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
          <Card>
            <CardHeader>
              <CardTitle>All Detected Issues</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredIssues.map((issue) => (
                  <div key={issue.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-sm text-muted-foreground">{issue.id}</span>
                        <span className="text-sm text-muted-foreground">•</span>
                        <span className="font-medium">{issue.rule}</span>
                      </div>
                      <h3 className="font-semibold">{issue.title}</h3>
                      <p className="text-sm text-muted-foreground">{issue.description}</p>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-sm text-muted-foreground">Affected Pages</div>
                        <div className="font-semibold">{issue.pages}</div>
                      </div>
                      <SeverityBadge severity={issue.severity} />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* WCAG Compliance Overview */}
        <Card>
          <CardHeader>
            <CardTitle>WCAG Compliance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>WCAG (A & AA) Passes</span>
                <span className="font-semibold">17 / 20 of automated checks</span>
              </div>
              <div className="w-full bg-surface rounded-full h-3">
                <div 
                  className="bg-primary h-3 rounded-full transition-all duration-300" 
                  style={{ width: "85%" }}
                ></div>
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>85% compliance</span>
                <a href="#" className="text-primary hover:underline">More details →</a>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}