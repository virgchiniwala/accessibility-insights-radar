import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X, Upload, Globe } from "lucide-react";

export default function NewScanModal() {
  const [url, setUrl] = useState("");
  const [viewport, setViewport] = useState("desktop");
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const prefilledUrl = searchParams.get('url');
    if (prefilledUrl) {
      setUrl(prefilledUrl);
    }
  }, [searchParams]);

  const handleStartScan = async () => {
    if (!url.trim()) return;
    
    setIsLoading(true);
    // Simulate async operation
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Close modal and return to reports
    navigate('/reports');
  };

  const handleClose = () => {
    navigate(-1);
  };

  return (
    <div className="fixed inset-0 bg-black/35 backdrop-blur-md flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-lg shadow-xl">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-[32px] leading-[40px] font-heading">
            Run New Scan
          </CardTitle>
          <Button variant="ghost" size="icon" onClick={handleClose}>
            <X className="h-5 w-5" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="url">Website URL</Label>
            <div className="relative">
              <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="url"
                placeholder="https://example.gov.sg"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="viewport">Viewport</Label>
            <Select value={viewport} onValueChange={setViewport}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="desktop">Desktop (1920×1080)</SelectItem>
                <SelectItem value="tablet">Tablet (768×1024)</SelectItem>
                <SelectItem value="mobile">Mobile (375×667)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
            <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground mb-2">
              Or upload a sitemap file
            </p>
            <Button variant="outline" size="sm">
              Choose File
            </Button>
          </div>

          <div className="flex gap-3 pt-4">
            <Button 
              variant="outline" 
              onClick={handleClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleStartScan}
              disabled={!url.trim() || isLoading}
              className="flex-1"
            >
              {isLoading ? "Starting..." : "Start Scan"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}