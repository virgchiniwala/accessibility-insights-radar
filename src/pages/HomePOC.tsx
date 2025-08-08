import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronDown, ChevronUp } from "lucide-react";
import { EmailVerificationModal } from "@/components/EmailVerificationModal";
import { AdvancedScanOptions, AdvancedScanOptionsValue } from "@/components/scan/AdvancedScanOptions";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export default function HomePOC() {
  const [url, setUrl] = useState("");
  const [pageLimit, setPageLimit] = useState("100");
  const [activeScansExpanded, setActiveScansExpanded] = useState(false);
  const [scanReportsExpanded, setScanReportsExpanded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [advancedOptions, setAdvancedOptions] = useState<AdvancedScanOptionsValue>({
    scanType: "Website Crawl",
    viewport: "Desktop",
    includeScreenshots: false,
    includeSubdomains: false,
    enableWcagAAA: false,
    customChecks: false
  });

  const handleContinue = () => {
    setIsModalOpen(true);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleContinue();
    }
  };

  return (
    <div className="max-w-[1440px] mx-auto px-6 py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-[56px] leading-[64px] font-heading text-foreground mb-6">
            Check your website's accessibility instantly
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Get instant accessibility insights for any website
          </p>
        </div>

        {/* Main Scan Card */}
        <Card className="w-full max-w-[800px] mx-auto shadow-oobee">
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
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">capped at</span>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center gap-1">
                        <Select value={pageLimit} onValueChange={setPageLimit}>
                          <SelectTrigger className="w-20">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="25">25</SelectItem>
                            <SelectItem value="50">50</SelectItem>
                            <SelectItem value="100">100</SelectItem>
                            <SelectItem value="200">200</SelectItem>
                          </SelectContent>
                        </Select>
                        <span className="text-sm text-primary">pages</span>
                        <ChevronDown className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>During beta, scans are capped by page count.</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>
            </div>

            {/* Advanced Options */}
            <AdvancedScanOptions 
              value={advancedOptions}
              onChange={setAdvancedOptions}
            />

            {/* Continue Button */}
            <div className="text-center space-y-2">
              <Button 
                id="btnContinue"
                onClick={handleContinue}
                disabled={!url.trim()}
                className="px-8 focus:ring-2 focus:ring-focus focus:ring-offset-2"
              >
                Sign up to continue →
              </Button>
              <p className="text-xs text-muted-foreground">
                You'll verify your work email next (OTP) before the scan starts.
              </p>
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
      
      <EmailVerificationModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}