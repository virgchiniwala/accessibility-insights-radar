import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { X, RefreshCw, ThumbsUp, ThumbsDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const AIHelperModalNew: React.FC = () => {
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [hasGenerated, setHasGenerated] = useState(false);
  const { toast } = useToast();

  const mockItems = [
    {
      id: 1,
      filename: "hero-banner.jpg",
      thumbnail: "/api/placeholder/40/40",
      status: "missing" as const,
      currentText: "",
      suggestedText: ""
    },
    {
      id: 2,
      filename: "product-1.jpg", 
      thumbnail: "/api/placeholder/40/40",
      status: "missing" as const,
      currentText: "",
      suggestedText: ""
    },
    {
      id: 3,
      filename: "team-photo.jpg",
      thumbnail: "/api/placeholder/40/40", 
      status: "vague" as const,
      currentText: "Team",
      suggestedText: ""
    }
  ];

  const handleGenerate = () => {
    const newSuggestions = selectedItems.map(id => {
      const item = mockItems.find(i => i.id === id);
      return {
        ...item,
        suggestedText: id === 1 ? "Students collaborating in modern library space with laptops and books" : 
                      id === 2 ? "Wireless headphones in matte black finish on white background" :
                      "Five diverse professionals in business attire standing together in modern office"
      };
    });
    setSuggestions(newSuggestions);
    setHasGenerated(true);
  };

  const handleAcceptSelected = () => {
    const textToCopy = suggestions.map(s => `${s.filename}: ${s.suggestedText}`).join('\n');
    navigator.clipboard.writeText(textToCopy);
    
    toast({
      title: "Suggestions applied",
      description: "AI suggestions copied and ready to share."
    });
  };

  const handleRegenerate = () => {
    setSuggestions(suggestions.map(s => ({
      ...s,
      suggestedText: s.suggestedText + " (regenerated)"
    })));
  };

  const handleFeedback = (helpful: boolean) => {
    // Emit helper_feedback event
    console.log('helper_feedback', { helpful });
    toast({
      title: helpful ? "Thanks for your feedback!" : "Feedback received",
      description: "Your input helps improve our AI suggestions."
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">✨ AI Suggestions</h1>
              <p className="text-sm text-gray-600 mt-1">
                Select items, then Generate to fetch suggestions. Nothing is generated until you ask.
              </p>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/issue-detail">
                <X className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 h-[calc(100vh-200px)]">
          {/* Left Panel - Item List (30%) */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border overflow-hidden">
            <div className="p-4 border-b">
              <h2 className="font-medium text-gray-900 mb-3">Items ({mockItems.length})</h2>
              <div className="text-sm text-muted-foreground">
                {selectedItems.length} selected
              </div>
            </div>
            <div className="overflow-y-auto max-h-[600px]">
              {mockItems.map((item) => (
                <div
                  key={item.id}
                  className="p-3 border-b hover:bg-gray-50"
                >
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      checked={selectedItems.includes(item.id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedItems([...selectedItems, item.id]);
                        } else {
                          setSelectedItems(selectedItems.filter(id => id !== item.id));
                        }
                      }}
                    />
                    <div className="w-10 h-10 bg-gray-200 rounded border"></div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-gray-900 truncate">{item.filename}</div>
                      <Badge 
                        variant="outline" 
                        className={`text-xs mt-1 ${
                          item.status === 'missing' ? 'border-red-200 text-red-700 bg-red-50' :
                          item.status === 'vague' ? 'border-yellow-200 text-yellow-700 bg-yellow-50' :
                          'border-green-200 text-green-700 bg-green-50'
                        }`}
                      >
                        {item.status === 'missing' ? 'Missing' : item.status === 'vague' ? 'Vague' : 'OK'}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Panel - Editor (70%) */}
          <div className="lg:col-span-3 bg-white rounded-lg shadow-sm border">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex gap-2">
                  <Button 
                    onClick={handleGenerate}
                    disabled={selectedItems.length === 0}
                  >
                    Generate
                  </Button>
                  {hasGenerated && (
                    <Button variant="outline" onClick={handleRegenerate}>
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Regenerate
                    </Button>
                  )}
                </div>
                
                {suggestions.length > 0 && (
                  <Button onClick={handleAcceptSelected}>
                    Accept Selected
                  </Button>
                )}
              </div>

              {suggestions.length > 0 ? (
                <div className="space-y-6">
                  {suggestions.map((suggestion, index) => (
                    <div key={index} className="space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm">Image: {suggestion.filename}</span>
                      </div>
                      <div className="space-y-2">
                        <div className="text-sm text-gray-600">Current:</div>
                        <div className="p-3 bg-gray-50 rounded border text-sm">
                          {suggestion.currentText || "(missing)"}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="text-sm text-gray-600">Suggested:</div>
                        <Textarea
                          value={suggestion.suggestedText}
                          onChange={(e) => {
                            const newSuggestions = [...suggestions];
                            newSuggestions[index].suggestedText = e.target.value;
                            setSuggestions(newSuggestions);
                          }}
                          className="font-body text-base leading-6"
                          rows={3}
                          placeholder="AI-generated suggestion will appear here"
                        />
                        <div className="text-xs text-muted-foreground">
                          {suggestion.suggestedText.length < 15 ? "Too short (<15 chars)" :
                           suggestion.suggestedText.length > 125 ? "Too long (>125 chars)" :
                           "Good length"}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <p>Select items from the left panel and click Generate to get AI suggestions.</p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="border-t p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-sm text-muted-foreground">Was this helpful?</span>
                  <div className="flex gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleFeedback(true)}
                      className="h-8 w-8 p-0"
                    >
                      <ThumbsUp className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleFeedback(false)}
                      className="h-8 w-8 p-0"
                    >
                      <ThumbsDown className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIHelperModalNew;