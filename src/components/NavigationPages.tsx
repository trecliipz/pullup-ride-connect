
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Home, 
  List, 
  Wallet, 
  CreditCard, 
  Plus, 
  User, 
  Shield, 
  Lock, 
  Key, 
  Bell, 
  Smartphone,
  AlertTriangle,
  CheckCircle
} from "lucide-react";
import { useUser } from '@/context/UserContext';
import ProfileEditor from './ProfileEditor';
import SecurityModal from './SecurityModal';
import PaymentMethodModal from './PaymentMethodModal';
import PhotoUploadModal from './PhotoUploadModal';

interface NavigationPagesProps {
  activePage: string;
  onNavigateHome: () => void;
}

const NavigationPages: React.FC<NavigationPagesProps> = ({ activePage, onNavigateHome }) => {
  const { currentUser, rideHistory, updateProfile } = useUser();
  const [showSecurityModal, setShowSecurityModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState([
    { id: '1', cardNumber: '****-****-****-1234', cardholderName: 'John Doe', expiryDate: '12/25', type: 'credit' }
  ]);
  const [notifications, setNotifications] = useState(true);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  const handleAddPaymentMethod = (newMethod: any) => {
    setPaymentMethods(prev => [...prev, newMethod]);
  };

  const handlePhotoUpdate = (photo: string) => {
    updateProfile({ profilePhoto: photo });
  };

  const renderActivityPage = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Ride History</h2>
        <Button
          onClick={onNavigateHome}
          variant="outline"
          className="bg-white/20 border-white/30 text-white hover:bg-white/30"
        >
          <Home className="h-4 w-4 mr-2" />
          Home
        </Button>
      </div>

      {rideHistory.length === 0 ? (
        <Card className="bg-white/10 border-white/20">
          <CardContent className="text-center py-12">
            <List className="h-16 w-16 text-white/50 mx-auto mb-4" />
            <p className="text-white/80 text-lg">No rides yet</p>
            <p className="text-white/60">Your ride history will appear here</p>
          </CardContent>
        </Card>
      ) : (
        rideHistory.map((ride) => (
          <Card key={ride.id} className="bg-white/10 border-white/20">
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <div className="text-white font-medium mb-1">
                    {ride.pickup.address} → {ride.destination.address}
                  </div>
                  <div className="text-white/70 text-sm">
                    {ride.completedAt?.toLocaleDateString()} • {ride.distance.toFixed(1)} km
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-green-400 font-bold">${ride.price.toFixed(2)}</div>
                  <Badge variant="secondary" className="mt-1">
                    {ride.status}
                  </Badge>
                </div>
              </div>
              {ride.rating && (
                <div className="text-yellow-400 text-sm">
                  Rating: {'⭐'.repeat(ride.rating)}
                </div>
              )}
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );

  const renderWalletPage = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Wallet</h2>
        <Button
          onClick={onNavigateHome}
          variant="outline"
          className="bg-white/20 border-white/30 text-white hover:bg-white/30"
        >
          <Home className="h-4 w-4 mr-2" />
          Home
        </Button>
      </div>

      {/* Balance Card */}
      <Card className="bg-gradient-to-r from-green-500/20 to-blue-500/20 border-green-500/30">
        <CardContent className="p-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">$25.50</div>
            <div className="text-white/80">Available Balance</div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Methods */}
      <Card className="bg-white/10 border-white/20">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-white flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Payment Methods
          </CardTitle>
          <Button
            onClick={() => setShowPaymentModal(true)}
            size="sm"
            className="bg-orange-500 hover:bg-orange-600"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add
          </Button>
        </CardHeader>
        <CardContent className="space-y-3">
          {paymentMethods.map((method) => (
            <div key={method.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <div className="flex items-center gap-3">
                <CreditCard className="h-5 w-5 text-white/70" />
                <div>
                  <div className="text-white font-medium">{method.cardNumber}</div>
                  <div className="text-white/70 text-sm">{method.cardholderName}</div>
                </div>
              </div>
              <Badge variant="secondary">{method.type}</Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      <PaymentMethodModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        onAddPayment={handleAddPaymentMethod}
      />
    </div>
  );

  const renderAccountPage = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Account Settings</h2>
        <Button
          onClick={onNavigateHome}
          variant="outline"
          className="bg-white/20 border-white/30 text-white hover:bg-white/30"
        >
          <Home className="h-4 w-4 mr-2" />
          Home
        </Button>
      </div>

      <ProfileEditor />
      
      <PhotoUploadModal
        isOpen={showPhotoModal}
        onClose={() => setShowPhotoModal(false)}
        onPhotoUpdate={handlePhotoUpdate}
      />
    </div>
  );

  const renderSecurityPage = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Security & Privacy</h2>
        <Button
          onClick={onNavigateHome}
          variant="outline"
          className="bg-white/20 border-white/30 text-white hover:bg-white/30"
        >
          <Home className="h-4 w-4 mr-2" />
          Home
        </Button>
      </div>

      {/* Security Status */}
      <Card className="bg-white/10 border-white/20">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="h-6 w-6 text-green-400" />
            <div>
              <h3 className="text-white font-semibold">Security Status</h3>
              <p className="text-white/70 text-sm">Your account is secure</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-400" />
            <span className="text-white/80 text-sm">All security features enabled</span>
          </div>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card className="bg-white/10 border-white/20">
        <CardHeader>
          <CardTitle className="text-white">Security Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
            <div className="flex items-center gap-3">
              <Key className="h-5 w-5 text-white/70" />
              <div>
                <div className="text-white font-medium">Two-Factor Authentication</div>
                <div className="text-white/70 text-sm">Add extra security to your account</div>
              </div>
            </div>
            <Button
              onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
              variant={twoFactorEnabled ? "default" : "outline"}
              size="sm"
            >
              {twoFactorEnabled ? 'Enabled' : 'Enable'}
            </Button>
          </div>

          <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
            <div className="flex items-center gap-3">
              <Lock className="h-5 w-5 text-white/70" />
              <div>
                <div className="text-white font-medium">Change Password</div>
                <div className="text-white/70 text-sm">Update your password regularly</div>
              </div>
            </div>
            <Button variant="outline" size="sm">
              Change
            </Button>
          </div>

          <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
            <div className="flex items-center gap-3">
              <Bell className="h-5 w-5 text-white/70" />
              <div>
                <div className="text-white font-medium">Security Notifications</div>
                <div className="text-white/70 text-sm">Get alerts about account activity</div>
              </div>
            </div>
            <Button
              onClick={() => setNotifications(!notifications)}
              variant={notifications ? "default" : "outline"}
              size="sm"
            >
              {notifications ? 'On' : 'Off'}
            </Button>
          </div>

          <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
            <div className="flex items-center gap-3">
              <Smartphone className="h-5 w-5 text-white/70" />
              <div>
                <div className="text-white font-medium">Login Devices</div>
                <div className="text-white/70 text-sm">Manage your logged-in devices</div>
              </div>
            </div>
            <Button variant="outline" size="sm">
              Manage
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Privacy Policy */}
      <Card className="bg-white/10 border-white/20">
        <CardContent className="p-4">
          <Button
            onClick={() => setShowSecurityModal(true)}
            variant="outline"
            className="w-full bg-white/20 border-white/30 text-white hover:bg-white/30"
          >
            <Shield className="h-4 w-4 mr-2" />
            View Privacy Policy & Security Details
          </Button>
        </CardContent>
      </Card>

      <SecurityModal
        isOpen={showSecurityModal}
        onClose={() => setShowSecurityModal(false)}
      />
    </div>
  );

  const pages = {
    activity: renderActivityPage,
    wallet: renderWalletPage,
    account: renderAccountPage,
    security: renderSecurityPage,
  };

  return pages[activePage as keyof typeof pages]?.() || null;
};

export default NavigationPages;
