import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AdvancedScanOptions, AdvancedScanOptionsValue } from "@/components/scan/AdvancedScanOptions";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export default function ScanLanding() {
  const [url, setUrl] = useState("");
  const [pageLimit, setPageLimit] = useState("100");
  const [advancedOptions, setAdvancedOptions] = useState<AdvancedScanOptionsValue>({
    scanType: "Website Crawl",
    viewport: "Desktop",
    includeScreenshots: false,
    includeSubdomains: false,
    enableWcagAAA: false,
    customChecks: false
  });

  const handleStartScan = () => {
    console.log("Starting scan for:", url, "with options:", advancedOptions);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <div className="text-center mb-12">
        <h1 className="text-[56px] leading-[64px] font-heading text-foreground mb-6">
          Accessibility Scanner
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          Get instant accessibility insights for any website
        </p>
      </div>

      <Card className="shadow-oobee">
        <CardHeader>
          <CardTitle className="text-[32px] leading-[40px] font-heading flex items-center gap-3">
            <Globe className="h-8 w-8 text-primary" />
            Scan Your Website
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="url">Website URL</Label>
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

          <div className="pt-4">
            <Button 
              onClick={handleStartScan}
              disabled={!url}
              size="lg"
              className="w-full text-lg py-3 bg-primary hover:bg-primary-hover focus:ring-2 focus:ring-focus focus:ring-offset-2"
            >
              Start Accessibility Scan
            </Button>
            <p className="text-center text-sm text-muted-foreground mt-2">
              Max 3 scans / day during beta.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}