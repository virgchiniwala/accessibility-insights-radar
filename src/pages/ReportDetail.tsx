import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, ExternalLink, Zap, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CategoryChip } from '@/components/CategoryChip';
import { EffortBadge } from '@/components/EffortBadge';
import { WCAGComplianceCard } from '@/components/WCAGComplianceCard';
import { SeverityBadge } from '@/components/SeverityBadge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

interface IssueData {
  id: string;
  title: string;
  ruleId: string;
  hasAI: boolean;
  category: 'Images' | 'Colour & Contrast' | 'Headings' | 'Forms' | 'Navigation' | 'Advanced';
  effort: 'Easy' | 'Medium' | 'Complex';
  severity: 'must-fix' | 'should-fix' | 'nice-to-have';
  pages: number;
  roles: string[];
}

const ReportDetail: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const wcagData = {
    checksPassed: 17,
    totalChecks: 20,
    status: 'needs-improvement' as const
  };

  const topIssues = [
    {
      title: "Images missing alternative text",
      impact: "87% of accessibility barriers removed",
      description: "24 images across 12 pages need descriptive alt text to help screen reader users understand visual content."
    },
    {
      title: "Low color contrast on buttons",
      impact: "43% of accessibility barriers removed", 
      description: "Primary action buttons don't meet 4.5:1 contrast ratio, making them hard to read for users with visual impairments."
    },
    {
      title: "Form inputs missing labels",
      impact: "31% of accessibility barriers removed",
      description: "8 form fields lack proper labels, creating confusion for screen reader users when filling out forms."
    }
  ];

  const issues: IssueData[] = [
    {
      id: 'IMG-001',
      title: 'Images missing alternative text',
      ruleId: 'image-alt',
      hasAI: true,
      category: 'Images',
      effort: 'Easy',
      severity: 'must-fix',
      pages: 12,
      roles: ['Developer', 'Content Author']
    },
    {
      id: 'CON-002', 
      title: 'Low color contrast on buttons',
      ruleId: 'color-contrast',
      hasAI: false,
      category: 'Colour & Contrast',
      effort: 'Medium',
      severity: 'must-fix',
      pages: 8,
      roles: ['Designer', 'Developer']
    },
    {
      id: 'FORM-003',
      title: 'Form inputs missing labels',
      ruleId: 'label',
      hasAI: true,
      category: 'Forms',
      effort: 'Easy',
      severity: 'should-fix',
      pages: 5,
      roles: ['Developer']
    },
    {
      id: 'NAV-004',
      title: 'Navigation links unclear',
      ruleId: 'link-purpose',
      hasAI: false,
      category: 'Navigation',
      effort: 'Complex',
      severity: 'should-fix',
      pages: 3,
      roles: ['Content Author', 'Designer']
    },
    {
      id: 'HEAD-005',
      title: 'Heading structure non-sequential',
      ruleId: 'heading-order',
      hasAI: false,
      category: 'Headings',
      effort: 'Medium',
      severity: 'nice-to-have',
      pages: 15,
      roles: ['Developer']
    }
  ];

  const filteredIssues = issues.filter(issue => 
    issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    issue.ruleId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    issue.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    issue.effort.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const scrollToFirstMissing = () => {
    // In a real implementation, this would scroll to the first failing issue
    const firstIssue = document.querySelector('[data-issue-row]');
    if (firstIssue) {
      firstIssue.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-[56px] leading-[64px] font-heading text-foreground">Report Overview</h1>
          <p className="text-lg text-muted-foreground mt-2">
            Accessibility scan results for portal.gov.sg
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="ghost">Copy Link</Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button>
                Export <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>PDF (Light ≤ 3 MB)</DropdownMenuItem>
              <DropdownMenuItem>CSV</DropdownMenuItem>
              <DropdownMenuItem>Jira Tickets (BETA)</DropdownMenuItem>
              <DropdownMenuItem>Copy Markdown</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* WCAG Compliance Card */}
      <WCAGComplianceCard 
        variant="needs-improvement"
        score={Math.round((wcagData.checksPassed / wcagData.totalChecks) * 100)}
      />

      {/* Top 3 Issues */}
      <Card className="bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <span className="text-primary font-bold">△</span>
            </div>
            Top 3 Issues
          </CardTitle>
          <p className="text-muted-foreground text-sm">
            Fixing these issues first will improve accessibility for most visitors with the least effort.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {topIssues.map((issue, index) => (
            <div key={index} className="bg-white p-4 rounded-lg border">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-foreground">{issue.title}</h3>
                <Badge className="bg-pass-green text-white text-xs">{issue.impact}</Badge>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {issue.description}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Pro Tip */}
      <div className="text-center">
        <p className="text-sm italic text-info-grey">
          ℹ Pro tip: Filter by category or effort badges to assign quick wins first.
        </p>
      </div>

      {/* Issues Requiring Attention */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Issues Requiring Attention</CardTitle>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search issues, rules, or categories..."
                  className="pl-9 w-80"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Issue</TableHead>
                <TableHead className="w-16">AI</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Effort</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead className="text-center">Pages</TableHead>
                <TableHead>Role Chips</TableHead>
                <TableHead className="text-right">View Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredIssues.map((issue) => (
                <TableRow key={issue.id} data-issue-row className="hover:bg-surface/50">
                  <TableCell>
                    <div>
                      <div className="font-medium text-foreground">{issue.title}</div>
                      <div className="text-sm text-muted-foreground">{issue.ruleId}</div>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    {issue.hasAI ? (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0"
                        asChild
                      >
                        <Link to="/ai-helper">
                          <Zap className="h-4 w-4 text-primary" />
                        </Link>
                      </Button>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <CategoryChip category={issue.category} />
                  </TableCell>
                  <TableCell>
                    <EffortBadge effort={issue.effort} />
                  </TableCell>
                  <TableCell>
                    <SeverityBadge severity={issue.severity} />
                  </TableCell>
                  <TableCell className="text-center text-muted-foreground">
                    {issue.pages}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {issue.roles.map((role) => (
                        <Badge key={role} variant="outline" className="text-xs">
                          {role}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" asChild>
                      <Link to="/issue-detail">
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Re-scan Button */}
      <div className="flex justify-center">
        <Button variant="outline" size="lg">
          Re-scan selected pages
        </Button>
      </div>
    </div>
  );
};

export default ReportDetail;