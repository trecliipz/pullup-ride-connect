
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  History, 
  Wallet, 
  User, 
  Shield, 
  MapPin, 
  Clock, 
  DollarSign,
  Phone,
  Mail,
  Edit,
  CreditCard,
  Plus,
  Home,
  Star
} from "lucide-react";
import { useUser } from '@/context/UserContext';
import ProfileEditor from './ProfileEditor';

interface NavigationPagesProps {
  activePage: string;
  onNavigateHome: () => void;
}

const NavigationPages = ({ activePage, onNavigateHome }: NavigationPagesProps) => {
  const { currentUser, isDriver, switchUserType, rideHistory } = useUser();
  const [balance] = useState(45.60);
  const [showProfileEditor, setShowProfileEditor] = useState(false);

  const renderActivityPage = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold mb-6">Trip History</h2>
        <Button variant="outline" onClick={onNavigateHome} className="mb-6">
          <Home className="h-4 w-4 mr-2" />
          Home
        </Button>
      </div>
      
      {/* Recent Trips */}
      <div className="space-y-4">
        {rideHistory.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center text-gray-500">
              No ride history yet. Take your first ride to see it here!
            </CardContent>
          </Card>
        ) : (
          rideHistory.map((trip) => (
            <Card key={trip.id}>
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="text-xs">{trip.status}</Badge>
                      <span className="text-sm text-gray-500">{trip.requestedAt.toLocaleDateString()}</span>
                    </div>
                    <div className="space-y-1 mb-2">
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>{trip.pickup.address}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        <span>{trip.destination.address}</span>
                      </div>
                    </div>
                    <div className="text-sm text-gray-600">
                      Distance: {trip.distance.toFixed(1)} km
                      {trip.rating && (
                        <span className="ml-2">
                          • ⭐ {trip.rating}/5
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold">${trip.price.toFixed(2)}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );

  const renderWalletPage = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold mb-6">Wallet</h2>
        <Button variant="outline" onClick={onNavigateHome} className="mb-6">
          <Home className="h-4 w-4 mr-2" />
          Home
        </Button>
      </div>
      
      {/* Balance Card */}
      <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <CardContent className="p-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-blue-100 mb-1">Current Balance</p>
              <p className="text-3xl font-bold">${balance.toFixed(2)}</p>
            </div>
            <Wallet className="h-12 w-12 text-blue-200" />
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <Button className="h-16 flex flex-col gap-2">
          <Plus className="h-5 w-5" />
          Add Funds
        </Button>
        <Button variant="outline" className="h-16 flex flex-col gap-2">
          <CreditCard className="h-5 w-5" />
          Payment Methods
        </Button>
      </div>

      {/* Transaction History */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {rideHistory.slice(0, 5).map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">Trip Payment</p>
                    <p className="text-sm text-gray-500">{transaction.requestedAt.toLocaleDateString()}</p>
                  </div>
                </div>
                <p className="font-bold text-red-600">-${transaction.price.toFixed(2)}</p>
              </div>
            ))}
            {rideHistory.length === 0 && (
              <p className="text-center text-gray-500 py-4">No transactions yet</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderAccountPage = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold mb-6">Account Settings</h2>
        <Button variant="outline" onClick={onNavigateHome} className="mb-6">
          <Home className="h-4 w-4 mr-2" />
          Home
        </Button>
      </div>
      
      {/* Profile Section */}
      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-orange-400 to-red-500 flex items-center justify-center text-white text-2xl font-bold">
              {currentUser?.avatar}
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold">{currentUser?.name}</h3>
              <p className="text-gray-600">⭐ {currentUser?.rating} Rating</p>
              <Badge variant={isDriver ? "default" : "secondary"}>
                {isDriver ? "Driver Account" : "Rider Account"}
              </Badge>
            </div>
            <Button variant="outline" size="sm" onClick={() => setShowProfileEditor(true)}>
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-600">Email</label>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-gray-400" />
                <span>{currentUser?.email}</span>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-600">Phone</label>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-gray-400" />
                <span>{currentUser?.phone}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Account Type Switch */}
      <Card>
        <CardHeader>
          <CardTitle>Account Type</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Switch Account Type</p>
              <p className="text-sm text-gray-600">
                Currently using as {isDriver ? "Driver" : "Rider"}
              </p>
            </div>
            <Button onClick={switchUserType} variant="outline">
              Switch to {isDriver ? "Rider" : "Driver"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Vehicle Information (if driver) */}
      {isDriver && currentUser?.vehicleInfo && (
        <Card>
          <CardHeader>
            <CardTitle>Vehicle Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-600">Make & Model</label>
                <p>{currentUser.vehicleInfo.make} {currentUser.vehicleInfo.model}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Year</label>
                <p>{currentUser.vehicleInfo.year}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">License Plate</label>
                <p>{currentUser.vehicleInfo.licensePlate}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Color</label>
                <p>{currentUser.vehicleInfo.color}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );

  const renderSecurityPage = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold mb-6">🛡️ Security & Privacy</h2>
        <Button variant="outline" onClick={onNavigateHome} className="mb-6">
          <Home className="h-4 w-4 mr-2" />
          Home
        </Button>
      </div>
      
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>🔐 Data Protection</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 leading-relaxed">
              PullUp employs industry-standard encryption to protect your personal information, 
              payment details, and location data. All data transmission is secured using TLS 1.3 
              encryption protocols.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>📍 Location Privacy</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 leading-relaxed">
              Location data is only collected when the app is in use and is necessary for ride 
              matching and navigation. Historical location data is automatically deleted after 7 days.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>👥 Driver & Rider Safety</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 leading-relaxed">
              All drivers undergo comprehensive background checks, including criminal history and 
              driving record verification. Real-time GPS tracking is active during all rides.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>🚨 Emergency Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <p className="text-gray-600">Emergency assistance is available 24/7:</p>
              <ul className="list-disc list-inside space-y-1 text-gray-600">
                <li>Press Ctrl+E for emergency services</li>
                <li>In-app emergency button</li>
                <li>Real-time ride tracking</li>
                <li>24/7 support hotline: 1-800-PULLUP-1</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>📞 Contact & Support</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-gray-600">
              <p>Security concerns: security@pullup.com</p>
              <p>General support: support@pullup.com</p>
              <p>Emergency: Available through in-app emergency button</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activePage) {
      case 'activity':
        return renderActivityPage();
      case 'wallet':
        return renderWalletPage();
      case 'account':
        return renderAccountPage();
      case 'security':
        return renderSecurityPage();
      default:
        return <div>Page not found</div>;
    }
  };

  return (
    <>
      {renderContent()}
      {showProfileEditor && (
        <ProfileEditor onClose={() => setShowProfileEditor(false)} />
      )}
    </>
  );
};

export default NavigationPages;
