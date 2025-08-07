import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface ShareBriefProps {
  isVisible: boolean;
  briefText?: string;
}

// Global helper function for copy-to-clipboard
function copyBrief(text: string) {
  navigator.clipboard.writeText(text);
  toast.success('Copied to clipboard');
}

export function ShareBrief({ isVisible, briefText }: ShareBriefProps) {
  const [copied, setCopied] = useState(false);

  const defaultBrief = "Images missing alt text — AI recommends X-word descriptions. Copy & share this snippet with your team.";
  const textToCopy = briefText || defaultBrief;

  const handleCopy = async () => {
    try {
      copyBrief(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error("Failed to copy to clipboard");
    }
  };

  if (!isVisible) return null;

  return (
    <Card 
      className="bg-[#F5F5F5] border-border"
      style={{ borderRadius: '8px', padding: '16px' }}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Share-Ready Brief</CardTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleCopy}
            className="h-6 w-6"
          >
            {copied ? (
              <Check className="h-4 w-4 text-green-600" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-sm text-foreground leading-relaxed">
          {textToCopy}
        </p>
      </CardContent>
    </Card>
  );
}