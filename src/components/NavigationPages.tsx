
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, ArrowLeft, Activity, Wallet, User, Shield, Clock, Star, CreditCard, Plus } from "lucide-react";
import { useUser } from '@/context/UserContext';
import ProfileEditor from './ProfileEditor';

interface NavigationPagesProps {
  activePage: string;
  onNavigateHome: () => void;
}

const NavigationPages = ({ activePage, onNavigateHome }: NavigationPagesProps) => {
  const { rideHistory, currentUser } = useUser();

  const renderActivityPage = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button
            onClick={onNavigateHome}
            variant="outline"
            size="sm"
            className="bg-white/20 border-white/30 text-white hover:bg-white/30"
          >
            <Home className="h-4 w-4 mr-2" />
            Home
          </Button>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Activity className="h-6 w-6" />
            Activity
          </h2>
        </div>
      </div>

      <Card className="bg-white/10 border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Recent Rides
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {rideHistory.length === 0 ? (
            <div className="text-center py-8">
              <Activity className="h-12 w-12 text-white/50 mx-auto mb-4" />
              <p className="text-white/80">No ride history yet</p>
              <p className="text-white/60 text-sm mt-2">Your completed rides will appear here</p>
            </div>
          ) : (
            rideHistory.slice(0, 10).map((ride) => (
              <div key={ride.id} className="bg-white/10 rounded-lg p-4 space-y-2">
                <div className="flex justify-between items-start">
                  <div className="space-y-2 flex-1">
                    <div className="text-white font-medium text-sm">
                      {ride.pickup.address} → {ride.destination.address}
                    </div>
                    <div className="text-white/70 text-xs">
                      {new Date(ride.completedAt || ride.requestedAt).toLocaleDateString()} • {ride.distance.toFixed(1)} km
                    </div>
                    {ride.rating && (
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 text-yellow-400 fill-current" />
                        <span className="text-yellow-400 text-xs">{ride.rating}/5</span>
                      </div>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="text-white font-bold">${ride.price.toFixed(2)}</div>
                    <div className={`text-xs px-2 py-1 rounded ${
                      ride.status === 'completed' ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'
                    }`}>
                      {ride.status}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );

  const renderWalletPage = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button
            onClick={onNavigateHome}
            variant="outline"
            size="sm"
            className="bg-white/20 border-white/30 text-white hover:bg-white/30"
          >
            <Home className="h-4 w-4 mr-2" />
            Home
          </Button>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Wallet className="h-6 w-6" />
            Wallet
          </h2>
        </div>
      </div>

      <Card className="bg-gradient-to-r from-green-500/20 to-blue-500/20 border-green-500/30">
        <CardContent className="p-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">$0.00</div>
            <div className="text-white/80 text-sm">Available Balance</div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/10 border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Payment Methods
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center py-8">
            <CreditCard className="h-12 w-12 text-white/50 mx-auto mb-4" />
            <p className="text-white/80 mb-4">No payment methods added</p>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Add Payment Method
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/10 border-white/20">
        <CardHeader>
          <CardTitle className="text-white">Transaction History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Wallet className="h-12 w-12 text-white/50 mx-auto mb-4" />
            <p className="text-white/80">No transactions yet</p>
            <p className="text-white/60 text-sm mt-2">Your payment history will appear here</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderAccountPage = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button
            onClick={onNavigateHome}
            variant="outline"
            size="sm"
            className="bg-white/20 border-white/30 text-white hover:bg-white/30"
          >
            <Home className="h-4 w-4 mr-2" />
            Home
          </Button>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <User className="h-6 w-6" />
            Account Settings
          </h2>
        </div>
      </div>

      <ProfileEditor />
    </div>
  );

  const renderSecurityPage = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button
            onClick={onNavigateHome}
            variant="outline"
            size="sm"
            className="bg-white/20 border-white/30 text-white hover:bg-white/30"
          >
            <Home className="h-4 w-4 mr-2" />
            Home
          </Button>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Shield className="h-6 w-6" />
            Security
          </h2>
        </div>
      </div>

      <Card className="bg-white/10 border-white/20">
        <CardHeader>
          <CardTitle className="text-white">Security Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-white/10 rounded-lg">
              <div>
                <div className="text-white font-medium">Two-Factor Authentication</div>
                <div className="text-white/70 text-sm">Add an extra layer of security</div>
              </div>
              <Button variant="outline" size="sm" className="bg-white/20 border-white/30 text-white hover:bg-white/30">
                Enable
              </Button>
            </div>

            <div className="flex justify-between items-center p-4 bg-white/10 rounded-lg">
              <div>
                <div className="text-white font-medium">Change Password</div>
                <div className="text-white/70 text-sm">Update your account password</div>
              </div>
              <Button variant="outline" size="sm" className="bg-white/20 border-white/30 text-white hover:bg-white/30">
                Change
              </Button>
            </div>

            <div className="flex justify-between items-center p-4 bg-white/10 rounded-lg">
              <div>
                <div className="text-white font-medium">Login History</div>
                <div className="text-white/70 text-sm">View recent account activity</div>
              </div>
              <Button variant="outline" size="sm" className="bg-white/20 border-white/30 text-white hover:bg-white/30">
                View
              </Button>
            </div>

            <div className="flex justify-between items-center p-4 bg-white/10 rounded-lg">
              <div>
                <div className="text-white font-medium">Privacy Settings</div>
                <div className="text-white/70 text-sm">Manage your data and privacy</div>
              </div>
              <Button variant="outline" size="sm" className="bg-white/20 border-white/30 text-white hover:bg-white/30">
                Manage
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

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
      return null;
  }
};

export default NavigationPages;
