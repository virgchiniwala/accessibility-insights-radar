import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Copy, ExternalLink, Lightbulb, AlertTriangle, Users, Clock, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ShareBrief } from '@/components/ShareBrief';
import { GlossaryHover } from '@/components/GlossaryHover';
import { useToast } from '@/hooks/use-toast';

const IssueDetailNew: React.FC = () => {
  const [showShareBrief, setShowShareBrief] = useState(false);
  const [activeMainTab, setActiveMainTab] = useState<"guided" | "manual">("guided");
  const [activeContextTab, setActiveContextTab] = useState<"html" | "css">("html");
  const [fixedCode, setFixedCode] = useState("");
  const [aiSuggestions, setAiSuggestions] = useState({
    altText1: "Students collaborating in modern library space",
    altText2: "Wireless headphones in matte black finish"
  });
  const { toast } = useToast();

  const handleApplySuggestions = () => {
    // Copy AI suggestions to manual tab
    const fixedHtml = `<img src="/hero-banner.jpg" alt="${aiSuggestions.altText1}" />
<img src="/product-1.jpg" alt="${aiSuggestions.altText2}" class="product-image" />`;
    setFixedCode(fixedHtml);
    setShowShareBrief(true);
    toast({
      title: "Suggestions applied",
      description: "AI suggestions copied to Manual tab. Share with your team!"
    });
  };

  const handleCodeCopy = async (code: string) => {
    await navigator.clipboard.writeText(code);
    toast({
      title: "Copied to clipboard",
      description: "Code has been copied successfully."
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
<img src="/hero-banner.jpg" />
<img src="/product-1.jpg" class="product-image" />

<!-- Fixed -->
<img src="/hero-banner.jpg" alt="Students collaborating in modern library space" />
<img src="/product-1.jpg" alt="Wireless headphones in matte black finish" class="product-image" />`,
    css: `/* CSS Path for targeting images */
.hero-section img,
.product-grid .product-image,
.content-area img:not([alt]) {
  /* These selectors help identify problematic images */
  border: 2px solid #ff6b6b; /* Debug outline */
}

/* Accessible image containers */
.image-container {
  position: relative;
}

.image-container::after {
  content: "Missing alt text";
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(255, 107, 107, 0.9);
  color: white;
  padding: 4px 8px;
  font-size: 12px;
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
                      variant={activeMainTab === "guided" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setActiveMainTab("guided")}
                      className="h-8"
                    >
                      Guided (AI)
                    </Button>
                    <Button
                      variant={activeMainTab === "manual" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setActiveMainTab("manual")}
                      className="h-8"
                    >
                      Manual
                    </Button>
                  </div>
                  <div className="flex space-x-1">
                    <Button
                      variant={activeContextTab === "html" ? "outline" : "ghost"}
                      size="sm"
                      onClick={() => setActiveContextTab("html")}
                      className="h-7 text-xs"
                    >
                      HTML Element
                    </Button>
                    <Button
                      variant={activeContextTab === "css" ? "outline" : "ghost"}
                      size="sm"
                      onClick={() => setActiveContextTab("css")}
                      className="h-7 text-xs"
                    >
                      CSS Path
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {activeMainTab === "manual" ? (
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-medium text-gray-700">Current (Incorrect)</h4>
                        <Button variant="ghost" size="sm" onClick={() => handleCodeCopy(activeContextTab === "html" ? codeExamples.html.split("<!-- Fixed -->")[0] : codeExamples.css)}>
                          <Copy className="w-3 h-3" />
                        </Button>
                      </div>
                      <div className="border border-red-200 rounded-lg bg-red-50 p-4">
                        <pre className="text-sm font-mono whitespace-pre-wrap text-gray-800 overflow-x-auto">
                          {activeContextTab === "html" 
                            ? codeExamples.html.split("<!-- Fixed -->")[0].replace("<!-- Current (Problematic) -->", "").trim()
                            : codeExamples.css
                          }
                        </pre>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-medium text-gray-700">Fixed (Correct)</h4>
                        <Button variant="ghost" size="sm" onClick={() => handleCodeCopy(fixedCode)}>
                          <Copy className="w-3 h-3" />
                        </Button>
                      </div>
                      <div className="border border-green-200 rounded-lg bg-green-50 p-4">
                        <pre className="text-sm font-mono whitespace-pre-wrap text-gray-800 overflow-x-auto">
                          {fixedCode || (activeContextTab === "html" 
                            ? codeExamples.html.split("<!-- Fixed -->")[1].trim()
                            : "/* Fixed CSS will appear here after applying AI suggestions */"
                          )}
                        </pre>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    {/* AI Helper Editor */}
                    {issueData.category === "Images" ? (
                      <div className="space-y-4">
                        <div className="p-4 bg-purple-50 rounded-lg">
                          <h3 className="font-medium text-gray-900 mb-3">AI Suggested Alt Text</h3>
                          <div className="space-y-3">
                            <div className="p-3 bg-white rounded border">
                              <div className="flex items-center space-x-3 mb-2">
                                <img src="/api/placeholder/40/40" alt="" className="w-10 h-10 rounded border" />
                                <div className="flex-1">
                                  <div className="text-sm font-medium">hero-banner.jpg</div>
                                  <div className="text-xs text-gray-500">Current: (missing)</div>
                                </div>
                              </div>
                              <textarea
                                className="w-full p-2 border rounded text-sm"
                                rows={2}
                                value={aiSuggestions.altText1}
                                onChange={(e) => setAiSuggestions({...aiSuggestions, altText1: e.target.value})}
                                placeholder="AI suggested alt text..."
                              />
                            </div>
                            <div className="p-3 bg-white rounded border">
                              <div className="flex items-center space-x-3 mb-2">
                                <img src="/api/placeholder/40/40" alt="" className="w-10 h-10 rounded border" />
                                <div className="flex-1">
                                  <div className="text-sm font-medium">product-1.jpg</div>
                                  <div className="text-xs text-gray-500">Current: (missing)</div>
                                </div>
                              </div>
                              <textarea
                                className="w-full p-2 border rounded text-sm"
                                rows={2}
                                value={aiSuggestions.altText2}
                                onChange={(e) => setAiSuggestions({...aiSuggestions, altText2: e.target.value})}
                                placeholder="AI suggested alt text..."
                              />
                            </div>
                          </div>
                          <div className="flex space-x-2 mt-4">
                            <Button variant="outline" size="sm">
                              Regenerate
                            </Button>
                            <Button size="sm" onClick={handleApplySuggestions}>
                              Apply Suggestions
                            </Button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <p>No AI helper available for this issue yet.</p>
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
                      <Badge variant="secondary">{page.elements} elements</Badge>
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