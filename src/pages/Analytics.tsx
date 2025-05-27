
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, MapPin, BarChart3, PieChart, Calendar, Download } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart as RechartsPieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { Button } from '@/components/ui/button';

const Analytics: React.FC = () => {
  // Mock analytics data
  const detectionTrends = [
    { month: 'Jan', bottles: 1200, bags: 800, containers: 600, straws: 400, total: 3000 },
    { month: 'Feb', bottles: 1400, bags: 900, containers: 700, straws: 500, total: 3500 },
    { month: 'Mar', bottles: 1600, bags: 1000, containers: 800, straws: 600, total: 4000 },
    { month: 'Apr', bottles: 1800, bags: 1100, containers: 900, straws: 700, total: 4500 },
    { month: 'May', bottles: 2000, bags: 1200, containers: 1000, straws: 800, total: 5000 },
    { month: 'Jun', bottles: 2200, bags: 1300, containers: 1100, straws: 900, total: 5500 },
  ];

  const plasticDistribution = [
    { name: 'Plastic Bottles', value: 35, color: '#22c55e' },
    { name: 'Plastic Bags', value: 28, color: '#3b82f6' },
    { name: 'Containers', value: 20, color: '#8b5cf6' },
    { name: 'Straws', value: 10, color: '#f59e0b' },
    { name: 'Cups', value: 7, color: '#ef4444' },
  ];

  const locationHotspots = [
    { location: 'Central Park', detections: 450, efficiency: 85 },
    { location: 'Venice Beach', detections: 380, efficiency: 78 },
    { location: 'Times Square', detections: 320, efficiency: 92 },
    { location: 'Golden Gate Park', detections: 290, efficiency: 88 },
    { location: 'Navy Pier', detections: 250, efficiency: 76 },
  ];

  const weeklyActivity = [
    { day: 'Monday', detections: 120, users: 45 },
    { day: 'Tuesday', detections: 98, users: 38 },
    { day: 'Wednesday', detections: 145, users: 52 },
    { day: 'Thursday', detections: 132, users: 48 },
    { day: 'Friday', detections: 189, users: 67 },
    { day: 'Saturday', detections: 234, users: 89 },
    { day: 'Sunday', detections: 198, users: 72 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Comprehensive insights into plastic litter detection patterns
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Button variant="outline">
            <Calendar className="w-4 h-4 mr-2" />
            Date Range
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total Detections
            </CardTitle>
            <BarChart3 className="w-4 h-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">25,847</div>
            <p className="text-xs text-green-600 mt-1">+18% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Detection Accuracy
            </CardTitle>
            <TrendingUp className="w-4 h-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">94.2%</div>
            <p className="text-xs text-blue-600 mt-1">+2.1% improvement</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Active Locations
            </CardTitle>
            <MapPin className="w-4 h-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">1,234</div>
            <p className="text-xs text-purple-600 mt-1">+45 new this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Avg. Items per Detection
            </CardTitle>
            <PieChart className="w-4 h-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">8.7</div>
            <p className="text-xs text-orange-600 mt-1">-0.3 from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Detection Trends Over Time</CardTitle>
            <CardDescription>
              Monthly plastic litter detection patterns by type
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={detectionTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="bottles" stackId="1" stroke="#22c55e" fill="#22c55e" />
                <Area type="monotone" dataKey="bags" stackId="1" stroke="#3b82f6" fill="#3b82f6" />
                <Area type="monotone" dataKey="containers" stackId="1" stroke="#8b5cf6" fill="#8b5cf6" />
                <Area type="monotone" dataKey="straws" stackId="1" stroke="#f59e0b" fill="#f59e0b" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Plastic Type Distribution</CardTitle>
            <CardDescription>
              Breakdown of detected plastic types globally
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Pie
                  data={plasticDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {plasticDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </RechartsPieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Weekly Activity Pattern</CardTitle>
            <CardDescription>
              Detection activity and user engagement by day of week
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyActivity}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="detections" fill="#22c55e" />
                <Bar dataKey="users" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Detection Hotspots</CardTitle>
            <CardDescription>
              Locations with highest detection activity and efficiency
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {locationHotspots.map((location, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-8 h-8 bg-green-100 rounded-full">
                      <span className="text-sm font-medium text-green-600">#{index + 1}</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{location.location}</p>
                      <p className="text-sm text-gray-600">{location.detections} detections</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className="bg-blue-100 text-blue-800">
                      {location.efficiency}% accuracy
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
