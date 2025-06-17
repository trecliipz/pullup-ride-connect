
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Car, MapPin, Phone, MessageCircle, CheckCircle, XCircle, Home, List, Wallet, User, Shield } from "lucide-react";
import { useUser } from '@/context/UserContext';
import NavigationPages from './NavigationPages';

const DriverDashboard = () => {
  const [activeNav, setActiveNav] = useState('home');
  const { 
    currentUser, 
    pendingRequests, 
    setPendingRequests, 
    setActiveRideRequest, 
    activeRideRequest 
  } = useUser();

  const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'activity', icon: List, label: 'Activity' },
    { id: 'wallet', icon: Wallet, label: 'Wallet' },
    { id: 'account', icon: User, label: 'Account' },
    { id: 'security', icon: Shield, label: 'Security' }
  ];

  const handleNavClick = (navId: string) => {
    setActiveNav(navId);
  };

  const acceptRide = (requestId: string) => {
    const request = pendingRequests.find(req => req.id === requestId);
    if (request) {
      const acceptedRequest = {
        ...request,
        status: 'accepted' as const,
        driverId: currentUser?.id,
        acceptedAt: new Date()
      };
      setActiveRideRequest(acceptedRequest);
      setPendingRequests(prev => prev.filter(req => req.id !== requestId));
    }
  };

  const declineRide = (requestId: string) => {
    setPendingRequests(prev => prev.filter(req => req.id !== requestId));
  };

  if (activeNav !== 'home') {
    return <NavigationPages activePage={activeNav} onNavigateHome={() => setActiveNav('home')} />;
  }

  return (
    <div className="space-y-6">
      {/* Driver Status */}
      <Card className="bg-gradient-to-r from-green-500/20 to-blue-500/20 border-green-500/30">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-white">
            <Car className="h-5 w-5" />
            Driver Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <Badge variant="default" className="bg-green-500 hover:bg-green-600 text-white">
                Online & Available
              </Badge>
              <p className="text-white/80 text-sm mt-2">Ready to accept rides</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-white">$0.00</div>
              <div className="text-white/80 text-sm">Today's Earnings</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Current Ride */}
      {activeRideRequest && (
        <Card className="bg-blue-500/20 border-blue-500/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-white">Current Ride</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-green-400 mt-1 flex-shrink-0" />
                <div>
                  <div className="text-white font-medium">Pickup</div>
                  <div className="text-white/80 text-sm">{activeRideRequest.pickup.address}</div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-red-400 mt-1 flex-shrink-0" />
                <div>
                  <div className="text-white font-medium">Destination</div>
                  <div className="text-white/80 text-sm">{activeRideRequest.destination.address}</div>
                </div>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button size="sm" className="flex-1 bg-green-600 hover:bg-green-700">
                <Phone className="h-4 w-4 mr-2" />
                Call Rider
              </Button>
              <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700">
                <MessageCircle className="h-4 w-4 mr-2" />
                Message
              </Button>
            </div>
            
            <div className="bg-white/10 rounded-lg p-3">
              <div className="text-white font-bold text-lg">${activeRideRequest.price.toFixed(2)}</div>
              <div className="text-white/80 text-sm">{activeRideRequest.distance.toFixed(1)} km • {activeRideRequest.estimatedDuration} min</div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Ride Requests */}
      <div className="space-y-3">
        <h3 className="text-white font-semibold text-lg">Ride Requests</h3>
        {pendingRequests.length === 0 ? (
          <Card className="bg-white/10 border-white/20">
            <CardContent className="text-center py-8">
              <Car className="h-12 w-12 text-white/50 mx-auto mb-4" />
              <p className="text-white/80">No ride requests at the moment</p>
              <p className="text-white/60 text-sm mt-2">Stay online to receive requests</p>
            </CardContent>
          </Card>
        ) : (
          pendingRequests.map((request) => (
            <Card key={request.id} className="bg-white/10 border-white/20">
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 text-green-400 mt-1 flex-shrink-0" />
                        <div>
                          <div className="text-white font-medium">From</div>
                          <div className="text-white/80 text-sm">{request.pickup.address}</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 text-red-400 mt-1 flex-shrink-0" />
                        <div>
                          <div className="text-white font-medium">To</div>
                          <div className="text-white/80 text-sm">{request.destination.address}</div>
                        </div>
                      </div>
                    </div>
                    <div className="text-right ml-4">
                      <div className="text-xl font-bold text-green-400">${request.price.toFixed(2)}</div>
                      <div className="text-white/80 text-sm">{request.distance.toFixed(1)} km</div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      onClick={() => acceptRide(request.id)}
                      className="flex-1 bg-green-600 hover:bg-green-700"
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Accept
                    </Button>
                    <Button 
                      onClick={() => declineRide(request.id)}
                      variant="outline"
                      className="flex-1 border-red-500 text-red-400 hover:bg-red-500/20"
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      Decline
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Navigation Menu */}
      <div className="mt-8">
        <div className="grid grid-cols-5 gap-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`flex flex-col items-center gap-1 p-3 rounded-xl transition-all duration-300 ${
                activeNav === item.id 
                  ? 'bg-orange-500/20 text-orange-400' 
                  : 'text-white/70 hover:bg-white/10 hover:text-white'
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-xs">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DriverDashboard;
