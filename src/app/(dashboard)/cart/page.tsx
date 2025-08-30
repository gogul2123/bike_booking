"use client";
import React, { useState } from "react";
import {
  Trash2,
  Plus,
  Minus,
  ShoppingCart,
  ArrowLeft,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/hooks/CartContext";

type CartItem = {
  _id: string;
  brand: string;
  model: string;
  type: string;
  transmission: string;
  price_per_day_INR: number;
  imageUrl: string | { src: string };
  colors: string[];
  selectedColor: string;
  days: number;
  quantity: number;
};

type CartPageProps = {
  updateQuantity: (id: string, quantity: number) => void;
  updateDays: (id: string, days: number) => void;
  removeFromCart: (id: string) => void;
  onCheckout: () => void;
  onBackToHome: () => void;
};

const CartPage: React.FC<CartPageProps> = ({ onCheckout, onBackToHome }) => {
  const { cartItems, removeFromCart, updateQuantity, updateDays } = useCart();
  const [promoCode, setPromoCode] = useState("");
  console.log("Cart Items:", cartItems);

  const kmChargePerKm = 5; // ₹5 per km extra

  const getItemKey = (item: any) => `${item._id}-${item.selectedColor}`;

  const calculateItemTotal = (item: CartItem) => {
    return item.price_per_day_INR * item.days * item.quantity;
  };

  const calculateSubtotal = () => {
    return cartItems.reduce(
      (total, item) => total + calculateItemTotal(item),
      0
    );
  };

  const calculateTax = () => {
    return Math.round(calculateSubtotal() * 0.18); // 18% GST
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          {/* Header */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={onBackToHome}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                >
                  <ArrowLeft className="w-5 h-5 text-gray-600" />
                </button>
                <h1 className="text-2xl font-bold text-gray-900">Your Cart</h1>
              </div>
              <Badge className="bg-tan-100 text-tan-800">
                {cartItems.length} items
              </Badge>
            </div>
          </div>

          {/* Empty Cart */}
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Your cart is empty
            </h2>
            <p className="text-gray-600 mb-6">
              Add some bikes to get started with your rental journey
            </p>
            <Button
              onClick={onBackToHome}
              className="bg-tan-600 hover:bg-tan-700 text-white px-8 py-3"
            >
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={onBackToHome}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <h1 className="text-2xl font-bold text-gray-900">Your Cart</h1>
            </div>
            <Badge className="bg-tan-100 text-tan-800">
              {cartItems.length} items
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cartItems.map((item: CartItem) => (
              <div
                key={getItemKey(item)}
                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex flex-col sm:flex-row gap-6">
                  {/* Bike Image */}
                  <div className="sm:w-48 h-32 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0">
                    <img
                      src={
                        typeof item.imageUrl === "string"
                          ? item.imageUrl
                          : item.imageUrl.src
                      }
                      alt={`${item.brand} ${item.model}`}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Item Details */}
                  <div className="flex-1 space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">
                          {item.brand} {item.model}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {item.type.replace("-", " ")} • {item.transmission}
                        </p>
                        <div className="flex items-center space-x-2 mt-2">
                          <span className="text-sm text-gray-600">Color:</span>
                          <span className="text-sm font-medium text-tan-600">
                            {item.selectedColor}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromCart(getItemKey(item))}
                        className="p-2 hover:bg-red-50 rounded-full transition-colors duration-200"
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </button>
                    </div>

                    {/* Quantity and Days Controls */}
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="flex items-center space-x-3">
                        <span className="text-sm font-medium text-gray-700">
                          Quantity:
                        </span>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() =>
                              updateQuantity(
                                getItemKey(item),
                                Math.max(1, item.quantity - 1)
                              )
                            }
                            className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(
                                getItemKey(item),
                                item.quantity + 1
                              )
                            }
                            className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <span className="text-sm font-medium text-gray-700">
                          Days:
                        </span>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() =>
                              updateDays(
                                getItemKey(item),
                                Math.max(1, item.days - 1)
                              )
                            }
                            className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
                            disabled={item.days <= 1}
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center font-medium">
                            {item.days}
                          </span>
                          <button
                            onClick={() =>
                              updateDays(getItemKey(item), item.days + 1)
                            }
                            className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                      <span className="text-sm text-gray-600">
                        ₹{item.price_per_day_INR}/day × {item.days} days ×{" "}
                        {item.quantity}
                      </span>
                      <span className="text-xl font-bold text-tan-600">
                        ₹{calculateItemTotal(item).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Subtotal</span>
                  <span className="font-medium">
                    ₹{calculateSubtotal().toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">GST (18%)</span>
                  <span className="font-medium">
                    ₹{calculateTax().toLocaleString()}
                  </span>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-900">
                      Total
                    </span>
                    <span className="text-xl font-bold text-tan-600">
                      ₹{calculateTotal().toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Extra Charges Info */}
              <div className="mb-6 p-4 bg-amber-50 rounded-xl border border-amber-200">
                <div className="flex items-start space-x-2">
                  <MapPin className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-amber-800">
                    <p className="font-medium">Additional Charges:</p>
                    <p>₹{kmChargePerKm}/km for distance beyond 100km/day</p>
                  </div>
                </div>
              </div>

              {/* Promo Code */}
              <div className="mb-6">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter promo code"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-tan-500 focus:border-tan-500 outline-none"
                  />
                  <Button
                    variant="outline"
                    className="px-4 py-2 text-sm border-tan-600 text-tan-600 hover:bg-tan-50"
                  >
                    Apply
                  </Button>
                </div>
              </div>

              {/* Checkout Button */}
              <Button
                onClick={onCheckout}
                className="w-full py-3 bg-tan-600 hover:bg-tan-700 text-white font-medium text-lg"
              >
                Proceed to Checkout
              </Button>

              <p className="text-xs text-gray-500 text-center mt-4">
                By proceeding, you agree to our Terms & Conditions
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
