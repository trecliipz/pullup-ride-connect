
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin, Navigation, Clock, DollarSign, Car, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import GoogleMap from "@/components/GoogleMap";
import { useToast } from "@/hooks/use-toast";

const BookRide = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [selectedRide, setSelectedRide] = useState(null);
  const [isBooking, setIsBooking] = useState(false);
  const { toast } = useToast();

  const rideOptions = [
    {
      id: 1,
      name: "PullUp X",
      description: "Affordable rides for everyday trips",
      time: "3-5 min",
      price: "$12.50",
      icon: Car,
      passengers: 4
    },
    {
      id: 2,
      name: "PullUp Comfort",
      description: "Extra space and premium vehicles",
      time: "5-8 min", 
      price: "$18.75",
      icon: Car,
      passengers: 4
    },
    {
      id: 3,
      name: "PullUp XL",
      description: "Larger vehicles for groups",
      time: "6-10 min",
      price: "$22.00",
      icon: Users,
      passengers: 6
    }
  ];

  const handleBookRide = async () => {
    if (!pickup || !destination || !selectedRide) {
      toast({
        title: "Missing Information",
        description: "Please enter pickup, destination, and select a ride type.",
        variant: "destructive"
      });
      return;
    }

    setIsBooking(true);
    
    // Simulate booking process
    setTimeout(() => {
      setIsBooking(false);
      toast({
        title: "Ride Booked Successfully!",
        description: "Your driver will arrive in 5 minutes. Track your ride in real-time.",
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="pt-16 p-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-5rem)]">
          {/* Booking Form */}
          <div className="space-y-6 overflow-y-auto">
            <Card className="animate-fade-in">
              <CardContent className="p-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-6">Book Your Ride</h1>
                
                {/* Location Inputs */}
                <div className="space-y-4 mb-6">
                  <div>
                    <Label htmlFor="pickup" className="text-sm font-medium text-gray-700">
                      Pickup Location
                    </Label>
                    <div className="relative mt-1">
                      <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <Input
                        id="pickup"
                        placeholder="Enter pickup location"
                        value={pickup}
                        onChange={(e) => setPickup(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="destination" className="text-sm font-medium text-gray-700">
                      Destination
                    </Label>
                    <div className="relative mt-1">
                      <Navigation className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <Input
                        id="destination"
                        placeholder="Where are you going?"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>

                {/* Ride Options */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Choose Your Ride</h3>
                  {rideOptions.map((option) => (
                    <Card 
                      key={option.id}
                      className={`cursor-pointer transition-all duration-200 ${
                        selectedRide?.id === option.id 
                          ? 'ring-2 ring-pullup-500 bg-pullup-50' 
                          : 'hover:shadow-md'
                      }`}
                      onClick={() => setSelectedRide(option)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="p-2 bg-pullup-100 rounded-lg">
                              <option.icon className="h-5 w-5 text-pullup-600" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900">{option.name}</h4>
                              <p className="text-sm text-gray-600">{option.description}</p>
                              <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500">
                                <span className="flex items-center">
                                  <Clock className="h-3 w-3 mr-1" />
                                  {option.time}
                                </span>
                                <span className="flex items-center">
                                  <Users className="h-3 w-3 mr-1" />
                                  {option.passengers} seats
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center text-lg font-bold text-gray-900">
                              <DollarSign className="h-4 w-4" />
                              {option.price.replace('$', '')}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Book Button */}
                <Button 
                  onClick={handleBookRide}
                  disabled={isBooking}
                  className="w-full mt-6 gradient-bg hover:opacity-90 transition-all duration-300 text-lg py-6"
                >
                  {isBooking ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Booking Your Ride...</span>
                    </div>
                  ) : (
                    <>
                      <Navigation className="mr-2 h-5 w-5" />
                      Book Ride
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Map */}
          <div className="relative">
            <GoogleMap pickup={pickup} destination={destination} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookRide;
