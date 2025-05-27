
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import CameraCapture from '@/components/CameraCapture';
import { PLASTIC_TYPES, PlasticItem, Detection } from '@/types/detection';
import { Save, RotateCcw } from 'lucide-react';

const Capture: React.FC = () => {
  const { user } = useAuth();
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [detectionResult, setDetectionResult] = useState<PlasticItem[] | null>(null);
  const [location, setLocation] = useState<{ latitude: number; longitude: number; address?: string } | null>(null);

  const handleCapture = (imageData: string) => {
    setCapturedImage(imageData);
    getCurrentLocation();
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            address: 'Current Location' // In real app, you'd use reverse geocoding
          });
        },
        (error) => {
          console.error('Error getting location:', error);
          setLocation({
            latitude: 40.7128,
            longitude: -74.0060,
            address: 'Unknown Location'
          });
        }
      );
    }
  };

  const simulateAIAnalysis = (): PlasticItem[] => {
    // Mock AI analysis - in real app, this would call your ML model
    const possibleItems: PlasticItem[] = [
      { type: 'plastic_bottles', count: Math.floor(Math.random() * 5) + 1 },
      { type: 'plastic_bags', count: Math.floor(Math.random() * 8) + 1 },
      { type: 'plastic_containers', count: Math.floor(Math.random() * 3) + 1 },
      { type: 'plastic_straws', count: Math.floor(Math.random() * 10) + 1 },
      { type: 'plastic_cups', count: Math.floor(Math.random() * 4) + 1 },
      { type: 'styrofoam', count: Math.floor(Math.random() * 2) + 1 },
    ];

    // Randomly select 2-4 items to simulate realistic detection
    const numItems = Math.floor(Math.random() * 3) + 2;
    const selectedItems = possibleItems
      .sort(() => 0.5 - Math.random())
      .slice(0, numItems)
      .filter(item => item.count > 0);

    return selectedItems;
  };

  const handleCharacterize = async () => {
    if (!capturedImage) return;

    setIsAnalyzing(true);
    
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const result = simulateAIAnalysis();
    setDetectionResult(result);
    setIsAnalyzing(false);

    toast({
      title: "Analysis Complete!",
      description: `Detected ${result.reduce((sum, item) => sum + item.count, 0)} plastic items`,
    });
  };

  const handleSave = () => {
    if (!detectionResult || !location || !user) return;

    const detection: Detection = {
      id: Date.now().toString(),
      imageUrl: capturedImage!,
      items: detectionResult,
      location,
      date: new Date().toISOString(),
      userId: user.id,
      totalItems: detectionResult.reduce((sum, item) => sum + item.count, 0)
    };

    // Save to localStorage (in real app, this would save to your database)
    const savedDetections = JSON.parse(localStorage.getItem('detections') || '[]');
    savedDetections.push(detection);
    localStorage.setItem('detections', JSON.stringify(savedDetections));

    toast({
      title: "Detection Saved!",
      description: "Your plastic litter detection has been saved to the database.",
    });

    // Reset for new capture
    setCapturedImage(null);
    setDetectionResult(null);
    setLocation(null);
  };

  const handleRetake = () => {
    setCapturedImage(null);
    setDetectionResult(null);
    setLocation(null);
  };

  const totalItems = detectionResult?.reduce((sum, item) => sum + item.count, 0) || 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Plastic Litter Detection
        </h1>
        <p className="text-gray-600">
          Capture an image to analyze and classify plastic litter items
        </p>
      </div>

      <CameraCapture onCapture={handleCapture} />

      {capturedImage && !detectionResult && (
        <div className="text-center">
          <Button 
            onClick={handleCharacterize}
            disabled={isAnalyzing}
            size="lg"
            className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
          >
            {isAnalyzing ? 'Analyzing...' : 'Characterize'}
          </Button>
        </div>
      )}

      {detectionResult && (
        <Card className="bg-gradient-to-br from-green-50 to-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Detection Results
              <Badge variant="secondary" className="text-lg px-3 py-1">
                {totalItems} items found
              </Badge>
            </CardTitle>
            <CardDescription>
              Detected on {new Date().toLocaleDateString()} at {location?.address}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              {detectionResult.map((item) => (
                <div 
                  key={item.type}
                  className="bg-white p-4 rounded-lg border-2 border-green-200 hover:border-green-300 transition-colors"
                >
                  <h3 className="font-semibold text-gray-900">
                    {PLASTIC_TYPES[item.type]}
                  </h3>
                  <p className="text-2xl font-bold text-green-600">
                    {item.count}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex gap-3 justify-center">
              <Button 
                onClick={handleSave}
                className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Detection
              </Button>
              <Button 
                onClick={handleRetake}
                variant="outline"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Retake
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Capture;
