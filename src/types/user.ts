
export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  rating: number;
  type: 'rider' | 'driver';
  isOnline?: boolean;
  currentLocation?: {
    lat: number;
    lng: number;
  };
  vehicleInfo?: {
    make: string;
    model: string;
    year: number;
    licensePlate: string;
    color: string;
  };
}

export interface RideRequest {
  id: string;
  riderId: string;
  driverId?: string;
  pickup: {
    address: string;
    coordinates: { lat: number; lng: number };
  };
  destination: {
    address: string;
    coordinates: { lat: number; lng: number };
  };
  rideType: 'economy' | 'comfort' | 'xl';
  price: number;
  status: 'pending' | 'accepted' | 'declined' | 'in_progress' | 'completed' | 'cancelled';
  requestedAt: Date;
  acceptedAt?: Date;
  completedAt?: Date;
  distance: number;
  estimatedDuration: number;
  rating?: number;
  feedback?: string;
}

export interface Driver extends User {
  type: 'driver';
  isAvailable: boolean;
  currentRideId?: string;
}
