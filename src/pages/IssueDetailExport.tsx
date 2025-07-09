import { useState } from "react";
import { GlobalNav } from "@/components/GlobalNav";
import { SplitButton } from "@/components/SplitButton";
import { SeverityBadge } from "@/components/SeverityBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, ExternalLink, Link2 } from "lucide-react";

export default function IssueDetailExport() {
  const [exported, setExported] = useState(false);

  const handleExport = (type: string) => {
    setExported(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <GlobalNav />
      
      <main className="max-w-[1440px] mx-auto px-6 py-8">
        <div className="space-y-8">
          {/* Page Header */}
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-heading font-normal mb-2">Issue Detail</h1>
              <p className="text-lg text-muted-foreground">
                Images missing alt text • WCAG 1.1.1
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <Button variant="outline">
                <Link2 className="h-4 w-4 mr-2" />
                Copy link
              </Button>
              <SplitButton onExport={handleExport} />
            </div>
          </div>

          {/* Impact Banner */}
          <Card className="bg-gradient-to-r from-severity-must-fix/10 to-severity-must-fix/5 border-severity-must-fix/30">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <AlertCircle className="h-6 w-6 text-severity-must-fix flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-xl font-semibold mb-2">High Impact Issue</h2>
                  <p className="text-lg">
                    <strong>Fixing this solves 80% of Must-Fix issues across 173 pages.</strong>
                  </p>
                  <p className="text-muted-foreground mt-2">
                    This is one of the most common accessibility barriers on your site. 
                    Addressing it will significantly improve the experience for users with disabilities.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Column - Code Example */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Code Example</CardTitle>
                    <SeverityBadge severity="must-fix" />
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2 text-severity-must-fix">❌ Current (Problematic)</h4>
                    <pre className="bg-surface p-4 rounded-lg text-sm overflow-x-auto border-l-4 border-severity-must-fix">
                      <code>{`<img src="government-services-banner.jpg" alt="">
<img src="citizen-portal-hero.png" alt="">
<img src="digital-services-infographic.svg" alt="">

<!-- Screen readers cannot describe these images -->
<!-- Users with visual impairments miss important information -->`}</code>
                    </pre>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2 text-green-600">✅ Fixed (Accessible)</h4>
                    <pre className="bg-surface p-4 rounded-lg text-sm overflow-x-auto border-l-4 border-green-500">
                      <code>{`<img src="government-services-banner.jpg" 
     alt="Citizens accessing government services online through mobile and desktop devices">

<img src="citizen-portal-hero.png"
     alt="Singapore citizen login portal homepage with secure authentication">

<img src="digital-services-infographic.svg"
     alt="Infographic showing 85% of citizens now use digital government services">`}</code>
                    </pre>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <h4 className="font-semibold mb-2 text-blue-800">💡 Best Practices</h4>
                    <ul className="text-sm space-y-1 text-blue-700">
                      <li>• Describe the content and function of the image</li>
                      <li>• Be concise but informative (aim for 125 characters or less)</li>
                      <li>• Use alt="" only for purely decorative images</li>
                      <li>• Include relevant context for the page content</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Affected Pages */}
              <Card>
                <CardHeader>
                  <CardTitle>Affected Pages (23 pages)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-surface rounded-lg">
                      <span>/citizen-services/healthcare</span>
                      <Badge variant="outline">8 issues</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-surface rounded-lg">
                      <span>/government/digital-services</span>
                      <Badge variant="outline">5 issues</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-surface rounded-lg">
                      <span>/public-housing/applications</span>
                      <Badge variant="outline">4 issues</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-surface rounded-lg">
                      <span>/education/school-registration</span>
                      <Badge variant="outline">3 issues</Badge>
                    </div>
                    <div className="text-center pt-2">
                      <Button variant="ghost" size="sm">
                        View all 23 pages →
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Fix Guidance */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Step-by-Step Fix Guide</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">1</div>
                      <div>
                        <h4 className="font-semibold mb-1">Identify Meaningful Images</h4>
                        <p className="text-sm text-muted-foreground">Review all images on your pages. Images that convey information, show data, or are functional (like buttons) need descriptive alt text.</p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">2</div>
                      <div>
                        <h4 className="font-semibold mb-1">Write Descriptive Alt Text</h4>
                        <p className="text-sm text-muted-foreground">Describe what the image shows and its purpose. Focus on the content that's relevant to understanding the page.</p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">3</div>
                      <div>
                        <h4 className="font-semibold mb-1">Update HTML Attributes</h4>
                        <p className="text-sm text-muted-foreground">Add the alt attribute to your img tags with the descriptive text. For decorative images, use alt="".</p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">4</div>
                      <div>
                        <h4 className="font-semibold mb-1">Test with Screen Reader</h4>
                        <p className="text-sm text-muted-foreground">Use NVDA, JAWS, or VoiceOver to test how your alt text sounds when read aloud. Adjust if needed.</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* WCAG Reference */}
              <Card>
                <CardHeader>
                  <CardTitle>WCAG Reference</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <div className="font-semibold">WCAG 2.1 Success Criterion 1.1.1</div>
                    <div className="text-sm text-muted-foreground">Non-text Content (Level A)</div>
                  </div>
                  <p className="text-sm">
                    All non-text content that is presented to the user has a text alternative 
                    that serves the equivalent purpose.
                  </p>
                  <a 
                    href="https://www.w3.org/WAI/WCAG21/Understanding/non-text-content.html" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline text-sm flex items-center gap-1"
                  >
                    Read full WCAG guidelines <ExternalLink className="h-3 w-3" />
                  </a>
                </CardContent>
              </Card>

              {/* Impact Metrics */}
              <Card>
                <CardHeader>
                  <CardTitle>Impact Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-surface rounded-lg">
                      <div className="text-2xl font-bold text-primary">173</div>
                      <div className="text-sm text-muted-foreground">Pages Affected</div>
                    </div>
                    <div className="text-center p-4 bg-surface rounded-lg">
                      <div className="text-2xl font-bold text-primary">~10%</div>
                      <div className="text-sm text-muted-foreground">Users Impacted</div>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Fixing this issue will improve accessibility for users with visual impairments, 
                    cognitive disabilities, and users in low-bandwidth situations.
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}