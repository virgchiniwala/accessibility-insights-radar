import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

interface ShareBriefProps {
  isVisible: boolean;
  briefText: string;
}

export function ShareBrief({ isVisible, briefText }: ShareBriefProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(briefText);
      setCopied(true);
      toast({
        title: "Copied!",
        description: "Brief copied to clipboard"
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try again",
        variant: "destructive"
      });
    }
  };

  if (!isVisible) return null;

  return (
    <Card className="bg-surface-light border-primary-100">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          Share Brief
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Share this one-liner with your team →
        </p>
        <div className="bg-white p-3 rounded-lg border border-border">
          <p className="text-sm font-medium text-foreground">
            {briefText}
          </p>
        </div>
        <Button
          onClick={handleCopy}
          variant="outline"
          size="sm"
          className="w-full"
        >
          {copied ? (
            <>
              <Check className="mr-2 h-4 w-4" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="mr-2 h-4 w-4" />
              Copy to Clipboard
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}