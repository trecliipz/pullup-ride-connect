
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Navigation, MapPin, Flag, Phone, MessageCircle, Home, List, Wallet, User, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import SecurityModal from "@/components/SecurityModal";
import Notification from "@/components/Notification";
import InteractiveMap from "@/components/InteractiveMap";

const Index = () => {
  const [selectedRideType, setSelectedRideType] = useState('economy');
  const [pickup, setPickup] = useState('Current Location');
  const [destination, setDestination] = useState('');
  const [rideStatus, setRideStatus] = useState('waiting');
  const [showDriverInfo, setShowDriverInfo] = useState(false);
  const [eta, setEta] = useState(3);
  const [isLoading, setIsLoading] = useState(false);
  const [showSecurityModal, setShowSecurityModal] = useState(false);
  const [notification, setNotification] = useState('');
  const [activeNav, setActiveNav] = useState(0);
  const [distance, setDistance] = useState(0);
  const [basePrices, setBasePrices] = useState({
    economy: 2.50,
    comfort: 3.50,
    xl: 4.50
  });

  const calculatePrice = (distanceKm: number, rideType: string) => {
    const basePrice = basePrices[rideType as keyof typeof basePrices];
    const pricePerKm = rideType === 'economy' ? 1.2 : rideType === 'comfort' ? 1.8 : 2.2;
    const minimumFare = rideType === 'economy' ? 5.0 : rideType === 'comfort' ? 7.0 : 9.0;
    
    const calculatedPrice = basePrice + (distanceKm * pricePerKm);
    return Math.max(calculatedPrice, minimumFare);
  };

  const rideOptions = [
    {
      type: 'economy',
      name: '🚗 PullUp Economy',
      details: '4 seats • 2 min away',
      price: `$${calculatePrice(distance, 'economy').toFixed(2)}`
    },
    {
      type: 'comfort',
      name: '🚙 PullUp Comfort',
      details: '4 seats • Newer cars • Extra legroom',
      price: `$${calculatePrice(distance, 'comfort').toFixed(2)}`
    },
    {
      type: 'xl',
      name: '🚐 PullUp XL',
      details: '6 seats • SUVs and large cars',
      price: `$${calculatePrice(distance, 'xl').toFixed(2)}`
    }
  ];

  const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(''), 3000);
  };

  const handleDistanceCalculated = (distanceInKm: number) => {
    setDistance(distanceInKm);
  };

  const requestRide = () => {
    if (!destination.trim()) {
      showNotification('Please enter a destination');
      return;
    }

    if (distance === 0) {
      showNotification('Please wait for route calculation');
      return;
    }

    setIsLoading(true);
    setRideStatus('searching');
    
    setTimeout(() => {
      setIsLoading(false);
      findDriver();
    }, 3000);
  };

  const findDriver = () => {
    setRideStatus('found');
    setShowDriverInfo(true);
    showNotification('Driver found! Mike is on the way');
    
    const countdown = setInterval(() => {
      setEta(prev => {
        if (prev <= 1) {
          clearInterval(countdown);
          showNotification('Your driver has arrived!');
          setRideStatus('in-progress');
          return 0;
        }
        return prev - 1;
      });
    }, 60000);
  };

  const scheduleRide = () => {
    showNotification('Schedule ride feature coming soon!');
  };

  const navItems = [
    { icon: Home, label: 'Home', action: () => { setActiveNav(0); showNotification('Home screen active'); } },
    { icon: List, label: 'Activity', action: () => { setActiveNav(1); showNotification('Activity history loaded'); } },
    { icon: Wallet, label: 'Wallet', action: () => { setActiveNav(2); showNotification('Wallet: Current balance $45.60'); } },
    { icon: User, label: 'Account', action: () => { setActiveNav(3); showNotification('Account settings loaded'); } },
    { icon: Shield, label: 'Security', action: () => { setActiveNav(4); setShowSecurityModal(true); } }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-purple-800">
      <div className="flex flex-col lg:flex-row h-screen bg-white lg:rounded-3xl lg:m-5 overflow-hidden shadow-2xl">
        {/* Mobile/Desktop Sidebar */}
        <div className="w-full lg:w-96 bg-gradient-to-b from-slate-700 to-slate-800 text-white flex flex-col">
          {/* Header */}
          <div className="p-6 lg:p-8 bg-white/10 backdrop-blur-lg">
            <div className="flex items-center gap-4 mb-4 lg:mb-6">
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-orange-400 to-red-500 rounded-2xl flex items-center justify-center">
                <Navigation className="h-6 w-6 lg:h-7 lg:w-7 text-white" />
              </div>
              <span className="text-xl lg:text-2xl font-bold">PullUp</span>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center text-lg lg:text-xl font-bold">
                JD
              </div>
              <div>
                <div className="font-bold text-sm lg:text-base">John Doe</div>
                <div className="text-xs lg:text-sm opacity-80">⭐ 4.9 Rating</div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-4 lg:p-8 overflow-y-auto">
            {/* Location Inputs */}
            <div className="space-y-4 mb-6 lg:mb-8">
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-orange-500 h-4 w-4 lg:h-5 lg:w-5" />
                <input
                  type="text"
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                  className="w-full pl-10 lg:pl-12 pr-4 py-3 lg:py-4 bg-white/10 border-2 border-white/20 rounded-2xl text-white placeholder-white/70 focus:outline-none focus:border-orange-500 focus:bg-white/20 transition-all text-sm lg:text-base"
                  placeholder="Pickup location"
                />
              </div>
              <div className="relative">
                <Flag className="absolute left-4 top-1/2 transform -translate-y-1/2 text-orange-500 h-4 w-4 lg:h-5 lg:w-5" />
                <input
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full pl-10 lg:pl-12 pr-4 py-3 lg:py-4 bg-white/10 border-2 border-white/20 rounded-2xl text-white placeholder-white/70 focus:outline-none focus:border-orange-500 focus:bg-white/20 transition-all text-sm lg:text-base"
                  placeholder="Where to?"
                />
              </div>
              {distance > 0 && (
                <div className="text-center text-sm lg:text-base text-white/80">
                  Distance: {distance.toFixed(1)} km
                </div>
              )}
            </div>

            {/* Ride Options */}
            <div className="space-y-3 lg:space-y-4 mb-6 lg:mb-8">
              {rideOptions.map((option) => (
                <div
                  key={option.type}
                  onClick={() => setSelectedRideType(option.type)}
                  className={`p-4 lg:p-5 rounded-2xl cursor-pointer transition-all transform hover:scale-[1.02] hover:bg-white/20 ${
                    selectedRideType === option.type 
                      ? 'bg-orange-500/20 border-2 border-orange-500' 
                      : 'bg-white/10 border-2 border-transparent'
                  }`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <div className="font-bold text-base lg:text-lg">{option.name}</div>
                    <div className="text-lg lg:text-xl font-bold text-orange-500">{option.price}</div>
                  </div>
                  <div className="text-xs lg:text-sm opacity-80">{option.details}</div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 lg:gap-4">
              <Button
                onClick={requestRide}
                className="flex-1 py-3 lg:py-4 bg-gradient-to-r from-orange-400 to-red-500 hover:from-orange-500 hover:to-red-600 text-white font-bold rounded-2xl text-sm lg:text-lg transform hover:scale-[1.02] transition-all"
                disabled={isLoading}
              >
                {isLoading ? 'Finding...' : 'Request PullUp'}
              </Button>
              <Button
                onClick={scheduleRide}
                variant="outline"
                className="flex-1 py-3 lg:py-4 bg-white/20 border-2 border-white/30 text-white font-bold rounded-2xl text-sm lg:text-lg hover:bg-white/30 transform hover:scale-[1.02] transition-all"
              >
                Schedule
              </Button>
            </div>

            {/* Loading */}
            {isLoading && (
              <div className="text-center mt-6">
                <div className="inline-block w-6 h-6 lg:w-8 lg:h-8 border-4 border-white/30 border-t-orange-500 rounded-full animate-spin mb-2"></div>
                <p className="text-sm lg:text-base">Finding your driver...</p>
              </div>
            )}
          </div>
        </div>

        {/* Map Container */}
        <div className="flex-1 relative bg-gradient-to-br from-blue-400 to-blue-600 min-h-[40vh] lg:min-h-auto">
          <InteractiveMap 
            pickup={pickup}
            destination={destination}
            onDistanceCalculated={handleDistanceCalculated}
          />
          
          {/* Driver Info Overlay */}
          {showDriverInfo && (
            <div className="absolute top-4 lg:top-5 right-4 lg:right-5 bg-white rounded-2xl p-4 lg:p-6 shadow-xl min-w-[250px] lg:min-w-[280px] z-10">
              <div className="flex items-center gap-3 lg:gap-4 mb-3 lg:mb-4">
                <div className="w-12 h-12 lg:w-15 lg:h-15 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-lg lg:text-2xl font-bold">
                  MK
                </div>
                <div>
                  <div className="font-bold text-base lg:text-lg">Mike Chen</div>
                  <div className="text-gray-600 text-sm lg:text-base">⭐ 4.95 • Toyota Camry</div>
                  <div className="text-gray-500 text-xs lg:text-sm">License: ABC-123</div>
                </div>
              </div>
              
              <div className="bg-gray-100 rounded-xl p-3 lg:p-4 text-center mb-3 lg:mb-4">
                <div className="text-xl lg:text-2xl font-bold text-slate-800">
                  {eta > 0 ? `${eta} min` : 'Arrived'}
                </div>
                <div className="text-gray-600 text-sm lg:text-base">
                  {eta > 0 ? 'Driver arriving' : 'Driver has arrived'}
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button
                  onClick={() => showNotification('Calling driver...')}
                  variant="outline"
                  className="flex-1 gap-2 text-xs lg:text-sm py-2 lg:py-3"
                >
                  <Phone className="h-3 w-3 lg:h-4 lg:w-4" />
                  Call
                </Button>
                <Button
                  onClick={() => showNotification('Opening chat with driver...')}
                  variant="outline"
                  className="flex-1 gap-2 text-xs lg:text-sm py-2 lg:py-3"
                >
                  <MessageCircle className="h-3 w-3 lg:h-4 lg:w-4" />
                  Message
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Navigation */}
        <div className="absolute bottom-0 left-0 right-0 bg-white p-4 lg:p-5 flex justify-around shadow-lg lg:static lg:shadow-none">
          {navItems.map((item, index) => (
            <div
              key={index}
              onClick={item.action}
              className={`flex flex-col items-center gap-1 cursor-pointer transition-all transform hover:scale-110 ${
                activeNav === index ? 'text-orange-500' : 'text-gray-500'
              }`}
            >
              <item.icon className="h-5 w-5 lg:h-6 lg:w-6" />
              <span className="text-xs lg:text-sm">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Security Modal */}
      <SecurityModal 
        isOpen={showSecurityModal} 
        onClose={() => setShowSecurityModal(false)} 
      />

      {/* Notification */}
      <Notification message={notification} />
    </div>
  );
};

export default Index;
