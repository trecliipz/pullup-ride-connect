
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X, Upload, Camera } from "lucide-react";
import { useUser } from '@/context/UserContext';
import { User } from '@/types/user';

interface ProfileEditorProps {
  onClose: () => void;
}

const ProfileEditor = ({ onClose }: ProfileEditorProps) => {
  const { currentUser, updateProfile, isDriver } = useUser();
  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || '',
    avatar: currentUser?.avatar || '',
    vehicleInfo: currentUser?.vehicleInfo || {
      make: '',
      model: '',
      year: new Date().getFullYear(),
      licensePlate: '',
      color: ''
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const updates: Partial<User> = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      avatar: formData.avatar,
    };

    if (isDriver) {
      updates.vehicleInfo = formData.vehicleInfo;
    }

    updateProfile(updates);
    onClose();
  };

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleVehicleChange = (field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      vehicleInfo: {
        ...prev.vehicleInfo,
        [field]: value
      }
    }));
  };

  const handleAvatarUpload = () => {
    // Simulate photo upload - in a real app this would handle file uploads
    const initials = formData.name.split(' ').map(n => n[0]).join('').toUpperCase();
    setFormData(prev => ({
      ...prev,
      avatar: initials
    }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <CardTitle className="text-xl font-bold">Edit Profile</CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Avatar Section */}
            <div className="flex flex-col items-center space-y-4">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-orange-400 to-red-500 flex items-center justify-center text-white text-2xl font-bold">
                {formData.avatar}
              </div>
              <Button
                type="button"
                variant="outline"
                onClick={handleAvatarUpload}
                className="flex items-center gap-2"
              >
                <Camera className="h-4 w-4" />
                Update Photo
              </Button>
            </div>

            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Driver Vehicle Information */}
            {isDriver && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold border-b pb-2">Vehicle Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="make">Make</Label>
                    <Input
                      id="make"
                      value={formData.vehicleInfo.make}
                      onChange={(e) => handleVehicleChange('make', e.target.value)}
                      placeholder="e.g., Toyota"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="model">Model</Label>
                    <Input
                      id="model"
                      value={formData.vehicleInfo.model}
                      onChange={(e) => handleVehicleChange('model', e.target.value)}
                      placeholder="e.g., Camry"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="year">Year</Label>
                    <Input
                      id="year"
                      type="number"
                      value={formData.vehicleInfo.year}
                      onChange={(e) => handleVehicleChange('year', parseInt(e.target.value))}
                      min="2000"
                      max={new Date().getFullYear() + 1}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="licensePlate">License Plate</Label>
                    <Input
                      id="licensePlate"
                      value={formData.vehicleInfo.licensePlate}
                      onChange={(e) => handleVehicleChange('licensePlate', e.target.value)}
                      placeholder="e.g., ABC-123"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="color">Color</Label>
                    <Input
                      id="color"
                      value={formData.vehicleInfo.color}
                      onChange={(e) => handleVehicleChange('color', e.target.value)}
                      placeholder="e.g., White"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-gradient-to-r from-orange-400 to-red-500 hover:from-orange-500 hover:to-red-600"
              >
                Save Changes
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileEditor;
