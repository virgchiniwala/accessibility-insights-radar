import { Layout } from "@/components/Layout";
import { IssueCard } from "@/components/IssueCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const topIssues = [
  {
    id: "1",
    title: "Images missing alt text",
    description: "Up to 10% of visitors may not understand what these images show",
    severity: "must-fix" as const,
    impact: "Up to 10% of visitors may not read this button",
    whoCanFix: "Developer" as const,
    occurrences: 23,
    details: "Alternative text helps screen readers describe images to users who cannot see them. Without alt text, users with visual impairments miss important visual information.",
    codeSnippet: `<img src="hero-banner.jpg" alt=""> <!-- Missing alt text -->

<!-- Should be: -->
<img src="hero-banner.jpg" alt="Citizens applying for services at community center">`,
    fixGuidance: [
      "Add descriptive alt text to all meaningful images",
      "Use alt=\"\" for decorative images only", 
      "Keep descriptions concise but informative",
      "Test with screen reader software"
    ]
  },
  {
    id: "2", 
    title: "Insufficient color contrast 3.5:1",
    description: "Text may be hard to read for users with visual impairments",
    severity: "must-fix" as const,
    impact: "Up to 8% of visitors may struggle to read this text",
    whoCanFix: "Designer" as const,
    occurrences: 15,
    details: "WCAG 2.1 AA requires a minimum color contrast ratio of 4.5:1 for normal text and 3:1 for large text to ensure readability.",
    codeSnippet: `/* Current - insufficient contrast */
.text-light { color: #767676; } /* 3.5:1 ratio */

/* Fixed - meets WCAG standards */
.text-accessible { color: #595959; } /* 4.5:1 ratio */`,
    fixGuidance: [
      "Use color contrast checker tools",
      "Aim for 4.5:1 ratio for normal text",
      "Use 3:1 ratio minimum for large text (18pt+)",
      "Test with users who have visual impairments"
    ]
  },
  {
    id: "3",
    title: "Form labels not associated",
    description: "Screen readers cannot connect form fields with their labels",
    severity: "should-fix" as const,
    impact: "Up to 5% of visitors may not understand form fields",
    whoCanFix: "Developer" as const,
    occurrences: 8,
    details: "Proper label association is crucial for screen reader users to understand what information each form field requires.",
    codeSnippet: `<!-- Incorrect -->
<label>Email Address</label>
<input type="email" name="email">

<!-- Correct -->
<label for="email">Email Address</label>
<input type="email" id="email" name="email">`,
    fixGuidance: [
      "Add unique 'id' attribute to each form field",
      "Connect labels using 'for' attribute matching the field's 'id'",
      "Consider using aria-label for complex forms",
      "Test form navigation with keyboard only"
    ]
  }
];

export default function ReportSummaryLite() {
  return (
    <Layout>
      <div className="space-y-8">
        {/* Page Header */}
        <div>
          <h1 className="text-4xl font-heading font-normal mb-2">Accessibility Site Report</h1>
          <p className="text-lg text-muted-foreground">
            Scan completed on July 15, 2025 • Singapore Time GMT+8
          </p>
        </div>

        {/* Hero Summary Card */}
        <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
          <CardHeader>
            <CardTitle className="text-2xl font-heading">Top 3 Issues to Fix First</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-muted-foreground mb-6">
              Fixing these issues will improve accessibility for the most visitors with the least effort.
            </p>
            <div className="grid gap-1 text-sm text-muted-foreground">
              <div>46 occurrences failed, 863 occurrences passed</div>
              <div>Scanned: https://claude.ai/login?returnTo=%2F%3F</div>
              <div>Desktop viewport • Website crawl (1 page)</div>
            </div>
          </CardContent>
        </Card>

        {/* Top Issues */}
        <div className="space-y-6">
          <h2 className="text-2xl font-heading">Issues Requiring Attention</h2>
          <div className="space-y-4">
            {topIssues.map((issue) => (
              <IssueCard 
                key={issue.id} 
                issue={issue}
                showDetails={true}
              />
            ))}
          </div>
        </div>

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
    </Layout>
  );
}