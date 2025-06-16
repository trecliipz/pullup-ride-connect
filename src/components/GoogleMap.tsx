
import { useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { MapPin, Navigation } from 'lucide-react';

interface GoogleMapProps {
  pickup?: string;
  destination?: string;
}

const GoogleMap = ({ pickup, destination }: GoogleMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // This would normally initialize Google Maps
    // For now, we'll show a placeholder with map-like styling
    console.log('Map would show route from:', pickup, 'to:', destination);
  }, [pickup, destination]);

  return (
    <div className="h-full w-full relative">
      <Card className="h-full bg-gradient-to-br from-blue-50 to-green-50 border-0 rounded-lg overflow-hidden">
        <div 
          ref={mapRef} 
          className="w-full h-full relative bg-gradient-to-br from-pullup-100 to-success-100 flex items-center justify-center"
        >
          {/* Map Placeholder */}
          <div className="absolute inset-0 bg-gradient-to-br from-pullup-100 via-blue-50 to-success-100">
            {/* Grid Pattern */}
            <div className="absolute inset-0 opacity-20">
              <div className="grid grid-cols-12 h-full">
                {Array.from({ length: 144 }).map((_, i) => (
                  <div key={i} className="border border-gray-300"></div>
                ))}
              </div>
            </div>
            
            {/* Mock Roads */}
            <div className="absolute top-1/3 left-0 right-0 h-2 bg-gray-400 opacity-60"></div>
            <div className="absolute top-2/3 left-0 right-0 h-2 bg-gray-400 opacity-60"></div>
            <div className="absolute left-1/4 top-0 bottom-0 w-2 bg-gray-400 opacity-60"></div>
            <div className="absolute left-3/4 top-0 bottom-0 w-2 bg-gray-400 opacity-60"></div>
            
            {/* Pickup Marker */}
            {pickup && (
              <div className="absolute top-1/4 left-1/3 animate-bounce-in">
                <div className="relative">
                  <div className="w-8 h-8 bg-success-500 rounded-full flex items-center justify-center shadow-lg">
                    <MapPin className="h-4 w-4 text-white" />
                  </div>
                  <div className="absolute -bottom-1 left-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-success-500 transform -translate-x-1/2"></div>
                </div>
              </div>
            )}
            
            {/* Destination Marker */}
            {destination && (
              <div className="absolute top-3/4 left-2/3 animate-bounce-in delay-300">
                <div className="relative">
                  <div className="w-8 h-8 bg-pullup-500 rounded-full flex items-center justify-center shadow-lg">
                    <Navigation className="h-4 w-4 text-white" />
                  </div>
                  <div className="absolute -bottom-1 left-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-pullup-500 transform -translate-x-1/2"></div>
                </div>
              </div>
            )}
            
            {/* Route Line */}
            {pickup && destination && (
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <path
                  d="M 33% 25% Q 45% 35% 66% 75%"
                  stroke="#0ea5e9"
                  strokeWidth="3"
                  fill="none"
                  strokeDasharray="8,4"
                  className="animate-pulse"
                />
              </svg>
            )}
          </div>
          
          {/* Map Controls */}
          <div className="absolute top-4 right-4 space-y-2">
            <button className="w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors">
              <span className="text-lg font-bold">+</span>
            </button>
            <button className="w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors">
              <span className="text-lg font-bold">-</span>
            </button>
          </div>
          
          {/* Location Toggle */}
          <div className="absolute bottom-4 right-4">
            <button className="w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors">
              <Navigation className="h-5 w-5 text-pullup-600" />
            </button>
          </div>
          
          {/* Map Info */}
          {!pickup && !destination && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center p-8">
                <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Enter pickup and destination to see route</p>
              </div>
            </div>
          )}
        </div>
      </Card>
      
      {/* Google Maps Integration Note */}
      <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
        Interactive map powered by Google Maps
      </div>
    </div>
  );
};

export default GoogleMap;
