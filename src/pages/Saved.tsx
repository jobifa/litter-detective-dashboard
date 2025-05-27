
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Save, MapPin, Calendar, Download, Share } from 'lucide-react';
import { Detection, PLASTIC_TYPES } from '@/types/detection';

const Saved: React.FC = () => {
  const { user } = useAuth();

  // Get saved detections from localStorage
  const savedDetections: Detection[] = JSON.parse(localStorage.getItem('detections') || '[]');
  const userDetections = savedDetections.filter(detection => detection.userId === user?.id);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(userDetections, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'plastic-litter-detections.json';
    link.click();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Saved Detections</h1>
          <p className="text-gray-600 mt-2">
            Manage and review your saved plastic litter detections
          </p>
        </div>
        {userDetections.length > 0 && (
          <div className="flex gap-2">
            <Button onClick={handleExport} variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export Data
            </Button>
            <Button variant="outline">
              <Share className="w-4 h-4 mr-2" />
              Share Report
            </Button>
          </div>
        )}
      </div>

      {userDetections.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Save className="w-16 h-16 text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Saved Detections</h3>
            <p className="text-gray-500 text-center mb-4">
              Your saved plastic litter detections will appear here.
            </p>
            <Button className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600">
              Start Detecting
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userDetections.map((detection) => (
            <Card key={detection.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{detection.totalItems} Items Detected</CardTitle>
                    <CardDescription className="flex items-center mt-1">
                      <Calendar className="w-4 h-4 mr-1" />
                      {formatDate(detection.date)}
                    </CardDescription>
                  </div>
                  <Badge className="bg-green-100 text-green-800">
                    Saved
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                  <img 
                    src={detection.imageUrl} 
                    alt="Detection"
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div>
                  <h4 className="font-medium text-sm text-gray-700 mb-2">Detected Items:</h4>
                  <div className="flex flex-wrap gap-1">
                    {detection.items.map((item, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {item.count} {PLASTIC_TYPES[item.type]}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex items-center text-sm text-gray-500">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span className="truncate">{detection.location.address || 'Unknown Location'}</span>
                </div>

                <div className="flex gap-2">
                  <Button size="sm" className="flex-1">
                    View Details
                  </Button>
                  <Button size="sm" variant="outline">
                    <Share className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Saved;
