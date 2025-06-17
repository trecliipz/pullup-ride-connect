
import React, { useEffect, useRef, useState } from 'react';
import { useUser } from '@/context/UserContext';

interface EnhancedInteractiveMapProps {
  pickup: string;
  destination: string;
  onDistanceCalculated: (distance: number) => void;
  activeRideRequest?: any;
}

const EnhancedInteractiveMap: React.FC<EnhancedInteractiveMapProps> = ({
  pickup,
  destination,
  onDistanceCalculated,
  activeRideRequest
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [directionsService, setDirectionsService] = useState<google.maps.DirectionsService | null>(null);
  const [directionsRenderer, setDirectionsRenderer] = useState<google.maps.DirectionsRenderer | null>(null);
  const [geocoder, setGeocoder] = useState<google.maps.Geocoder | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const { currentUser, availableDrivers } = useUser();
  const driverMarkers = useRef<google.maps.Marker[]>([]);
  const infoWindows = useRef<google.maps.InfoWindow[]>([]);
  const routeMarkers = useRef<google.maps.Marker[]>([]);

  // Enhanced car icon with better styling, shadows, and borders
  const createEnhancedCarIcon = (status: 'available' | 'active' | 'busy' = 'available', size: number = 40) => {
    const colors = {
      available: '#10B981', // Green
      active: '#3B82F6',    // Blue
      busy: '#EF4444'       // Red
    };
    
    const color = colors[status];
    
    const svg = `
      <svg width="${size}" height="${size}" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="shadow-${status}" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="2" dy="3" stdDeviation="2" flood-color="rgba(0,0,0,0.4)"/>
          </filter>
          <linearGradient id="carGradient-${status}" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style="stop-color:${color};stop-opacity:1" />
            <stop offset="100%" style="stop-color:${color};stop-opacity:0.8" />
          </linearGradient>
        </defs>
        
        <!-- Car shadow -->
        <ellipse cx="20" cy="32" rx="16" ry="4" fill="rgba(0,0,0,0.2)"/>
        
        <!-- Car body -->
        <path d="M8 24 L8 20 Q8 18 10 18 L30 18 Q32 18 32 20 L32 24 L32 28 Q32 30 30 30 L10 30 Q8 30 8 28 Z" 
              fill="url(#carGradient-${status})" 
              stroke="#ffffff" 
              stroke-width="1.5" 
              filter="url(#shadow-${status})"/>
        
        <!-- Car roof -->
        <path d="M12 18 L12 15 Q12 13 14 13 L26 13 Q28 13 28 15 L28 18" 
              fill="url(#carGradient-${status})" 
              stroke="#ffffff" 
              stroke-width="1"/>
        
        <!-- Windshield -->
        <path d="M13 18 L13 15.5 Q13 14.5 14 14.5 L26 14.5 Q27 14.5 27 15.5 L27 18" 
              fill="#87CEEB" 
              opacity="0.8"/>
        
        <!-- Front grille -->
        <rect x="31" y="20" width="2" height="6" fill="#2D3748" rx="1"/>
        
        <!-- Headlights -->
        <circle cx="31" cy="19" r="1.5" fill="#FEF3C7"/>
        <circle cx="31" cy="27" r="1.5" fill="#FEF3C7"/>
        
        <!-- Wheels -->
        <circle cx="12" cy="29" r="3" fill="#1F2937" stroke="#4B5563" stroke-width="1"/>
        <circle cx="28" cy="29" r="3" fill="#1F2937" stroke="#4B5563" stroke-width="1"/>
        <circle cx="12" cy="29" r="1.5" fill="#6B7280"/>
        <circle cx="28" cy="29" r="1.5" fill="#6B7280"/>
        
        <!-- Status indicator -->
        <circle cx="32" cy="12" r="4" fill="${color}" stroke="#ffffff" stroke-width="2"/>
        <circle cx="32" cy="12" r="2" fill="#ffffff"/>
      </svg>
    `;
    
    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
  };

  // Create pickup/destination marker
  const createLocationMarker = (type: 'pickup' | 'destination') => {
    const color = type === 'pickup' ? '#F59E0B' : '#EF4444';
    const label = type === 'pickup' ? 'P' : 'D';
    
    const svg = `
      <svg width="30" height="40" viewBox="0 0 30 40" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="shadow-${type}" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="1" dy="2" stdDeviation="1.5" flood-color="rgba(0,0,0,0.3)"/>
          </filter>
        </defs>
        <path d="M15 2 C22 2 28 8 28 15 C28 22 15 38 15 38 C15 38 2 22 2 15 C2 8 8 2 15 2 Z" 
              fill="${color}" 
              stroke="#ffffff" 
              stroke-width="2" 
              filter="url(#shadow-${type})"/>
        <circle cx="15" cy="15" r="8" fill="#ffffff"/>
        <text x="15" y="20" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="${color}">${label}</text>
      </svg>
    `;
    
    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
  };

  useEffect(() => {
    const loadMap = async () => {
      if (!window.google || !mapRef.current) return;

      const newMap = new window.google.maps.Map(mapRef.current, {
        center: currentUser?.currentLocation || { lat: 40.7128, lng: -74.0060 },
        zoom: 13,
        mapId: '8e98c99499a4991c',
        styles: [
          {
            featureType: "all",
            elementType: "geometry",
            stylers: [{ color: "#f5f5f5" }]
          },
          {
            featureType: "road",
            elementType: "geometry",
            stylers: [{ color: "#ffffff" }]
          },
          {
            featureType: "road.arterial",
            elementType: "geometry",
            stylers: [{ color: "#fafafa" }]
          },
          {
            featureType: "road.highway",
            elementType: "geometry",
            stylers: [{ color: "#dadada" }]
          }
        ]
      });

      const newDirectionsService = new window.google.maps.DirectionsService();
      const newDirectionsRenderer = new window.google.maps.DirectionsRenderer({ 
        map: newMap,
        suppressMarkers: true,
        polylineOptions: {
          strokeColor: '#3B82F6',
          strokeWeight: 4,
          strokeOpacity: 0.8
        }
      });
      const newGeocoder = new window.google.maps.Geocoder();

      setMap(newMap);
      setDirectionsService(newDirectionsService);
      setDirectionsRenderer(newDirectionsRenderer);
      setGeocoder(newGeocoder);
      setMapLoaded(true);
    };

    if (!mapLoaded) {
      loadMap();
    }
  }, [currentUser]);

  // Auto-update driver positions every 8 seconds
  useEffect(() => {
    if (!map) return;

    const updateInterval = setInterval(() => {
      // Simulate driver movement by slightly adjusting positions
      // In a real app, this would fetch from your backend
      console.log('Auto-updating driver positions...');
    }, 8000);

    return () => clearInterval(updateInterval);
  }, [map]);

  useEffect(() => {
    if (!map || !window.google) return;

    // Clear existing markers and info windows
    driverMarkers.current.forEach(marker => marker.setMap(null));
    infoWindows.current.forEach(infoWindow => infoWindow.close());
    driverMarkers.current = [];
    infoWindows.current = [];

    // Add available drivers to map with enhanced car icons
    availableDrivers.forEach((driver) => {
      if (driver.currentLocation) {
        let status: 'available' | 'active' | 'busy' = 'available';
        
        if (activeRideRequest?.driverId === driver.id) {
          status = 'active';
        } else if (!driver.isAvailable) {
          status = 'busy';
        }
        
        const carIcon = createEnhancedCarIcon(status, 40);
        
        const marker = new window.google.maps.Marker({
          position: driver.currentLocation,
          map: map,
          title: `Driver: ${driver.name}`,
          icon: {
            url: carIcon,
            scaledSize: new window.google.maps.Size(40, 40),
            anchor: new window.google.maps.Point(20, 30)
          },
          zIndex: status === 'active' ? 2000 : status === 'available' ? 1500 : 1000
        });

        const statusText = status === 'available' ? '🟢 Available' : 
                          status === 'active' ? '🔵 Your Driver' : '🔴 Busy';

        const infoWindow = new window.google.maps.InfoWindow({
          content: `
            <div style="padding: 10px; min-width: 180px; font-family: Arial, sans-serif;">
              <div style="display: flex; align-items: center; margin-bottom: 8px;">
                <div style="width: 40px; height: 40px; border-radius: 50%; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; margin-right: 10px;">
                  ${driver.avatar}
                </div>
                <div>
                  <strong style="font-size: 16px;">${driver.name}</strong><br/>
                  <span style="color: #666; font-size: 12px;">⭐ ${driver.rating}</span>
                </div>
              </div>
              <div style="margin-bottom: 6px; font-size: 14px;">
                <strong>${driver.vehicleInfo?.make} ${driver.vehicleInfo?.model}</strong><br/>
                <span style="color: #666; font-size: 12px;">${driver.vehicleInfo?.color} • ${driver.vehicleInfo?.licensePlate}</span>
              </div>
              <div style="padding: 4px 8px; border-radius: 12px; background: ${status === 'available' ? '#dcfce7' : status === 'active' ? '#dbeafe' : '#fee2e2'}; color: ${status === 'available' ? '#166534' : status === 'active' ? '#1e40af' : '#991b1b'}; font-size: 12px; font-weight: bold; display: inline-block;">
                ${statusText}
              </div>
            </div>
          `
        });

        marker.addListener('click', () => {
          infoWindows.current.forEach(iw => iw.close());
          infoWindow.open(map, marker);
        });

        driverMarkers.current.push(marker);
        infoWindows.current.push(infoWindow);
      }
    });
  }, [availableDrivers, activeRideRequest]);

  // Handle route display when pickup and destination are entered
  useEffect(() => {
    if (!directionsService || !directionsRenderer || !map || !geocoder) return;

    // Clear previous route markers
    routeMarkers.current.forEach(marker => marker.setMap(null));
    routeMarkers.current = [];

    const processRoute = async () => {
      try {
        let originCoords: google.maps.LatLng | google.maps.LatLngLiteral;
        let destinationCoords: google.maps.LatLng | google.maps.LatLngLiteral;

        // Handle pickup location
        if (pickup === 'Current Location' && currentUser?.currentLocation) {
          originCoords = currentUser.currentLocation;
          
          // Add pickup marker
          const pickupMarker = new window.google.maps.Marker({
            position: currentUser.currentLocation,
            map: map,
            title: 'Pickup Location',
            icon: {
              url: createLocationMarker('pickup'),
              scaledSize: new window.google.maps.Size(30, 40),
              anchor: new window.google.maps.Point(15, 40)
            },
            zIndex: 3000
          });
          routeMarkers.current.push(pickupMarker);
        } else if (pickup.trim()) {
          // Geocode pickup address
          const pickupResult = await new Promise<google.maps.GeocoderResult[]>((resolve, reject) => {
            geocoder.geocode({ address: pickup }, (results, status) => {
              if (status === 'OK' && results) {
                resolve(results);
              } else {
                reject(status);
              }
            });
          });
          
          if (pickupResult[0]) {
            originCoords = pickupResult[0].geometry.location;
            
            const pickupMarker = new window.google.maps.Marker({
              position: originCoords,
              map: map,
              title: `Pickup: ${pickup}`,
              icon: {
                url: createLocationMarker('pickup'),
                scaledSize: new window.google.maps.Size(30, 40),
                anchor: new window.google.maps.Point(15, 40)
              },
              zIndex: 3000
            });
            routeMarkers.current.push(pickupMarker);
          }
        }

        // Handle destination
        if (destination.trim()) {
          const destinationResult = await new Promise<google.maps.GeocoderResult[]>((resolve, reject) => {
            geocoder.geocode({ address: destination }, (results, status) => {
              if (status === 'OK' && results) {
                resolve(results);
              } else {
                reject(status);
              }
            });
          });
          
          if (destinationResult[0]) {
            destinationCoords = destinationResult[0].geometry.location;
            
            const destinationMarker = new window.google.maps.Marker({
              position: destinationCoords,
              map: map,
              title: `Destination: ${destination}`,
              icon: {
                url: createLocationMarker('destination'),
                scaledSize: new window.google.maps.Size(30, 40),
                anchor: new window.google.maps.Point(15, 40)
              },
              zIndex: 3000
            });
            routeMarkers.current.push(destinationMarker);

            // If we have both pickup and destination, show route
            if (originCoords!) {
              const request = {
                origin: originCoords!,
                destination: destinationCoords,
                travelMode: window.google.maps.TravelMode.DRIVING,
              };

              directionsService.route(request, (result, status) => {
                if (status === window.google.maps.DirectionsStatus.OK && result) {
                  directionsRenderer.setDirections(result);
                  if (result.routes?.[0]?.legs?.[0]?.distance?.value) {
                    const distanceInKm = result.routes[0].legs[0].distance.value / 1000;
                    onDistanceCalculated(distanceInKm);
                  }

                  // Fit map to show entire route
                  const bounds = new window.google.maps.LatLngBounds();
                  bounds.extend(originCoords!);
                  bounds.extend(destinationCoords);
                  map.fitBounds(bounds);
                } else {
                  console.error('Directions request failed due to ' + status);
                }
              });
            }
          }
        }
      } catch (error) {
        console.error('Error processing route:', error);
      }
    };

    if ((pickup.trim() && pickup !== 'Current Location') || (pickup === 'Current Location' && currentUser?.currentLocation) || destination.trim()) {
      processRoute();
    } else {
      // Clear directions if no route
      directionsRenderer.setDirections({ routes: [] } as google.maps.DirectionsResult);
    }
  }, [pickup, destination, directionsService, directionsRenderer, geocoder, onDistanceCalculated, currentUser, map]);

  return (
    <div className="relative w-full h-full">
      <div ref={mapRef} className="w-full h-full rounded-lg" />
      
      {/* Map Legend */}
      <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-lg z-10">
        <div className="text-sm font-semibold mb-2">Legend</div>
        <div className="space-y-1 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span>🟢 Available Drivers</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span>🔵 Active Riders</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span>🔴 Busy Drivers</span>
          </div>
        </div>
      </div>

      {!mapLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-blue-100">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
            <p className="text-blue-600">Loading enhanced map...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnhancedInteractiveMap;
