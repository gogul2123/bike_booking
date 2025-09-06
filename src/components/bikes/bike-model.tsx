

import React, { useEffect, useState } from "react";
import { X, Plus, Minus, MapPin, Calendar } from "lucide-react";
import { useCart } from "@/hooks/CartContext";

// Types
interface BikeEngine {
  cc: number;
  type: string;
  power_bhp: string;
  torque_nm: string;
}

interface BikeInventory {
  total: number;
  by_color: { [key: string]: number };
}

interface BikeInsurance {
  included: boolean;
  type: string;
  coverage: string;
}

type Bike = {
  _id: string;
  brand: string;
  model: string;
  category: string;
  type: string;
  availability: boolean;
  price_per_day_INR: number;
  colors: string[];
  inventory: BikeInventory;
  imageUrl: string;
  color_image_urls: { [key: string]: string };
  transmission: string;
  engine: BikeEngine;
  fuel_type: string;
  mileage_kmpl: number;
  top_speed_kmph: number;
  seat_height_mm: number;
  weight_kg: number;
  features: string[];
  documents_required: string[];
  insurance: BikeInsurance;
  rating: number;
  reviews_count: number;
  location_available: string[];
};

type BookingModalProps = {
  bike: Bike | null;
  isOpen: boolean;
  onClose: () => void;
  onBookNow: (bike: Bike, days: number, selectedColor: string) => void;
};

const BookingModal: React.FC<BookingModalProps> = ({
  bike,
  isOpen,
  onClose,
  onBookNow,
}) => {
  const { addToCart, getCartItemCount } = useCart();
  const [days, setDays] = useState(1);
  const [selectedColor, setSelectedColor] = useState("");
  const [showLimitAlert, setShowLimitAlert] = useState(false);
  const [cartCountByColor, setCartCountByColor] = useState<{ [color: string]: number }>({});

  useEffect(() => {
    if (isOpen && bike) {
      const defaultColor = bike.colors?.[0] || "";
      setDays(1);
      setSelectedColor(defaultColor);
      setCartCountByColor({});
      setShowLimitAlert(false);
    }
  }, [isOpen, bike]);

  useEffect(() => {
    if (showLimitAlert) {
      const timeout = setTimeout(() => setShowLimitAlert(false), 3000);
      return () => clearTimeout(timeout);
    }
  }, [showLimitAlert]);

  if (!isOpen || !bike) return null;

  const totalPrice = bike.price_per_day_INR * days;
  const kmChargePerKm = 5;

  const handleAddToCart = () => {
    const availableUnits = bike.inventory.by_color?.[selectedColor] ?? 0;
    const currentCount = cartCountByColor[selectedColor] || 0;

    if (currentCount >= availableUnits) {
      setShowLimitAlert(true);
      return;
    }

    // Create cart item
    const cartItem = {
      _id: bike._id,
      brand: bike.brand,
      model: bike.model,
      type: bike.type,
      transmission: bike.transmission,
      price_per_day_INR: bike.price_per_day_INR,
      imageUrl: bike.imageUrl,
      colors: bike.colors,
      selectedColor: selectedColor,
      days: days,
      quantity: 1,
    };

    addToCart(cartItem);

    setCartCountByColor((prev) => ({
      ...prev,
      [selectedColor]: currentCount + 1,
    }));

    setShowLimitAlert(false);
  };

  const handleBookNow = () => {
    onBookNow(bike, days, selectedColor);
    onClose();
  };

  const decrementDays = () => {
    setDays(prev => Math.max(1, prev - 1));
  };

  const incrementDays = () => {
    setDays(prev => prev + 1);
  };

  const BikeFeatures = ({ features }: { features: string[] }) => {
    const [showAll, setShowAll] = useState(false);
    const displayedFeatures = showAll ? features : features.slice(0, 3);

    return (
      <div>
        <h4 className="font-semibold text-gray-900 mb-2">Features</h4>
        <div className="flex flex-wrap gap-2">
          {displayedFeatures.map((feature, index) => (
            <span
              key={index}
              className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
            >
              {feature}
            </span>
          ))}

          {features.length > 3 && (
            <button
              onClick={() => setShowAll(!showAll)}
              className="text-xs text-blue-500 underline underline-offset-4 hover:text-blue-600 transition-colors duration-200 cursor-pointer focus:outline-none"
            >
              {showAll ? "Show less" : `+${features.length - 3} more`}
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
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
                  src={bike.color_image_urls[selectedColor] || bike.imageUrl}
                  alt={`${bike.brand} ${bike.model} - ${selectedColor}`}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            <div className="md:w-1/2 space-y-4">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {bike.brand} {bike.model}
                </h3>
                <div className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm inline-block mb-4">
                  {bike.availability ? 'Available Now' : 'Not Available'}
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[#AC9456] rounded-full"></div>
                  <span className="text-gray-700">
                    <strong>Type:</strong> {bike.type.replace("-", " ")}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[#AC9456] rounded-full"></div>
                  <span className="text-gray-700">
                    <strong>Transmission:</strong> {bike.transmission}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[#AC9456] rounded-full"></div>
                  <span className="text-gray-700">
                    <strong>Engine:</strong> {bike.engine.cc}cc, {bike.engine.power_bhp} BHP
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[#AC9456] rounded-full"></div>
                  <span className="text-gray-700">
                    <strong>Mileage:</strong> {bike.mileage_kmpl} kmpl
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[#AC9456] rounded-full"></div>
                  <span className="text-gray-700">
                    <strong>Available Units:</strong> {bike.inventory.total}
                  </span>
                </div>
              </div>

              <BikeFeatures features={bike.features} />
            </div>
          </div>

          {/* Color Selection */}
          <div className="mb-6">
            <h4 className="font-semibold text-gray-900 mb-3">Choose Color</h4>
            <div className="flex flex-wrap gap-2">
              {bike.colors && bike.colors.length > 0 ? (
                bike.colors.map((color) => {
                  const isAvailable = bike.inventory.by_color?.[color] > 0;

                  return (
                    <button
                      key={color}
                      onClick={() => isAvailable && setSelectedColor(color)}
                      disabled={!isAvailable}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
                        ${isAvailable
                          ? selectedColor === color
                            ? "bg-[#AC9456] text-white cursor-pointer"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          : "bg-gray-200 text-gray-400 cursor-not-allowed line-through"
                        }`}
                    >
                      {color}
                    </button>
                  );
                })
              ) : (
                <p className="text-gray-500">No colors available</p>
              )}
            </div>
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
                <Calendar className="w-4 h-4 text-[#AC9456]" />
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
                  <span className="text-xl font-bold text-[#AC9456]">₹{totalPrice}</span>
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

          {showLimitAlert && (
            <div className="text-red-600 text-sm font-medium mb-4 text-center">
              You have reached the maximum available units for <strong>{selectedColor}</strong> color.
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleAddToCart}
              className="flex-1 py-3 border border-[#AC9456] text-[#AC9456] hover:bg-[#AC9456]/10 font-medium rounded-lg transition-colors"
            >
              {cartCountByColor[selectedColor] > 0
                ? `${cartCountByColor[selectedColor]} added to cart`
                : "Add to Cart"}
            </button>

            <button
              onClick={handleBookNow}
              className="flex-1 py-3 bg-gradient-to-r from-[#AC9456] to-[#D4B76A] text-white font-medium rounded-lg transition-colors"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;

