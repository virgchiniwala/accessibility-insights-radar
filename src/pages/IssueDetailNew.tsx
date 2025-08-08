import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Copy, ExternalLink, Lightbulb, AlertTriangle, Users, Clock, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AIHelperCard } from '@/components/AIHelperCard';
import { ShareBrief } from '@/components/ShareBrief';
import { GlossaryHover } from '@/components/GlossaryHover';
import { CodeTabBar } from '@/components/CodeTabBar';

const IssueDetailNew: React.FC = () => {
  const [showShareBrief, setShowShareBrief] = useState(false);
  const [showHelperModal, setShowHelperModal] = useState(false);

  const handleHelperModalAccepted = () => {
    setShowShareBrief(true);
    setShowHelperModal(false);
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

            {/* Code Example with Tab Bar */}
            <Card>
              <CardHeader>
                <CardTitle>Code Example</CardTitle>
              </CardHeader>
              <CardContent>
                <CodeTabBar 
                  htmlContent={codeExamples.html}
                  cssContent={codeExamples.css}
                />
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
            {/* AI Helper Card */}
            <AIHelperCard 
              hasHelper={true}
              issueType="Alt Text"
              onOpenHelper={() => setShowHelperModal(true)}
            />

            {/* Step-by-Step Guide */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Lightbulb className="w-5 h-5 text-yellow-500" />
                  <span>Step-by-Step Guide</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center text-sm font-semibold">
                      1
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Identify images</h4>
                      <p className="text-sm text-gray-600">Locate all images missing alt attributes</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center text-sm font-semibold">
                      2
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Write descriptions</h4>
                      <p className="text-sm text-gray-600">Create concise, meaningful alt text</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center text-sm font-semibold">
                      3
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Add alt attributes</h4>
                      <p className="text-sm text-gray-600">Update HTML with alt text</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center text-sm font-semibold">
                      4
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Test & validate</h4>
                      <p className="text-sm text-gray-600">Verify with screen readers</p>
                    </div>
                  </div>
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

      {/* AI Helper Modal */}
      {showHelperModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                ✨ AI-Suggested Fix
              </h2>
              <p className="text-sm text-gray-600">
                AI analysed 24 items – est. time saved ≈ 72 min.
              </p>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                <div className="p-4 bg-purple-50 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2">Suggested Alt Text</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">hero-banner.jpg</span>
                      <span className="text-gray-900">"Students collaborating in modern library space"</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">product-1.jpg</span>
                      <span className="text-gray-900">"Wireless headphones in matte black finish"</span>
                    </div>
                    <div className="text-center text-gray-500 py-2">
                      ... and 22 more suggestions
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t bg-gray-50 flex justify-between items-center">
              <div className="flex space-x-4">
                <button className="text-sm text-gray-600 hover:text-gray-800">
                  👍 Helpful
                </button>
                <button className="text-sm text-gray-600 hover:text-gray-800">
                  👎 Not helpful
                </button>
              </div>
              <div className="flex space-x-3">
                <Button 
                  variant="ghost" 
                  onClick={() => setShowHelperModal(false)}
                >
                  Cancel
                </Button>
                <Button variant="outline">
                  Regenerate
                </Button>
                <Button onClick={handleHelperModalAccepted}>
                  Apply Suggestions
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IssueDetailNew;