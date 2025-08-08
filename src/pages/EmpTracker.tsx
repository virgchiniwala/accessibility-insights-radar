import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { TrendingUp, TrendingDown, Calendar, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

interface SiteData {
  id: string;
  name: string;
  url: string;
  compliance: number;
  trend: number[];
  lastScan: string;
  daysAgo: number;
}

const EmpTracker: React.FC = () => {
  const [focusedChart, setFocusedChart] = useState<string | null>(null);
  const [focusedBar, setFocusedBar] = useState<number>(0);

  const sites: SiteData[] = [
    {
      id: '1',
      name: 'Main Portal',
      url: 'portal.gov.sg',
      compliance: 92,
      trend: [85, 87, 89, 91, 92],
      lastScan: '2024-01-15',
      daysAgo: 3
    },
    {
      id: '2',
      name: 'Services Hub',
      url: 'services.gov.sg',
      compliance: 88,
      trend: [82, 84, 86, 87, 88],
      lastScan: '2024-01-12',
      daysAgo: 6
    },
    {
      id: '3',
      name: 'Info Center',
      url: 'info.gov.sg',
      compliance: 85,
      trend: [80, 82, 83, 84, 85],
      lastScan: '2024-01-10',
      daysAgo: 8
    },
    {
      id: '4',
      name: 'Digital Services',
      url: 'digital.gov.sg',
      compliance: 90,
      trend: [86, 87, 88, 89, 90],
      lastScan: '2024-01-14',
      daysAgo: 4
    }
  ];

  const handleKeyDown = (e: React.KeyboardEvent, siteId: string) => {
    if (focusedChart !== siteId) return;

    const site = sites.find(s => s.id === siteId);
    if (!site) return;

    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault();
        setFocusedBar(Math.max(0, focusedBar - 1));
        break;
      case 'ArrowRight':
        e.preventDefault();
        setFocusedBar(Math.min(site.trend.length - 1, focusedBar + 1));
        break;
      case 'Escape':
        e.preventDefault();
        setFocusedChart(null);
        setFocusedBar(0);
        break;
    }
  };

  const SparkLine: React.FC<{ data: number[]; siteId: string }> = ({ data, siteId }) => {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min || 1;

    return (
      <div className="relative">
        <svg
          width="80"
          height="24"
          className="cursor-pointer"
          tabIndex={0}
          onFocus={() => setFocusedChart(siteId)}
          onKeyDown={(e) => handleKeyDown(e, siteId)}
          role="img"
          aria-label={`Compliance trend for ${sites.find(s => s.id === siteId)?.name}`}
        >
          <g>
            {data.map((value, index) => {
              const x = (index / (data.length - 1)) * 70 + 5;
              const y = 20 - ((value - min) / range) * 16;
              const isFocused = focusedChart === siteId && focusedBar === index;
              
              return (
                <circle
                  key={index}
                  cx={x}
                  cy={y}
                  r={isFocused ? 3 : 2}
                  fill={isFocused ? "#7C3AED" : "#A855F7"}
                  className={isFocused ? "ring-2 ring-purple-300" : ""}
                />
              );
            })}
            <polyline
              points={data.map((value, index) => {
                const x = (index / (data.length - 1)) * 70 + 5;
                const y = 20 - ((value - min) / range) * 16;
                return `${x},${y}`;
              }).join(' ')}
              fill="none"
              stroke="#A855F7"
              strokeWidth="1.5"
            />
          </g>
        </svg>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">EMP Tracker</h1>
          <p className="text-gray-600 mt-1">Multi-site accessibility monitoring dashboard</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" asChild>
            <Link to="/reports">View Reports</Link>
          </Button>
          <Button asChild>
            <Link to="/scan">
              <Calendar className="w-4 h-4 mr-2" />
              Schedule New Scan
            </Link>
          </Button>
        </div>
      </div>

      {/* Multi-Site Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Multi-Site Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sites.map((site) => (
              <div
                key={site.id}
                className="flex items-center justify-between p-4 bg-white rounded-lg border hover:shadow-md transition-shadow"
              >
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{site.name}</h3>
                  <p className="text-sm text-gray-500">{site.url}</p>
                  <div className="flex items-center mt-2 space-x-2">
                    <SparkLine data={site.trend} siteId={site.id} />
                    <div className="flex items-center">
                      {site.trend[site.trend.length - 1] > site.trend[site.trend.length - 2] ? (
                        <TrendingUp className="w-4 h-4 text-green-500" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-red-500" />
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <Badge 
                    variant={site.compliance >= 90 ? "default" : site.compliance >= 80 ? "secondary" : "destructive"}
                    className="text-lg px-3 py-1"
                  >
                    {site.compliance}%
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Engagement Panel */}
      <Card>
        <CardHeader>
          <CardTitle>Engagement Panel</CardTitle>
          <p className="text-sm text-gray-600">Schedule scans and track site activity</p>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Site</TableHead>
                <TableHead>URL</TableHead>
                <TableHead>Last Scan</TableHead>
                <TableHead>Compliance</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sites.map((site) => (
                <TableRow key={site.id}>
                  <TableCell className="font-medium">{site.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">{site.url}</span>
                      <ExternalLink className="w-3 h-3 text-gray-400" />
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-gray-600">
                      Last scan {site.daysAgo} days ago
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={site.compliance >= 90 ? "default" : site.compliance >= 80 ? "secondary" : "destructive"}
                    >
                      {site.compliance}%
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="outline" 
                      size="sm"
                      asChild
                      className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                    >
                      <Link to={`/scan?url=${encodeURIComponent(`https://${site.url}`)}`}>
                        Schedule Scan
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmpTracker;