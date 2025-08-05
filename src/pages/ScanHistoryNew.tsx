import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Badge } from '../components/ui/badge';
import { ArrowUp, ArrowDown, Calendar, Globe, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

export function ScanHistoryNew() {
  const [scanA, setScanA] = useState('');
  const [scanB, setScanB] = useState('');

  const scans = [
    { id: 'scan-1', date: '2024-01-15', url: 'gov.sg', score: 85 },
    { id: 'scan-2', date: '2024-01-08', url: 'gov.sg', score: 78 },
    { id: 'scan-3', date: '2024-01-01', url: 'gov.sg', score: 72 },
    { id: 'scan-4', date: '2023-12-25', url: 'gov.sg', score: 69 },
  ];

  const comparisonData = scanA && scanB ? {
    scoreChange: 85 - 78,
    issuesFixed: 12,
    newIssues: 3,
    pagesScanned: { before: 45, after: 48 }
  } : null;

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 font-serif">Scan History</h1>
            <p className="text-gray-600 mt-1">Compare accessibility scans over time</p>
          </div>
          <Button className="bg-purple-600 hover:bg-purple-700">
            <Calendar className="w-4 h-4 mr-2" />
            Schedule Scan
          </Button>
        </div>

        {/* Comparison Controls */}
        <Card>
          <CardHeader>
            <CardTitle className="font-serif">Compare Scans</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Scan A (Baseline)
                </label>
                <Select value={scanA} onValueChange={setScanA}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select baseline scan" />
                  </SelectTrigger>
                  <SelectContent>
                    {scans.map((scan) => (
                      <SelectItem key={scan.id} value={scan.id}>
                        {scan.date} - {scan.url} (Score: {scan.score})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Scan B (Comparison)
                </label>
                <Select value={scanB} onValueChange={setScanB}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select comparison scan" />
                  </SelectTrigger>
                  <SelectContent>
                    {scans.map((scan) => (
                      <SelectItem key={scan.id} value={scan.id}>
                        {scan.date} - {scan.url} (Score: {scan.score})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Comparison Results */}
            {comparisonData ? (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="border-green-200 bg-green-50">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-green-600 font-medium">Score Change</p>
                        <p className="text-2xl font-bold text-green-700">
                          {comparisonData.scoreChange > 0 ? '+' : ''}{comparisonData.scoreChange}
                        </p>
                      </div>
                      <ArrowUp className="w-8 h-8 text-green-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-blue-200 bg-blue-50">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-blue-600 font-medium">Issues Fixed</p>
                        <p className="text-2xl font-bold text-blue-700">{comparisonData.issuesFixed}</p>
                      </div>
                      <CheckCircle className="w-8 h-8 text-blue-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-orange-200 bg-orange-50">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-orange-600 font-medium">New Issues</p>
                        <p className="text-2xl font-bold text-orange-700">{comparisonData.newIssues}</p>
                      </div>
                      <AlertTriangle className="w-8 h-8 text-orange-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-purple-200 bg-purple-50">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-purple-600 font-medium">Pages Scanned</p>
                        <p className="text-2xl font-bold text-purple-700">
                          {comparisonData.pagesScanned.before} → {comparisonData.pagesScanned.after}
                        </p>
                      </div>
                      <Globe className="w-8 h-8 text-purple-600" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Clock className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <p>Select two scans to compare results</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Scan Timeline */}
        <Card>
          <CardHeader>
            <CardTitle className="font-serif">Scan Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {scans.map((scan, index) => (
                <div key={scan.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <Globe className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-medium">{scan.url}</p>
                      <p className="text-sm text-gray-500">{scan.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Badge variant={scan.score >= 80 ? 'default' : 'secondary'}>
                      Score: {scan.score}
                    </Badge>
                    {index > 0 && (
                      <div className="flex items-center text-sm">
                        {scan.score > scans[index - 1].score ? (
                          <ArrowUp className="w-4 h-4 text-green-600 mr-1" />
                        ) : (
                          <ArrowDown className="w-4 h-4 text-red-600 mr-1" />
                        )}
                        <span className={scan.score > scans[index - 1].score ? 'text-green-600' : 'text-red-600'}>
                          {Math.abs(scan.score - scans[index - 1].score)}
                        </span>
                      </div>
                    )}
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="text-center">
          <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
            Rescan Now
          </Button>
        </div>
      </div>
    </Layout>
  );
}

export default ScanHistoryNew