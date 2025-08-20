import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Copy, ExternalLink, AlertTriangle, Users, Clock, ChevronRight, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ShareBrief } from '@/components/ShareBrief';
import { GlossaryHover } from '@/components/GlossaryHover';
import { useToast } from '@/hooks/use-toast';

const IssueDetailNew: React.FC = () => {
  const [showShareBrief, setShowShareBrief] = useState(false);
  const [activeMainTab, setActiveMainTab] = useState<"content" | "dev">("content");
  const [activeContextTab, setActiveContextTab] = useState<"html" | "css">("html");
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generateError, setGenerateError] = useState<string | null>(null);
  const [expandedSteps, setExpandedSteps] = useState<number[]>([]);
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

  const stepByStepGuide = [
    { title: "Identify the images", tip: "Look for images without alt attributes or with empty alt text" },
    { title: "Write descriptive alt text", tip: "Describe what the image shows, not what it is" },
    { title: "Add alt to markup", tip: "Insert the alt attribute with your descriptive text" },
    { title: "Test with screen reader", tip: "Verify the alt text makes sense in context" }
  ];

  const handleGenerate = async () => {
    if (selectedItems.length === 0) return;
    
    setIsGenerating(true);
    setGenerateError(null);
    
    try {
      // Simulate API call with delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
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
    } catch (error) {
      setGenerateError('Could not generate suggestions. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAcceptAndCopy = () => {
    const textToCopy = suggestions.map(s => `${s.filename}: ${s.suggestedText}`).join('\n');
    navigator.clipboard.writeText(textToCopy);
    
    // Update Dev tab with fixed code
    const fixedHtml = `<img src="/hero-banner.jpg" alt="${suggestions[0]?.suggestedText || 'Students collaborating in modern library space'}">
<img src="/product-1.jpg" alt="${suggestions[1]?.suggestedText || 'Wireless headphones in matte black finish'}" class="product-image">`;
    
    setDevCode(prev => ({ ...prev, fixed: fixedHtml }));
    setShowShareBrief(true);
    
    toast({
      title: "Copied and inserted into Dev (AI)",
      description: "Suggestions applied successfully."
    });
  };

  const handleDevGenerate = async () => {
    setIsGenerating(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      const fixedCode = `<img src="/hero-banner.jpg" alt="Students collaborating in modern library space">
<img src="/product-1.jpg" alt="Wireless headphones in matte black finish" class="product-image">`;
      
      setDevCode(prev => ({ ...prev, fixed: fixedCode }));
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDevAcceptAndCopy = () => {
    navigator.clipboard.writeText(devCode.fixed);
    setShowShareBrief(true);
    toast({
      title: "Code copied to clipboard",
      description: "Ready to share."
    });
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied",
      description: `${label} copied to clipboard.`
    });
  };

  const toggleStep = (stepIndex: number) => {
    setExpandedSteps(prev => 
      prev.includes(stepIndex) 
        ? prev.filter(i => i !== stepIndex)
        : [...prev, stepIndex]
    );
  };

  const issueData = {
    id: "IMG-001",
    title: "Images missing alternative text",
    severity: "High",
    category: "Images",
    description: "Screen reader users cannot understand image content without descriptive alt text.",
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
                <h1 className="text-xl font-semibold text-gray-900">{issueData.title}</h1>
              </div>
              <p className="text-sm text-gray-600 mt-1">{issueData.description}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content - Left 2 Columns */}
          <div className="lg:col-span-2 space-y-6">
            {/* Context Bar */}
            <div className="flex items-center justify-between p-3 bg-white border rounded-lg">
              <div className="flex space-x-2">
                <Button
                  variant={activeContextTab === "html" ? "outline" : "ghost"}
                  size="sm"
                  onClick={() => setActiveContextTab("html")}
                  className="h-8 text-xs"
                >
                  HTML Element
                </Button>
                <Button
                  variant={activeContextTab === "css" ? "outline" : "ghost"}
                  size="sm"
                  onClick={() => setActiveContextTab("css")}
                  className="h-8 text-xs"
                >
                  CSS Path
                </Button>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(
                  activeContextTab === "html" ? codeExamples.html : codeExamples.css,
                  activeContextTab === "html" ? "HTML Element" : "CSS Path"
                )}
              >
                <Copy className="w-4 h-4" />
              </Button>
            </div>

            {activeContextTab === "html" && (
              <Card>
                <CardContent className="pt-4">
                  <pre className="text-sm font-mono whitespace-pre-wrap text-gray-800 overflow-x-auto bg-gray-50 p-4 rounded">
                    {codeExamples.html}
                  </pre>
                </CardContent>
              </Card>
            )}

            {activeContextTab === "css" && (
              <Card>
                <CardContent className="pt-4">
                  <pre className="text-sm font-mono whitespace-pre-wrap text-gray-800 overflow-x-auto bg-gray-50 p-4 rounded">
                    {codeExamples.css}
                  </pre>
                </CardContent>
              </Card>
            )}

            {/* Fix Workspace */}
            <Card>
              <CardHeader>
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
              </CardHeader>
              <CardContent>
                {activeMainTab === "content" ? (
                  <div className="space-y-4">
                    {/* Filter chips */}
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">All</Button>
                      <Button variant="ghost" size="sm">Missing</Button>
                      <Button variant="ghost" size="sm">Vague</Button>
                    </div>

                    <div className="grid lg:grid-cols-[32%_68%] gap-4">
                      {/* Item List */}
                      <div className="space-y-3">
                        <div className="text-sm text-muted-foreground">
                          {selectedItems.length} selected
                        </div>
                        {mockItems.map((item) => (
                          <div key={item.id} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50">
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
                            <div className="w-8 h-8 bg-gray-200 rounded border"></div>
                            <div className="flex-1 min-w-0">
                              <div className="text-sm font-medium truncate">{item.filename}</div>
                              <Badge variant="outline" className="text-xs mt-1">
                                {item.status}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Editor */}
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="text-sm font-medium">Generate Suggestions</div>
                          <div className="flex gap-2">
                            <Button 
                              onClick={handleGenerate}
                              disabled={selectedItems.length === 0 || isGenerating}
                              size="sm"
                            >
                              {isGenerating ? "Generating..." : "Generate"}
                            </Button>
                            {suggestions.length > 0 && (
                              <Button variant="outline" size="sm" onClick={handleGenerate}>
                                Regenerate
                              </Button>
                            )}
                          </div>
                        </div>

                        {generateError && (
                          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-sm text-red-700">{generateError}</p>
                            <Button variant="outline" size="sm" className="mt-2" onClick={handleGenerate}>
                              Try again
                            </Button>
                          </div>
                        )}

                        {isGenerating && (
                          <div className="space-y-3">
                            <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                            <div className="h-20 bg-gray-100 rounded animate-pulse"></div>
                            <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
                          </div>
                        )}

                        {suggestions.length > 0 && !isGenerating && (
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
                                  {suggestion.filename && suggestion.suggestedText.toLowerCase().includes(suggestion.filename.toLowerCase().split('.')[0]) && " · Avoid repeating filename"}
                                </div>
                              </div>
                            ))}
                            
                            <div className="flex gap-2 flex-wrap">
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

                        {selectedItems.length === 0 && !isGenerating && suggestions.length === 0 && (
                          <div className="text-center p-8 text-gray-500">
                            <p className="text-sm">Select items from the list to generate suggestions</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Header Row */}
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        Developer
                      </Badge>
                      <div className="flex gap-2">
                        <Button onClick={handleDevGenerate} size="sm" disabled={isGenerating}>
                          {isGenerating ? "Generating..." : "Generate"}
                        </Button>
                        {devCode.fixed && (
                          <Button variant="outline" size="sm" onClick={handleDevGenerate}>
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
                          <Button variant="ghost" size="sm" onClick={() => copyToClipboard(devCode.current, "Current code")}>
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
                          {devCode.fixed && (
                            <Button variant="ghost" size="sm" onClick={() => copyToClipboard(devCode.fixed, "Fixed code")}>
                              <Copy className="w-3 h-3" />
                            </Button>
                          )}
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
                      <div className="flex items-center space-x-2">
                        <Badge variant="secondary">{page.elements} elements</Badge>
                        <Button variant="ghost" size="sm" onClick={() => copyToClipboard(page.url, "Page URL")}>
                          <Copy className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Rail */}
          <div className="space-y-6">
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

            {/* Step-by-Step Guide */}
            <Card>
              <CardHeader>
                <CardTitle>Step-by-Step Guide</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {stepByStepGuide.map((step, index) => (
                    <div key={index} className="border rounded-lg">
                      <button
                        onClick={() => toggleStep(index)}
                        className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50"
                      >
                        <div className="flex items-center space-x-3">
                          <span className="w-6 h-6 bg-primary text-white text-xs rounded-full flex items-center justify-center">
                            {index + 1}
                          </span>
                          <span className="font-medium text-sm">{step.title}</span>
                        </div>
                        {expandedSteps.includes(index) ? (
                          <ChevronDown className="w-4 h-4 text-gray-400" />
                        ) : (
                          <ChevronRight className="w-4 h-4 text-gray-400" />
                        )}
                      </button>
                      {expandedSteps.includes(index) && (
                        <div className="px-3 pb-3">
                          <p className="text-sm text-gray-600 ml-9">{step.tip}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
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

            {/* Share Brief - Hidden by default, visible after Accept & Copy */}
            {showShareBrief && (
              <ShareBrief 
                isVisible={showShareBrief}
                briefText="Alt text suggestions generated for selected images. Copy fix summary to share with your team."
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssueDetailNew;