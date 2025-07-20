"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, ChevronRight } from "lucide-react";
import React from "react";
import { useRouter } from "next/navigation";

interface Booking {
  id: string;
  bikeName: string;
  date: string;
  amount: number;
  status: "completed" | "upcoming" | "cancelled";
}

interface RecentBookingsSectionProps {
  displayBookings: Booking[];
}

export const RecentBookingsSection: React.FC<RecentBookingsSectionProps> = ({
  displayBookings,
}) => {
  const router = useRouter();
  return (
    <section className="mb-10 animate-in slide-in-from-left duration-600 delay-700">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-tan-800 flex items-center">
          <Calendar className="w-6 h-6 mr-2 text-tan-600" />
          Recent Bookings
        </h2>
        <Button
          variant="ghost"
          className="text-tan-600 hover:text-tan-700 hover:bg-tan-50"
          onClick={() => router.push("/bookings")}
        >
          View All
          <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {displayBookings.slice(0, 4).map((booking, index) => (
          <Card
            key={booking.id}
            className="border-tan-200 hover:shadow-md transition-all duration-300 animate-in zoom-in-95"
            style={{ animationDelay: `${index * 100 + 800}ms` }}
          >
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-semibold text-tan-800">
                  {booking.bikeName}
                </h3>
                <Badge
                  className={
                    booking.status === "completed"
                      ? "bg-green-100 text-green-700 border-green-200"
                      : booking.status === "upcoming"
                      ? "bg-blue-100 text-blue-700 border-blue-200"
                      : "bg-red-100 text-red-700 border-red-200"
                  }
                >
                  {booking.status}
                </Badge>
              </div>
              <div className="flex justify-between items-center text-sm text-tan-600">
                <span>{booking.date}</span>
                <span className="font-semibold text-tan-700">
                  ₹{booking.amount}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
