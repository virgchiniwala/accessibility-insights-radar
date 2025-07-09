import { useState } from "react";
import { GlobalNav } from "@/components/GlobalNav";
import { SplitButton } from "@/components/SplitButton";
import { IssueCard } from "@/components/IssueCard";
import { SeverityBadge } from "@/components/SeverityBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GlossaryTooltip } from "@/components/ui/tooltip";
import { AlertTriangle, Link2 } from "lucide-react";

const topIssues = [
  {
    id: "1",
    title: "Images missing alt text",
    description: "Screen readers cannot describe these images to users",
    severity: "must-fix" as const,
    impact: "Up to 10% of visitors may not understand what these images show",
    whoCanFix: "Developer" as const,
    occurrences: 23,
    impactPercentage: "10%"
  },
  {
    id: "2", 
    title: "Insufficient color contrast 3.5:1",
    description: "Text may be hard to read for users with visual impairments",
    severity: "must-fix" as const,
    impact: "Up to 8% of visitors may struggle to read this text",
    whoCanFix: "Designer" as const,
    occurrences: 15,
    impactPercentage: "8%"
  },
  {
    id: "3",
    title: "Form labels not associated",
    description: "Screen readers cannot connect form fields with their labels",
    severity: "should-fix" as const,
    impact: "Up to 5% of visitors may not understand form fields",
    whoCanFix: "Developer" as const,
    occurrences: 8,
    impactPercentage: "5%"
  }
];

export default function ReportHighlights() {
  const [reportedIssues, setReportedIssues] = useState<Set<string>>(new Set());

  const handleReportFalsePositive = (issueId: string) => {
    setReportedIssues(prev => new Set(prev).add(issueId));
  };

  return (
    <div className="min-h-screen bg-background">
      <GlobalNav />
      
      <main className="max-w-[1440px] mx-auto px-6 py-8">
        <div className="space-y-8">
          {/* Page Header */}
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-heading font-normal mb-2">Accessibility Site Report</h1>
              <p className="text-lg text-muted-foreground">
                Scan completed on July 15, 2025 • Singapore Time GMT+8
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <Button variant="outline">
                <Link2 className="h-4 w-4 mr-2" />
                Copy link
              </Button>
              <SplitButton />
            </div>
          </div>

          {/* Impact Banner */}
          <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
            <CardHeader>
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-6 w-6 text-primary" />
                <CardTitle className="text-2xl font-heading">Top 3 Issues to Fix First</CardTitle>
                <GlossaryTooltip 
                  term="Priority Issues" 
                  definition="These issues will improve accessibility for the most visitors with the least effort. They are ranked by impact and ease of implementation."
                />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-muted-foreground mb-6">
                Fixing these issues will improve accessibility for the most visitors with the least effort.
              </p>
              <div className="grid gap-1 text-sm text-muted-foreground">
                <div>46 occurrences failed, 863 occurrences passed</div>
                <div>Scanned: https://www.gov.sg/</div>
                <div>Desktop viewport • Website crawl (1 page)</div>
              </div>
            </CardContent>
          </Card>

          {/* Top Issues */}
          <div className="space-y-6">
            <h2 className="text-2xl font-heading">Issues Requiring Attention</h2>
            <div className="space-y-4">
              {topIssues.map((issue) => (
                <Card key={issue.id} className="w-full">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {/* Header */}
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center gap-2">
                            <h3 className="text-lg font-semibold text-foreground">{issue.title}</h3>
                            <GlossaryTooltip 
                              term={issue.title}
                              definition={issue.description}
                            />
                          </div>
                          <p className="text-muted-foreground">{issue.description}</p>
                          <div className="flex items-center gap-4">
                            <p className="text-base font-medium text-foreground">
                              Impact: {issue.impactPercentage} of visitors affected
                            </p>
                            <Badge variant="outline" className="text-xs">
                              {issue.occurrences} occurrences
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <SeverityBadge severity={issue.severity} />
                          <Button
                            variant="pill"
                            size="sm"
                            className="bg-secondary text-secondary-foreground"
                          >
                            {issue.whoCanFix}
                          </Button>
                        </div>
                      </div>
                      
                      {/* Report False Positive */}
                      <div className="pt-4 border-t border-border">
                        {reportedIssues.has(issue.id) ? (
                          <div className="text-sm text-green-600 font-medium">
                            ✓ Reported as false positive - Thank you for your feedback
                          </div>
                        ) : (
                          <button
                            onClick={() => handleReportFalsePositive(issue.id)}
                            className="text-sm text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-focus focus:ring-offset-2 rounded"
                          >
                            Report false positive
                          </button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* WCAG Compliance Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                WCAG Compliance
                <GlossaryTooltip 
                  term="WCAG Compliance"
                  definition="Web Content Accessibility Guidelines (WCAG) 2.1 AA is the international standard for web accessibility. This shows how well your site meets these requirements."
                />
              </CardTitle>
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

          {/* Help Section */}
          <Card className="bg-surface/50">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="text-2xl">🤔</div>
                <div>
                  <h3 className="font-semibold mb-2">Wonder how PWDs navigate your site?</h3>
                  <a href="#" className="text-primary hover:underline font-medium">
                    Project Playground →
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}