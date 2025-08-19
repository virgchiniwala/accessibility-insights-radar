import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { TrendingUp, TrendingDown, Calendar, Star, Clock, ArrowUpDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface SiteData {
  id: string;
  rank: number;
  name: string;
  domain: string;
  score: number;
  scans: number;
  issuesFixed: number;
  trend: number[];
  badges: ('Top Performer' | 'Fastest Improver' | 'Most Consistent')[];
  lastScan: string;
  daysAgo: number;
}

const EMPTracker: React.FC = () => {
  const [timeframe, setTimeframe] = useState('30d');
  const [highTrafficOnly, setHighTrafficOnly] = useState(true);
  const [sortBy, setSortBy] = useState('score');
  const [sortDesc, setSortDesc] = useState(true);

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortDesc(!sortDesc);
    } else {
      setSortBy(column);
      setSortDesc(true);
    }
  };

  const sites: SiteData[] = [
    {
      id: '1',
      rank: 1,
      name: 'Main Portal',
      domain: 'portal.gov.sg',
      score: 20,
      scans: 12,
      issuesFixed: 8,
      trend: [18, 19, 19, 20],
      badges: ['Top Performer'],
      lastScan: '2024-01-15',
      daysAgo: 3
    },
    {
      id: '2',
      rank: 2,
      name: 'Services Hub',
      domain: 'services.gov.sg',
      score: 19,
      scans: 15,
      issuesFixed: 12,
      trend: [15, 17, 18, 19],
      badges: ['Fastest Improver'],
      lastScan: '2024-01-12',
      daysAgo: 6
    },
    {
      id: '3',
      rank: 3,
      name: 'Info Center',
      domain: 'info.gov.sg',
      score: 18,
      scans: 8,
      issuesFixed: 5,
      trend: [18, 18, 18, 18],
      badges: ['Most Consistent'],
      lastScan: '2024-01-10',
      daysAgo: 8
    },
    {
      id: '4',
      rank: 4,
      name: 'Digital Services',
      domain: 'digital.gov.sg',
      score: 17,
      scans: 6,
      issuesFixed: 3,
      trend: [16, 16, 17, 17],
      badges: [],
      lastScan: '2024-01-14',
      daysAgo: 4
    },
    {
      id: '5',
      rank: 5,
      name: 'Health Portal',
      domain: 'health.gov.sg',
      score: 14,
      scans: 4,
      issuesFixed: 2,
      trend: [12, 13, 14, 14],
      badges: [],
      lastScan: '2023-12-15',
      daysAgo: 65
    }
  ];

  const notEngagingSites = sites.filter(site => site.daysAgo >= 60);

  const SparkLine: React.FC<{ data: number[]; siteId: string }> = ({ data }) => {
    const max = 20;
    const min = 10;
    const range = max - min;

    return (
      <svg width="60" height="20" className="inline-block">
        <polyline
          points={data.map((value, index) => {
            const x = (index / (data.length - 1)) * 50 + 5;
            const y = 18 - ((value - min) / range) * 16;
            return `${x},${y}`;
          }).join(' ')}
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="1.5"
        />
        {data.map((value, index) => {
          const x = (index / (data.length - 1)) * 50 + 5;
          const y = 18 - ((value - min) / range) * 16;
          return (
            <circle
              key={index}
              cx={x}
              cy={y}
              r="2"
              fill="hsl(var(--primary))"
            />
          );
        })}
      </svg>
    );
  };

  const kpis = {
    highTrafficSites: sites.length,
    achievedTarget: sites.filter(s => s.score === 20).length,
    onTrack: sites.filter(s => s.score >= 18).length,
    avgScore: Math.round(sites.reduce((sum, s) => sum + s.score, 0) / sites.length)
  };

  const progressPercent = Math.round((kpis.achievedTarget / kpis.highTrafficSites) * 100);

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-[56px] leading-[64px] font-heading text-foreground">EMP 2030 Tracker</h1>
          <p className="text-lg text-muted-foreground mt-2">
            Public leaderboard for high-traffic government sites (≥1M visits/yr).
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline">Export to WOGAA CSV</Button>
          <Button variant="outline" asChild>
            <Link to="/reports">View Reports</Link>
          </Button>
          <div className="flex items-center gap-2">
            <input 
              type="text" 
              placeholder="Quick scan URL..." 
              className="px-3 py-2 border rounded-lg text-sm w-64"
            />
            <Button>Scan</Button>
          </div>
        </div>
      </div>

      {/* Top KPIs */}
      <div className="grid grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-foreground">{kpis.highTrafficSites}</div>
            <div className="text-sm text-muted-foreground">High-Traffic Sites</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center gap-1">
              <span className="text-2xl font-bold text-foreground">{kpis.achievedTarget}</span>
              <Badge className="bg-pass-green text-white text-xs">20/20</Badge>
            </div>
            <div className="text-sm text-muted-foreground">20/20 Achieved</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-foreground">{kpis.onTrack}</div>
            <div className="text-sm text-muted-foreground">On Track (≥18/20)</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-foreground">{kpis.avgScore}%</div>
            <div className="text-sm text-muted-foreground">Avg Score</div>
          </CardContent>
        </Card>
      </div>

      {/* Goal Progress */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <h3 className="text-xl font-heading">Progress to 100% by Dec 2030</h3>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{progressPercent}% of high-traffic sites are 20/20</span>
              <span>Target: 100%</span>
            </div>
            <div className="w-full bg-surface rounded-full h-4">
              <div 
                className="bg-primary h-4 rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <p className="text-sm text-muted-foreground">
              You must reach 20/20 (all 20 checks passed).
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <div className="flex items-center justify-between p-4 bg-surface rounded-lg">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Label htmlFor="timeframe">Timeframe:</Label>
            <Select value={timeframe} onValueChange={setTimeframe}>
              <SelectTrigger className="w-20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="30d">30d</SelectItem>
                <SelectItem value="90d">90d</SelectItem>
                <SelectItem value="1y">1y</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center gap-2">
            <Switch 
              id="high-traffic" 
              checked={highTrafficOnly} 
              onCheckedChange={setHighTrafficOnly}
            />
            <Label htmlFor="high-traffic">High-traffic only</Label>
          </div>
        </div>
      </div>

      {/* Leaderboard */}
      <Card>
        <CardHeader>
          <CardTitle>Leaderboard</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-b">
                <TableHead className="w-16">#</TableHead>
                <TableHead>
                  <Button 
                    variant="ghost" 
                    onClick={() => handleSort('name')}
                    className="p-0 h-auto font-semibold hover:bg-transparent"
                  >
                    Site <ArrowUpDown className="ml-1 h-3 w-3" />
                  </Button>
                </TableHead>
                <TableHead className="text-center">
                  <Button 
                    variant="ghost" 
                    onClick={() => handleSort('score')}
                    className="p-0 h-auto font-semibold hover:bg-transparent"
                  >
                    Score <ArrowUpDown className="ml-1 h-3 w-3" />
                  </Button>
                </TableHead>
                <TableHead className="text-center">Scans</TableHead>
                <TableHead className="text-center">Issues Fixed</TableHead>
                <TableHead className="text-center">Trend</TableHead>
                <TableHead>Badges</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sites.map((site) => (
                <TableRow key={site.id} className="hover:bg-surface/50">
                  <TableCell className="font-mono">{site.rank}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{site.name}</div>
                      <div className="text-sm text-muted-foreground">{site.domain}</div>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-1">
                      <span className="text-lg font-bold">{site.score}</span>
                      <span className="text-sm text-muted-foreground">/20</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center text-muted-foreground">
                    {site.scans}
                  </TableCell>
                  <TableCell className="text-center text-muted-foreground">
                    {site.issuesFixed}
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-2">
                      <SparkLine data={site.trend} siteId={site.id} />
                      {site.trend[site.trend.length - 1] > site.trend[site.trend.length - 2] ? (
                        <TrendingUp className="h-4 w-4 text-pass-green" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-error-red" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {site.badges.map((badge) => (
                        <Badge key={badge} variant="outline" className="text-xs">
                          {badge === 'Top Performer' && <Star className="h-3 w-3 mr-1" />}
                          {badge}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm" asChild>
                      <Link to="/reports">View Report</Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Engagement Panel */}
      {notEngagingSites.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Not Engaging (no scan in ≥60 days)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {notEngagingSites.map((site) => (
                <div key={site.id} className="flex items-center justify-between p-3 bg-surface rounded-lg">
                  <div>
                    <div className="font-medium">{site.name}</div>
                    <div className="text-sm text-muted-foreground">
                      Last scan {site.daysAgo} days ago
                    </div>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link to={`/?url=${encodeURIComponent(`https://${site.domain}`)}`}>
                      Schedule Scan
                    </Link>
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EMPTracker;