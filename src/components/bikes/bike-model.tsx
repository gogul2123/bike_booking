import React, { useEffect, useState } from "react";
import {
  X,
  Plus,
  Minus,
  MapPin,
  Calendar,
  Bike,
  ArrowRight,
  ArrowLeft,
  Info,
} from "lucide-react";
import { useCart } from "@/hooks/CartContext";
import { useAppContext } from "@/hooks/context";
import { formatDate } from "date-fns";

// Updated Types for new data structure
interface Vehicle {
  vehicleId: string;
  vehicleNumber: string;
}

interface ModelInfo {
  brand: string;
  model: string;
  imageUrl: string;
  transmission: string;
}

interface Counters {
  available: number;
  total: number;
}

type Bike = {
  bikeId: string;
  modelInfo: ModelInfo;
  vehicles: Vehicle[];
  counters: Counters;
  price: number;
  // Optional fields that might be available
  colors?: string[];
  features?: string[];
  mileage_kmpl?: number;
  engine?: {
    cc: number;
    type: string;
    power_bhp: string;
    torque_nm: string;
  };
  fuel_type?: string;
  top_speed_kmph?: number;
  seat_height_mm?: number;
  weight_kg?: number;
  insurance?: {
    included: boolean;
    type: string;
    coverage: string;
  };
  rating?: number;
  reviews_count?: number;
  location_available?: string[];
};

type BookingModalProps = {
  bike: Bike | null;
  isOpen: boolean;
  onClose: () => void;
  onBookNow: () => void;
};

const BookingModal: React.FC<BookingModalProps> = ({
  bike,
  isOpen,
  onClose,
  onBookNow,
}) => {
  const { addToCart } = useCart();
  const [days, setDays] = useState(1);
  const [quantity, setQuantity] = useState(1);
  const [showLimitAlert, setShowLimitAlert] = useState(false);
  const [cartItemsAdded, setCartItemsAdded] = useState(0);
  const { fromDate, toDate } = useAppContext();

  useEffect(() => {
    if (isOpen && bike) {
      setDays(1);
      setQuantity(1);
      setCartItemsAdded(0);
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

  const totalPrice = bike.price * days * quantity;
  const kmChargePerKm = 5;
  const availableCount = bike.counters.available;
  const maxQuantity = bike.counters.available;

  const handleAddToCart = () => {
    if (cartItemsAdded >= maxQuantity) {
      setShowLimitAlert(true);
      return;
    }

    const vehicles = bike.vehicles
      .filter((_, index) => index < quantity)
      .map((vehicle) => {
        return {
          bikeId: bike.bikeId,
          vehicleNumber: vehicle.vehicleNumber,
        };
      });

    // Create cart item
    const cartItem = {
      bikeId: bike.bikeId,
      brand: bike.modelInfo.brand,
      model: bike.modelInfo.model,
      transmission: bike.modelInfo.transmission,
      price_per_day_INR: bike.price,
      imageUrl: bike.modelInfo.imageUrl,
      days: days,
      quantity: quantity,
      vehicles: vehicles,
    };

    console.log("cartItem", cartItem);

    addToCart(cartItem);
    setCartItemsAdded((prev) => prev + quantity);
    setShowLimitAlert(false);
  };

  const handleBookNow = async () => {
    console.log("handleBookNow called", quantity, availableCount);
    if (quantity > availableCount) {
      setShowLimitAlert(true);
      return;
    }
    await handleAddToCart;
    onBookNow();
    onClose();
  };

  const decrementDays = () => {
    setDays((prev) => Math.max(1, prev - 1));
  };

  const incrementDays = () => {
    setDays((prev) => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  const incrementQuantity = () => {
    if (quantity < availableCount) {
      setQuantity((prev) => prev + 1);
    } else {
      setShowLimitAlert(true);
    }
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
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      style={{ scrollbarWidth: "none" }}
    >
      <div
        className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        style={{ scrollbarWidth: "none" }}
      >
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
              <div className="relative h-64  rounded-2xl overflow-hidden">
                <img
                  src={bike.modelInfo.imageUrl}
                  alt={`${bike.modelInfo.brand} ${bike.modelInfo.model}`}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            <div className="md:w-1/2 space-y-4">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {bike.modelInfo.brand} {bike.modelInfo.model}
                </h3>
                <div className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm inline-block mb-4">
                  {bike.counters.available > 0
                    ? "Available Now"
                    : "Not Available"}
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[#AC9456] rounded-full"></div>
                  <span className="text-gray-700">
                    <strong>Transmission:</strong> {bike.modelInfo.transmission}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[#AC9456] rounded-full"></div>
                  <span className="text-gray-700">
                    <strong>Available Units:</strong> {availableCount}/
                    {bike.counters.total}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[#AC9456] rounded-full"></div>
                  <span className="text-gray-700">
                    <strong>Total Vehicles:</strong> {bike.vehicles.length}
                  </span>
                </div>
                {bike.engine && (
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-[#AC9456] rounded-full"></div>
                    <span className="text-gray-700">
                      <strong>Engine:</strong> {bike.engine.cc}cc,{" "}
                      {bike.engine.power_bhp} BHP
                    </span>
                  </div>
                )}
                {bike.mileage_kmpl && (
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-[#AC9456] rounded-full"></div>
                    <span className="text-gray-700">
                      <strong>Mileage:</strong> {bike.mileage_kmpl} kmpl
                    </span>
                  </div>
                )}
              </div>

              {bike.features && bike.features.length > 0 && (
                <BikeFeatures features={bike.features} />
              )}
            </div>
          </div>

          {/* Quantity Selection */}
          {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="mb-6">
              <h4 className="font-semibold text-gray-900 mb-3">
                Number of Bikes
              </h4>
              <div className="flex items-center space-x-4">
                <button
                  onClick={decrementQuantity}
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
                  disabled={quantity <= 1}
                >
                  <Minus className="w-4 h-4" />
                </button>
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-semibold min-w-[60px] text-center">
                    {quantity} {quantity === 1 ? "bike" : "bikes"}
                  </span>
                </div>
                <button
                  onClick={incrementQuantity}
                  className={`p-2 rounded-full transition-colors duration-200 ${
                    quantity >= availableCount
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                  disabled={quantity >= availableCount}
                >
                  <Plus className="w-4 h-4" />
                </button>
                <span className="text-sm text-gray-500">
                  Max: {availableCount} available
                </span>
              </div>
            </div>
            <div className="mb-6">
              <h4>Date</h4>
              <div className="flex items-center space-x-4">
                <div>21/08/2002</div>
                <div>221/08/2002</div>
              </div>
            </div>
          </div> */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Number of Bikes Section */}
            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
              <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                <Bike className="w-5 h-5 mr-2 text-[#AC9456]" />
                Number of Bikes
              </h4>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={decrementQuantity}
                    className={`p-3 rounded-full transition-all duration-200 ${
                      quantity <= 1
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-[#AC9456] text-white hover:bg-[#D4B76A] shadow-md hover:shadow-lg"
                    }`}
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </button>

                  <div className="flex flex-col items-center">
                    <span className="text-2xl font-bold text-gray-900 min-w-[60px] text-center">
                      {quantity}
                    </span>
                    <span className="text-sm text-gray-500">
                      {quantity === 1 ? "bike" : "bikes"}
                    </span>
                  </div>

                  <button
                    onClick={incrementQuantity}
                    className={`p-3 rounded-full transition-all duration-200 ${
                      quantity >= availableCount
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-[#AC9456] text-white hover:bg-[#D4B76A] shadow-md hover:shadow-lg"
                    }`}
                    disabled={quantity >= availableCount}
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <div className="text-right">
                  <div className="text-sm text-gray-600">Max available</div>
                  <div className="text-lg font-semibold text-[#AC9456]">
                    {availableCount}
                  </div>
                </div>
              </div>

              {availableCount > 0 && (
                <div className="mt-3 bg-gray-50 p-2 rounded-lg">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Availability</span>
                    <span
                      className={`font-medium ${
                        availableCount >= 5
                          ? "text-green-600"
                          : availableCount >= 2
                          ? "text-amber-600"
                          : "text-red-600"
                      }`}
                    >
                      {availableCount >= 5
                        ? "High"
                        : availableCount >= 2
                        ? "Limited"
                        : "Low"}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Date Section */}
            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
              <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-[#AC9456]" />
                Rental Period
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <ArrowRight className="w-4 h-4 mr-1 text-[#AC9456]" />
                    Pick-up
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                    <div className="text-lg font-semibold text-gray-900">
                      {formatDate(fromDate, "MMM dd, yyyy")}
                    </div>
                    <div className="text-sm text-gray-600">
                      {formatDate(fromDate, "hh:mm a")}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <ArrowLeft className="w-4 h-4 mr-1 text-[#AC9456]" />
                    Drop-off
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                    <div className="text-lg font-semibold text-gray-900">
                      {formatDate(toDate, "MMM dd, yyyy")}
                    </div>
                    <div className="text-sm text-gray-600">
                      {formatDate(toDate, "hh:mm a")}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-3 bg-blue-50 p-2 rounded-lg border border-blue-100">
                <div className="flex items-center text-sm text-blue-700">
                  <Info className="w-4 h-4 mr-1" />
                  Rental hours: 9:00 AM - 9:00 PM
                </div>
              </div>
            </div>
          </div>

          {/* Duration Selection */}
          {/* <div className="mb-6">
            <h4 className="font-semibold text-gray-900 mb-3">
              Rental Duration
            </h4>
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
          </div> */}

          {/* Price Breakdown */}
          <div className="bg-gray-50 rounded-2xl p-6 mb-6">
            <h4 className="font-semibold text-gray-900 mb-4">Price Details</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-700">
                  Base Price per day per bike
                </span>
                <span className="font-medium">₹{bike.price}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Number of bikes</span>
                <span className="font-medium">{quantity}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Duration</span>
                <span className="font-medium">
                  {days} {days === 1 ? "day" : "days"}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Subtotal</span>
                <span className="font-medium">₹{totalPrice}</span>
              </div>
              <div className="border-t border-gray-200 pt-3 mt-3">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900">Total</span>
                  <span className="text-xl font-bold text-[#AC9456]">
                    ₹{totalPrice}
                  </span>
                </div>
              </div>
            </div>

            {/* Extra Charges Info */}
            <div className="mt-4 p-4 bg-amber-50 rounded-xl border border-amber-200">
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-amber-800">
                  <p className="font-medium">Additional Charges:</p>
                  <p>
                    ₹{kmChargePerKm}/km will be charged for distance beyond
                    100km/day
                  </p>
                </div>
              </div>
            </div>
          </div>

          {showLimitAlert && (
            <div className="text-red-600 text-sm font-medium mb-4 text-center p-3 bg-red-50 rounded-lg border border-red-200">
              You have reached the maximum available units (
              {bike.counters.available} bikes available).
            </div>
          )}

          {/* Available Vehicles List */}
          {bike.vehicles.length > 0 && (
            <div className="mb-6">
              <h4 className="font-semibold text-gray-900 mb-3">
                Available Vehicles
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {bike.vehicles
                  .slice(0, Math.min(6, bike.vehicles.length))
                  .map((vehicle) => (
                    <div
                      key={vehicle.vehicleId}
                      className="bg-gray-100 text-gray-700 px-3 py-2 rounded text-sm text-center"
                    >
                      {vehicle.vehicleNumber}
                    </div>
                  ))}
                {bike.vehicles.length > 6 && (
                  <div className="text-sm text-gray-500 px-3 py-2 text-center">
                    +{bike.vehicles.length - 6} more
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleAddToCart}
              disabled={availableCount <= 0}
              className={`flex-1 py-3 font-medium rounded-lg transition-colors ${
                availableCount <= 0
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "border border-[#AC9456] text-[#AC9456] hover:bg-[#AC9456]/10"
              }`}
            >
              {cartItemsAdded > 0
                ? `${cartItemsAdded} added to cart`
                : "Add to Cart"}
            </button>

            <button
              onClick={handleBookNow}
              // disabled={availableCount <= 0}
              className={`flex-1 py-3 font-medium rounded-lg transition-colors bg-gradient-to-r from-[#AC9456] to-[#D4B76A] text-white hover:opacity-90`}
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
