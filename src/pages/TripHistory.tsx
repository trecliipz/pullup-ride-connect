
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Navigation, Clock, DollarSign, Star, Car } from "lucide-react";
import Navbar from "@/components/Navbar";

const TripHistory = () => {
  const trips = [
    {
      id: 1,
      date: "Today, 2:30 PM",
      pickup: "Downtown Mall",
      destination: "Airport Terminal 1",
      driver: "John Smith",
      rating: 5,
      price: 28.50,
      duration: "35 min",
      rideType: "PullUp Comfort",
      status: "completed"
    },
    {
      id: 2,
      date: "Yesterday, 8:15 AM",
      pickup: "Home",
      destination: "Office Building",
      driver: "Sarah Johnson",
      rating: 4,
      price: 12.75,
      duration: "18 min",
      rideType: "PullUp X",
      status: "completed"
    },
    {
      id: 3,
      date: "Dec 14, 6:45 PM",
      pickup: "Restaurant District",
      destination: "Home",
      driver: "Mike Davis",
      rating: 5,
      price: 16.25,
      duration: "22 min",
      rideType: "PullUp X",
      status: "completed"
    },
    {
      id: 4,
      date: "Dec 13, 3:20 PM",
      pickup: "Shopping Center",
      destination: "Friend's House",
      driver: "Emma Wilson",
      rating: 4,
      price: 19.80,
      duration: "28 min",
      rideType: "PullUp Comfort",
      status: "completed"
    },
    {
      id: 5,
      date: "Dec 12, 11:30 AM",
      pickup: "Hotel",
      destination: "Conference Center",
      driver: "Alex Brown",
      rating: 5,
      price: 15.50,
      duration: "20 min",
      rideType: "PullUp X",
      status: "completed"
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      completed: { label: "Completed", variant: "default" as const },
      cancelled: { label: "Cancelled", variant: "destructive" as const },
      in_progress: { label: "In Progress", variant: "secondary" as const }
    };
    
    return statusConfig[status as keyof typeof statusConfig] || statusConfig.completed;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="pt-20 pb-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Trip History</h1>
          <p className="text-gray-600">Review your past rides and rate your experiences</p>
        </div>

        <div className="space-y-4">
          {trips.map((trip, index) => (
            <Card 
              key={trip.id} 
              className="hover:shadow-lg transition-all duration-300 animate-fade-in border-0 shadow-sm"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                  {/* Trip Info */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-gray-500">{trip.date}</span>
                      <Badge variant={getStatusBadge(trip.status).variant}>
                        {getStatusBadge(trip.status).label}
                      </Badge>
                    </div>
                    
                    {/* Route */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-success-500 rounded-full"></div>
                        <span className="text-gray-900 font-medium">{trip.pickup}</span>
                      </div>
                      <div className="ml-1.5 w-0.5 h-4 bg-gray-300"></div>
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-pullup-500 rounded-full"></div>
                        <span className="text-gray-900 font-medium">{trip.destination}</span>
                      </div>
                    </div>

                    {/* Trip Details */}
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Car className="h-4 w-4" />
                        <span>{trip.rideType}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{trip.duration}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span>Driver: {trip.driver}</span>
                      </div>
                    </div>
                  </div>

                  {/* Price and Rating */}
                  <div className="flex items-center justify-between lg:flex-col lg:items-end lg:space-y-3">
                    <div className="flex items-center text-2xl font-bold text-gray-900">
                      <DollarSign className="h-5 w-5" />
                      {trip.price.toFixed(2)}
                    </div>
                    
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < trip.rating 
                              ? 'text-yellow-400 fill-current' 
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                      <span className="ml-1 text-sm text-gray-600">({trip.rating})</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trip Summary */}
        <Card className="mt-8 animate-fade-in">
          <CardHeader>
            <CardTitle className="text-lg">Trip Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-pullup-600">{trips.length}</div>
                <div className="text-sm text-gray-600">Total Trips</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-success-600">
                  ${trips.reduce((sum, trip) => sum + trip.price, 0).toFixed(2)}
                </div>
                <div className="text-sm text-gray-600">Total Spent</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">
                  {(trips.reduce((sum, trip) => sum + trip.rating, 0) / trips.length).toFixed(1)}
                </div>
                <div className="text-sm text-gray-600">Average Rating</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TripHistory;
