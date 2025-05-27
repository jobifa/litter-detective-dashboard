
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Camera, Calendar, Save, Database } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  // Mock data for charts
  const weeklyData = [
    { day: 'Mon', detections: 12 },
    { day: 'Tue', detections: 8 },
    { day: 'Wed', detections: 15 },
    { day: 'Thu', detections: 10 },
    { day: 'Fri', detections: 18 },
    { day: 'Sat', detections: 22 },
    { day: 'Sun', detections: 14 },
  ];

  const plasticTypes = [
    { name: 'Bottles', value: 35, color: '#22c55e' },
    { name: 'Bags', value: 28, color: '#3b82f6' },
    { name: 'Containers', value: 20, color: '#8b5cf6' },
    { name: 'Straws', value: 10, color: '#f59e0b' },
    { name: 'Cups', value: 7, color: '#ef4444' },
  ];

  const stats = [
    { title: 'Total Detections', value: '156', icon: Camera, change: '+12%' },
    { title: 'This Week', value: '23', icon: Calendar, change: '+8%' },
    { title: 'Saved Items', value: '89', icon: Save, change: '+15%' },
    { title: 'Database Entries', value: '142', icon: Database, change: '+5%' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-gray-600 mt-2">
            Here's your plastic litter detection overview
          </p>
        </div>
        <Link to="/capture">
          <Button className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600">
            <Camera className="w-4 h-4 mr-2" />
            New Detection
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="bg-gradient-to-br from-white to-gray-50 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
              <stat.icon className="w-4 h-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <p className="text-xs text-green-600 mt-1">
                {stat.change} from last week
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Weekly Detection Activity</CardTitle>
            <CardDescription>
              Number of plastic litter detections per day this week
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="detections" fill="url(#barGradient)" />
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.8}/>
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Plastic Types Distribution</CardTitle>
            <CardDescription>
              Breakdown of detected plastic litter types
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={plasticTypes}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {plasticTypes.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Detections</CardTitle>
          <CardDescription>
            Your latest plastic litter detection activities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { location: 'Central Park, NYC', items: '5 bottles, 3 bags', time: '2 hours ago', status: 'Saved' },
              { location: 'Beach Boardwalk', items: '8 straws, 2 containers', time: '5 hours ago', status: 'Saved' },
              { location: 'Downtown Street', items: '12 cups, 1 styrofoam', time: '1 day ago', status: 'Saved' },
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{activity.location}</p>
                  <p className="text-sm text-gray-600">{activity.items}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">{activity.time}</p>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {activity.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
