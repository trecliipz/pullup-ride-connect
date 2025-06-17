
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Star, X } from "lucide-react";
import { RideRequest } from '@/types/user';

interface RideRatingProps {
  rideRequest: RideRequest;
  driverName: string;
  onSubmit: (rating: number, feedback: string) => void;
}

const RideRating = ({ rideRequest, driverName, onSubmit }: RideRatingProps) => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [feedback, setFeedback] = useState('');

  const handleSubmit = () => {
    if (rating === 0) {
      alert('Please select a rating');
      return;
    }
    onSubmit(rating, feedback);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-xl font-bold">Rate Your Ride</CardTitle>
          <p className="text-gray-600">How was your experience with {driverName}?</p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Trip Summary */}
          <div className="bg-gray-50 rounded-lg p-4 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Trip Cost:</span>
              <span className="font-bold">${rideRequest.price.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Distance:</span>
              <span className="font-bold">{rideRequest.distance.toFixed(1)} km</span>
            </div>
            <div className="text-xs text-gray-500">
              From: {rideRequest.pickup.address}
            </div>
            <div className="text-xs text-gray-500">
              To: {rideRequest.destination.address}
            </div>
          </div>

          {/* Star Rating */}
          <div className="text-center space-y-2">
            <p className="text-sm font-medium">Rate your experience:</p>
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="transition-colors"
                >
                  <Star
                    className={`w-8 h-8 ${
                      star <= (hoveredRating || rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
            </div>
            {rating > 0 && (
              <p className="text-sm text-gray-600">
                {rating === 1 && "Poor"}
                {rating === 2 && "Fair"}
                {rating === 3 && "Good"}
                {rating === 4 && "Very Good"}
                {rating === 5 && "Excellent"}
              </p>
            )}
          </div>

          {/* Feedback */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Additional feedback (optional):</label>
            <Textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Share your experience..."
              className="resize-none"
              rows={3}
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => onSubmit(0, '')}
              className="flex-1"
            >
              Skip
            </Button>
            <Button
              onClick={handleSubmit}
              className="flex-1 bg-gradient-to-r from-orange-400 to-red-500 hover:from-orange-500 hover:to-red-600"
            >
              Submit Rating
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RideRating;
