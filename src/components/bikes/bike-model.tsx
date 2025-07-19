import React, { useEffect, useState } from "react";
import { X, Plus, Minus, MapPin, Clock, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type Bike = {
  _id: string;
  brand: string;
  model: string;
  type: string;
  transmission: string;
  price_per_day_INR: number;
  availability: boolean;
  bookedUntil?: string;
  imageUrl: string | { src: string };
  inventory: { total: number };
  colors: string[];
};

type BookingModalProps = {
  bike: Bike;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (bike: Bike, days: number, selectedColor: string) => void;
  onBookNow: (bike: Bike, days: number, selectedColor: string) => void;
};

const BookingModal: React.FC<BookingModalProps> = ({
  bike,
  isOpen,
  onClose,
  onAddToCart,
  onBookNow,
}) => {
  const [days, setDays] = useState(1);
  const [selectedColor, setSelectedColor] = useState(bike.colors[0] || "");

   useEffect(() => {
    if (isOpen && bike) {
      setDays(1);
      setSelectedColor(bike.colors?.[0] || "");
    }
  }, [isOpen, bike]);

  // Fixed: Prevent rendering if no bike data
  if (!isOpen || !bike) return null;

  const totalPrice = bike.price_per_day_INR * days;
  const kmChargePerKm = 5; // ₹5 per km extra

  const handleAddToCart = () => {
    onAddToCart(bike, days, selectedColor);
    onClose();
  };

  const handleBookNow = () => {
    onBookNow(bike, days, selectedColor);
    onClose();
  };

    // Fixed: Prevent negative days
  const decrementDays = () => {
    setDays(prev => Math.max(1, prev - 1));
  };

  const incrementDays = () => {
    setDays(prev => prev + 1);
  };


  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 ">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto scrollbar-hide shadow-2xl transform transition-all duration-300 scale-100">
        {/* Header */}
        <div className="relative p-6 border-b border-gray-100">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
          <h2 className="text-2xl font-bold text-gray-900 pr-12">
            Book Your Ride
          </h2>
          <p className="text-gray-600 mt-1">Complete your booking details</p>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Bike Image and Basic Info */}
          <div className="flex flex-col md:flex-row gap-6 mb-8">
            <div className="md:w-1/2">
              <div className="relative h-64 bg-gray-50 rounded-2xl overflow-hidden">
                <img
                  src={
                    typeof bike.imageUrl === "string"
                      ? bike.imageUrl
                      : bike.imageUrl.src
                  }
                  alt={`${bike.brand} ${bike.model}`}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            <div className="md:w-1/2 space-y-4">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {bike.brand} {bike.model}
                </h3>
                <Badge className="bg-green-100 text-green-800 mb-4">
                  Available Now
                </Badge>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-tan-600 rounded-full"></div>
                  <span className="text-gray-700">
                    <strong>Type:</strong> {bike.type.replace("-", " ")}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-tan-600 rounded-full"></div>
                  <span className="text-gray-700">
                    <strong>Transmission:</strong> {bike.transmission}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-tan-600 rounded-full"></div>
                  <span className="text-gray-700">
                    <strong>Available Units:</strong> {bike.inventory.total}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Color Selection */}
          <div className="mb-6">
            <h4 className="font-semibold text-gray-900 mb-3">Choose Color</h4>
            <div className="flex flex-wrap gap-2">
              {bike.colors && bike.colors.length > 0 ? (
                bike.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      selectedColor === color
                        ? "bg-tan-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {color}
                  </button>
                ))
              ) : (
                <p className="text-gray-500">No colors available</p>
              )}
            </div>
            {selectedColor && (
              <p className="text-sm text-tan-600 mt-2">
                Selected: <strong>{selectedColor}</strong>
              </p>
            )}
          </div>

          {/* Duration Selection */}
          <div className="mb-6">
            <h4 className="font-semibold text-gray-900 mb-3">Rental Duration</h4>
            <div className="flex items-center space-x-4">
              <button
                onClick={decrementDays}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
                disabled={days <= 1}
              >
                <Minus className="w-4 h-4" />
              </button>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-tan-600" />
                <span className="text-lg font-semibold min-w-[60px] text-center">
                  {days} {days === 1 ? "day" : "days"}
                </span>
              </div>
              <button
                onClick={incrementDays}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Price Breakdown */}
          <div className="bg-gray-50 rounded-2xl p-6 mb-6">
            <h4 className="font-semibold text-gray-900 mb-4">Price Details</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Base Price per day</span>
                <span className="font-medium">₹{bike.price_per_day_INR}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Duration</span>
                <span className="font-medium">{days} {days === 1 ? "day" : "days"}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Subtotal</span>
                <span className="font-medium">₹{totalPrice}</span>
              </div>
              <div className="border-t border-gray-200 pt-3 mt-3">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900">Total</span>
                  <span className="text-xl font-bold text-tan-600">₹{totalPrice}</span>
                </div>
              </div>
            </div>

            {/* Extra Charges Info */}
            <div className="mt-4 p-4 bg-amber-50 rounded-xl border border-amber-200">
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-amber-800">
                  <p className="font-medium">Additional Charges:</p>
                  <p>₹{kmChargePerKm}/km will be charged for distance beyond 100km/day</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={handleAddToCart}
              variant="outline"
              className="flex-1 py-3 border-tan-600 text-tan-600 hover:bg-tan-50 font-medium"
            >
              Add to Cart
            </Button>
            <Button
              onClick={handleBookNow}
              className="flex-1 py-3 bg-tan-600 hover:bg-tan-700 text-white font-medium"
            >
              Book Now
            </Button>
          </div>
            {(!selectedColor || days < 1) && (
            <p className="text-sm text-red-500 mt-2 text-center">
              Please select a color and rental duration to continue
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingModal;