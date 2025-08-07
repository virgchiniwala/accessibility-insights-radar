import { useState } from "react";
import { GlobalNav } from "@/components/GlobalNav";
import { AIHelperCard } from "@/components/AIHelperCard";
import { SeverityBadge } from "@/components/SeverityBadge";
import { ShareBrief } from "@/components/ShareBrief";
import { CodeTabBar } from "@/components/CodeTabBar";
import { GlossaryTerm } from "@/components/GlossaryHover";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CheckCircle, XCircle, ExternalLink, Target, Users, Zap, Sparkles, ThumbsUp, ThumbsDown, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const affectedPages = [
  { url: "/homepage", title: "Homepage", issues: 8 },
  { url: "/services", title: "Government Services", issues: 12 },
  { url: "/contact", title: "Contact Us", issues: 5 },
  { url: "/news", title: "News & Updates", issues: 15 },
  { url: "/forms/application", title: "Online Application Form", issues: 22 }
];

export default function IssueDetailNew() {
  const [showAIHelper, setShowAIHelper] = useState(false);
  const [showShareBrief, setShowShareBrief] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState([
    {
      image: "chart-healthcare.png",
      suggestedAlt: "Healthcare spending increased 15% from 2020 to 2024, shown in blue bars on chart"
    },
    {
      image: "ministry-building.jpg", 
      suggestedAlt: "Ministry building with Singapore flag, welcoming citizens to government services"
    }
  ]);
  const hasAiHelper = true; // This issue has AI helper available

  const htmlCode = `<img src="chart-healthcare.png" 
     width="400" 
     height="300" />

<!-- Missing alt attribute -->`;

  const cssCode = `img[src*="chart-healthcare"] {
  width: 400px;
  height: 300px;
}

/* No CSS changes needed for alt text */`;

  const handleApplySuggestions = () => {
    setShowAIHelper(false);
    setShowShareBrief(true);
    toast.success("Alt text applied successfully");
    
    // Emit helper_accepted event
    window.dispatchEvent(new CustomEvent('helper_accepted', {
      detail: { issueType: 'alt-text', suggestionsCount: aiSuggestions.length }
    }));
  };

  const handleFeedback = (helpful: boolean) => {
    // Emit helper_feedback event
    window.dispatchEvent(new CustomEvent('helper_feedback', {
      detail: { helpful, issueType: 'alt-text' }
    }));
    toast.success(helpful ? "Thanks for your feedback!" : "Feedback recorded");
  };
  
  return (
    <div className="min-h-screen bg-background">
      <GlobalNav />
      
      <main className="container mx-auto px-20 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <div className="mb-6">
            <Link to="/report-details" className="inline-flex items-center text-primary hover:text-primary-hover transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Report
            </Link>
          </div>

          {/* High Impact Banner */}
          <Card className="mb-8 shadow-oobee bg-gradient-to-r from-orange-50 to-red-50 border-orange-200">
            <CardContent className="p-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-orange-200 rounded-lg flex items-center justify-center">
                  <Target className="h-6 w-6 text-orange-700" />
                </div>
                <div>
                  <h1 className="text-3xl font-heading text-orange-900 mb-2">
                    Images missing alternative text
                  </h1>
                  <div className="flex items-center gap-3">
                    <SeverityBadge severity="must-fix" />
                    <Badge variant="secondary">Image Alternative Text</Badge>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-6 border border-orange-200">
                <div className="flex items-center gap-3 mb-2">
                  <Zap className="h-5 w-5 text-orange-600" />
                  <span className="text-lg font-semibold text-orange-900">High Impact Fix</span>
                </div>
                <p className="text-orange-800 text-lg">
                  Fixing this issue will resolve <strong>67% of Must-Fix issues</strong> across your website
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Left Column - Code Example */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="shadow-oobee">
                <CardHeader>
                  <CardTitle className="text-2xl font-heading flex items-center gap-2">
                    <code className="text-sm bg-muted px-2 py-1 rounded">&lt;/&gt;</code>
                    Code Example
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CodeTabBar 
                    htmlContent={htmlCode}
                    cssContent={cssCode}
                  />
                </CardContent>
              </Card>

              {/* Current vs Fixed Examples */}
              <Card className="shadow-oobee">
                <CardContent className="p-6 space-y-6">
                  {/* Current (Wrong) */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <XCircle className="h-5 w-5 text-error" />
                      <span className="font-semibold text-error">Current (Incorrect)</span>
                    </div>
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <pre className="text-sm text-red-800 font-mono">
{`<img src="chart-healthcare.png" 
     width="400" 
     height="300" />`}
                      </pre>
                    </div>
                  </div>

                  {/* Fixed (Correct) */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="font-semibold text-green-700">Fixed (Correct)</span>
                    </div>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <pre className="text-sm text-green-800 font-mono">
{`<img src="chart-healthcare.png" 
     alt="Healthcare spending increased 
          15% from 2020 to 2024, shown 
          in blue bars on chart"
     width="400" 
     height="300" />`}
                      </pre>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - AI Helper + Guides */}
            <div className="space-y-6">
              {/* AI Helper Card */}
              <AIHelperCard 
                hasHelper={hasAiHelper}
                issueType="Alt Text"
                onOpenHelper={() => setShowAIHelper(true)}
              />

              {/* Step-by-Step Guide */}
              <Card className="shadow-oobee">
                <CardHeader>
                  <CardTitle className="text-xl font-heading flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Step-by-Step Guide
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ol className="space-y-4">
                    <li className="flex gap-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">1</span>
                      <div>
                        <p className="font-medium">Identify the image content</p>
                        <p className="text-sm text-muted-foreground">What information does the image convey?</p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">2</span>
                      <div>
                        <p className="font-medium">Write descriptive alt text</p>
                        <p className="text-sm text-muted-foreground">Describe the image's purpose and content concisely</p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">3</span>
                      <div>
                        <p className="font-medium">Add alt attribute to image</p>
                        <p className="text-sm text-muted-foreground">Include alt="description" in your img tag</p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">4</span>
                      <div>
                        <p className="font-medium">Test with screen reader</p>
                        <p className="text-sm text-muted-foreground">Verify the description makes sense when read aloud</p>
                      </div>
                    </li>
                  </ol>
                </CardContent>
              </Card>

              {/* WCAG Reference */}
              <Card className="shadow-oobee">
                <CardHeader>
                  <CardTitle className="text-xl font-heading">
                    <GlossaryTerm term="WCAG" /> Reference
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <p className="font-medium">Success Criterion</p>
                      <p className="text-sm text-muted-foreground">1.1.1 Non-text Content (Level A)</p>
                    </div>
                    <div>
                      <p className="font-medium">Guideline</p>
                      <p className="text-sm text-muted-foreground">1.1 Provide text alternatives for non-text content</p>
                    </div>
                    <Button variant="ghost" className="p-0 h-auto text-primary hover:text-primary-hover">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Read full <GlossaryTerm term="WCAG" /> documentation
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Impact Metrics */}
              <Card className="shadow-oobee">
                <CardHeader>
                  <CardTitle className="text-xl font-heading">Impact Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-surface rounded-lg">
                      <p className="text-2xl font-bold text-primary">42</p>
                      <p className="text-sm text-muted-foreground">Pages Affected</p>
                    </div>
                    <div className="text-center p-4 bg-surface rounded-lg">
                      <p className="text-2xl font-bold text-primary">156</p>
                      <p className="text-sm text-muted-foreground">Images Missing Alt Text</p>
                    </div>
                    <div className="text-center p-4 bg-surface rounded-lg">
                      <p className="text-2xl font-bold text-primary">89%</p>
                      <p className="text-sm text-muted-foreground">Pages Impacted</p>
                    </div>
                    <div className="text-center p-4 bg-surface rounded-lg">
                      <p className="text-2xl font-bold text-primary">8.2M</p>
                      <p className="text-sm text-muted-foreground">Users Affected Annually</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Share Brief - Hidden by default, visible after AI Helper Apply */}
              <ShareBrief 
                isVisible={showShareBrief}
                briefText="Images missing alt text — AI recommends descriptive alt text for 156 images across 42 pages. Copy & share this snippet with your team."
              />
            </div>
          </div>

          {/* Affected Pages Accordion */}
          <Card className="shadow-oobee">
              <CardHeader>
            <CardContent>
              <Accordion type="single" collapsible>
                <AccordionItem value="pages">
                  <AccordionTrigger className="text-lg font-semibold">
                    View all {affectedPages.length} affected pages
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3 pt-4">
                      {affectedPages.map((page) => (
                        <div key={page.url} className="flex items-center justify-between p-4 bg-surface rounded-lg">
                          <div>
                            <p className="font-medium">{page.title}</p>
                            <p className="text-sm text-muted-foreground">{page.url}</p>
                          </div>
                          <Badge variant="secondary">{page.issues} issues</Badge>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </main>
      
      {/* AI Helper Modal */}
      <Dialog open={showAIHelper} onOpenChange={setShowAIHelper}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto modal-fade-in">
          <DialogHeader>
            <DialogTitle className="text-2xl font-heading flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-primary-foreground" />
              </div>
              ✨ AI-Suggested Fix
            </DialogTitle>
            <p className="text-sm text-muted-foreground">
              AI analysed {aiSuggestions.length} items – est. time saved ≈ {aiSuggestions.length * 3} min.
            </p>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            <div className="space-y-6">
              {aiSuggestions.map((suggestion, index) => (
                <Card key={index} className="border border-border">
                  <CardContent className="p-6">
                    <div className="space-y-3">
                      <p className="font-medium text-foreground">{suggestion.image}</p>
                      <div>
                        <label className="text-sm font-medium text-foreground block mb-2">
                          AI Suggested Alt Text:
                        </label>
                        <Textarea
                          value={suggestion.suggestedAlt}
                          onChange={(e) => {
                            const newSuggestions = [...aiSuggestions];
                            newSuggestions[index].suggestedAlt = e.target.value;
                            setAiSuggestions(newSuggestions);
                          }}
                          className="min-h-[80px] resize-none font-mono text-sm"
                          placeholder="AI-generated alt text will appear here..."
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {/* Button Row - Right Aligned */}
            <div className="flex items-center justify-end gap-3 pt-6 border-t">
              <Button 
                variant="ghost" 
                onClick={() => setShowAIHelper(false)}
              >
                Cancel
              </Button>
              <Button 
                variant="outline"
                onClick={() => {
                  // Regenerate logic here
                  setAiSuggestions(prev => prev.map(s => ({
                    ...s,
                    suggestedAlt: s.suggestedAlt + " (regenerated)"
                  })));
                }}
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Regenerate
              </Button>
              <Button 
                onClick={handleApplySuggestions}
                className="bg-primary hover:bg-primary-hover text-primary-foreground"
              >
                Apply Suggestions
              </Button>
            </div>

            {/* Footer Micro-Survey */}
            <div className="flex items-center justify-center gap-4 pt-4 border-t">
              <span className="text-sm text-muted-foreground">Was this helpful?</span>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleFeedback(true)}
                  className="h-8 px-3"
                >
                  <ThumbsUp className="h-4 w-4 mr-1" />
                  👍 Helpful
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleFeedback(false)}
                  className="h-8 px-3"
                >
                  <ThumbsDown className="h-4 w-4 mr-1" />
                  👎 Not helpful
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}