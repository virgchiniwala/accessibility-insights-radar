import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Lightbulb } from "lucide-react";

interface AIHelperCardProps {
  hasHelper: boolean;
  issueType: string;
  onOpenHelper: () => void;
}

export function AIHelperCard({ hasHelper, issueType, onOpenHelper }: AIHelperCardProps) {
  if (!hasHelper) {
    return (
      <Card className="bg-surface/50">
        <CardContent className="p-6 text-center">
          <Lightbulb className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
          <p className="text-sm text-muted-foreground">
            No AI helper available for this issue type
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          AI Fix Available
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Badge className="bg-primary/10 text-primary border-primary/20">
            {issueType} Helper
          </Badge>
          <p className="text-sm text-muted-foreground">
            AI can help generate solutions for this accessibility issue automatically.
          </p>
        </div>
        
        <Button 
          onClick={onOpenHelper}
          className="w-full bg-primary hover:bg-primary-hover text-primary-foreground"
        >
          <Sparkles className="mr-2 h-4 w-4" />
          Open AI Helper
        </Button>
      </CardContent>
    </Card>
  );
}