
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Phone, MessageCircle, Share2, X, CheckCircle, MapPin, Clock } from "lucide-react";
import { useUser } from '@/context/UserContext';

interface RideActionsProps {
  activeRideRequest: any;
  onCancelRide: () => void;
  onCompleteRide: () => void;
  onShareRide: () => void;
  eta: number;
  rideStatus: string;
}

const RideActions: React.FC<RideActionsProps> = ({
  activeRideRequest,
  onCancelRide,
  onCompleteRide,
  onShareRide,
  eta,
  rideStatus
}) => {
  const { availableDrivers, isDriver } = useUser();
  const [showConfirmCancel, setShowConfirmCancel] = useState(false);

  const driver = availableDrivers.find(d => d.id === activeRideRequest?.driverId);

  const handleCancelConfirm = () => {
    onCancelRide();
    setShowConfirmCancel(false);
  };

  return (
    <Card className="bg-white/95 backdrop-blur-sm shadow-xl">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <span className="text-slate-800">
            {isDriver ? 'Current Ride' : 'Your Ride'}
          </span>
          <Badge 
            variant={rideStatus === 'in-progress' ? 'default' : 'secondary'}
            className={rideStatus === 'in-progress' ? 'bg-green-500' : ''}
          >
            {rideStatus === 'found' && 'Driver Found'}
            {rideStatus === 'in-progress' && 'In Progress'}
            {rideStatus === 'completed' && 'Completed'}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Route Information */}
        <div className="space-y-2">
          <div className="flex items-start gap-2">
            <MapPin className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
            <div>
              <div className="font-medium text-slate-800">Pickup</div>
              <div className="text-slate-600 text-sm">{activeRideRequest?.pickup?.address}</div>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <MapPin className="h-4 w-4 text-red-600 mt-1 flex-shrink-0" />
            <div>
              <div className="font-medium text-slate-800">Destination</div>
              <div className="text-slate-600 text-sm">{activeRideRequest?.destination?.address}</div>
            </div>
          </div>
        </div>

        {/* Driver Information (for riders) */}
        {!isDriver && driver && (
          <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center text-white text-lg font-bold">
              {driver.avatar}
            </div>
            <div className="flex-1">
              <div className="font-semibold text-slate-800">{driver.name}</div>
              <div className="text-slate-600 text-sm">
                ⭐ {driver.rating} • {driver.vehicleInfo?.make} {driver.vehicleInfo?.model}
              </div>
              <div className="text-slate-500 text-xs">
                {driver.vehicleInfo?.color} • {driver.vehicleInfo?.licensePlate}
              </div>
            </div>
          </div>
        )}

        {/* ETA Information */}
        {eta > 0 && rideStatus !== 'in-progress' && (
          <div className="flex items-center gap-2 p-3 bg-orange-50 rounded-lg">
            <Clock className="h-5 w-5 text-orange-600" />
            <div>
              <div className="font-semibold text-slate-800">{eta} minutes away</div>
              <div className="text-slate-600 text-sm">
                {isDriver ? 'To pickup location' : 'Driver arriving'}
              </div>
            </div>
          </div>
        )}

        {/* Ride Details */}
        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
          <div>
            <div className="font-bold text-lg text-slate-800">${activeRideRequest?.price?.toFixed(2)}</div>
            <div className="text-slate-600 text-sm">
              {activeRideRequest?.distance?.toFixed(1)} km • {activeRideRequest?.estimatedDuration} min
            </div>
          </div>
          <Badge variant="outline" className="text-slate-600">
            {activeRideRequest?.rideType}
          </Badge>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          {/* Communication Buttons */}
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
            onClick={() => console.log('Calling...')}
          >
            <Phone className="h-4 w-4" />
            Call
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
            onClick={() => console.log('Messaging...')}
          >
            <MessageCircle className="h-4 w-4" />
            Message
          </Button>
        </div>

        {/* Main Action Buttons */}
        <div className="space-y-2">
          {/* Share Ride Button */}
          <Button
            variant="outline"
            className="w-full"
            onClick={onShareRide}
          >
            <Share2 className="h-4 w-4 mr-2" />
            Share Ride
          </Button>

          {/* Complete Ride Button (for drivers or when ride is in progress) */}
          {(isDriver || rideStatus === 'in-progress') && (
            <Button
              className="w-full bg-green-600 hover:bg-green-700"
              onClick={onCompleteRide}
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              {isDriver ? 'Complete Ride' : 'Mark as Complete'}
            </Button>
          )}

          {/* Cancel Ride Button */}
          {!showConfirmCancel ? (
            <Button
              variant="destructive"
              className="w-full"
              onClick={() => setShowConfirmCancel(true)}
            >
              <X className="h-4 w-4 mr-2" />
              Cancel Ride
            </Button>
          ) : (
            <div className="space-y-2 p-3 bg-red-50 rounded-lg">
              <p className="text-sm text-red-800 font-medium">
                Are you sure you want to cancel this ride?
              </p>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowConfirmCancel(false)}
                >
                  Keep Ride
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleCancelConfirm}
                >
                  Cancel Ride
                </Button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RideActions;
