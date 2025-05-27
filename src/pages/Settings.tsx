
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { User, Mail, MapPin, Building, Save, Camera } from 'lucide-react';

const Settings: React.FC = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    department: user?.department || '',
    role: user?.role || 'user'
  });

  const hotspots = ['CDCAS', 'CCSICT', 'CAST', 'CED', 'CFEM'];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    // In a real app, this would update the user data in the database
    toast({
      title: "Settings Updated!",
      description: "Your account settings have been saved successfully.",
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      department: user?.department || '',
      role: user?.role || 'user'
    });
    setIsEditing(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Account Settings</h1>
          <p className="text-gray-600 mt-2">
            Manage your account information and research preferences
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <img 
            src="/lovable-uploads/5019ddbe-68f5-4d79-ac9c-27eab6c26c50.png" 
            alt="Isabela State University"
            className="w-8 h-8 object-contain"
          />
          <span className="text-sm text-gray-600">Isabela State University</span>
        </div>
      </div>

      {/* Profile Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <User className="w-5 h-5" />
            <span>Profile Information</span>
          </CardTitle>
          <CardDescription>
            Update your personal information and research details
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center space-x-4">
            <Avatar className="w-20 h-20">
              <AvatarImage src={user?.avatar} alt={user?.name} />
              <AvatarFallback className="bg-gradient-to-r from-green-500 to-blue-500 text-white text-xl">
                {user?.name?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <Button variant="outline" size="sm">
                <Camera className="w-4 h-4 mr-2" />
                Change Photo
              </Button>
              <p className="text-xs text-gray-500 mt-1">JPG, PNG or GIF. Max size 1MB.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                disabled={!isEditing}
                className={!isEditing ? 'bg-gray-50' : ''}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                disabled={!isEditing}
                className={!isEditing ? 'bg-gray-50' : ''}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="department">Department/College</Label>
              <Input
                id="department"
                value={formData.department}
                onChange={(e) => handleInputChange('department', e.target.value)}
                disabled={!isEditing}
                placeholder="e.g., College of Computing Studies"
                className={!isEditing ? 'bg-gray-50' : ''}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <div className="flex items-center space-x-2">
                <Badge variant={formData.role === 'admin' ? 'default' : 'secondary'}>
                  {formData.role === 'admin' ? 'Administrator' : 'Researcher'}
                </Badge>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            {isEditing ? (
              <>
                <Button variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button onClick={handleSave}>
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </>
            ) : (
              <Button onClick={() => setIsEditing(true)}>
                Edit Profile
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Research Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MapPin className="w-5 h-5" />
            <span>Research Hotspots</span>
          </CardTitle>
          <CardDescription>
            Campus locations for plastic litter characterization study
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {hotspots.map((hotspot) => (
              <div 
                key={hotspot}
                className="p-4 border-2 border-green-200 rounded-lg bg-gradient-to-br from-green-50 to-blue-50 text-center"
              >
                <Building className="w-6 h-6 mx-auto mb-2 text-green-600" />
                <h3 className="font-semibold text-gray-900">{hotspot}</h3>
                <p className="text-xs text-gray-600">Active Zone</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Thesis Information */}
      <Card>
        <CardHeader>
          <CardTitle>Thesis Information</CardTitle>
          <CardDescription>
            Research project details and objectives
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium text-gray-700">Research Title</Label>
              <p className="text-lg font-semibold text-gray-900 mt-1">
                Plastic Litter Characterization
              </p>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-700">Institution</Label>
              <p className="text-gray-900 mt-1">Isabela State University</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-700">Study Area</Label>
              <p className="text-gray-900 mt-1">Campus-wide environmental monitoring and waste characterization</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
