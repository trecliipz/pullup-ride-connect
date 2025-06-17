
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { CreditCard, Wallet, Home, Plus, Trash2, DollarSign } from "lucide-react";
import { useUser } from '@/context/UserContext';
import { useNavigate } from 'react-router-dom';

const Payment = () => {
  const { currentUser } = useUser();
  const navigate = useNavigate();
  const [balance, setBalance] = useState(25.50);
  const [addAmount, setAddAmount] = useState('');
  const [paymentMethods] = useState([
    { id: '1', cardNumber: '****-****-****-1234', cardholderName: 'John Doe', expiryDate: '12/25', type: 'Visa' },
    { id: '2', cardNumber: '****-****-****-5678', cardholderName: 'John Doe', expiryDate: '09/26', type: 'Mastercard' }
  ]);

  const addFunds = () => {
    if (addAmount && !isNaN(Number(addAmount))) {
      setBalance(prev => prev + Number(addAmount));
      setAddAmount('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-purple-800">
      <div className="container mx-auto p-4 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-white">Payment & Wallet</h1>
            <p className="text-white/80">Manage your payment methods and wallet balance</p>
          </div>
          <Button
            onClick={() => navigate('/')}
            variant="outline"
            className="bg-white/20 border-white/30 text-white hover:bg-white/30"
          >
            <Home className="h-4 w-4 mr-2" />
            Home
          </Button>
        </div>

        {/* Wallet Balance */}
        <Card className="bg-gradient-to-r from-green-500/20 to-blue-500/20 border-green-500/30">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Wallet className="h-6 w-6" />
              Wallet Balance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">${balance.toFixed(2)}</div>
              <div className="text-white/80">Available Balance</div>
            </div>
            
            <div className="flex gap-3">
              <Input
                type="number"
                placeholder="Amount to add"
                value={addAmount}
                onChange={(e) => setAddAmount(e.target.value)}
                className="flex-1 bg-white/10 border-white/20 text-white placeholder-white/60"
              />
              <Button onClick={addFunds} className="bg-green-600 hover:bg-green-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Funds
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Payment Methods */}
        <Card className="bg-white/10 border-white/20">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-white flex items-center gap-2">
              <CreditCard className="h-6 w-6" />
              Payment Methods
            </CardTitle>
            <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
              <Plus className="h-4 w-4 mr-2" />
              Add New
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {paymentMethods.map((method) => (
              <div key={method.id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded flex items-center justify-center">
                    <CreditCard className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <div className="text-white font-medium">{method.cardNumber}</div>
                    <div className="text-white/70 text-sm">{method.cardholderName} • Expires {method.expiryDate}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="secondary">{method.type}</Badge>
                  <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Transaction History */}
        <Card className="bg-white/10 border-white/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <DollarSign className="h-6 w-6" />
              Recent Transactions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { id: 1, type: 'ride', amount: -12.50, description: 'Ride to Downtown', date: '2024-01-15' },
              { id: 2, type: 'add', amount: 25.00, description: 'Added funds', date: '2024-01-14' },
              { id: 3, type: 'ride', amount: -8.75, description: 'Ride to Airport', date: '2024-01-13' },
            ].map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div>
                  <div className="text-white font-medium">{transaction.description}</div>
                  <div className="text-white/70 text-sm">{transaction.date}</div>
                </div>
                <div className={`font-bold ${transaction.amount > 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {transaction.amount > 0 ? '+' : ''}${transaction.amount.toFixed(2)}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Payment;
