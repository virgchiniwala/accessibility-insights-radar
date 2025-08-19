import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Copy, Check, ExternalLink, Lightbulb, AlertTriangle, Users, Clock, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ShareBrief } from '@/components/ShareBrief';
import { GlossaryHover } from '@/components/GlossaryHover';
import { CodeTabBar } from '@/components/CodeTabBar';
import { useToast } from '@/hooks/use-toast';

const IssueDetailNew: React.FC = () => {
  const [showShareBrief, setShowShareBrief] = useState(false);
  const [activeMainTab, setActiveMainTab] = useState<"content" | "dev">("content");
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [hasGenerated, setHasGenerated] = useState(false);
  const [devCode, setDevCode] = useState({
    current: `<img src="/hero-banner.jpg" alt="">
<img src="/product-1.jpg" class="product-image" alt="">`,
    fixed: ""
  });
  const { toast } = useToast();

  const mockItems = [
    { id: 1, filename: "hero-banner.jpg", status: "missing", currentText: "", suggestedText: "" },
    { id: 2, filename: "product-1.jpg", status: "missing", currentText: "", suggestedText: "" },
    { id: 3, filename: "team-photo.jpg", status: "vague", currentText: "Team", suggestedText: "" }
  ];

  const handleGenerate = () => {
    // Simulate AI generation
    const newSuggestions = selectedItems.map(id => {
      const item = mockItems.find(i => i.id === id);
      return {
        ...item,
        suggestedText: id === 1 ? "Students collaborating in modern library space" : 
                      id === 2 ? "Wireless headphones in matte black finish" :
                      "Five diverse professionals in business attire"
      };
    });
    setSuggestions(newSuggestions);
    setHasGenerated(true);
  };

  const handleAcceptAndCopy = () => {
    // Copy suggestions to clipboard
    const textToCopy = suggestions.map(s => `${s.filename}: ${s.suggestedText}`).join('\n');
    navigator.clipboard.writeText(textToCopy);
    
    // Update Dev tab with fixed code
    const fixedHtml = `<img src="/hero-banner.jpg" alt="${suggestions[0]?.suggestedText || 'Students collaborating in modern library space'}">
<img src="/product-1.jpg" alt="${suggestions[1]?.suggestedText || 'Wireless headphones in matte black finish'}" class="product-image">`;
    
    setDevCode(prev => ({ ...prev, fixed: fixedHtml }));
    setShowShareBrief(true);
    
    toast({
      title: "Copied and inserted into Dev (AI) → Fixed",
      description: "Suggestions applied successfully."
    });
  };

  const handleDevGenerate = () => {
    // Generate developer code patches
    const fixedCode = `<img src="/hero-banner.jpg" alt="Students collaborating in modern library space">
<img src="/product-1.jpg" alt="Wireless headphones in matte black finish" class="product-image">`;
    
    setDevCode(prev => ({ ...prev, fixed: fixedCode }));
    setHasGenerated(true);
  };

  const handleDevAcceptAndCopy = () => {
    navigator.clipboard.writeText(devCode.fixed);
    setShowShareBrief(true);
    toast({
      title: "Code copied to clipboard",
      description: "Dev changes generated and ready to share."
    });
  };

  const issueData = {
    id: "IMG-001",
    title: "Images missing alternative text",
    severity: "High",
    category: "Images",
    description: "Images without alt text create barriers for screen reader users and fail WCAG 2.1 AA requirements.",
    affectedPages: 12,
    totalElements: 24,
    estimatedEffort: "2-4 hours",
    wcagReference: "1.1.1 Non-text Content",
    roles: ["Developer", "Content Author"]
  };

  const codeExamples = {
    html: `<!-- Current (Problematic) -->
<img src="/hero-banner.jpg" alt="">
<img src="/product-1.jpg" class="product-image" alt="">

<!-- Fixed -->
<img src="/hero-banner.jpg" alt="Students collaborating in modern library space">
<img src="/product-1.jpg" alt="Wireless headphones in matte black finish" class="product-image">`,
    css: `/* CSS Path for targeting images */
.hero-section img,
.product-grid .product-image,
.content-area img:not([alt]) {
  /* These selectors help identify problematic images */
  border: 2px solid #ff6b6b; /* Debug outline */
}`
  };

  const affectedPages = [
    { url: "/products/headphones", elements: 8 },
    { url: "/about/team", elements: 6 },
    { url: "/blog/latest-news", elements: 4 },
    { url: "/services/consulting", elements: 3 },
    { url: "/contact", elements: 3 }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/report-details">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Report
              </Link>
            </Button>
            <div className="flex-1">
              <div className="flex items-center space-x-3">
                <Badge variant="destructive">{issueData.severity}</Badge>
                <Badge variant="outline">{issueData.category}</Badge>
                <h1 className="text-xl font-semibold text-gray-900">{issueData.title}</h1>
              </div>
              <p className="text-sm text-gray-600 mt-1">Issue ID: {issueData.id}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content - Left 2 Columns */}
          <div className="lg:col-span-2 space-y-6">
            {/* Issue Banner */}
            <Card className="border-l-4 border-l-red-500">
              <CardContent className="pt-6">
                <div className="flex items-start space-x-4">
                  <AlertTriangle className="w-6 h-6 text-red-500 mt-1" />
                  <div className="flex-1">
                    <h2 className="text-lg font-semibold text-gray-900 mb-2">
                      {issueData.title}
                    </h2>
                    <p className="text-gray-700 mb-4">{issueData.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {issueData.roles.map((role) => (
                        <Badge 
                          key={role} 
                          variant="outline"
                          className={
                            role === "Developer" ? "bg-blue-50 text-blue-700 border-blue-200" :
                            role === "Designer" ? "bg-purple-50 text-purple-700 border-purple-200" :
                            "bg-green-50 text-green-700 border-green-200"
                          }
                        >
                          {role}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Fix Workspace */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex space-x-1">
                    <Button
                      variant={activeMainTab === "content" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setActiveMainTab("content")}
                      className="h-8"
                      role="tab"
                      aria-selected={activeMainTab === "content"}
                    >
                      Content (AI)
                    </Button>
                    <Button
                      variant={activeMainTab === "dev" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setActiveMainTab("dev")}
                      className="h-8"
                      role="tab"
                      aria-selected={activeMainTab === "dev"}
                    >
                      Dev (AI)
                    </Button>
                  </div>
                  <div className="flex space-x-1">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-7 text-xs"
                    >
                      HTML Element
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 text-xs"
                    >
                      CSS Path
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {activeMainTab === "content" ? (
                  <div className="space-y-4">
                    {/* Header Row */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        {selectedItems.length} selected
                      </span>
                      <div className="flex gap-2">
                        <Button 
                          onClick={handleGenerate}
                          disabled={selectedItems.length === 0}
                          size="sm"
                        >
                          Generate
                        </Button>
                        {hasGenerated && (
                          <Button variant="outline" size="sm">
                            Regenerate
                          </Button>
                        )}
                      </div>
                    </div>

                    {/* Item List */}
                    <div className="space-y-2">
                      {mockItems.map((item) => (
                        <div key={item.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                          <input
                            type="checkbox"
                            checked={selectedItems.includes(item.id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedItems([...selectedItems, item.id]);
                              } else {
                                setSelectedItems(selectedItems.filter(id => id !== item.id));
                              }
                            }}
                            className="w-4 h-4"
                          />
                          <div className="w-10 h-10 bg-gray-200 rounded border"></div>
                          <div className="flex-1">
                            <div className="text-sm font-medium">{item.filename}</div>
                            <Badge variant="outline" className="text-xs mt-1">
                              {item.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Editor */}
                    {suggestions.length > 0 && (
                      <div className="space-y-4">
                        {suggestions.map((suggestion, index) => (
                          <div key={index} className="space-y-2">
                            <Label>Suggested text for {suggestion.filename}</Label>
                            <Textarea
                              value={suggestion.suggestedText}
                              onChange={(e) => {
                                const newSuggestions = [...suggestions];
                                newSuggestions[index].suggestedText = e.target.value;
                                setSuggestions(newSuggestions);
                              }}
                              className="font-body text-base leading-6"
                              rows={2}
                            />
                            <div className="text-xs text-muted-foreground">
                              {suggestion.suggestedText.length < 15 ? "Too short (<15 chars)" :
                               suggestion.suggestedText.length > 125 ? "Too long (>125 chars)" :
                               "Good length"}
                            </div>
                          </div>
                        ))}
                        
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">Shorten</Button>
                          <Button variant="outline" size="sm">More specific</Button>
                          <Button variant="outline" size="sm">Include context</Button>
                          <Button variant="outline" size="sm">Neutral tone</Button>
                        </div>
                        
                        <Button onClick={handleAcceptAndCopy} className="w-full">
                          Accept & Copy
                        </Button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Header Row */}
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        Developer
                      </Badge>
                      <div className="flex gap-2">
                        <Button onClick={handleDevGenerate} size="sm">
                          Generate
                        </Button>
                        {hasGenerated && (
                          <Button variant="outline" size="sm">
                            Regenerate
                          </Button>
                        )}
                      </div>
                    </div>

                    {/* Code Cards */}
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-sm font-medium text-gray-700">Current (Incorrect)</h4>
                          <Button variant="ghost" size="sm">
                            <Copy className="w-3 h-3" />
                          </Button>
                        </div>
                        <div className="border-l-2 border-red-500 bg-red-50 p-4 rounded-lg">
                          <pre className="text-sm font-mono whitespace-pre-wrap text-gray-800 overflow-x-auto" style={{ fontFamily: 'PT Mono, monospace', fontSize: '14px' }}>
                            {devCode.current}
                          </pre>
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-sm font-medium text-gray-700">Fixed (Correct)</h4>
                          <Button variant="ghost" size="sm">
                            <Copy className="w-3 h-3" />
                          </Button>
                        </div>
                        <div className="border-l-2 border-green-500 bg-green-50 p-4 rounded-lg">
                          <pre className="text-sm font-mono whitespace-pre-wrap text-gray-800 overflow-x-auto" style={{ fontFamily: 'PT Mono, monospace', fontSize: '14px' }}>
                            {devCode.fixed || "// Fixed code will appear here after generation"}
                          </pre>
                        </div>
                      </div>
                    </div>

                    {devCode.fixed && (
                      <div className="space-y-2">
                        <div className="text-xs text-gray-500">
                          Review before production. Use semantic elements when possible; avoid invalid aria-* on non-interactive elements.
                        </div>
                        <Button onClick={handleDevAcceptAndCopy} className="w-full">
                          Accept & Copy
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Code Tab Bar */}
            <CodeTabBar 
              htmlContent={codeExamples.html}
              cssContent={codeExamples.css}
            />

            {/* Affected Pages */}
            <Card>
              <CardHeader>
                <CardTitle>Affected Pages ({affectedPages.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {affectedPages.map((page, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <ExternalLink className="w-4 h-4 text-gray-400" />
                        <span className="font-mono text-sm">{page.url}</span>
                      </div>
                      <Badge variant="secondary">{page.elements} elements</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Rail */}
          <div className="space-y-6">
            {/* AI Fix Available */}
            <Card className="bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary" />
                  AI Fix Available
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Badge className="bg-primary/10 text-primary border-primary/20">
                    Images Helper
                  </Badge>
                  <p className="text-sm text-muted-foreground">
                    AI can help generate solutions for this accessibility issue automatically.
                  </p>
                </div>
                
                <Button 
                  className="w-full bg-primary hover:bg-primary-hover text-primary-foreground"
                  asChild
                >
                  <Link to="/ai-helper">
                    <Zap className="mr-2 h-4 w-4" />
                    Open AI Helper
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Why this matters */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="w-5 h-5 text-blue-500" />
                  <span>Why this matters</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Screen reader users cannot understand image content without alt text</li>
                  <li>• Search engines rely on alt text to index and categorize images</li>
                </ul>
              </CardContent>
            </Card>

            {/* WCAG Reference */}
            <Card>
              <CardHeader>
                <CardTitle>
                  <GlossaryHover 
                    term="WCAG"
                    definition="Web Content Accessibility Guidelines - International standards for making web content accessible to people with disabilities"
                  /> Reference
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium text-gray-900">{issueData.wcagReference}</h4>
                    <p className="text-sm text-gray-600">
                      All non-text content must have a text alternative that serves the equivalent purpose.
                    </p>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <span className="text-gray-500">Level:</span>
                    <Badge variant="outline">AA</Badge>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Full Guidelines
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Impact Metrics */}
            <Card>
              <CardHeader>
                <CardTitle>Impact Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900">{issueData.affectedPages}</div>
                    <div className="text-sm text-gray-600">Pages</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900">{issueData.totalElements}</div>
                    <div className="text-sm text-gray-600">Elements</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-center space-x-1">
                      <Users className="w-4 h-4 text-gray-600" />
                      <span className="text-lg font-bold text-gray-900">15%</span>
                    </div>
                    <div className="text-sm text-gray-600">Users Affected</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-center space-x-1">
                      <Clock className="w-4 h-4 text-gray-600" />
                      <span className="text-lg font-bold text-gray-900">2-4h</span>
                    </div>
                    <div className="text-sm text-gray-600">Est. Effort</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Share Brief - Hidden by default, visible after AI Helper Apply */}
            {showShareBrief && (
              <ShareBrief 
                isVisible={showShareBrief}
                briefText="AI recommends descriptive alt text for 24 images across 12 pages. Copy & share this snippet with your team."
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssueDetailNew;