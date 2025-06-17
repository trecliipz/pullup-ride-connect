
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
  const [mapLoaded, setMapLoaded] = useState(false);
  const { currentUser, availableDrivers } = useUser();
  const driverMarkers = useRef<google.maps.Marker[]>([]);
  const infoWindows = useRef<google.maps.InfoWindow[]>([]);

  // Create improved car icon SVG
  const createCarIcon = (color = '#3B82F6') => {
    const svg = `
      <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="1" dy="2" stdDeviation="1" flood-color="rgba(0,0,0,0.3)"/>
          </filter>
        </defs>
        <!-- Car body -->
        <ellipse cx="16" cy="20" rx="12" ry="6" fill="${color}" filter="url(#shadow)"/>
        <!-- Car roof -->
        <ellipse cx="16" cy="18" rx="8" ry="4" fill="${color}" opacity="0.9"/>
        <!-- Windshield -->
        <ellipse cx="16" cy="16" rx="6" ry="3" fill="#87CEEB" opacity="0.7"/>
        <!-- Wheels -->
        <circle cx="10" cy="23" r="2.5" fill="#2D3748"/>
        <circle cx="22" cy="23" r="2.5" fill="#2D3748"/>
        <circle cx="10" cy="23" r="1.5" fill="#4A5568"/>
        <circle cx="22" cy="23" r="1.5" fill="#4A5568"/>
        <!-- Headlights -->
        <circle cx="16" cy="14" r="1" fill="#FBBF24"/>
        <!-- Direction indicator -->
        <polygon points="16,8 18,12 14,12" fill="#EF4444"/>
      </svg>
    `;
    
    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
  };

  useEffect(() => {
    const loadMap = async () => {
      if (!window.google || !mapRef.current) return;

      const newMap = new window.google.maps.Map(mapRef.current, {
        center: currentUser?.currentLocation || { lat: 40.7128, lng: -74.0060 },
        zoom: 12,
        mapId: '8e98c99499a4991c',
      });

      const newDirectionsService = new window.google.maps.DirectionsService();
      const newDirectionsRenderer = new window.google.maps.DirectionsRenderer({ map: newMap });

      setMap(newMap);
      setDirectionsService(newDirectionsService);
      setDirectionsRenderer(newDirectionsRenderer);
      setMapLoaded(true);
    };

    if (!mapLoaded) {
      loadMap();
    }
  }, [currentUser]);

  useEffect(() => {
    if (!map || !window.google) return;

    // Clear existing markers and info windows
    driverMarkers.current.forEach(marker => marker.setMap(null));
    infoWindows.current.forEach(infoWindow => infoWindow.close());
    driverMarkers.current = [];
    infoWindows.current = [];

    // Add available drivers to map with improved car icons
    availableDrivers.forEach((driver) => {
      if (driver.currentLocation && driver.isAvailable) {
        const carIcon = createCarIcon('#10B981'); // Green for available drivers
        
        const marker = new window.google.maps.Marker({
          position: driver.currentLocation,
          map: map,
          title: `Driver: ${driver.name}`,
          icon: {
            url: carIcon,
            scaledSize: new window.google.maps.Size(32, 32),
            anchor: new window.google.maps.Point(16, 24)
          },
          zIndex: 1000
        });

        // Add info window for driver details
        const infoWindow = new window.google.maps.InfoWindow({
          content: `
            <div style="padding: 8px; min-width: 150px;">
              <strong>${driver.name}</strong><br/>
              ⭐ ${driver.rating}<br/>
              ${driver.vehicleInfo?.make} ${driver.vehicleInfo?.model}<br/>
              <span style="color: green;">Available</span>
            </div>
          `
        });

        marker.addListener('click', () => {
          // Close all other info windows
          infoWindows.current.forEach(iw => iw.close());
          infoWindow.open(map, marker);
        });

        driverMarkers.current.push(marker);
        infoWindows.current.push(infoWindow);
      }
    });

    // Add active ride driver with different color
    if (activeRideRequest?.driverId) {
      const activeDriver = availableDrivers.find(d => d.id === activeRideRequest.driverId);
      if (activeDriver?.currentLocation) {
        const activeCarIcon = createCarIcon('#F59E0B'); // Orange for active driver
        
        const activeMarker = new window.google.maps.Marker({
          position: activeDriver.currentLocation,
          map: map,
          title: `Your Driver: ${activeDriver.name}`,
          icon: {
            url: activeCarIcon,
            scaledSize: new window.google.maps.Size(36, 36),
            anchor: new window.google.maps.Point(18, 28)
          },
          zIndex: 2000
        });

        const activeInfoWindow = new window.google.maps.InfoWindow({
          content: `
            <div style="padding: 8px; min-width: 150px;">
              <strong>Your Driver: ${activeDriver.name}</strong><br/>
              ⭐ ${activeDriver.rating}<br/>
              ${activeDriver.vehicleInfo?.make} ${activeDriver.vehicleInfo?.model}<br/>
              <span style="color: orange; font-weight: bold;">En Route</span>
            </div>
          `
        });

        activeMarker.addListener('click', () => {
          activeInfoWindow.open(map, activeMarker);
        });

        driverMarkers.current.push(activeMarker);
        infoWindows.current.push(activeInfoWindow);
      }
    }
  }, [availableDrivers, activeRideRequest]);

  useEffect(() => {
    if (!directionsService || !directionsRenderer || !map || !currentUser?.currentLocation) return;

    if (pickup === 'Current Location' && destination) {
      const request = {
        origin: currentUser.currentLocation,
        destination: destination,
        travelMode: window.google.maps.TravelMode.DRIVING,
      };

      directionsService.route(request, (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          directionsRenderer.setDirections(result);
          if (result?.routes?.[0]?.legs?.[0]?.distance?.value) {
            const distanceInKm = result.routes[0].legs[0].distance.value / 1000;
            onDistanceCalculated(distanceInKm);
          }
        } else {
          console.error('Directions request failed due to ' + status);
        }
      });
    }
  }, [pickup, destination, directionsService, directionsRenderer, onDistanceCalculated, currentUser]);

  return (
    <div className="relative w-full h-full">
      <div ref={mapRef} className="w-full h-full rounded-lg" />
      {!mapLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-blue-100">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
            <p className="text-blue-600">Loading map...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnhancedInteractiveMap;
