import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Camera, User, Mail, Phone, Car, Save, Edit } from "lucide-react";
import { useUser } from '@/context/UserContext';
import PhotoUploadModal from './PhotoUploadModal';

const ProfileEditor = () => {
  const { currentUser, updateProfile, isDriver } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || '',
    vehicleInfo: {
      make: currentUser?.vehicleInfo?.make || '',
      model: currentUser?.vehicleInfo?.model || '',
      year: currentUser?.vehicleInfo?.year || new Date().getFullYear(),
      licensePlate: currentUser?.vehicleInfo?.licensePlate || '',
      color: currentUser?.vehicleInfo?.color || ''
    }
  });

  const handleInputChange = (field: string, value: string | number) => {
    if (field.startsWith('vehicle.')) {
      const vehicleField = field.split('.')[1];
      setFormData(prev => ({
        ...prev,
        vehicleInfo: {
          ...prev.vehicleInfo,
          [vehicleField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleSave = () => {
    const updates: any = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone
    };

    if (isDriver) {
      updates.vehicleInfo = formData.vehicleInfo;
    }

    updateProfile(updates);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: currentUser?.name || '',
      email: currentUser?.email || '',
      phone: currentUser?.phone || '',
      vehicleInfo: {
        make: currentUser?.vehicleInfo?.make || '',
        model: currentUser?.vehicleInfo?.model || '',
        year: currentUser?.vehicleInfo?.year || new Date().getFullYear(),
        licensePlate: currentUser?.vehicleInfo?.licensePlate || '',
        color: currentUser?.vehicleInfo?.color || ''
      }
    });
    setIsEditing(false);
  };

  const handlePhotoUpdate = (photo: string) => {
    updateProfile({ profilePhoto: photo });
  };

  return (
    <div className="space-y-6">
      {/* Profile Picture Section */}
      <Card className="bg-white/10 border-white/20">
        <CardContent className="p-6">
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              {currentUser?.profilePhoto ? (
                <img
                  src={currentUser.profilePhoto}
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover border-4 border-orange-500"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-gradient-to-r from-orange-400 to-red-500 flex items-center justify-center text-2xl font-bold text-white">
                  {currentUser?.avatar}
                </div>
              )}
              <button 
                onClick={() => setShowPhotoModal(true)}
                className="absolute -bottom-2 -right-2 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center shadow-lg hover:bg-orange-600 transition-colors"
              >
                <Camera className="h-4 w-4 text-white" />
              </button>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold text-white">{currentUser?.name}</h3>
              <p className="text-white/70 text-sm">
                {isDriver ? 'Driver Account' : 'Rider Account'} • ⭐ {currentUser?.rating}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Personal Information */}
      <Card className="bg-white/10 border-white/20">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-white flex items-center gap-2">
            <User className="h-5 w-5" />
            Personal Information
          </CardTitle>
          {!isEditing && (
            <Button
              onClick={() => setIsEditing(true)}
              variant="outline"
              size="sm"
              className="bg-white/20 border-white/30 text-white hover:bg-white/30"
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
          )}
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-white text-sm font-medium">
                Full Name
              </Label>
              {isEditing ? (
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-orange-500"
                  placeholder="Enter your full name"
                />
              ) : (
                <div className="p-3 bg-white/5 rounded-md text-white">
                  {currentUser?.name || 'Not provided'}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-white text-sm font-medium">
                Email Address
              </Label>
              {isEditing ? (
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-orange-500"
                  placeholder="Enter your email"
                />
              ) : (
                <div className="p-3 bg-white/5 rounded-md text-white flex items-center gap-2">
                  <Mail className="h-4 w-4 text-white/70" />
                  {currentUser?.email || 'Not provided'}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-white text-sm font-medium">
                Phone Number
              </Label>
              {isEditing ? (
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-orange-500"
                  placeholder="Enter your phone number"
                />
              ) : (
                <div className="p-3 bg-white/5 rounded-md text-white flex items-center gap-2">
                  <Phone className="h-4 w-4 text-white/70" />
                  {currentUser?.phone || 'Not provided'}
                </div>
              )}
            </div>
          </div>

          {isEditing && (
            <div className="flex gap-3 pt-4">
              <Button
                onClick={handleSave}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
              <Button
                onClick={handleCancel}
                variant="outline"
                className="flex-1 bg-white/20 border-white/30 text-white hover:bg-white/30"
              >
                Cancel
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Vehicle Information (Driver Only) */}
      {isDriver && (
        <Card className="bg-white/10 border-white/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Car className="h-5 w-5" />
              Vehicle Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="make" className="text-white text-sm font-medium">
                  Make
                </Label>
                {isEditing ? (
                  <Input
                    id="make"
                    value={formData.vehicleInfo.make}
                    onChange={(e) => handleInputChange('vehicle.make', e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-orange-500"
                    placeholder="e.g., Toyota"
                  />
                ) : (
                  <div className="p-3 bg-white/5 rounded-md text-white">
                    {currentUser?.vehicleInfo?.make || 'Not provided'}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="model" className="text-white text-sm font-medium">
                  Model
                </Label>
                {isEditing ? (
                  <Input
                    id="model"
                    value={formData.vehicleInfo.model}
                    onChange={(e) => handleInputChange('vehicle.model', e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-orange-500"
                    placeholder="e.g., Camry"
                  />
                ) : (
                  <div className="p-3 bg-white/5 rounded-md text-white">
                    {currentUser?.vehicleInfo?.model || 'Not provided'}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="year" className="text-white text-sm font-medium">
                  Year
                </Label>
                {isEditing ? (
                  <Input
                    id="year"
                    type="number"
                    value={formData.vehicleInfo.year}
                    onChange={(e) => handleInputChange('vehicle.year', parseInt(e.target.value))}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-orange-500"
                    placeholder="2023"
                  />
                ) : (
                  <div className="p-3 bg-white/5 rounded-md text-white">
                    {currentUser?.vehicleInfo?.year || 'Not provided'}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="color" className="text-white text-sm font-medium">
                  Color
                </Label>
                {isEditing ? (
                  <Input
                    id="color"
                    value={formData.vehicleInfo.color}
                    onChange={(e) => handleInputChange('vehicle.color', e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-orange-500"
                    placeholder="e.g., White"
                  />
                ) : (
                  <div className="p-3 bg-white/5 rounded-md text-white">
                    {currentUser?.vehicleInfo?.color || 'Not provided'}
                  </div>
                )}
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="licensePlate" className="text-white text-sm font-medium">
                  License Plate
                </Label>
                {isEditing ? (
                  <Input
                    id="licensePlate"
                    value={formData.vehicleInfo.licensePlate}
                    onChange={(e) => handleInputChange('vehicle.licensePlate', e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-orange-500"
                    placeholder="e.g., ABC-123"
                  />
                ) : (
                  <div className="p-3 bg-white/5 rounded-md text-white">
                    {currentUser?.vehicleInfo?.licensePlate || 'Not provided'}
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <PhotoUploadModal
        isOpen={showPhotoModal}
        onClose={() => setShowPhotoModal(false)}
        onPhotoUpdate={handlePhotoUpdate}
      />
    </div>
  );
};

export default ProfileEditor;
