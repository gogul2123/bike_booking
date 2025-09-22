"use client";
import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import {
  Calendar,
  CreditCard,
  Settings,
  ChevronRight,
  Bike,
  TrendingUp,
  ArrowRight,
  CheckCircle,
  Clock,
  Star,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Container from "@/components/ui/container";
import { useAppContext } from "@/hooks/context";
import { useRouter } from "next/navigation";
import { cloudinaryLoader } from "@/lib/ImageLoader";

// API Response Types
interface RecentBookingVehicle {
  bikeId: string;
  vehicleNumber: string;
  modelName: string;
  brand: string;
  category: string;
  basePrice: number;
  weekendMultiplier: number;
  currency: string;
}

interface RecentBooking {
  bookingId: string;
  vehicles: RecentBookingVehicle[];
  fromDate: string;
  toDate: string;
  totalDays: number;
  status: string;
  totalAmount: number;
}

interface RecommendedBike {
  bikeId: string;
  modelInfo: {
    brand: string;
    model: string;
    category: string;
    type: string;
    transmission: string;
    imageUrl?: string;
  };
  pricing: {
    basePrice: number;
  };
}

interface DashboardData {
  recentBookings: RecentBooking[];
  recommendedBikes: RecommendedBike[];
}

const Dashboard: React.FC = () => {
  const { userData, URL: url } = useAppContext();
  const router = useRouter();
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const quickAccessItems = [
    {
      icon: Calendar,
      title: "My Bookings",
      description: "View upcoming & past rides",
      gradient: "from-tan-500 to-tan-700",
      path: "/bookings",
    },
    {
      icon: CreditCard,
      title: "Payment History",
      description: "View past payments",
      gradient: "from-tan-400 to-tan-600",
      path: "/payment-history",
    },
    {
      icon: Settings,
      title: "Account Settings",
      description: "Profile & preferences",
      gradient: "from-tan-600 to-tan-800",
      path: "/profile",
    },
  ];

  // Fetch dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!url || !userData?.userId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await fetch(
          `${url}user/dashboard/${userData?.userId}`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        if (result.success) {
          setDashboardData(result.data);
        } else {
          throw new Error(result.message || "Failed to fetch dashboard data");
        }
        setError(null);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError(
          err instanceof Error ? err.message : "Failed to fetch dashboard data"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [url, userData?.userId]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const scrollLeft = () => {
    scrollContainerRef.current?.scrollBy({
      left: -300,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    scrollContainerRef.current?.scrollBy({
      left: 300,
      behavior: "smooth",
    });
  };

  if (loading) {
    return (
      <Container>
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-tan-600"></div>
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <p className="text-red-600 mb-4">
              Error loading dashboard: {error}
            </p>
            <Button
              onClick={() => window.location.reload()}
              className="bg-tan-600 hover:bg-tan-700"
            >
              Retry
            </Button>
          </div>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      {/* Welcome Section */}
      <section className="px-4 md:px-6 py-6 md:py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center space-x-3 md:space-x-4">
              <Avatar className="w-12 h-12 md:w-16 md:h-16 border-4 border-tan-300">
                <AvatarFallback className="bg-tan-600 text-white text-lg md:text-xl font-bold">
                  {userData?.name?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-xl md:text-3xl font-bold text-tan-800 mb-1 md:mb-2">
                  Welcome back, {userData?.name || "User"}! 👋
                </h1>
                <p className="text-tan-600 text-sm md:text-lg">
                  Ready for your next adventure?
                </p>
              </div>
            </div>
            <Button
              onClick={() => router.push("/bikes")}
              size="lg"
              className="w-full sm:w-auto bg-tan-600 hover:bg-tan-700 text-white shadow-lg hover:shadow-xl transition-all"
            >
              <Bike className="w-4 h-4 md:w-5 md:h-5 mr-2" />
              Browse Bikes
            </Button>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 md:px-6 py-4 md:py-8 space-y-6 md:space-y-8">
        {/* Quick Access Cards */}
        <section>
          <h2 className="text-xl md:text-2xl font-bold text-tan-800 mb-6 flex items-center">
            <TrendingUp className="w-5 h-5 md:w-6 md:h-6 mr-2 text-tan-600" />
            Quick Access
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {quickAccessItems.map((item, index) => (
              <Card
                key={index}
                onClick={() => router.push(item.path)}
                className="group hover:shadow-xl transition-all duration-300 border-tan-200 hover:border-tan-300 cursor-pointer hover:scale-[1.02]"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div
                        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                      >
                        <item.icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="font-semibold text-lg mb-2 text-tan-800 group-hover:text-tan-700 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-sm text-tan-600 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-tan-400 group-hover:text-tan-600 group-hover:translate-x-1 transition-all duration-300 flex-shrink-0 ml-2" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Recent Bookings Section */}
        <section>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <h2 className="text-xl md:text-2xl font-bold text-tan-800 flex items-center">
              <Clock className="w-5 h-5 md:w-6 md:h-6 mr-2 text-tan-600" />
              Recent Bookings
            </h2>
            <Button
              onClick={() => router.push("/bookings")}
              variant="outline"
              size="sm"
              className="border-tan-300 text-tan-700 hover:bg-tan-50 hover:border-tan-400 transition-all"
            >
              View All <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          {dashboardData?.recentBookings &&
          dashboardData.recentBookings.length > 0 ? (
            <div className="space-y-4">
              {dashboardData.recentBookings.slice(0, 3).map((booking) => (
                <Card
                  key={booking.bookingId}
                  className="border-tan-200 hover:shadow-lg transition-all duration-300"
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-3">
                          <h3 className="font-semibold text-lg text-tan-800">
                            {booking.vehicles[0]?.brand}{" "}
                            {booking.vehicles[0]?.modelName}
                          </h3>
                          <Badge
                            className={`text-xs w-fit font-medium px-3 py-1 ${getStatusColor(
                              booking.status
                            )}`}
                          >
                            {booking.status}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm text-tan-600">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>{formatDate(booking.fromDate)}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="w-4 h-4 flex items-center justify-center text-xs font-medium bg-tan-100 text-tan-700 rounded">
                              #
                            </span>
                            <span>{booking.vehicles[0]?.vehicleNumber}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>
                              {booking.totalDays} day
                              {booking.totalDays > 1 ? "s" : ""}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-tan-800 mb-1">
                          ₹{booking.totalAmount}
                        </p>
                        <p className="text-sm text-tan-600">Total Amount</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="border-tan-200">
              <CardContent className="p-8 text-center">
                <div className="text-tan-400 mb-6">
                  <Calendar className="w-20 h-20 mx-auto" />
                </div>
                <h3 className="text-2xl font-semibold text-tan-800 mb-3">
                  No bookings yet
                </h3>
                <p className="text-tan-600 text-base mb-6 max-w-md mx-auto">
                  Start your journey by booking your first bike and explore
                  amazing destinations!
                </p>
                <Button
                  onClick={() => router.push("/bikes")}
                  size="lg"
                  className="bg-tan-600 hover:bg-tan-700 px-8 py-3"
                >
                  <Bike className="w-5 h-5 mr-2" />
                  Browse Bikes
                </Button>
              </CardContent>
            </Card>
          )}
        </section>

        {/* Recommended Bikes Section */}
        <section>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <h2 className="text-xl md:text-2xl font-bold text-tan-800 flex items-center">
              <Star className="w-5 h-5 md:w-6 md:h-6 mr-2 text-tan-600" />
              Recommended for You
            </h2>
            <Button
              onClick={() => router.push("/bikes")}
              variant="outline"
              size="sm"
              className="border-tan-300 text-tan-700 hover:bg-tan-50 hover:border-tan-400 transition-all"
            >
              View All <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          {dashboardData?.recommendedBikes &&
          dashboardData.recommendedBikes.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
              {dashboardData.recommendedBikes.map((bike) => (
                <Card
                  key={bike.bikeId}
                  className="border-tan-200 hover:shadow-xl transition-all cursor-pointer group"
                  onClick={() => router.push(`/bikes/${bike.bikeId}`)}
                >
                  <CardContent className="p-0">
                    <div className="aspect-video bg-gradient-to-br from-tan-50 to-tan-100 overflow-hidden rounded-t-lg relative">
                      {bike.modelInfo.imageUrl ? (
                        <Image
                          src={bike.modelInfo.imageUrl}
                          alt={`${bike.modelInfo.brand} ${bike.modelInfo.model}`}
                          fill={true}
                          className="object-contain group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 768px) 100vw, 150px" // optimization hint
                          loading="lazy"
                          objectFit="cover"
                          loader={cloudinaryLoader}
                          priority={false}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Bike className="w-16 h-16 text-tan-400" />
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <div className="space-y-3">
                        <h3 className="font-semibold text-lg text-tan-800 group-hover:text-tan-700 transition-colors">
                          {bike.modelInfo.brand} {bike.modelInfo.model}
                        </h3>
                        <div className="flex items-center justify-between">
                          <Badge className="bg-tan-100 text-tan-700 border-tan-200 hover:bg-tan-200 px-3 py-1 text-sm font-medium capitalize">
                            {bike.modelInfo.transmission}
                          </Badge>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-tan-800">
                              ₹{bike.pricing.basePrice}
                            </p>
                            <p className="text-sm text-tan-600">per day</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="border-tan-200">
              <CardContent className="p-8 text-center">
                <div className="text-tan-400 mb-6">
                  <Star className="w-20 h-20 mx-auto" />
                </div>
                <h3 className="text-2xl font-semibold text-tan-800 mb-3">
                  Discover Amazing Bikes
                </h3>
                <p className="text-tan-600 text-base mb-6 max-w-md mx-auto">
                  Browse our premium collection of bikes to find your perfect
                  ride for any adventure!
                </p>
                <Button
                  onClick={() => router.push("/bikes")}
                  size="lg"
                  className="bg-tan-600 hover:bg-tan-700 px-8 py-3"
                >
                  <Bike className="w-5 h-5 mr-2" />
                  Browse Bikes
                </Button>
              </CardContent>
            </Card>
          )}
        </section>
      </div>
    </Container>
  );
};

export default Dashboard;
