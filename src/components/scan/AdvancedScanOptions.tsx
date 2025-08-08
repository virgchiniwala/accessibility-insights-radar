import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export interface AdvancedScanOptionsValue {
  scanType: string;
  viewport: string;
  includeScreenshots: boolean;
  includeSubdomains: boolean;
  enableWcagAAA: boolean;
  customChecks: boolean;
}

interface AdvancedScanOptionsProps {
  value: AdvancedScanOptionsValue;
  onChange: (value: AdvancedScanOptionsValue) => void;
}

const defaultOptions: AdvancedScanOptionsValue = {
  scanType: "Website Crawl",
  viewport: "Desktop",
  includeScreenshots: false,
  includeSubdomains: false,
  enableWcagAAA: false,
  customChecks: false
};

export function AdvancedScanOptions({ value, onChange }: AdvancedScanOptionsProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("oobee:lastAdvancedOptions");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        onChange({ ...defaultOptions, ...parsed });
      } catch (e) {
        console.warn("Failed to parse saved options:", e);
      }
    }
  }, [onChange]);

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem("oobee:lastAdvancedOptions", JSON.stringify(value));
  }, [value]);

  const updateValue = (updates: Partial<AdvancedScanOptionsValue>) => {
    onChange({ ...value, ...updates });
  };

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <Button 
          variant="ghost" 
          className="w-full justify-between focus:ring-2 focus:ring-focus focus:ring-offset-2"
          aria-controls="advanced-options"
          aria-expanded={isOpen}
        >
          Advanced scan options
          {isOpen ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </Button>
      </CollapsibleTrigger>
      
      <CollapsibleContent 
        id="advanced-options"
        className="space-y-4 p-4 bg-surface/50 rounded-lg mt-4"
        style={{ borderRadius: '8px', backgroundColor: '#F5F5F5' }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Scan Type */}
          <div className="space-y-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Label htmlFor="scan-type" className="cursor-help">
                  Scan type:
                </Label>
              </TooltipTrigger>
              <TooltipContent>
                <p>Crawl the site and scan multiple pages.</p>
              </TooltipContent>
            </Tooltip>
            <Select 
              value={value.scanType} 
              onValueChange={(scanType) => updateValue({ scanType })}
            >
              <SelectTrigger id="scan-type">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Website Crawl">Website Crawl</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Viewport */}
          <div className="space-y-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Label htmlFor="viewport" className="cursor-help">
                  Viewport:
                </Label>
              </TooltipTrigger>
              <TooltipContent>
                <p>Choose how pages are rendered during the scan.</p>
              </TooltipContent>
            </Tooltip>
            <Select 
              value={value.viewport} 
              onValueChange={(viewport) => updateValue({ viewport })}
            >
              <SelectTrigger id="viewport">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Desktop">Desktop</SelectItem>
                <SelectItem value="Mobile">Mobile</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Include Screenshots */}
          <div className="flex items-center space-x-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="screenshots" 
                    checked={value.includeScreenshots}
                    onCheckedChange={(checked) => updateValue({ includeScreenshots: checked === true })}
                  />
                  <Label htmlFor="screenshots" className="text-sm cursor-help">
                    Include Screenshots
                  </Label>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Capture page screenshots to display in reports.</p>
              </TooltipContent>
            </Tooltip>
          </div>
          
          {/* Include Subdomains */}
          <div className="flex items-center space-x-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="subdomains" 
                    checked={value.includeSubdomains}
                    onCheckedChange={(checked) => updateValue({ includeSubdomains: checked === true })}
                  />
                  <Label htmlFor="subdomains" className="text-sm cursor-help">
                    Include Subdomains
                  </Label>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Follow links to subdomains (may increase page count).</p>
              </TooltipContent>
            </Tooltip>
          </div>
          
          {/* Enable WCAG AAA */}
          <div className="flex items-center space-x-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="wcag-aaa" 
                    checked={value.enableWcagAAA}
                    onCheckedChange={(checked) => updateValue({ enableWcagAAA: checked === true })}
                  />
                  <Label htmlFor="wcag-aaa" className="text-sm cursor-help">
                    Enable WCAG AAA Standards
                  </Label>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Run additional checks for AAA criteria.</p>
              </TooltipContent>
            </Tooltip>
          </div>
          
          {/* Custom Checks */}
          <div className="flex items-center space-x-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="custom-checks" 
                    checked={value.customChecks}
                    onCheckedChange={(checked) => updateValue({ customChecks: checked === true })}
                  />
                  <Label htmlFor="custom-checks" className="text-sm cursor-help">
                    Custom Accessibility Checks
                  </Label>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Enable agency-specific rules (if configured).</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}