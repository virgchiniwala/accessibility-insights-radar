import { useState } from "react";
import { GlobalNav } from "@/components/GlobalNav";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Sparkles, RefreshCw, ThumbsUp, ThumbsDown, Clock, Image } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const aiSuggestions = [
  {
    image: "hero-banner.jpg",
    originalAlt: "",
    suggestedAlt: "Ministry building with Singapore flag, welcoming citizens to government digital services portal"
  },
  {
    image: "covid-chart.png", 
    originalAlt: "chart",
    suggestedAlt: "Line graph showing COVID-19 vaccination rates in Singapore from Jan to Dec 2023, reaching 95% completion"
  },
  {
    image: "service-icons.svg",
    originalAlt: "",
    suggestedAlt: "Grid of 8 service icons including tax filing, business registration, health records, and education services"
  },
  {
    image: "minister-photo.jpg",
    originalAlt: "minister",
    suggestedAlt: "Minister Jane Tan speaking at podium during digital transformation announcement ceremony"
  },
  {
    image: "singapore-map.png",
    originalAlt: "",
    suggestedAlt: "Interactive map of Singapore highlighting 24 community centers and their operating hours across 5 districts"
  }
];

type ModalState = 'empty' | 'processing' | 'suggestions' | 'accepted';

export default function AIHelperModalNew() {
  const [showModal, setShowModal] = useState(true);
  const [modalState, setModalState] = useState<ModalState>('suggestions');
  const [suggestions, setSuggestions] = useState(aiSuggestions);
  const [feedback, setFeedback] = useState<{[key: string]: 'up' | 'down' | null}>({});
  const { toast } = useToast();

  const handleRegenerate = () => {
    setModalState('processing');
    setTimeout(() => {
      setSuggestions(prev => prev.map(item => ({
        ...item,
        suggestedAlt: item.suggestedAlt + " (regenerated)"
      })));
      setModalState('suggestions');
    }, 2000);
  };

  const handleAcceptAndApply = () => {
    setModalState('accepted');
    toast({
      title: "Alt text applied successfully",
      description: "5 images updated with AI-generated descriptions",
    });
    setTimeout(() => {
      setShowModal(false);
    }, 2000);
  };

  const handleFeedback = (imageIndex: number, type: 'up' | 'down') => {
    setFeedback(prev => ({
      ...prev,
      [imageIndex]: type
    }));
  };

  const updateSuggestion = (index: number, newText: string) => {
    setSuggestions(prev => prev.map((item, i) => 
      i === index ? { ...item, suggestedAlt: newText } : item
    ));
  };

  return (
    <div className="min-h-screen bg-background">
      <GlobalNav />
      
      <main className="container mx-auto px-20 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-5xl font-heading font-normal text-foreground mb-4">
              AI Helper Demo
            </h1>
            <p className="text-lg text-muted-foreground">
              Experience AI-powered alt text generation for accessibility compliance
            </p>
          </div>

          <Card className="shadow-oobee">
            <CardHeader>
              <CardTitle className="text-2xl font-heading flex items-center gap-2">
                <Sparkles className="h-6 w-6 text-primary" />
                AI Alt Text Generator (Beta)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={() => setShowModal(true)}
                className="bg-primary hover:bg-primary-hover text-primary-foreground"
              >
                <Sparkles className="mr-2 h-4 w-4" />
                Auto-Generate Alt Text (Beta)
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* AI Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-heading flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-primary-foreground" />
              </div>
              AI-Suggested Alt Text
            </DialogTitle>
            
            {modalState === 'suggestions' && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                Estimated time saved: 45 min across 15 images
              </div>
            )}
          </DialogHeader>

          <div className="mt-6">
            {modalState === 'empty' && (
              <div className="text-center py-12">
                <Image className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-lg text-muted-foreground">No images found requiring alt text</p>
              </div>
            )}

            {modalState === 'processing' && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4 animate-pulse">
                  <Sparkles className="h-8 w-8 text-primary-foreground" />
                </div>
                <p className="text-lg font-medium">Generating AI suggestions...</p>
                <p className="text-sm text-muted-foreground">Analyzing image content and context</p>
              </div>
            )}

            {modalState === 'suggestions' && (
              <div className="space-y-6">
                {suggestions.map((item, index) => (
                  <Card key={index} className="border border-border">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-16 h-16 bg-surface rounded-lg flex items-center justify-center flex-shrink-0">
                          <Image className="h-8 w-8 text-muted-foreground" />
                        </div>
                        
                        <div className="flex-1 space-y-3">
                          <div>
                            <p className="font-medium text-foreground">{item.image}</p>
                            {item.originalAlt ? (
                              <div className="mt-1">
                                <Badge variant="secondary" className="text-xs">
                                  Current: "{item.originalAlt}"
                                </Badge>
                              </div>
                            ) : (
                              <Badge variant="destructive" className="text-xs mt-1">
                                Missing alt text
                              </Badge>
                            )}
                          </div>
                          
                          <div>
                            <label className="text-sm font-medium text-foreground block mb-2">
                              AI Suggested Alt Text:
                            </label>
                            <Textarea
                              value={item.suggestedAlt}
                              onChange={(e) => updateSuggestion(index, e.target.value)}
                              className="min-h-[80px] resize-none"
                              placeholder="AI-generated alt text will appear here..."
                            />
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-muted-foreground">Was this helpful?</span>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleFeedback(index, 'up')}
                                className={feedback[index] === 'up' ? 'bg-green-100 text-green-700' : ''}
                              >
                                <ThumbsUp className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleFeedback(index, 'down')}
                                className={feedback[index] === 'down' ? 'bg-red-100 text-red-700' : ''}
                              >
                                <ThumbsDown className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {modalState === 'accepted' && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <ThumbsUp className="h-8 w-8 text-green-600" />
                </div>
                <p className="text-lg font-medium text-green-700">Successfully Applied!</p>
                <p className="text-sm text-muted-foreground">Alt text has been added to all images</p>
              </div>
            )}
          </div>

          {modalState === 'suggestions' && (
            <div className="flex items-center justify-between pt-6 border-t">
              <Button
                variant="ghost"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </Button>
              
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  onClick={handleRegenerate}
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Regenerate
                </Button>
                
                <Button
                  onClick={handleAcceptAndApply}
                  className="bg-primary hover:bg-primary-hover text-primary-foreground"
                >
                  Accept & Apply
                </Button>
              </div>
            </div>
          )}

          {modalState === 'processing' && (
            <div className="flex justify-center pt-6 border-t">
              <Button
                variant="ghost"
                onClick={() => setShowModal(false)}
              >
                Enter later
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}