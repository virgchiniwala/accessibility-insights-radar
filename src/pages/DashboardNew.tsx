import { GlobalNav } from "@/components/GlobalNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Calendar, Building, Users, ChartBar } from "lucide-react";

export default function DashboardNew() {
  return (
    <div className="min-h-screen bg-background">
      <GlobalNav />
      
      <main className="container mx-auto px-20 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-5xl font-heading font-normal text-foreground mb-4">
              Agency Dashboard
            </h1>
            <p className="text-lg text-muted-foreground">
              Comprehensive accessibility insights for your organization
            </p>
          </div>

          {/* Coming Soon Card */}
          <Card className="shadow-oobee bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
            <CardContent className="p-12 text-center">
              <div className="w-16 h-16 bg-purple-200 rounded-lg flex items-center justify-center mx-auto mb-6">
                <ChartBar className="h-8 w-8 text-purple-700" />
              </div>
              
              <Badge className="mb-4 bg-purple-100 text-purple-800 border-purple-300">
                Coming Q4 2025
              </Badge>
              
              <h2 className="text-3xl font-heading text-purple-900 mb-4">
                WOGAA Agency Dashboard
              </h2>
              
              <p className="text-lg text-purple-700 mb-8 max-w-2xl mx-auto">
                Get comprehensive accessibility insights across all your government websites. 
                Monitor compliance trends, track improvements, and coordinate accessibility efforts 
                across your entire digital portfolio.
              </p>

              {/* Features Preview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <Building className="h-8 w-8 text-purple-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-purple-900 mb-2">Multi-Site Overview</h3>
                  <p className="text-sm text-purple-700">
                    Monitor accessibility across all agency websites from a single dashboard
                  </p>
                </div>
                
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <Users className="h-8 w-8 text-purple-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-purple-900 mb-2">Team Coordination</h3>
                  <p className="text-sm text-purple-700">
                    Assign issues, track progress, and collaborate on accessibility improvements
                  </p>
                </div>
                
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <ChartBar className="h-8 w-8 text-purple-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-purple-900 mb-2">Advanced Analytics</h3>
                  <p className="text-sm text-purple-700">
                    Detailed compliance reports and trend analysis for executive reporting
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-center gap-4">
                <Button 
                  size="lg" 
                  className="bg-primary hover:bg-primary-hover text-primary-foreground"
                  disabled
                >
                  <Calendar className="mr-2 h-5 w-5" />
                  Notify me when available
                </Button>
                
                <Button 
                  variant="ghost" 
                  size="lg" 
                  className="text-purple-700 hover:text-purple-900"
                >
                  <ExternalLink className="mr-2 h-5 w-5" />
                  Learn more about WOGAA
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Current Features */}
          <div className="mt-12">
            <h3 className="text-2xl font-heading text-foreground mb-6">
              Available Now
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="shadow-oobee">
                <CardHeader>
                  <CardTitle className="text-xl font-heading">Individual Site Reports</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Detailed accessibility analysis for individual government websites
                  </p>
                  <Button variant="outline" className="w-full">
                    Run New Scan
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="shadow-oobee">
                <CardHeader>
                  <CardTitle className="text-xl font-heading">Issue Tracking</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Track and manage accessibility issues with detailed remediation guides
                  </p>
                  <Button variant="outline" className="w-full">
                    View Recent Issues
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}