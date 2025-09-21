"use client";

import React from "react";
import {
  Bike,
  Calendar,
  Clock,
  IndianRupee,
  MapPin,
  Navigation,
  CheckCircle,
  AlertCircle,
  Search,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";

// MyBookings Component with enhanced professional design
const MyBookings = () => {
  const bookingHistory = [
    {
      id: "BK123",
      bikeModel: "Honda Activa 6G",
      bikeImage: "🛵",
      startDate: "2025-07-18",
      endDate: "2025-07-19",
      startTime: "09:00 AM",
      endTime: "06:00 PM",
      duration: "2 days",
      amount: 150,
      status: "Active",
      pickupLocation: "T. Nagar Station",
      dropLocation: "Marina Beach",
      category: "Scooter",
    },
    {
      id: "BK122",
      bikeModel: "TVS Jupiter",
      bikeImage: "🛵",
      startDate: "2025-07-15",
      endDate: "2025-07-15",
      startTime: "10:00 AM",
      endTime: "08:00 PM",
      duration: "10 hours",
      amount: 200,
      status: "Completed",
      pickupLocation: "Express Avenue",
      dropLocation: "Express Avenue",
      category: "Scooter",
    },
    {
      id: "BK121",
      bikeModel: "Bajaj Pulsar 150",
      bikeImage: "🏍️",
      startDate: "2025-07-10",
      endDate: "2025-07-10",
      startTime: "08:00 AM",
      endTime: "05:00 PM",
      duration: "9 hours",
      amount: 100,
      status: "Completed",
      pickupLocation: "Central Railway Station",
      dropLocation: "Central Railway Station",
      category: "Motorcycle",
    },
    {
      id: "BK120",
      bikeModel: "Royal Enfield Classic 350",
      bikeImage: "🏍️",
      startDate: "2025-07-05",
      endDate: "2025-07-06",
      startTime: "07:00 AM",
      endTime: "07:00 PM",
      duration: "2 days",
      amount: 300,
      status: "Completed",
      pickupLocation: "Phoenix MarketCity",
      dropLocation: "Mahabalipuram",
      category: "Motorcycle",
    },
    {
      id: "BK119",
      bikeModel: "Hero Splendor Plus",
      bikeImage: "🏍️",
      startDate: "2025-06-28",
      endDate: "2025-06-28",
      startTime: "06:00 AM",
      endTime: "09:00 PM",
      duration: "15 hours",
      amount: 180,
      status: "Cancelled",
      pickupLocation: "Velachery",
      dropLocation: "OMR",
      category: "Motorcycle",
    },
  ];

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "Active":
        return {
          variant: "default",
          className: "bg-green-100 text-green-800 hover:bg-green-200",
          icon: <AlertCircle className="w-3 h-3" />,
          color: "green",
        };
      case "Completed":
        return {
          variant: "secondary",
          className: "bg-blue-100 text-blue-800 hover:bg-blue-200",
          icon: <CheckCircle className="w-3 h-3" />,
          color: "blue",
        };
      case "Cancelled":
        return {
          variant: "destructive",
          className: "bg-red-100 text-red-800 hover:bg-red-200",
          icon: <AlertCircle className="w-3 h-3" />,
          color: "red",
        };
      default:
        return {
          variant: "outline",
          className: "bg-gray-100 text-gray-800",
          icon: <AlertCircle className="w-3 h-3" />,
          color: "gray",
        };
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const activeBookings = bookingHistory.filter(
    (booking) => booking.status === "Active"
  );
  const completedBookings = bookingHistory.filter(
    (booking) => booking.status === "Completed"
  );
  const totalSpent = bookingHistory
    .filter((booking) => booking.status === "Completed")
    .reduce((sum, booking) => sum + booking.amount, 0);

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-2">
            My Bookings
          </h1>
          <p className="text-gray-600 mt-1">
            Track your rental history and current bookings
          </p>
        </div>
      </div>

      {/* Search Bar */}
      {/* <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          placeholder="Search bookings by bike model, location, or booking ID..."
          className="pl-10 h-12 border-gray-300 focus:border-[#AC9456] focus:ring-[#AC9456]"
        />
      </div> */}

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200 hover:shadow-md transition-shadow">
          <CardContent className="p-4 ">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">
                  Active Rentals
                </p>
                <p className="text-2xl font-bold text-green-700">
                  {activeBookings.length}
                </p>
              </div>
              <div className="w-10 h-10 bg-green-200 rounded-full flex items-center justify-center">
                <Bike className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200 hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Completed</p>
                <p className="text-2xl font-bold text-blue-700">
                  {completedBookings.length}
                </p>
              </div>
              <div className="w-10 h-10 bg-blue-200 rounded-full flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200 hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600">
                  Total Spent
                </p>
                <p className="text-2xl font-bold text-purple-700">
                  ₹{totalSpent.toLocaleString()}
                </p>
              </div>
              <div className="w-10 h-10 bg-purple-200 rounded-full flex items-center justify-center">
                <IndianRupee className="w-5 h-5 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bookings List */}
      <div className="mb-6">
        <h2 className="text-xl text-gray-900 font-semibold mb-1">
          Booking History
        </h2>
        <p className="text-gray-600">
          Your complete rental history and current active bookings
        </p>
      </div>

      <div className="space-y-4">
        {bookingHistory.map((booking) => {
          const statusConfig = getStatusConfig(booking.status);

          return (
            <Card
              key={booking.id}
              className={`transition-all duration-200 hover:shadow-lg ${
                booking.status === "Active"
                  ? "ring-2 ring-green-200 bg-gradient-to-r from-green-50 to-white"
                  : "hover:shadow-md bg-white border-gray-200"
              }`}
            >
              <CardContent className="p-4">
                <div className="">
                  {/* Header Section */}
                  <div className="flex items-start gap-3 sm:gap-4 mb-4">
                    <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-[#AC9456] to-[#9B8449] rounded-xl shadow-md flex-shrink-0">
                      <Bike className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col gap-2 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 truncate">
                          {booking.bikeModel}
                        </h3>
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge className={statusConfig.className}>
                            {statusConfig.icon}
                            <span className="ml-1">{booking.status}</span>
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {booking.category}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-sm text-gray-500">ID: #{booking.id}</p>
                    </div>

                    <div className="text-right flex-shrink-0">
                      <div className="flex items-center gap-1 text-xl sm:text-2xl font-bold text-gray-900">
                        <IndianRupee className="w-4 h-4 sm:w-5 sm:h-5" />
                        {booking.amount.toLocaleString()}
                      </div>
                      <p className="text-sm text-gray-600">
                        {booking.duration}
                      </p>
                    </div>
                  </div>

                  {/* Details Grid */}
                  <div className="space-y-3 mb-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <Calendar className="w-4 h-4 text-[#AC9456] flex-shrink-0" />
                        <div className="min-w-0">
                          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                            Date
                          </p>
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {formatDate(booking.startDate)} -{" "}
                            {formatDate(booking.endDate)}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <Clock className="w-4 h-4 text-[#AC9456] flex-shrink-0" />
                        <div className="min-w-0">
                          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                            Time
                          </p>
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {booking.startTime} - {booking.endTime}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                        <MapPin className="w-4 h-4 text-blue-600 flex-shrink-0" />
                        <div className="min-w-0">
                          <p className="text-xs font-medium text-blue-600 uppercase tracking-wide">
                            Pickup
                          </p>
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {booking.pickupLocation}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                        <Navigation className="w-4 h-4 text-purple-600 flex-shrink-0" />
                        <div className="min-w-0">
                          <p className="text-xs font-medium text-purple-600 uppercase tracking-wide">
                            Drop-off
                          </p>
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {booking.dropLocation}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Active Booking Alert */}
                  {booking.status === "Active" && (
                    <div className="bg-gradient-to-r from-green-100 to-green-50 border border-green-200 rounded-xl p-4">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-green-200 rounded-full flex items-center justify-center flex-shrink-0">
                          <Bike className="w-4 h-4 text-green-700" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-green-800 mb-1">
                            🚴‍♂️ Currently Active Rental
                          </p>
                          <p className="text-xs text-green-700">
                            Started on {formatDate(booking.startDate)} at{" "}
                            {booking.startTime}
                          </p>
                          <p className="text-xs text-green-600 mt-1">
                            Duration: {booking.duration}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default MyBookings;
