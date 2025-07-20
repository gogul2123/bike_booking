"use client";
import React, { useRef } from "react";
import {
  MapPin,
  Calendar,
  Play,
  CreditCard,
  Heart,
  Settings,
  Clock,
  Navigation,
  Star,
  ChevronRight,
  Bike,
  Gift,
  TrendingUp,
  ChevronLeft,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import sampleImage from "../../../../public/bikeImg/landing/Royal_Enfield_Himalayan.jpg";
import BikeCard from "@/components/bikes/bike-card";
import Container from "@/components/ui/container";
import { CurrentRentalSection } from "@/components/dashboard/current-rental-section";
import { QuickAccessSection } from "@/components/dashboard/quick-actions";
import {
  Bike as bikeType,
  RecommendedSection,
} from "@/components/dashboard/recomended";
import { RecentBookingsSection } from "@/components/dashboard/booking-history";
interface User {
  name: string;
  id: string;
  avatar?: string;
}

interface ActiveRental {
  bikeId: string;
  bikeName: string;
  startTime: string;
  duration: string;
  location: string;
  isActive: boolean;
}

interface RecentBooking {
  id: string;
  bikeName: string;
  date: string;
  status: "completed" | "cancelled" | "upcoming";
  amount: number;
}

interface RecommendedBike {
  id: string;
  name: string;
  image: string;
  rating: number;
  pricePerDay: number;
  category: string;
}

interface DashboardProps {
  user: User;
  activeRental?: ActiveRental;
  recentBookings: RecentBooking[];
  recommendedBikes: RecommendedBike[];
}

const Dashboard: React.FC<DashboardProps> = ({
  user = { name: "Golu", id: "user123" },
  activeRental,
  recentBookings = [],
  recommendedBikes = [],
}) => {
  const quickAccessItems = [
    {
      icon: Calendar,
      title: "My Bookings",
      description: "View upcoming & past rides",
      gradient: "from-tan-500 to-tan-700",
    },
    {
      icon: CreditCard,
      title: "Payment History",
      description: "View past payments",
      gradient: "from-tan-400 to-tan-600",
    },
    {
      icon: Settings,
      title: "Account Settings",
      description: "Profile & preferences",
      gradient: "from-tan-600 to-tan-800",
    },
  ];

  const bikesData: bikeType[] = [
    {
      _id: "650a1fb9f1d2c45678abc001",
      brand: "Royal Enfield",
      model: "Himalayan 411",
      category: "motorcycle",
      type: "off-road",
      availability: true,
      price_per_day_INR: 1800,
      colors: ["Gravel Grey", "Pine Green", "Rock Red"],
      inventory: {
        total: 6,
        by_color: { "Gravel Grey": 2, "Pine Green": 2, "Rock Red": 2 },
      },
      imageUrl: sampleImage.src,
      transmission: "gear",
      created_at: "2025-07-01T08:00:00Z",
      updated_at: "2025-07-12T08:00:00Z",
    },
    {
      _id: "650a1fb9f1d2c45678abc002",
      brand: "Royal Enfield",
      model: "Himalayan 452",
      category: "motorcycle",
      type: "off-road",
      availability: true,
      price_per_day_INR: 3000,
      colors: ["Kaza Brown", "Slate Salt", "Hanle Black"],
      inventory: {
        total: 4,
        by_color: { "Kaza Brown": 1, "Slate Salt": 1, "Hanle Black": 2 },
      },
      imageUrl: sampleImage.src,
      transmission: "gear",
      created_at: "2025-07-01T08:10:00Z",
      updated_at: "2025-07-12T08:10:00Z",
    },
    {
      _id: "650a1fb9f1d2c45678abc003",
      brand: "Royal Enfield",
      model: "Hunter 350",
      category: "motorcycle",
      type: "roadster",
      availability: true,
      price_per_day_INR: 1600,
      colors: ["Rebel Black", "Retro Green"],
      inventory: { total: 5, by_color: { "Rebel Black": 3, "Retro Green": 2 } },
      imageUrl: sampleImage.src,
      transmission: "gear",
      created_at: "2025-07-01T08:20:00Z",
      updated_at: "2025-07-12T08:20:00Z",
    },
  ];

  const mockActiveRental: ActiveRental = {
    bikeId: "BK001",
    bikeName: "Royal Enfield Classic 350",
    startTime: "2:30 PM",
    duration: "4h 30m",
    location: "Marina Beach, Chennai",
    isActive: true,
  };

  const mockRecentBookings: RecentBooking[] = [
    {
      id: "B001",
      bikeName: "Honda CBR 250R",
      date: "2025-07-10",
      status: "completed",
      amount: 1200,
    },
    {
      id: "B002",
      bikeName: "Yamaha FZ-S",
      date: "2025-07-08",
      status: "completed",
      amount: 800,
    },
  ];

  const mockRecommendedBikes: RecommendedBike[] = [
    {
      id: "RB001",
      name: "Royal Enfield Himalayan",
      image: "/api/placeholder/300/200",
      rating: 4.8,
      pricePerDay: 1500,
      category: "Adventure",
    },
    {
      id: "RB002",
      name: "KTM Duke 390",
      image: "/api/placeholder/300/200",
      rating: 4.7,
      pricePerDay: 1800,
      category: "Sport",
    },
  ];

  const scrollContainerRef = useRef<HTMLDivElement>(
    null
  ) as React.RefObject<HTMLDivElement>;

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

  const currentActiveRental = activeRental || mockActiveRental;
  const displayBookings =
    recentBookings.length > 0 ? recentBookings : mockRecentBookings;
  const displayRecommended =
    recommendedBikes.length > 0 ? recommendedBikes : mockRecommendedBikes;

  return (
    <Container>
      {/* Welcome Section */}
      <section className="px-6 py-8 animate-in fade-in-0 duration-700">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center animate-in slide-in-from-top duration-500">
            <div className="flex items-center space-x-4">
              <Avatar className="w-16 h-16 border-4 border-tan-300">
                <AvatarImage src={user.avatar} />
                <AvatarFallback className="bg-tan-600 text-white text-xl font-bold">
                  {user.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-3xl font-bold text-tan-800 mb-2">
                  Welcome back, {user.name}! 👋
                </h1>
                <p className="text-tan-600 text-lg">
                  Ready for your next adventure?
                </p>
              </div>
            </div>
            <Button
              size="lg"
              className="mt-4 md:mt-0 bg-tan-600 hover:bg-tan-700 text-white shadow-lg hover:shadow-xl transition-all  animate-in slide-in-from-right duration-700"
            >
              <Bike className="w-5 h-5 mr-2" />
              Rent a Bike
            </Button>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto  px-0 md:px-2 lg:px-6 py-8">
        {/* Quick Access Cards */}
        {/* <section className="mb-10 animate-in slide-in-from-left duration-600 delay-300">
          <h2 className="text-2xl font-bold text-tan-800 mb-6 flex items-center">
            <TrendingUp className="w-6 h-6 mr-2 text-tan-600" />
            Quick Access
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quickAccessItems.map((item, index) => (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all  border-tan-200 hover:border-tan-300 cursor-pointer animate-in zoom-in-95 duration-500"
                style={{ animationDelay: `${index * 100 + 400}ms` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div
                        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                      >
                        <item.icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="font-semibold text-lg mb-2 text-tan-800">
                        {item.title}
                      </h3>
                      <p className="text-sm text-tan-600">{item.description}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-tan-400 group-hover:text-tan-600 group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section> */}

        <QuickAccessSection quickAccessItems={quickAccessItems} />

        {/* Current Rental Section */}
        <CurrentRentalSection currentActiveRental={currentActiveRental} />

        {/* Booking History Section */}
        <RecentBookingsSection displayBookings={displayBookings} />

        {/* Recommended Bikes Section */}
        <RecommendedSection
          bikesData={bikesData}
          scrollLeft={scrollLeft}
          scrollRight={scrollRight}
          scrollContainerRef={scrollContainerRef}
        />
      </div>
    </Container>
  );
};

export default Dashboard;
