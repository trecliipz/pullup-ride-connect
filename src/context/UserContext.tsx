
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Driver, RideRequest } from '@/types/user';

interface UserContextType {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  availableDrivers: Driver[];
  setAvailableDrivers: (drivers: Driver[]) => void;
  activeRideRequest: RideRequest | null;
  setActiveRideRequest: (request: RideRequest | null) => void;
  pendingRequests: RideRequest[];
  setPendingRequests: (requests: RideRequest[]) => void;
  isDriver: boolean;
  switchUserType: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [availableDrivers, setAvailableDrivers] = useState<Driver[]>([]);
  const [activeRideRequest, setActiveRideRequest] = useState<RideRequest | null>(null);
  const [pendingRequests, setPendingRequests] = useState<RideRequest[]>([]);

  useEffect(() => {
    // Initialize with a default rider account
    const defaultRider: User = {
      id: 'rider_1',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1234567890',
      avatar: 'JD',
      rating: 4.9,
      type: 'rider',
      currentLocation: { lat: 40.7128, lng: -74.0060 }
    };
    setCurrentUser(defaultRider);

    // Initialize some mock drivers
    const mockDrivers: Driver[] = [
      {
        id: 'driver_1',
        name: 'Mike Chen',
        email: 'mike@example.com',
        phone: '+1234567891',
        avatar: 'MC',
        rating: 4.95,
        type: 'driver',
        isOnline: true,
        isAvailable: true,
        currentLocation: { lat: 40.7180, lng: -74.0100 },
        vehicleInfo: {
          make: 'Toyota',
          model: 'Camry',
          year: 2022,
          licensePlate: 'ABC-123',
          color: 'White'
        }
      },
      {
        id: 'driver_2',
        name: 'Sarah Williams',
        email: 'sarah@example.com',
        phone: '+1234567892',
        avatar: 'SW',
        rating: 4.88,
        type: 'driver',
        isOnline: true,
        isAvailable: true,
        currentLocation: { lat: 40.7080, lng: -74.0020 },
        vehicleInfo: {
          make: 'Honda',
          model: 'Civic',
          year: 2021,
          licensePlate: 'XYZ-789',
          color: 'Blue'
        }
      },
      {
        id: 'driver_3',
        name: 'Alex Rodriguez',
        email: 'alex@example.com',
        phone: '+1234567893',
        avatar: 'AR',
        rating: 4.92,
        type: 'driver',
        isOnline: true,
        isAvailable: false,
        currentRideId: 'ride_001',
        currentLocation: { lat: 40.7200, lng: -74.0150 },
        vehicleInfo: {
          make: 'Ford',
          model: 'Explorer',
          year: 2023,
          licensePlate: 'SUV-456',
          color: 'Black'
        }
      }
    ];
    setAvailableDrivers(mockDrivers);
  }, []);

  const isDriver = currentUser?.type === 'driver';

  const switchUserType = () => {
    if (!currentUser) return;

    if (currentUser.type === 'rider') {
      // Switch to driver
      const driverAccount: Driver = {
        ...currentUser,
        id: 'driver_user',
        name: 'John Doe (Driver)',
        type: 'driver',
        isOnline: true,
        isAvailable: true,
        vehicleInfo: {
          make: 'Tesla',
          model: 'Model 3',
          year: 2023,
          licensePlate: 'TSL-001',
          color: 'Red'
        }
      };
      setCurrentUser(driverAccount);
    } else {
      // Switch to rider
      const riderAccount: User = {
        ...currentUser,
        id: 'rider_1',
        name: 'John Doe',
        type: 'rider'
      };
      setCurrentUser(riderAccount);
    }
  };

  return (
    <UserContext.Provider value={{
      currentUser,
      setCurrentUser,
      availableDrivers,
      setAvailableDrivers,
      activeRideRequest,
      setActiveRideRequest,
      pendingRequests,
      setPendingRequests,
      isDriver,
      switchUserType
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
