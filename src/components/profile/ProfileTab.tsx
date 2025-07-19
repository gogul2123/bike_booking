'use client';

import { Calendar, Mail, MapPin, Phone, User } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "@radix-ui/react-select";

// ProfileTab Component with dummy data
const ProfileTab = () => {
  const userProfile = {
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@email.com',
    phone: '+91 98765 43210',
    address: 'No. 45, Anna Nagar, Chennai, Tamil Nadu - 600040',
    joinedDate: '2023-05-15',
    totalBookings: 24,
    totalSpent: 12500
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            User Profile
          </CardTitle>
          <CardDescription>Your personal information and account details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-600">Full Name</label>
              <p className="text-lg">{userProfile.name}</p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-600">Email</label>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                {userProfile.email}
              </p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-600">Phone</label>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                {userProfile.phone}
              </p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-600">Member Since</label>
              <p className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {new Date(userProfile.joinedDate).toLocaleDateString()}
              </p>
            </div>
          </div>
          <Separator />
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-600">Address</label>
            <p className="flex items-start gap-2">
              <MapPin className="w-4 h-4 mt-1" />
              {userProfile.address}
            </p>
          </div>
          <Separator />
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">{userProfile.totalBookings}</p>
              <p className="text-sm text-gray-600">Total Bookings</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-2xl font-bold text-green-600">₹{userProfile.totalSpent.toLocaleString()}</p>
              <p className="text-sm text-gray-600">Total Spent</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileTab;
