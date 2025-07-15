import { useState } from "react";
import { GlobalNav } from "@/components/GlobalNav";
import { SplitButton } from "@/components/SplitButton";
import { SeverityBadge } from "@/components/SeverityBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Search, Link2, Sparkles, CheckCircle, ThumbsUp, ThumbsDown } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";

const allIssues = [
  {
    id: "WCAG-1.1.1",
    rule: "Non-text Content",
    title: "Images missing alt text",
    severity: "must-fix" as const,
    pages: 23,
    description: "Images must have alternative text for screen readers",
    whoCanFix: "Developer",
    hasAiHelper: true
  },
  {
    id: "WCAG-1.4.3", 
    rule: "Contrast (Minimum)",
    title: "Insufficient color contrast 3.5:1",
    severity: "must-fix" as const,
    pages: 15,
    description: "Text color contrast does not meet WCAG AA standards",
    whoCanFix: "Designer"
  },
  {
    id: "WCAG-1.3.1",
    rule: "Info and Relationships", 
    title: "Form labels not associated",
    severity: "should-fix" as const,
    pages: 8,
    description: "Form inputs lack proper label associations",
    whoCanFix: "Developer"
  },
  {
    id: "WCAG-1.3.1b",
    rule: "Info and Relationships",
    title: "Page missing H1 heading", 
    severity: "should-fix" as const,
    pages: 3,
    description: "Pages must have a clear heading hierarchy",
    whoCanFix: "Content Author"
  },
  {
    id: "WCAG-2.4.4",
    rule: "Link Purpose",
    title: "Links lack descriptive text",
    severity: "nice-to-have" as const, 
    pages: 12,
    description: "Link text should describe the destination or purpose",
    whoCanFix: "Content Author"
  },
  {
    id: "WCAG-3.2.2",
    rule: "On Input",
    title: "Unexpected context changes",
    severity: "should-fix" as const,
    pages: 2,
    description: "Form inputs should not cause unexpected page changes",
    whoCanFix: "Developer"
  }
];

const aiSuggestions = [
  {
    image: "hero-banner.jpg",
    originalAlt: "",
    suggestedAlt: "Citizens standing in line at a community center service counter, with staff helping residents complete government forms"
  },
  {
    image: "policy-document.png", 
    originalAlt: "",
    suggestedAlt: "Graph showing healthcare spending trends from 2020-2025, with a 15% increase highlighted in blue"
  },
  {
    image: "contact-map.jpg",
    originalAlt: "",
    suggestedAlt: "Interactive map of Singapore showing 12 government service centers across different districts"
  }
];

export default function ReportDetailsWithModal() {
  const [activeTab, setActiveTab] = useState("all-details");
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(true);
  const [suggestions, setSuggestions] = useState(aiSuggestions);
  const { toast } = useToast();

  const filteredIssues = allIssues.filter(issue =>
    issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    issue.rule.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAcceptAndApply = () => {
    setShowModal(false);
    toast({
      description: "Alt text saved. Issue will be re-checked on next scan.",
      duration: 5000,
    });
  };

  const handleRegenerate = () => {
    // Simulate regeneration with slightly different suggestions
    setSuggestions([...suggestions].map(s => ({
      ...s,
      suggestedAlt: s.suggestedAlt + " (regenerated)"
    })));
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

          {/* Mode Toggle */}
          <div className="flex justify-center">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-auto">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="highlights">Highlights</TabsTrigger>
                <TabsTrigger value="all-details">All Details</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <TabsContent value="all-details" className="space-y-6">
            {/* Search */}
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
                  {/* Table Header */}
                  <div className="grid grid-cols-12 gap-4 pb-3 border-b border-border text-sm font-medium text-muted-foreground">
                    <div className="col-span-2">Rule ID</div>
                    <div className="col-span-4">Issue Title</div>
                    <div className="col-span-2">Severity</div>
                    <div className="col-span-2">Pages Affected</div>
                    <div className="col-span-2">Who Can Fix</div>
                  </div>

                  {/* Table Rows */}
                  {filteredIssues.map((issue) => (
                    <div key={issue.id} className="grid grid-cols-12 gap-4 p-4 border border-border rounded-lg hover:bg-surface/50 transition-colors">
                      <div className="col-span-2">
                        <span className="font-mono text-sm text-muted-foreground">{issue.id}</span>
                        <div className="text-xs text-muted-foreground mt-1">{issue.rule}</div>
                      </div>
                      
                      <div className="col-span-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold mb-1">{issue.title}</h3>
                            <p className="text-sm text-muted-foreground">{issue.description}</p>
                          </div>
                          {issue.hasAiHelper && (
                            <div className="flex items-center gap-2">
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button 
                                      size="sm" 
                                      className="h-8 px-3 text-sm bg-primary text-primary-foreground hover:bg-primary-hover"
                                      onClick={() => setShowModal(true)}
                                    >
                                      <Sparkles className="h-3 w-3 mr-1" />
                                      Auto-Generate Alt Text (Beta)
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p className="max-w-xs">Experimental: uses AI to draft descriptive alt text. Please review before applying.</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                              <span className="text-lg">🔬</span>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="col-span-2 flex items-start">
                        <SeverityBadge severity={issue.severity} />
                      </div>
                      
                      <div className="col-span-2 flex items-start">
                        <div className="text-center">
                          <div className="font-semibold text-lg">{issue.pages}</div>
                          <div className="text-xs text-muted-foreground">pages</div>
                        </div>
                      </div>
                      
                      <div className="col-span-2 flex items-start">
                        <Button
                          variant="pill"
                          size="sm"
                          className="bg-secondary text-secondary-foreground"
                        >
                          {issue.whoCanFix}
                        </Button>
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
      </main>

      {/* AI Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-2xl">
              <CheckCircle className="h-6 w-6 text-green-600" />
              AI-Suggested Alt Text
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            <p className="text-muted-foreground">
              Estimated time saved: 45 min across 15 images.
            </p>
            
            <div className="space-y-6">
              {suggestions.map((suggestion, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">Image: {suggestion.image}</span>
                  </div>
                  <Textarea
                    value={suggestion.suggestedAlt}
                    onChange={(e) => {
                      const newSuggestions = [...suggestions];
                      newSuggestions[index].suggestedAlt = e.target.value;
                      setSuggestions(newSuggestions);
                    }}
                    className="min-h-20"
                    placeholder="AI-generated alt text description"
                  />
                </div>
              ))}
            </div>
            
            <div className="flex items-center justify-between pt-4 border-t">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Was this helpful?</span>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <ThumbsUp className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <ThumbsDown className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex items-center gap-3">
                <Button 
                  variant="ghost" 
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </Button>
                <Button 
                  variant="secondary"
                  onClick={handleRegenerate}
                >
                  Regenerate
                </Button>
                <Button 
                  onClick={handleAcceptAndApply}
                  className="bg-primary text-primary-foreground hover:bg-primary-hover"
                >
                  Accept & Apply
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}