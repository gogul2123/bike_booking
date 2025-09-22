// "use client";
// import { Card, CardContent } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Calendar, ChevronRight } from "lucide-react";
// import React from "react";
// import { useRouter } from "next/navigation";

// interface Booking {
//   id: string;
//   bikeName: string;
//   date: string;
//   amount: number;
//   status: "completed" | "upcoming" | "cancelled";
// }

// interface RecentBookingsSectionProps {
//   displayBookings: Booking[];
// }

// export const RecentBookingsSection: React.FC<RecentBookingsSectionProps> = ({
//   displayBookings,
// }) => {
//   const router = useRouter();
//   return (
//     <section className="mb-10 animate-in slide-in-from-left duration-600 delay-700">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-bold text-tan-800 flex items-center">
//           <Calendar className="w-6 h-6 mr-2 text-tan-600" />
//           Recent Bookings
//         </h2>
//         <Button
//           variant="ghost"
//           className="text-tan-600 hover:text-tan-700 hover:bg-tan-50"
//           onClick={() => router.push("/bookings")}
//         >
//           View All
//           <ChevronRight className="w-4 h-4 ml-1" />
//         </Button>
//       </div>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         {displayBookings.slice(0, 4).map((booking, index) => (
//           <Card
//             key={booking.id}
//             className="border-tan-200 hover:shadow-md transition-all duration-300 animate-in zoom-in-95"
//             style={{ animationDelay: `${index * 100 + 800}ms` }}
//           >
//             <CardContent className="p-6">
//               <div className="flex justify-between items-start mb-3">
//                 <h3 className="font-semibold text-tan-800">
//                   {booking.bikeName}
//                 </h3>
//                 <Badge
//                   className={
//                     booking.status === "completed"
//                       ? "bg-green-100 text-green-700 border-green-200"
//                       : booking.status === "upcoming"
//                       ? "bg-blue-100 text-blue-700 border-blue-200"
//                       : "bg-red-100 text-red-700 border-red-200"
//                   }
//                 >
//                   {booking.status}
//                 </Badge>
//               </div>
//               <div className="flex justify-between items-center text-sm text-tan-600">
//                 <span>{booking.date}</span>
//                 <span className="font-semibold text-tan-700">
//                   ₹{booking.amount}
//                 </span>
//               </div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>
//     </section>
//   );
// };

"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, ChevronRight, CalendarX } from "lucide-react";
import React from "react";
import { useRouter } from "next/navigation";

// Updated interface based on new data structure
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
  fromDate: Date;
  toDate: Date;
  totalDays: number;
  status: string;
  completedDaysAgo: number;
  totalAmount: number;
}

// Legacy booking interface for backward compatibility
interface LegacyBooking {
  id: string;
  bikeName: string;
  date: string;
  amount: number;
  status: "completed" | "upcoming" | "cancelled";
}

interface RecentBookingsSectionProps {
  displayBookings?: (RecentBooking | LegacyBooking)[];
  showNoBookingsMessage?: boolean;
}

export const RecentBookingsSection: React.FC<RecentBookingsSectionProps> = ({
  displayBookings = [],
  showNoBookingsMessage = false,
}) => {
  const router = useRouter();

  // Helper function to check if booking is legacy format
  const isLegacyBooking = (
    booking: RecentBooking | LegacyBooking
  ): booking is LegacyBooking => {
    return "bikeName" in booking && "date" in booking;
  };

  // Helper function to format date
  const formatDate = (date: Date | string): string => {
    if (typeof date === "string") return date;
    return new Date(date).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Helper function to get bike name from vehicles
  const getBikeName = (vehicles: RecentBookingVehicle[]): string => {
    if (vehicles.length === 0) return "N/A";
    const firstVehicle = vehicles[0];
    return `${firstVehicle.brand} ${firstVehicle.modelName}`;
  };

  // Helper function to get status badge color
  const getStatusBadgeClass = (status: string) => {
    const normalizedStatus = status.toLowerCase();
    switch (normalizedStatus) {
      case "completed":
        return "bg-green-100 text-green-700 border-green-200";
      case "upcoming":
      case "confirmed":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "cancelled":
      case "canceled":
        return "bg-red-100 text-red-700 border-red-200";
      case "pending":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  // Helper function to capitalize status
  const capitalizeStatus = (status: string): string => {
    return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
  };

  // Show no bookings message
  if (showNoBookingsMessage || displayBookings.length === 0) {
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

        <Card className="border-tan-200 border-dashed">
          <CardContent className="p-12 text-center">
            <CalendarX className="w-16 h-16 mx-auto mb-4 text-tan-400" />
            <h3 className="text-xl font-semibold text-tan-700 mb-2">
              No Recent Bookings
            </h3>
            <p className="text-tan-600 mb-6">
              You haven't made any bookings yet. Start your adventure today!
            </p>
            <Button
              className="bg-tan-600 hover:bg-tan-700 text-white"
              onClick={() => router.push("/bikes")}
            >
              Start Booking
            </Button>
          </CardContent>
        </Card>
      </section>
    );
  }

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
        {displayBookings.slice(0, 4).map((booking, index) => {
          // Handle both legacy and new booking formats
          const bookingId = isLegacyBooking(booking)
            ? booking.id
            : booking.bookingId;
          const bikeName = isLegacyBooking(booking)
            ? booking.bikeName
            : getBikeName(booking.vehicles);
          const date = isLegacyBooking(booking)
            ? booking.date
            : formatDate(booking.fromDate);
          const amount = isLegacyBooking(booking)
            ? booking.amount
            : booking.totalAmount;
          const status = isLegacyBooking(booking)
            ? booking.status
            : booking.status;
          const totalDays = isLegacyBooking(booking) ? 1 : booking.totalDays;

          return (
            <Card
              key={bookingId}
              className="border-tan-200 hover:shadow-md transition-all duration-300 animate-in zoom-in-95 cursor-pointer"
              style={{ animationDelay: `${index * 100 + 800}ms` }}
              onClick={() => router.push(`/bookings/${bookingId}`)}
            >
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-tan-800 mb-1">
                      {bikeName}
                    </h3>
                    {!isLegacyBooking(booking) &&
                      booking.vehicles.length > 0 && (
                        <p className="text-sm text-tan-500">
                          {booking.vehicles[0].vehicleNumber} •{" "}
                          {booking.vehicles[0].category}
                        </p>
                      )}
                  </div>
                  <Badge className={getStatusBadgeClass(status)}>
                    {capitalizeStatus(status)}
                  </Badge>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm text-tan-600">
                    <span>
                      {!isLegacyBooking(booking) && totalDays > 1
                        ? `${formatDate(booking.fromDate)} - ${formatDate(
                            booking.toDate
                          )}`
                        : date}
                    </span>
                    {!isLegacyBooking(booking) && totalDays > 1 && (
                      <span className="text-xs bg-tan-100 text-tan-700 px-2 py-1 rounded">
                        {totalDays} days
                      </span>
                    )}
                  </div>

                  <div className="flex justify-between items-center">
                    {!isLegacyBooking(booking) &&
                      booking.completedDaysAgo > 0 && (
                        <span className="text-xs text-tan-500">
                          {booking.completedDaysAgo} days ago
                        </span>
                      )}
                    <span className="font-semibold text-tan-700 ml-auto">
                      ₹{amount.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
};
