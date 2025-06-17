import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Navigation, MapPin, Flag, Phone, MessageCircle, Home, List, Wallet, User, Shield, Car, Send, X, Calendar, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Notification from "@/components/Notification";
import EnhancedInteractiveMap from "@/components/EnhancedInteractiveMap";
import DriverDashboard from "@/components/DriverDashboard";
import NavigationPages from "@/components/NavigationPages";
import RideRating from "@/components/RideRating";
import { useUser } from '@/context/UserContext';
import { RideRequest } from '@/types/user';
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Index = () => {
  const [selectedRideType, setSelectedRideType] = useState('economy');
  const [pickup, setPickup] = useState('Current Location');
  const [destination, setDestination] = useState('');
  const [rideStatus, setRideStatus] = useState('waiting');
  const [showDriverInfo, setShowDriverInfo] = useState(false);
  const [eta, setEta] = useState(3);
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState('');
  const [activeNav, setActiveNav] = useState('home');
  const [distance, setDistance] = useState(0);
  const [showRating, setShowRating] = useState(false);
  const [showMessaging, setShowMessaging] = useState(false);
  const [messages, setMessages] = useState<Array<{id: string, text: string, sender: 'rider' | 'driver', timestamp: Date}>>([]);
  const [newMessage, setNewMessage] = useState('');
  const [basePrices] = useState({
    economy: 2.50,
    comfort: 3.50,
    xl: 4.50
  });
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');

  const { 
    currentUser, 
    isDriver, 
    activeRideRequest, 
    setActiveRideRequest, 
    pendingRequests, 
    setPendingRequests,
    availableDrivers,
    rideHistory,
    setRideHistory
  } = useUser();

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
      showNotification('Please enter a destination first');
      return;
    }
    if (distance === 0) {
      showNotification('Please wait for route calculation');
      return;
    }

    const nearbyDrivers = availableDrivers.filter(driver => 
      driver.isAvailable && 
      driver.currentLocation &&
      currentUser?.currentLocation &&
      calculateDistance(
        driver.currentLocation,
        currentUser.currentLocation
      ) < 5
    );

    if (nearbyDrivers.length === 0) {
      showNotification('No drivers available nearby. Please try again later.');
      return;
    }

    setIsLoading(true);
    setRideStatus('searching');
    
    const newRequest: RideRequest = {
      id: `req_${Date.now()}`,
      riderId: currentUser?.id || '',
      pickup: {
        address: pickup,
        coordinates: currentUser?.currentLocation || { lat: 40.7128, lng: -74.0060 }
      },
      destination: {
        address: destination,
        coordinates: { lat: 40.7180, lng: -74.0100 }
      },
      rideType: selectedRideType as 'economy' | 'comfort' | 'xl',
      price: calculatePrice(distance, selectedRideType),
      status: 'pending',
      requestedAt: new Date(),
      distance: distance,
      estimatedDuration: Math.floor(distance * 2) + 10
    };

    setPendingRequests(prev => [...prev, newRequest]);
    
    setTimeout(() => {
      setIsLoading(false);
      findDriver(newRequest);
    }, 3000);
  };

  const findDriver = (request: RideRequest) => {
    const acceptingDriver = availableDrivers.find(d => d.isAvailable);
    if (acceptingDriver) {
      const acceptedRequest = {
        ...request,
        status: 'accepted' as const,
        driverId: acceptingDriver.id,
        acceptedAt: new Date()
      };
      
      setActiveRideRequest(acceptedRequest);
      setRideStatus('found');
      setShowDriverInfo(true);
      showNotification(`Driver found! ${acceptingDriver.name} is on the way`);
      
      setPendingRequests(prev => prev.filter(req => req.id !== request.id));
      
      const countdown = setInterval(() => {
        setEta(prev => {
          if (prev <= 1) {
            clearInterval(countdown);
            showNotification('Your driver has arrived!');
            setRideStatus('in-progress');
            
            // Simulate ride completion after 30 seconds
            setTimeout(() => {
              setRideStatus('completed');
              setShowDriverInfo(false);
              setShowRating(true);
            }, 30000);
            
            return 0;
          }
          return prev - 1;
        });
      }, 60000);
    }
  };

  const calculateDistance = (point1: { lat: number; lng: number }, point2: { lat: number; lng: number }) => {
    const R = 6371;
    const dLat = (point2.lat - point1.lat) * Math.PI / 180;
    const dLon = (point2.lng - point1.lng) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(point1.lat * Math.PI / 180) * Math.cos(point2.lat * Math.PI / 180) *
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const scheduleRide = () => {
    if (!destination.trim()) {
      showNotification('Please enter a destination first');
      return;
    }
    setShowScheduleModal(true);
  };

  const handleScheduleConfirm = () => {
    if (!scheduledDate || !scheduledTime) {
      showNotification('Please select both date and time');
      return;
    }
    
    const scheduledDateTime = new Date(`${scheduledDate}T${scheduledTime}`);
    const now = new Date();
    
    if (scheduledDateTime <= now) {
      showNotification('Please select a future date and time');
      return;
    }
    
    showNotification(`Ride scheduled for ${scheduledDateTime.toLocaleString()}`);
    setShowScheduleModal(false);
    setScheduledDate('');
    setScheduledTime('');
  };

  const handleRatingSubmit = (rating: number, feedback: string) => {
    if (activeRideRequest) {
      const completedRide = {
        ...activeRideRequest,
        status: 'completed' as const,
        rating,
        feedback,
        completedAt: new Date()
      };
      
      setRideHistory(prev => [completedRide, ...prev]);
      showNotification('Thank you for your feedback!');
    }
    
    setShowRating(false);
    setActiveRideRequest(null);
    setRideStatus('waiting');
    setDestination('');
  };

  const sendMessage = () => {
    if (!newMessage.trim() || !activeRideRequest) return;
    
    const message = {
      id: Date.now().toString(),
      text: newMessage.trim(),
      sender: 'rider' as const,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, message]);
    setNewMessage('');
    
    // Simulate driver response
    setTimeout(() => {
      const driverResponse = {
        id: (Date.now() + 1).toString(),
        text: "Got it! I'll be there soon.",
        sender: 'driver' as const,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, driverResponse]);
    }, 2000);
  };

  const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'activity', icon: List, label: 'Activity' },
    { id: 'wallet', icon: Wallet, label: 'Wallet' },
    { id: 'account', icon: User, label: 'Account' },
    { id: 'security', icon: Shield, label: 'Security' }
  ];

  const handleNavClick = (navId: string) => {
    setActiveNav(navId);
    if (navId === 'home') {
      showNotification('Home screen active');
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'E' && event.ctrlKey) {
        showNotification('🚨 Emergency services contacted!');
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const renderMainContent = () => {
    if (isDriver) {
      return <DriverDashboard />;
    }

    if (activeNav !== 'home') {
      return <NavigationPages activePage={activeNav} onNavigateHome={() => setActiveNav('home')} />;
    }

    return (
      <>
        {/* Location Section */}
        <div className="location-section mb-6 lg:mb-8">
          <div className="location-input relative mb-3 lg:mb-[15px]">
            <MapPin className="absolute left-3 lg:left-[15px] top-1/2 transform -translate-y-1/2 text-orange-500 h-4 w-4 lg:h-5 lg:w-5" />
            <input
              type="text"
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              className="w-full pl-10 lg:pl-12 pr-4 py-3 lg:py-[15px] border-2 border-white/20 rounded-2xl bg-white/10 text-white placeholder-white/70 focus:outline-none focus:border-orange-500 focus:bg-white/20 transition-all duration-300 text-sm lg:text-base"
              placeholder="Pickup location"
            />
          </div>
          <div className="location-input relative mb-3 lg:mb-[15px]">
            <Flag className="absolute left-3 lg:left-[15px] top-1/2 transform -translate-y-1/2 text-orange-500 h-4 w-4 lg:h-5 lg:w-5" />
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full pl-10 lg:pl-12 pr-4 py-3 lg:py-[15px] border-2 border-white/20 rounded-2xl bg-white/10 text-white placeholder-white/70 focus:outline-none focus:border-orange-500 focus:bg-white/20 transition-all duration-300 text-sm lg:text-base"
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
        <div className="ride-options grid gap-3 lg:gap-[15px] mb-6 lg:mb-8">
          {rideOptions.map((option) => (
            <div
              key={option.type}
              onClick={() => setSelectedRideType(option.type)}
              className={`ride-option bg-white/10 backdrop-blur-lg rounded-2xl p-4 lg:p-5 cursor-pointer transition-all duration-300 border-2 hover:bg-white/20 hover:transform hover:-translate-y-0.5 ${
                selectedRideType === option.type 
                  ? 'border-orange-500 bg-orange-500/20' 
                  : 'border-transparent'
              }`}
            >
              <div className="ride-option-header flex justify-between items-center mb-2">
                <div>
                  <div className="ride-type font-bold text-base lg:text-lg">{option.name}</div>
                  <div className="ride-details text-xs lg:text-sm opacity-80">{option.details}</div>
                </div>
                <div className="ride-price text-lg lg:text-xl font-bold text-orange-500">{option.price}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="action-buttons flex gap-3 lg:gap-[15px] mt-4 lg:mt-5 mb-6">
          <Button
            onClick={requestRide}
            className="btn btn-primary flex-1 py-3 lg:py-[15px] bg-gradient-to-r from-orange-400 to-red-500 hover:from-orange-500 hover:to-red-600 text-white font-bold rounded-2xl text-sm lg:text-base uppercase tracking-wider hover:transform hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300"
            disabled={isLoading || !destination.trim()}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Finding Driver...
              </div>
            ) : (
              'Request PullUp'
            )}
          </Button>
          <Button
            onClick={scheduleRide}
            className="btn btn-secondary flex-1 py-3 lg:py-[15px] bg-white/20 border-2 border-white/30 text-white font-bold rounded-2xl text-sm lg:text-base uppercase tracking-wider hover:bg-white/30 hover:transform hover:-translate-y-0.5 transition-all duration-300"
            disabled={!destination.trim()}
          >
            <Calendar className="h-4 w-4 mr-2" />
            Schedule
          </Button>
        </div>

        {/* Navigation Menu */}
        <div className="mt-6 lg:mt-8">
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

        {/* Loading */}
        {isLoading && (
          <div className="loading text-center mt-4 lg:mt-5">
            <div className="spinner inline-block w-8 h-8 lg:w-10 lg:h-10 border-4 border-white/30 border-t-orange-500 rounded-full animate-spin mb-2"></div>
            <p className="text-sm lg:text-base">Finding your driver...</p>
          </div>
        )}

        {/* Active Ride Status */}
        {activeRideRequest && rideStatus !== 'waiting' && (
          <div className="mt-6 p-4 bg-green-500/20 border border-green-500/30 rounded-2xl">
            <div className="text-green-400 font-bold mb-2">
              {rideStatus === 'found' && 'Driver Found!'}
              {rideStatus === 'in-progress' && 'Ride in Progress'}
              {rideStatus === 'completed' && 'Ride Completed'}
            </div>
            <div className="text-white/80 text-sm">
              From: {activeRideRequest.pickup.address}
            </div>
            <div className="text-white/80 text-sm">
              To: {activeRideRequest.destination.address}
            </div>
            <div className="text-orange-400 font-bold mt-2">
              ${activeRideRequest.price.toFixed(2)}
            </div>
          </div>
        )}
      </>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-purple-800 overflow-hidden">
      <div className="app-container flex flex-col lg:flex-row h-screen bg-white lg:rounded-[20px] lg:m-5 overflow-hidden shadow-2xl">
        {/* Sidebar */}
        <div className="sidebar w-full lg:w-[400px] bg-gradient-to-b from-slate-700 to-slate-800 text-white flex flex-col h-[60vh] lg:h-full transition-transform duration-300 ease-in-out">
          {/* Header */}
          <div className="header p-6 lg:p-8 bg-white/10 backdrop-blur-lg">
            <div className="logo text-2xl lg:text-[32px] font-bold text-white mb-2 lg:mb-[10px] flex items-center gap-3 lg:gap-[15px]">
              <Navigation className="h-8 w-8 lg:h-10 lg:w-10 text-transparent bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text" style={{WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}} />
              PullUp
            </div>
            
            <div className="user-info flex items-center gap-3 lg:gap-[15px] mt-4 lg:mt-5">
              <div className="avatar w-12 h-12 lg:w-[50px] lg:h-[50px] rounded-full bg-gradient-to-r from-orange-400 to-red-500 flex items-center justify-center text-lg lg:text-xl font-bold">
                {currentUser?.avatar}
              </div>
              <div className="flex-1">
                <div className="font-bold text-sm lg:text-base">{currentUser?.name}</div>
                <div className="opacity-80 text-xs lg:text-sm">⭐ {currentUser?.rating} Rating</div>
                <Badge variant={isDriver ? "default" : "secondary"} className="mt-1 text-xs">
                  {isDriver ? "Driver" : "Rider"}
                </Badge>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="main-content flex-1 p-6 lg:p-8 overflow-y-auto">
            {renderMainContent()}
          </div>
        </div>

        {/* Map Container */}
        <div className="map-container flex-1 relative bg-gradient-to-br from-blue-400 to-blue-600 h-[40vh] lg:h-full">
          <EnhancedInteractiveMap 
            pickup={pickup}
            destination={destination}
            onDistanceCalculated={handleDistanceCalculated}
            activeRideRequest={activeRideRequest}
          />
          
          {/* Driver Info Overlay */}
          {showDriverInfo && activeRideRequest && (
            <div className="map-overlay absolute top-4 lg:top-5 right-4 lg:right-5 bg-white rounded-2xl p-4 lg:p-5 shadow-xl min-w-[220px] lg:min-w-[250px] z-10">
              <div className="driver-info flex items-center gap-3 lg:gap-[15px] mb-3 lg:mb-[15px]">
                <div className="driver-avatar w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center text-white text-lg lg:text-2xl font-bold">
                  {availableDrivers.find(d => d.id === activeRideRequest.driverId)?.avatar}
                </div>
                <div>
                  <div className="font-bold text-base lg:text-lg">
                    {availableDrivers.find(d => d.id === activeRideRequest.driverId)?.name}
                  </div>
                  <div className="text-gray-600 text-sm lg:text-base">
                    ⭐ {availableDrivers.find(d => d.id === activeRideRequest.driverId)?.rating} • {availableDrivers.find(d => d.id === activeRideRequest.driverId)?.vehicleInfo?.make} {availableDrivers.find(d => d.id === activeRideRequest.driverId)?.vehicleInfo?.model}
                  </div>
                  <div className="text-gray-500 text-xs lg:text-sm">
                    License: {availableDrivers.find(d => d.id === activeRideRequest.driverId)?.vehicleInfo?.licensePlate}
                  </div>
                </div>
              </div>
              
              <div className="eta-info bg-gray-100 rounded-xl p-3 lg:p-[15px] text-center mb-3 lg:mb-[15px]">
                <div className="eta-time text-xl lg:text-2xl font-bold text-slate-800">
                  {eta > 0 ? `${eta} min` : 'Arrived'}
                </div>
                <div className="text-gray-600 text-sm lg:text-base">
                  {eta > 0 ? 'Driver arriving' : 'Driver has arrived'}
                </div>
              </div>
              
              <div className="flex gap-2 lg:gap-[10px]">
                <Button
                  onClick={() => showNotification('Calling driver...')}
                  className="btn btn-secondary flex-1 gap-1 lg:gap-2 text-xs lg:text-sm py-2 lg:py-[10px] bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Phone className="h-3 w-3 lg:h-4 lg:w-4" />
                  Call
                </Button>
                <Button
                  onClick={() => setShowMessaging(true)}
                  className="btn btn-secondary flex-1 gap-1 lg:gap-2 text-xs lg:text-sm py-2 lg:py-[10px] bg-green-600 hover:bg-green-700 text-white"
                >
                  <MessageCircle className="h-3 w-3 lg:h-4 lg:w-4" />
                  Message
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Schedule Ride Modal */}
      {showScheduleModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Schedule Ride
              </CardTitle>
              <Button
                onClick={() => setShowScheduleModal(false)}
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Date</label>
                <Input
                  type="date"
                  value={scheduledDate}
                  onChange={(e) => setScheduledDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Time</label>
                <Input
                  type="time"
                  value={scheduledTime}
                  onChange={(e) => setScheduledTime(e.target.value)}
                />
              </div>
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-sm text-blue-700">
                  <strong>Route:</strong> {pickup} → {destination}
                </p>
                <p className="text-sm text-blue-700">
                  <strong>Estimated fare:</strong> ${calculatePrice(distance, selectedRideType).toFixed(2)}
                </p>
              </div>
              <div className="flex gap-3 pt-4">
                <Button onClick={handleScheduleConfirm} className="flex-1">
                  <Clock className="h-4 w-4 mr-2" />
                  Confirm Schedule
                </Button>
                <Button variant="outline" onClick={() => setShowScheduleModal(false)}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Messaging Modal */}
      {showMessaging && activeRideRequest && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md h-96 flex flex-col">
            <CardHeader className="flex flex-row items-center justify-between py-3">
              <CardTitle className="text-lg">
                Chat with {availableDrivers.find(d => d.id === activeRideRequest.driverId)?.name}
              </CardTitle>
              <Button
                onClick={() => setShowMessaging(false)}
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col p-4">
              <div className="flex-1 overflow-y-auto space-y-3 mb-4">
                {messages.length === 0 ? (
                  <div className="text-center text-gray-500 py-8">
                    <MessageCircle className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                    <p>Start a conversation with your driver</p>
                  </div>
                ) : (
                  messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'rider' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] p-3 rounded-lg text-sm ${
                          message.sender === 'rider'
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-200 text-gray-800'
                        }`}
                      >
                        <p>{message.text}</p>
                        <p className={`text-xs mt-1 ${
                          message.sender === 'rider' ? 'text-blue-100' : 'text-gray-500'
                        }`}>
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
              <div className="flex gap-2">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  className="flex-1"
                />
                <Button onClick={sendMessage} disabled={!newMessage.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Rating Modal */}
      {showRating && activeRideRequest && (
        <RideRating
          rideRequest={activeRideRequest}
          driverName={availableDrivers.find(d => d.id === activeRideRequest.driverId)?.name || 'Driver'}
          onSubmit={handleRatingSubmit}
        />
      )}

      {/* Notification */}
      <Notification message={notification} />
    </div>
  );
};

export default Index;
