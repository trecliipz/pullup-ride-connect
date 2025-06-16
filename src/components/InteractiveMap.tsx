
import { useEffect, useRef, useState } from 'react';
import { Card } from '@/components/ui/card';
import { MapPin, Navigation } from 'lucide-react';

interface InteractiveMapProps {
  pickup?: string;
  destination?: string;
  onDistanceCalculated?: (distance: number) => void;
}

// Declare google as a global variable for TypeScript
declare global {
  interface Window {
    google: typeof google;
  }
}

const InteractiveMap = ({ pickup, destination, onDistanceCalculated }: InteractiveMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [directionsService, setDirectionsService] = useState<google.maps.DirectionsService | null>(null);
  const [directionsRenderer, setDirectionsRenderer] = useState<google.maps.DirectionsRenderer | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    // Get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.log('Error getting location:', error);
          // Default to New York City
          setUserLocation({ lat: 40.7128, lng: -74.0060 });
        }
      );
    } else {
      // Default to New York City
      setUserLocation({ lat: 40.7128, lng: -74.0060 });
    }
  }, []);

  useEffect(() => {
    if (!mapRef.current || !userLocation) return;

    // Check if Google Maps is loaded
    if (typeof window.google === 'undefined') {
      console.warn('Google Maps not loaded yet');
      return;
    }

    // Initialize map
    const mapInstance = new window.google.maps.Map(mapRef.current, {
      center: userLocation,
      zoom: 13,
      styles: [
        {
          "featureType": "all",
          "elementType": "geometry.fill",
          "stylers": [{ "weight": "2.00" }]
        },
        {
          "featureType": "all",
          "elementType": "geometry.stroke",
          "stylers": [{ "color": "#9c9c9c" }]
        },
        {
          "featureType": "all",
          "elementType": "labels.text",
          "stylers": [{ "visibility": "on" }]
        },
        {
          "featureType": "landscape",
          "elementType": "all",
          "stylers": [{ "color": "#f2f2f2" }]
        },
        {
          "featureType": "landscape",
          "elementType": "geometry.fill",
          "stylers": [{ "color": "#ffffff" }]
        },
        {
          "featureType": "landscape.man_made",
          "elementType": "geometry.fill",
          "stylers": [{ "color": "#ffffff" }]
        },
        {
          "featureType": "poi",
          "elementType": "all",
          "stylers": [{ "visibility": "off" }]
        },
        {
          "featureType": "road",
          "elementType": "all",
          "stylers": [{ "saturation": -100 }, { "lightness": 45 }]
        },
        {
          "featureType": "road",
          "elementType": "geometry.fill",
          "stylers": [{ "color": "#eeeeee" }]
        },
        {
          "featureType": "road",
          "elementType": "labels.text.fill",
          "stylers": [{ "color": "#7b7b7b" }]
        },
        {
          "featureType": "road",
          "elementType": "labels.text.stroke",
          "stylers": [{ "color": "#ffffff" }]
        },
        {
          "featureType": "road.highway",
          "elementType": "all",
          "stylers": [{ "visibility": "simplified" }]
        },
        {
          "featureType": "road.arterial",
          "elementType": "labels.icon",
          "stylers": [{ "visibility": "off" }]
        },
        {
          "featureType": "transit",
          "elementType": "all",
          "stylers": [{ "visibility": "off" }]
        },
        {
          "featureType": "water",
          "elementType": "all",
          "stylers": [{ "color": "#46bcec" }, { "visibility": "on" }]
        },
        {
          "featureType": "water",
          "elementType": "geometry.fill",
          "stylers": [{ "color": "#c8d7d4" }]
        },
        {
          "featureType": "water",
          "elementType": "labels.text.fill",
          "stylers": [{ "color": "#070707" }]
        },
        {
          "featureType": "water",
          "elementType": "labels.text.stroke",
          "stylers": [{ "color": "#ffffff" }]
        }
      ]
    });

    setMap(mapInstance);

    // Initialize directions service and renderer
    const directionsServiceInstance = new window.google.maps.DirectionsService();
    const directionsRendererInstance = new window.google.maps.DirectionsRenderer({
      suppressMarkers: false,
      polylineOptions: {
        strokeColor: '#FF6B6B',
        strokeWeight: 4,
        strokeOpacity: 0.8
      }
    });

    directionsRendererInstance.setMap(mapInstance);
    setDirectionsService(directionsServiceInstance);
    setDirectionsRenderer(directionsRendererInstance);

    // Add current location marker
    new window.google.maps.Marker({
      position: userLocation,
      map: mapInstance,
      title: 'Your Location',
      icon: {
        url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
          <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
            <circle cx="20" cy="20" r="18" fill="#22C55E" stroke="white" stroke-width="4"/>
            <circle cx="20" cy="20" r="8" fill="white"/>
          </svg>
        `),
        scaledSize: new window.google.maps.Size(40, 40),
        anchor: new window.google.maps.Point(20, 20)
      }
    });

  }, [userLocation]);

  useEffect(() => {
    if (!directionsService || !directionsRenderer || !map || !pickup || !destination) {
      if (onDistanceCalculated) {
        onDistanceCalculated(0);
      }
      return;
    }

    const geocoder = new window.google.maps.Geocoder();
    
    // Geocode pickup and destination
    Promise.all([
      new Promise<google.maps.LatLng>((resolve, reject) => {
        if (pickup === 'Current Location' && userLocation) {
          resolve(new window.google.maps.LatLng(userLocation.lat, userLocation.lng));
        } else {
          geocoder.geocode({ address: pickup }, (results, status) => {
            if (status === 'OK' && results?.[0]) {
              resolve(results[0].geometry.location);
            } else {
              reject(new Error('Pickup location not found'));
            }
          });
        }
      }),
      new Promise<google.maps.LatLng>((resolve, reject) => {
        geocoder.geocode({ address: destination }, (results, status) => {
          if (status === 'OK' && results?.[0]) {
            resolve(results[0].geometry.location);
          } else {
            reject(new Error('Destination not found'));
          }
        });
      })
    ]).then(([pickupLocation, destinationLocation]) => {
      // Calculate route
      directionsService.route({
        origin: pickupLocation,
        destination: destinationLocation,
        travelMode: window.google.maps.TravelMode.DRIVING,
        unitSystem: window.google.maps.UnitSystem.METRIC,
        avoidHighways: false,
        avoidTolls: false
      }, (result, status) => {
        if (status === 'OK' && result) {
          directionsRenderer.setDirections(result);
          
          // Calculate distance
          const route = result.routes[0];
          let totalDistance = 0;
          
          route.legs.forEach(leg => {
            if (leg.distance) {
              totalDistance += leg.distance.value;
            }
          });
          
          // Convert to kilometers
          const distanceKm = totalDistance / 1000;
          
          if (onDistanceCalculated) {
            onDistanceCalculated(distanceKm);
          }
          
          console.log(`Route calculated: ${distanceKm.toFixed(1)} km`);
        } else {
          console.error('Directions request failed:', status);
          if (onDistanceCalculated) {
            onDistanceCalculated(0);
          }
        }
      });
    }).catch(error => {
      console.error('Geocoding failed:', error);
      if (onDistanceCalculated) {
        onDistanceCalculated(0);
      }
    });
  }, [pickup, destination, directionsService, directionsRenderer, map, userLocation, onDistanceCalculated]);

  if (typeof window.google === 'undefined') {
    return (
      <div className="h-full w-full relative">
        <Card className="h-full bg-gradient-to-br from-blue-50 to-green-50 border-0 rounded-lg overflow-hidden">
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 via-blue-50 to-green-100">
            <div className="text-center p-8">
              <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">Loading Google Maps...</p>
              <p className="text-sm text-gray-500 mt-2">Please ensure you have an internet connection</p>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="h-full w-full relative">
      <Card className="h-full bg-gradient-to-br from-blue-50 to-green-50 border-0 rounded-lg overflow-hidden">
        <div 
          ref={mapRef} 
          className="w-full h-full relative"
          style={{ minHeight: '300px' }}
        />
        
        {/* Map Controls */}
        <div className="absolute top-4 right-4 space-y-2 z-10">
          <button 
            onClick={() => map?.setZoom((map?.getZoom() || 13) + 1)}
            className="w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors"
          >
            <span className="text-lg font-bold">+</span>
          </button>
          <button 
            onClick={() => map?.setZoom((map?.getZoom() || 13) - 1)}
            className="w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors"
          >
            <span className="text-lg font-bold">-</span>
          </button>
        </div>
        
        {/* Current Location Button */}
        <div className="absolute bottom-4 right-4 z-10">
          <button 
            onClick={() => {
              if (userLocation && map) {
                map.setCenter(userLocation);
                map.setZoom(15);
              }
            }}
            className="w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors"
          >
            <Navigation className="h-5 w-5 text-blue-600" />
          </button>
        </div>
        
        {/* Map Info */}
        {!pickup && !destination && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center p-8 bg-white/80 rounded-lg backdrop-blur-sm">
              <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Enter pickup and destination to see route</p>
            </div>
          </div>
        )}
      </Card>
      
      {/* Google Maps Attribution */}
      <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded z-10">
        Google Maps
      </div>
    </div>
  );
};

export default InteractiveMap;
