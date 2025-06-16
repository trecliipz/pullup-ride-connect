
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Car, MapPin, Clock, DollarSign, Phone, MessageCircle, CheckCircle, X } from "lucide-react";
import { useUser } from '@/context/UserContext';
import { RideRequest } from '@/types/user';

const DriverDashboard = () => {
  const { currentUser, pendingRequests, setPendingRequests, setActiveRideRequest } = useUser();
  const [isOnline, setIsOnline] = useState(true);
  const [earnings, setEarnings] = useState(0);

  useEffect(() => {
    // Simulate incoming ride requests
    const interval = setInterval(() => {
      if (Math.random() > 0.8 && pendingRequests.length < 3) {
        const newRequest: RideRequest = {
          id: `req_${Date.now()}`,
          riderId: `rider_${Math.floor(Math.random() * 100)}`,
          pickup: {
            address: '123 Main St, New York, NY',
            coordinates: { lat: 40.7128 + (Math.random() - 0.5) * 0.01, lng: -74.0060 + (Math.random() - 0.5) * 0.01 }
          },
          destination: {
            address: '456 Broadway, New York, NY',
            coordinates: { lat: 40.7180 + (Math.random() - 0.5) * 0.01, lng: -74.0100 + (Math.random() - 0.5) * 0.01 }
          },
          rideType: ['economy', 'comfort', 'xl'][Math.floor(Math.random() * 3)] as any,
          price: Math.floor(Math.random() * 20) + 10,
          status: 'pending',
          requestedAt: new Date(),
          distance: Math.floor(Math.random() * 10) + 2,
          estimatedDuration: Math.floor(Math.random() * 30) + 10
        };
        setPendingRequests([...pendingRequests, newRequest]);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [pendingRequests, setPendingRequests]);

  const acceptRide = (request: RideRequest) => {
    const updatedRequest = { ...request, status: 'accepted' as const, acceptedAt: new Date(), driverId: currentUser?.id };
    setActiveRideRequest(updatedRequest);
    setPendingRequests(pendingRequests.filter(req => req.id !== request.id));
    setEarnings(prev => prev + request.price);
  };

  const declineRide = (requestId: string) => {
    setPendingRequests(pendingRequests.filter(req => req.id !== requestId));
  };

  const toggleOnlineStatus = () => {
    setIsOnline(!isOnline);
  };

  return (
    <div className="space-y-6">
      {/* Driver Status */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center text-white text-2xl font-bold">
                {currentUser?.avatar}
              </div>
              <div>
                <h2 className="text-xl font-bold">{currentUser?.name}</h2>
                <p className="text-gray-600">⭐ {currentUser?.rating} • {currentUser?.vehicleInfo?.make} {currentUser?.vehicleInfo?.model}</p>
              </div>
            </div>
            <div className="text-right">
              <Badge variant={isOnline ? "default" : "secondary"}>
                {isOnline ? "Online" : "Offline"}
              </Badge>
              <Button 
                onClick={toggleOnlineStatus}
                variant={isOnline ? "outline" : "default"}
                className="ml-2"
              >
                {isOnline ? "Go Offline" : "Go Online"}
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">${earnings}</div>
              <div className="text-sm text-gray-600">Today's Earnings</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">12</div>
              <div className="text-sm text-gray-600">Rides Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">8.5</div>
              <div className="text-sm text-gray-600">Hours Online</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pending Ride Requests */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Ride Requests</h3>
        {pendingRequests.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center text-gray-500">
              {isOnline ? "Waiting for ride requests..." : "Go online to receive ride requests"}
            </CardContent>
          </Card>
        ) : (
          pendingRequests.map((request) => (
            <Card key={request.id} className="border-l-4 border-l-orange-500">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="h-4 w-4 text-green-600" />
                      <span className="font-medium">Pickup:</span>
                      <span className="text-sm">{request.pickup.address}</span>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="h-4 w-4 text-red-600" />
                      <span className="font-medium">Destination:</span>
                      <span className="text-sm">{request.destination.address}</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Car className="h-3 w-3" />
                        {request.rideType}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {request.distance} km • {request.estimatedDuration} min
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600 flex items-center">
                      <DollarSign className="h-5 w-5" />
                      {request.price}
                    </div>
                    <div className="text-xs text-gray-500">Estimated fare</div>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <Button 
                    onClick={() => acceptRide(request)}
                    className="flex-1 bg-green-600 hover:bg-green-700"
                  >
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Accept
                  </Button>
                  <Button 
                    onClick={() => declineRide(request.id)}
                    variant="outline"
                    className="flex-1"
                  >
                    <X className="mr-2 h-4 w-4" />
                    Decline
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default DriverDashboard;
