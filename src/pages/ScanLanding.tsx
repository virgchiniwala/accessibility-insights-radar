import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, Globe } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

export default function ScanLanding() {
  const [url, setUrl] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleStartScan = () => {
    // Simulate scan start - in real app would navigate to scan results
    console.log("Starting scan for:", url);
  };

  return (
    <div className="min-h-screen bg-bg-white">
      <div className="container max-w-4xl mx-auto px-20 py-16">
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
              <Input
                id="url"
                type="url"
                placeholder="https://example.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="text-lg py-3"
              />
            </div>

            <Collapsible open={showAdvanced} onOpenChange={setShowAdvanced}>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" className="w-full justify-between">
                  Advanced Options
                  <ChevronDown className={`h-4 w-4 transition-transform ${showAdvanced ? 'rotate-180' : ''}`} />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-4 pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Viewport Size</Label>
                    <Select defaultValue="desktop">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="desktop">Desktop (1920x1080)</SelectItem>
                        <SelectItem value="tablet">Tablet (768x1024)</SelectItem>
                        <SelectItem value="mobile">Mobile (375x667)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Scan Depth</Label>
                    <Select defaultValue="3">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 level</SelectItem>
                        <SelectItem value="3">3 levels</SelectItem>
                        <SelectItem value="5">5 levels</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <Label>Additional Options</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="include-images" />
                      <Label htmlFor="include-images" className="text-sm">
                        Include image analysis
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="check-forms" defaultChecked />
                      <Label htmlFor="check-forms" className="text-sm">
                        Check form accessibility
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="keyboard-nav" defaultChecked />
                      <Label htmlFor="keyboard-nav" className="text-sm">
                        Test keyboard navigation
                      </Label>
                    </div>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>

            <div className="pt-4">
              <Button 
                onClick={handleStartScan}
                disabled={!url}
                size="lg"
                className="w-full text-lg py-3 bg-primary hover:bg-primary-hover"
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
    </div>
  );
}