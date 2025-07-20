'use client';

import { Bike, Calendar, Clock, IndianRupee, MapPin } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";

// MyBookings Component with dummy data
const MyBookings = () => {
  const bookingHistory = [
    {
      id: 'BK123',
      bikeModel: 'Honda Activa 6G',
      startDate: '2025-07-18',
      endDate: '2025-07-19',
      startTime: '09:00 AM',
      endTime: '06:00 PM',
      duration: '2 days',
      amount: 150,
      status: 'Active',
      pickupLocation: 'T. Nagar Station',
      dropLocation: 'Marina Beach'
    },
    {
      id: 'BK122',
      bikeModel: 'TVS Jupiter',
      startDate: '2025-07-15',
      endDate: '2025-07-15',
      startTime: '10:00 AM',
      endTime: '08:00 PM',
      duration: '10 hours',
      amount: 200,
      status: 'Completed',
      pickupLocation: 'Express Avenue',
      dropLocation: 'Express Avenue'
    },
    {
      id: 'BK121',
      bikeModel: 'Bajaj Pulsar 150',
      startDate: '2025-07-10',
      endDate: '2025-07-10',
      startTime: '08:00 AM',
      endTime: '05:00 PM',
      duration: '9 hours',
      amount: 100,
      status: 'Completed',
      pickupLocation: 'Central Railway Station',
      dropLocation: 'Central Railway Station'
    },
    {
      id: 'BK120',
      bikeModel: 'Royal Enfield Classic 350',
      startDate: '2025-07-05',
      endDate: '2025-07-06',
      startTime: '07:00 AM',
      endTime: '07:00 PM',
      duration: '2 days',
      amount: 300,
      status: 'Completed',
      pickupLocation: 'Phoenix MarketCity',
      dropLocation: 'Mahabalipuram'
    },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bike className="w-5 h-5" />
            My Bookings
          </CardTitle>
          <CardDescription>Your bike rental history and current rentals</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {bookingHistory.map((booking) => (
              <Card key={booking.id} className={`${booking.status === 'Active' ? 'border-green-500 bg-green-50' : ''}`}>
                <CardContent className="p-4">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-lg">{booking.bikeModel}</h3>
                        <Badge variant={booking.status === 'Active' ? 'destructive' : 'secondary'}>
                          {booking.status}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>{booking.startDate} to {booking.endDate}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>{booking.startTime} - {booking.endTime}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          <span>From: {booking.pickupLocation}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          <span>To: {booking.dropLocation}</span>
                        </div>
                      </div>
                      
                      {booking.status === 'Active' && (
                        <div className="mt-3 p-3 bg-green-100 rounded-lg">
                          <p className="text-sm text-green-800">
                            🚴‍♂️ <strong>Currently Rented</strong> - Rental Duration: {booking.duration}
                          </p>
                          <p className="text-xs text-green-700 mt-1">
                            Started: {booking.startDate} at {booking.startTime}
                          </p>
                        </div>
                      )}
                    </div>
                    
                    <div className="text-right">
                      <p className="text-xl font-bold flex items-center gap-1 justify-end">
                        <IndianRupee className="w-5 h-5" />
                        {booking.amount}
                      </p>
                      <p className="text-sm text-gray-600">{booking.duration}</p>
                      <p className="text-xs text-gray-500">ID: {booking.id}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MyBookings;

