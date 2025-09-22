"use client";
import React, { useState } from "react";
import { MapPin, Calendar, Trash2, Phone, CreditCard } from "lucide-react";
import { useCart } from "@/hooks/CartContext";
import { useAlert } from "@/hooks/alertHook";
import { useAppContext } from "@/hooks/context";
import SuccessModal from "@/components/modal/successModal";
import FailureModal from "@/components/modal/FailureModal";
import { useLogOut } from "@/hooks/useLogout";
import { apiHeader } from "@/hooks/useHeader";

// Types

const CartPage: React.FC = () => {
  const { cartItems, removeFromCart, clearCart } = useCart();
  console.log("Cart items in CartPage:", cartItems);
  const { showAlert } = useAlert();
  const { URL, fromDate, toDate, userData } = useAppContext();
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFailureModal, setShowFailureModal] = useState(false);
  const logOut = useLogOut();
  const [bookingDetails, setBookingDetails] = useState({
    bookingId: "",
    paymentId: "",
    amount: 0,
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [emergencyContact, setEmergencyContact] = useState("");

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    setIsProcessing(false);
  };

  const handleCloseFailureModal = () => {
    // setShowFailureModal(false);
    // setIsProcessing(false);
  };

  const handleRemoveItem = (bikeId: string) => {
    removeFromCart(bikeId);
    showAlert("Item removed from cart", "success");
  };

  //   const handleDaysChange = (bikeId: string, newDays: number) => {
  //     if (newDays < 1) return;
  //     updateItemDays(bikeId, newDays);
  //   };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + item.price_per_day_INR * item.days * item.quantity;
    }, 0);
  };

  const createOrder = async () => {
    if (cartItems.length === 0) {
      showAlert("Your cart is empty", "error");
      return;
    }

    if (!emergencyContact) {
      showAlert("Please provide an emergency contact number", "error");
      return;
    }

    setIsProcessing(true);

    // Transform cart items to booking input format
    const bookingData = {
      userId: userData.userId, // This should come from user context
      vehicles: cartItems.flatMap((item) =>
        item.vehicles
          .slice(0, item.quantity) // take only up to quantity
          .map((vehicle) => ({
            bikeId: item.bikeId,
            vehicleNumber: vehicle.vehicleNumber,
          }))
      ),
      fromDate: fromDate.toISOString(),
      toDate: toDate.toISOString(),
      emergencyContact: emergencyContact,
    };

    try {
      const res = await fetch(`${URL}booking/create-order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      if (res.ok) {
        const result = await res.json();

        // Check if Razorpay is loaded
        if (typeof window.Razorpay === "undefined") {
          // Load Razorpay dynamically
          const script = document.createElement("script");
          script.src = "https://checkout.razorpay.com/v1/checkout.js";
          script.onload = () => {
            initializeRazorpay(result);
          };
          script.onerror = () => {
            setIsProcessing(false);
            showAlert(
              "Failed to load payment gateway. Please try again.",
              "error"
            );
          };
          document.body.appendChild(script);
        } else {
          initializeRazorpay(result);
        }
      } else {
        const errorData = await res.json();
        setIsProcessing(false);
        showAlert(errorData.message || "Failed to create order", "error");
      }
    } catch (error) {
      console.error("Create order error:", error);
      setIsProcessing(false);
      showAlert("Failed to create order. Please try again.", "error");
    }
  };

  const initializeRazorpay = (orderData) => {
    const options = {
      key: orderData.data.razorpayKey,
      amount: calculateTotal() * 100, // Amount in paise
      currency: "INR",
      name: "Bike Rental Service",
      description: `Booking for ${cartItems.length} item(s)`,
      order_id: orderData.data.orderId,
      handler: function (response) {
        console.log("veriy payment called", response);
        verifyPayment(response, orderData?.data?.bookingId);
      },

      prefill: {
        name: "Indian Bikes",
        email: "indianbikes24@gmail.com",
        contact: "9999999999",
      },
      theme: {
        color: "#AC9456",
      },
      modal: {
        ondismiss: function () {
          showAlert("Payment failed", "error");
          setIsProcessing(false);
          cancelBooking(orderData.data.booking.bookingId);
        },
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const verifyPayment = async (response, bookingId) => {
    clearCart();
    try {
      const verificationData = {
        bookingId: bookingId,
        razorpay_order_id: response.razorpay_order_id,
        razorpay_payment_id: response.razorpay_payment_id,
        razorpay_signature: response.razorpay_signature,
      };

      const verifyResponse = await fetch(`${URL}booking/confirmBooking`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(verificationData),
      });

      setIsProcessing(false);

      if (verifyResponse.ok) {
        const result = await verifyResponse.json();
        setBookingDetails({
          bookingId: bookingId,
          paymentId: response.razorpay_payment_id,
          amount: calculateTotal(),
        });
        setShowSuccessModal(true);
      } else {
        const errorData = await verifyResponse.json();
        setErrorMessage(errorData.message || "Payment verification failed");
        setShowFailureModal(true);
      }
    } catch (error) {
      console.error("Payment verification error:", error);
      setIsProcessing(false);
      setErrorMessage("Payment verification failed");
      setShowFailureModal(true);
    }
  };

  const cancelBooking = async (bookingId) => {
    console.log("cancelBooking called", bookingId);
    try {
      const res = await fetch(`${URL}booking/cancelBooking`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bookingId }),
      });
      if (res.status == 200) {
        setErrorMessage("Booking cancelled by user");
        setShowFailureModal(true);
      }
      if (res.status === 401 || res.status === 403) {
        showAlert("Unauthorized", "error");
        logOut();
      }
    } catch (error) {}
  };

  // if (cartItems.length === 0) {
  //   return (
  //     <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
  //       <div className="bg-white rounded-2xl p-6 shadow-md text-center max-w-xs">
  //         <div className="mb-4 text-gray-400">
  //           <CreditCard size={48} className="mx-auto" />
  //         </div>
  //         <h2 className="text-xl font-semibold text-gray-800 mb-2">
  //           Your cart is empty
  //         </h2>
  //         <p className="text-gray-600 mb-4">
  //           Add some bikes to your cart to get started
  //         </p>
  //         <button
  //           onClick={() => window.history.back()}
  //           className="bg-[#AC9456] text-white px-4 py-2 rounded-lg font-medium"
  //         >
  //           Continue Browsing
  //         </button>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">
      {cartItems.length === 0 ? (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
          <div className="bg-white rounded-2xl p-6 shadow-md text-center max-w-xs">
            <div className="mb-4 text-gray-400">
              <CreditCard size={48} className="mx-auto" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Your cart is empty
            </h2>
            <p className="text-gray-600 mb-4">
              Add some bikes to your cart to get started
            </p>
            <button
              onClick={() => window.history.back()}
              className="bg-[#AC9456] text-white px-4 py-2 rounded-lg font-medium"
            >
              Continue Browsing
            </button>
          </div>
        </div>
      ) : (
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Your Cart</h1>

          {/* Cart Items List */}
          <div className="space-y-4 mb-6">
            {cartItems.map((item) => (
              <div
                key={item.bikeId}
                className="bg-white rounded-xl p-4 shadow-sm"
              >
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <img
                      src={item.imageUrl}
                      alt={`${item.brand} ${item.model}`}
                      className="w-20 h-20 object-contain rounded-lg"
                    />
                  </div>

                  <div className="flex-grow">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {item.brand} {item.model}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {item.type} • {item.transmission}
                        </p>
                      </div>
                      <button
                        onClick={() => handleRemoveItem(item.bikeId)}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>

                    {/* {item.selectedLocation && (
                    <div className="flex items-center mt-2 text-sm text-gray-600">
                      <MapPin size={14} className="mr-1" />
                      <span>{item.selectedLocation}</span>
                    </div>
                  )} */}

                    <div className="flex justify-between items-center mt-3">
                      {/* <div className="flex items-center">
                      <span className="text-sm text-gray-600 mr-2">Days:</span>
                      <div className="flex items-center border rounded-md">
                        <button
                          onClick={() =>
                            handleDaysChange(item.bikeId, item.days - 1)
                          }
                          className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                          disabled={item.days <= 1}
                        >
                          -
                        </button>
                        <span className="px-2 py-1 text-sm font-medium">
                          {item.days}
                        </span>
                        <button
                          onClick={() =>
                            handleDaysChange(item.bikeId, item.days + 1)
                          }
                          className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>
                    </div> */}

                      <div className="text-right">
                        <p className="text-sm text-gray-600">
                          ₹{item.price_per_day_INR}/day
                        </p>
                        <p className="font-semibold text-gray-900">
                          ₹{item.price_per_day_INR * item.days}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Emergency Contact Input */}
          <div className="bg-white rounded-xl p-4 shadow-sm mb-6">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
              <Phone size={18} className="mr-2 text-[#AC9456]" />
              Emergency Contact
            </h3>
            <p className="text-sm text-gray-600 mb-3">
              Please provide an emergency contact number
            </p>
            <input
              type="tel"
              value={emergencyContact}
              onChange={(e) => setEmergencyContact(e.target.value)}
              placeholder="Enter phone number"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#AC9456] focus:border-transparent"
            />
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-xl p-4 shadow-sm mb-6">
            <h3 className="font-semibold text-gray-900 mb-3">Order Summary</h3>

            <div className="space-y-2">
              {cartItems.map((item) => (
                <div key={item.bikeId} className="flex justify-between text-sm">
                  <span>
                    {item.brand} {item.model} × {item.days} days
                  </span>
                  <span>₹{item.price_per_day_INR * item.days}</span>
                </div>
              ))}

              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between font-semibold text-gray-900">
                  <span>Total</span>
                  <span>₹{calculateTotal()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Checkout Button */}
          <button
            onClick={createOrder}
            disabled={isProcessing || !emergencyContact}
            className="w-full py-3 bg-gradient-to-r from-[#AC9456] to-[#D4B76A] text-white font-medium rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isProcessing
              ? "Processing..."
              : `Proceed to Pay ₹${calculateTotal()}`}
          </button>
        </div>
      )}

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={handleCloseSuccessModal}
        bookingDetails={bookingDetails}
      />
      <FailureModal
        isOpen={showFailureModal}
        onClose={handleCloseFailureModal}
        errorMessage={errorMessage}
      />
    </div>
  );
};

export default CartPage;
