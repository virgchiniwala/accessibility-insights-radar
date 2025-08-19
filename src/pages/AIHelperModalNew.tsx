import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { X, Copy, RefreshCw, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';

const AIHelperModalNew: React.FC = () => {
  const [selectedImages, setSelectedImages] = useState<number[]>([1, 2]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [filter, setFilter] = useState<"all" | "missing" | "vague">("all");

  const mockImages = [
    {
      id: 1,
      filename: "hero-banner.jpg",
      thumbnail: "/api/placeholder/200/150",
      status: "missing" as const,
      currentAlt: "",
      suggestedAlt: "Students collaborating in modern library space with laptops and books"
    },
    {
      id: 2,
      filename: "product-1.jpg", 
      thumbnail: "/api/placeholder/200/150",
      status: "missing" as const,
      currentAlt: "",
      suggestedAlt: "Wireless headphones in matte black finish on white background"
    },
    {
      id: 3,
      filename: "team-photo.jpg",
      thumbnail: "/api/placeholder/200/150", 
      status: "vague" as const,
      currentAlt: "Team",
      suggestedAlt: "Five diverse professionals in business attire standing together in modern office"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">✨ AI-Suggested Alt Text</h1>
              <p className="text-sm text-gray-600 mt-1">
                AI analysed {mockImages.length} images — est. time saved ≈ {mockImages.length * 3} min
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Button 
                variant="default"
                size="sm"
                disabled={selectedImages.length === 0}
              >
                Apply Selected ({selectedImages.length})
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/issue-detail">
                  <X className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
          {/* Left Panel - Image List */}
          <div className="lg:col-span-1 bg-white rounded-lg shadow-sm border overflow-hidden">
            <div className="p-4 border-b">
              <h2 className="font-medium text-gray-900 mb-3">Images ({mockImages.length})</h2>
              <div className="flex space-x-2">
                <Button
                  variant={filter === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter("all")}
                  className="h-7 text-xs"
                >
                  All
                </Button>
                <Button
                  variant={filter === "missing" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter("missing")}
                  className="h-7 text-xs"
                >
                  Missing
                </Button>
                <Button
                  variant={filter === "vague" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter("vague")}
                  className="h-7 text-xs"
                >
                  Vague
                </Button>
              </div>
            </div>
            <div className="overflow-y-auto max-h-[600px]">
              {mockImages
                .filter(img => filter === "all" || img.status === filter)
                .map((image, index) => (
                <div
                  key={image.id}
                  className={`p-3 border-b cursor-pointer hover:bg-gray-50 ${
                    selectedImageIndex === index ? 'bg-purple-50 border-l-2 border-l-purple-500' : ''
                  }`}
                  onClick={() => setSelectedImageIndex(index)}
                >
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      checked={selectedImages.includes(image.id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedImages([...selectedImages, image.id]);
                        } else {
                          setSelectedImages(selectedImages.filter(id => id !== image.id));
                        }
                      }}
                      onClick={(e) => e.stopPropagation()}
                    />
                    <img src={image.thumbnail} alt="" className="w-10 h-10 rounded border object-cover" />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-gray-900 truncate">{image.filename}</div>
                      <Badge 
                        variant="outline" 
                        className={`text-xs mt-1 ${
                          image.status === 'missing' ? 'border-red-200 text-red-700 bg-red-50' :
                          image.status === 'vague' ? 'border-yellow-200 text-yellow-700 bg-yellow-50' :
                          'border-green-200 text-green-700 bg-green-50'
                        }`}
                      >
                        {image.status === 'missing' ? 'Missing' : image.status === 'vague' ? 'Vague' : 'OK'}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Panel - Image Editor */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border">
            {mockImages[selectedImageIndex] && (
              <div className="p-6">
                <div className="space-y-6">
                  {/* Image Preview */}
                  <div className="text-center">
                    <img 
                      src={mockImages[selectedImageIndex].thumbnail} 
                      alt="" 
                      className="mx-auto max-w-sm max-h-48 rounded-lg border object-cover"
                    />
                    <p className="text-sm text-gray-600 mt-2">{mockImages[selectedImageIndex].filename}</p>
                  </div>

                  {/* Current Alt Text */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current alt text
                    </label>
                    <div className="p-3 bg-gray-50 rounded border text-sm text-gray-600">
                      {mockImages[selectedImageIndex].currentAlt || "(missing)"}
                    </div>
                  </div>

                  {/* AI Suggested Alt Text */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      AI suggested alt text
                    </label>
                    <textarea
                      className="w-full p-3 border rounded-lg resize-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      rows={3}
                      value={mockImages[selectedImageIndex].suggestedAlt}
                      onChange={(e) => {
                        // Update suggested alt text logic would go here
                      }}
                      placeholder="Enter descriptive alt text..."
                    />
                  </div>

                  {/* Guidelines */}
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h3 className="text-sm font-medium text-blue-900 mb-2">Guidelines</h3>
                    <ul className="text-xs text-blue-800 space-y-1">
                      <li>• Describe what's important about the image</li>
                      <li>• Keep it concise (under 125 characters)</li>
                      <li>• Don't start with "Image of" or "Picture of"</li>
                      <li>• Include context relevant to the page content</li>
                    </ul>
                  </div>

                  {/* Refine Chips */}
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Refine suggestions</p>
                    <div className="flex flex-wrap gap-2">
                      <Button variant="outline" size="sm" className="h-7 text-xs">
                        More descriptive
                      </Button>
                      <Button variant="outline" size="sm" className="h-7 text-xs">
                        Shorter
                      </Button>
                      <Button variant="outline" size="sm" className="h-7 text-xs">
                        Focus on action
                      </Button>
                      <Button variant="outline" size="sm" className="h-7 text-xs">
                        Include emotion
                      </Button>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3 pt-4 border-t">
                    <Button variant="outline" size="sm">
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Regenerate
                    </Button>
                    <Button variant="default" size="sm">
                      Apply to Image
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIHelperModalNew;