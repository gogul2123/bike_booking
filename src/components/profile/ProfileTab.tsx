
'use client';

import React, { useState } from 'react';
import { Calendar, Mail, MapPin, Phone, User, Edit3, Shield, Award, TrendingUp, X, Save } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

// ProfileTab Component with enhanced professional design
const ProfileTab = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [userProfile, setUserProfile] = useState({
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@email.com',
    phone: '+91 98765 43210',
    address: 'No. 45, Anna Nagar, Chennai, Tamil Nadu - 600040',
    joinedDate: '2023-05-15',
    totalBookings: 24,
    totalSpent: 12500,
    lastBooking: '2024-07-28'
  });

  const [editFormData, setEditFormData] = useState({
    name: userProfile.name,
    email: userProfile.email,
    phone: userProfile.phone,
    address: userProfile.address,
  });

  // Calculate membership level based on total bookings
  const getMembershipLevel = (bookings: number) => {
    if (bookings < 10) return 'Silver';
    if (bookings >= 10 && bookings < 20) return 'Gold';
    return 'Platinum';
  };

  const getMembershipColor = (level: string) => {
    switch (level) {
      case 'Silver': return 'bg-gray-100 text-gray-800';
      case 'Gold': return 'bg-yellow-100 text-yellow-800';
      case 'Platinum': return 'bg-purple-100 text-purple-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  const membershipLevel = getMembershipLevel(userProfile.totalBookings);
  const membershipColor = getMembershipColor(membershipLevel);

  const handleEditClick = () => {
    setEditFormData({
      name: userProfile.name,
      email: userProfile.email,
      phone: userProfile.phone,
      address: userProfile.address,
    });
    setIsEditModalOpen(true);
  };

  const handleSave = () => {
    setUserProfile(prev => ({
      ...prev,
      ...editFormData
    }));
    setIsEditModalOpen(false);
  };

  const handleCancel = () => {
    setEditFormData({
      name: userProfile.name,
      email: userProfile.email,
      phone: userProfile.phone,
      address: userProfile.address,
    });
    setIsEditModalOpen(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setEditFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Profile</h1>
          <p className="text-gray-600 mt-1">Manage your account information and preferences</p>
        </div>
       <Button 
          onClick={handleEditClick}
          className="hidden sm:flex items-center bg-gradient-to-r from-[#AC9456] to-[#D4B76A] hover:from-[#9B8449] hover:to-[#C4A659] text-white shadow-md hover:shadow-lg transition-all duration-200 w-full sm:w-auto"
        >
          <Edit3 className="w-4 h-4 mr-2" />
          Edit Profile
        </Button>

      </div>

      {/* Main Profile Card */}
      <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-gray-50">
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-[#AC9456] to-[#D4B76A] rounded-full flex items-center justify-center shadow-lg">
                <User className="w-8 h-8 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl sm:text-2xl text-gray-900">{userProfile.name}</CardTitle>
                <div className="flex flex-wrap items-center gap-2 mt-2">
                  <Badge className={`${membershipColor} border-0 font-medium`}>
                    <Award className="w-3 h-3 mr-1" />
                    {membershipLevel} Member
                  </Badge>
                  <Badge variant="outline" className="text-gray-600 border-gray-300">
                    <Shield className="w-3 h-3 mr-1" />
                    Verified
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Mail className="w-5 h-5 text-[#AC9456]" />
              Contact Information
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="group p-4 rounded-xl bg-white border border-gray-200 hover:border-[#AC9456]/30 hover:shadow-md transition-all duration-200">
                <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">Email Address</label>
                <p className="text-gray-900 font-medium mt-1 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#AC9456]" />
                  {userProfile.email}
                </p>
              </div>
              <div className="group p-4 rounded-xl bg-white border border-gray-200 hover:border-[#AC9456]/30 hover:shadow-md transition-all duration-200">
                <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">Phone Number</label>
                <p className="text-gray-900 font-medium mt-1 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#AC9456]" />
                  {userProfile.phone}
                </p>
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#AC9456]" />
              Address Information
            </h3>
            <div className="p-4 rounded-xl bg-white border border-gray-200 hover:border-[#AC9456]/30 hover:shadow-md transition-all duration-200">
              <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">Primary Address</label>
              <p className="text-gray-900 font-medium mt-1 flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#AC9456] mt-0.5 flex-shrink-0" />
                <span className="leading-relaxed">{userProfile.address}</span>
              </p>
            </div>
          </div>

          {/* Account Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[#AC9456]" />
              Account Details
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-white border border-gray-200 hover:border-[#AC9456]/30 hover:shadow-md transition-all duration-200">
                <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">Member Since</label>
                <p className="text-gray-900 font-medium mt-1 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#AC9456]" />
                  {new Date(userProfile.joinedDate).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white border border-gray-200 hover:border-[#AC9456]/30 hover:shadow-md transition-all duration-200">
                <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">Last Booking</label>
                <p className="text-gray-900 font-medium mt-1 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-[#AC9456]" />
                  {new Date(userProfile.lastBooking).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <Card className="relative overflow-hidden shadow-lg border-0 bg-gradient-to-r from-blue-50 to-blue-100 hover:shadow-xl transition-all duration-300 group">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600 uppercase tracking-wide">Total Bookings</p>
                <p className="text-3xl font-bold text-blue-700 mt-2">{userProfile.totalBookings}</p>
                <p className="text-sm text-blue-600 mt-1">Successful rides</p>
              </div>
              <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="absolute top-0 right-0 w-20 h-20 bg-blue-200/30 rounded-full -translate-y-10 translate-x-10"></div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden shadow-lg border-0 bg-gradient-to-r from-green-50 to-green-100 hover:shadow-xl transition-all duration-300 group">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600 uppercase tracking-wide">Total Spent</p>
                <p className="text-3xl font-bold text-green-700 mt-2">₹{userProfile.totalSpent.toLocaleString()}</p>
                <p className="text-sm text-green-600 mt-1">Lifetime value</p>
              </div>
              <div className="w-12 h-12 bg-green-200 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="absolute top-0 right-0 w-20 h-20 bg-green-200/30 rounded-full -translate-y-10 translate-x-10"></div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="block sm:hidden shadow-lg border-0 bg-gradient-to-br from-white to-gray-50">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">Quick Actions</CardTitle>
          <CardDescription>Manage your account settings and preferences</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <Button variant="outline" className="justify-start h-12 hover:border-[#AC9456] hover:text-[#AC9456] transition-colors duration-200" onClick={handleEditClick}>
              <Edit3 className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
            {/* <Button variant="outline" className="justify-start h-12 hover:border-[#AC9456] hover:text-[#AC9456] transition-colors duration-200">
              <Shield className="w-4 h-4 mr-2" />
              Privacy Settings
            </Button>
            <Button variant="outline" className="justify-start h-12 hover:border-[#AC9456] hover:text-[#AC9456] transition-colors duration-200">
              <Mail className="w-4 h-4 mr-2" />
              Notifications
            </Button> */}
          </div>
        </CardContent>
      </Card>

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white rounded-t-2xl border-b border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Edit Profile</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCancel}
                  className="h-8 w-8 p-0 hover:bg-gray-100"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Name Field */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                  Full Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  value={editFormData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full h-12 border-gray-300 focus:border-[#AC9456] focus:ring-[#AC9456] rounded-lg"
                  placeholder="Enter your full name"
                />
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={editFormData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full h-12 border-gray-300 focus:border-[#AC9456] focus:ring-[#AC9456] rounded-lg"
                  placeholder="Enter your email address"
                />
              </div>

              {/* Phone Field */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={editFormData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="w-full h-12 border-gray-300 focus:border-[#AC9456] focus:ring-[#AC9456] rounded-lg"
                  placeholder="Enter your phone number"
                />
              </div>

              {/* Address Field */}
              <div className="space-y-2">
                <Label htmlFor="address" className="text-sm font-medium text-gray-700">
                  Address
                </Label>
                <Input
                  id="address"
                  type="text"
                  value={editFormData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  className="w-full h-12 border-gray-300 focus:border-[#AC9456] focus:ring-[#AC9456] rounded-lg"
                  placeholder="Enter your full address"
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-white rounded-b-2xl border-t border-gray-200 p-6">
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  variant="outline"
                  onClick={handleCancel}
                  className="flex-1 h-12 border-gray-300 hover:bg-gray-50 text-gray-700"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSave}
                  className="flex-1 h-12 bg-gradient-to-r from-[#AC9456] to-[#D4B76A] hover:from-[#9B8449] hover:to-[#C4A659] text-white shadow-md hover:shadow-lg transition-all duration-200"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileTab;