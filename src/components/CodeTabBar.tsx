import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { toast } from "sonner";

interface CodeTabBarProps {
  htmlContent: string;
  cssContent: string;
}

export function CodeTabBar({ htmlContent, cssContent }: CodeTabBarProps) {
  const [activeTab, setActiveTab] = useState("html");
  const [copiedTab, setCopiedTab] = useState<string | null>(null);

  const handleCopy = async (content: string, tabName: string) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedTab(tabName);
      toast.success('Code copied to clipboard');
      setTimeout(() => setCopiedTab(null), 2000);
    } catch (err) {
      toast.error('Failed to copy code');
    }
  };

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <div className="flex items-center justify-between mb-4">
        <TabsList className="bg-surface">
          <TabsTrigger value="html" className="font-mono text-sm">
            HTML Element
          </TabsTrigger>
          <TabsTrigger value="css" className="font-mono text-sm">
            CSS Path
          </TabsTrigger>
        </TabsList>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={() => handleCopy(
            activeTab === "html" ? htmlContent : cssContent,
            activeTab
          )}
          className="h-8 w-8"
        >
          {copiedTab === activeTab ? (
            <Check className="h-4 w-4 text-green-600" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </Button>
      </div>

      <TabsContent value="html" className="mt-0">
        <pre 
          className="bg-surface p-4 rounded-lg text-sm overflow-x-auto border font-mono text-[14px] leading-relaxed select-text"
          style={{ fontFamily: 'PT Mono, monospace' }}
        >
          <code>{htmlContent}</code>
        </pre>
      </TabsContent>

      <TabsContent value="css" className="mt-0">
        <pre 
          className="bg-surface p-4 rounded-lg text-sm overflow-x-auto border font-mono text-[14px] leading-relaxed select-text"
          style={{ fontFamily: 'PT Mono, monospace' }}
        >
          <code>{cssContent}</code>
        </pre>
      </TabsContent>
    </Tabs>
  );
}