import { GlobalNav } from "@/components/GlobalNav";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Calendar, ArrowRight, FileText } from "lucide-react";
import { Link } from "react-router-dom";

const pastScans = [
  {
    id: 1,
    date: "2024-01-15",
    website: "ministry.gov.sg",
    issues: 127,
    status: "completed",
    compliance: 85
  },
  {
    id: 2,
    date: "2024-01-08",
    website: "agency.gov.sg",
    issues: 89,
    status: "completed",
    compliance: 78
  },
  {
    id: 3,
    date: "2024-01-02",
    website: "portal.gov.sg",
    issues: 156,
    status: "completed",
    compliance: 72
  }
];

export default function ReportsHome() {
  return (
    <div className="min-h-screen bg-background">
      <GlobalNav />
      
      <main className="container mx-auto px-20 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-5xl font-heading font-normal text-foreground mb-4">
                Reports
              </h1>
              <p className="text-lg text-muted-foreground">
                Review your accessibility scan history and reports
              </p>
            </div>
            
            <Link to="/">
              <Button size="lg" className="bg-primary hover:bg-primary-hover text-primary-foreground">
                Run New Scan
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>

          <Card className="shadow-oobee">
            <CardHeader>
              <CardTitle className="text-2xl font-heading flex items-center gap-2">
                <FileText className="h-6 w-6" />
                Scan History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Website</TableHead>
                    <TableHead>Issues Found</TableHead>
                    <TableHead>WCAG Compliance</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pastScans.map((scan) => (
                    <TableRow key={scan.id} className="hover:bg-surface">
                      <TableCell className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        {new Date(scan.date).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="font-medium">
                        {scan.website}
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">
                          {scan.issues} issues
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-2 bg-surface rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-primary transition-all"
                              style={{ width: `${scan.compliance}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium">{scan.compliance}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={scan.status === 'completed' ? 'default' : 'secondary'}>
                          {scan.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Link to="/report-details">
                          <Button variant="ghost" size="sm">
                            View Report
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}