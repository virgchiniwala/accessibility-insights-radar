import { useState } from "react";
import { GlobalNav } from "@/components/GlobalNav";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function ScanHomeFocus() {
  const [url, setUrl] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [scanType, setScanType] = useState("website-crawl");
  const [includeScreenshots, setIncludeScreenshots] = useState(false);
  const [includeSubdomains, setIncludeSubdomains] = useState(false);
  const [customChecks, setCustomChecks] = useState(false);
  const [wcagAAA, setWcagAAA] = useState(false);
  const [activeScansExpanded, setActiveScansExpanded] = useState(false);
  const [scanReportsExpanded, setScanReportsExpanded] = useState(false);

  const handleScan = () => {
    console.log("Starting scan for:", url);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleScan();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <GlobalNav />
      
      <main className="max-w-[1440px] mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Main Scan Card */}
          <Card className="w-full max-w-[800px] mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-heading">Web Accessibility Scan</CardTitle>
              <p className="text-muted-foreground">Enter your URL to get started</p>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* URL Input */}
              <div className="space-y-2">
                <Label htmlFor="url">URL</Label>
                <div className="flex gap-2">
                  <Input
                    id="url"
                    type="url"
                    placeholder="https://"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex-1 focus:ring-2 focus:ring-focus focus:ring-offset-2"
                  />
                  <div className="text-sm text-muted-foreground flex items-center">
                    capped at <span className="text-primary mx-1">100 pages</span>
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </div>
              </div>

              {/* Advanced Options Toggle */}
              <div className="text-center">
                <button
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className="text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-focus focus:ring-offset-2 rounded"
                >
                  Advanced scan options
                  {showAdvanced ? (
                    <ChevronUp className="inline h-4 w-4 ml-1" />
                  ) : (
                    <ChevronDown className="inline h-4 w-4 ml-1" />
                  )}
                </button>
              </div>

              {/* Advanced Options */}
              {showAdvanced && (
                <div className="space-y-4 p-4 bg-surface/50 rounded-lg">
                  {/* Scan Type */}
                  <div className="space-y-2">
                    <Label htmlFor="scan-type">Scan type:</Label>
                    <Select value={scanType} onValueChange={setScanType}>
                      <SelectTrigger id="scan-type">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="website-crawl">Website Crawl</SelectItem>
                        <SelectItem value="single-page">Single Page</SelectItem>
                        <SelectItem value="sitemap">Sitemap Scan</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Checkboxes */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="screenshots" 
                        checked={includeScreenshots}
                        onCheckedChange={(checked) => setIncludeScreenshots(checked === true)}
                      />
                      <Label htmlFor="screenshots" className="text-sm">Include Screenshots</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="subdomains" 
                        checked={includeSubdomains}
                        onCheckedChange={(checked) => setIncludeSubdomains(checked === true)}
                      />
                      <Label htmlFor="subdomains" className="text-sm">Include Subdomains</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="custom-checks" 
                        checked={customChecks}
                        onCheckedChange={(checked) => setCustomChecks(checked === true)}
                      />
                      <Label htmlFor="custom-checks" className="text-sm">Custom Accessibility Checks</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="wcag-aaa" 
                        checked={wcagAAA}
                        onCheckedChange={(checked) => setWcagAAA(checked === true)}
                      />
                      <Label htmlFor="wcag-aaa" className="text-sm">Enable WCAG AAA Standards</Label>
                    </div>
                  </div>
                </div>
              )}

              {/* Scan Button with Focus and Tooltip */}
              <div className="text-center">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      onClick={handleScan}
                      disabled={!url.trim()}
                      className="px-8 focus:ring-2 focus:ring-focus focus:ring-offset-2"
                      style={{
                        outline: '2px solid hsl(var(--focus-ring))',
                        outlineOffset: '2px'
                      }}
                    >
                      Scan
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Press Enter to start scan</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </CardContent>
          </Card>

          {/* Active Scans Section */}
          <Card>
            <CardHeader 
              className="cursor-pointer"
              onClick={() => setActiveScansExpanded(!activeScansExpanded)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    Active Scans
                    <span className="text-sm font-normal text-muted-foreground">0 Active</span>
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">Real-time scan status</p>
                </div>
                {activeScansExpanded ? (
                  <ChevronUp className="h-5 w-5" />
                ) : (
                  <ChevronDown className="h-5 w-5" />
                )}
              </div>
            </CardHeader>
            {activeScansExpanded && (
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  No data to display
                </div>
              </CardContent>
            )}
          </Card>

          {/* Scan Reports Section */}
          <Card>
            <CardHeader 
              className="cursor-pointer"
              onClick={() => setScanReportsExpanded(!scanReportsExpanded)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    Scan Reports
                    <span className="text-sm font-normal text-muted-foreground">0 Total</span>
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">Reports expire after 3 days from scanned date/time.</p>
                </div>
                {scanReportsExpanded ? (
                  <ChevronUp className="h-5 w-5" />
                ) : (
                  <ChevronDown className="h-5 w-5" />
                )}
              </div>
            </CardHeader>
            {scanReportsExpanded && (
              <CardContent>
                <div className="flex justify-between items-center mb-4">
                  <Input placeholder="Search" className="max-w-xs" />
                  <div className="flex items-center gap-2">
                    <Select defaultValue="newest">
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="newest">Newest First</SelectItem>
                        <SelectItem value="oldest">Oldest First</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline" size="sm">Refresh</Button>
                  </div>
                </div>
                <div className="text-center py-8 text-muted-foreground">
                  No data to display
                </div>
              </CardContent>
            )}
          </Card>

          {/* Footer Illustration */}
          <div className="flex justify-center py-8">
            <div className="flex items-center gap-8 opacity-60">
              {/* Illustration strip - using simple placeholder elements */}
              <div className="w-16 h-16 bg-surface rounded-lg flex items-center justify-center">
                <div className="w-8 h-8 bg-muted rounded"></div>
              </div>
              <div className="w-16 h-16 bg-surface rounded-lg flex items-center justify-center">
                <div className="w-8 h-8 bg-muted rounded-full"></div>
              </div>
              <div className="w-16 h-16 bg-surface rounded-lg flex items-center justify-center">
                <div className="w-8 h-8 bg-muted rounded"></div>
              </div>
              <div className="w-16 h-16 bg-surface rounded-lg flex items-center justify-center">
                <div className="w-8 h-8 bg-muted rounded-full"></div>
              </div>
              <div className="w-16 h-16 bg-surface rounded-lg flex items-center justify-center">
                <div className="w-8 h-8 bg-muted rounded"></div>
              </div>
            </div>
          </div>

          {/* Footer Version */}
          <div className="text-center text-sm text-muted-foreground">
            <div className="flex items-center justify-center gap-2">
              <span className="text-primary">⚡</span>
              Version 0.9.17 (latest) | Powered by GovTech's A11y
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}