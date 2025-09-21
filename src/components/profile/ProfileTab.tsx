"use client";

import React, { useEffect, useState } from "react";
import {
  Calendar,
  Mail,
  MapPin,
  Phone,
  User,
  Edit3,
  Shield,
  Award,
  TrendingUp,
  X,
  Save,
  Edit,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useAppContext } from "@/hooks/context";
import { useAlert } from "@/hooks/alertHook";
import Alert from "../ui/alert";
import { getFromLocalStorage } from "../ui/encryption";
import { useLogOut } from "@/hooks/useLogout";
import { useRouter } from "next/navigation";

// ProfileTab Component with enhanced professional design
const ProfileTab = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { alert, showAlert, hideAlert } = useAlert();
  const { URL } = useAppContext();
  const isLogedIn = true;
  const Logout = useLogOut();
  const userId = getFromLocalStorage("userId");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Updated initial state structure to match API response
  const [userProfile, setUserProfile] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    joinedDate: "",
    totalBookings: 0,
    totalSpent: 0,
  });

  const [editFormData, setEditFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: {
      street: "",
      city: "",
      state: "",
      country: "",
      zipCode: "",
    },
  });

  // Calculate membership level based on total bookings
  const getMembershipLevel = (bookings) => {
    if (bookings < 10) return "Silver";
    if (bookings >= 10 && bookings < 20) return "Gold";
    return "Platinum";
  };

  const getMembershipColor = (level) => {
    switch (level) {
      case "Silver":
        return "bg-gray-100 text-gray-800";
      case "Gold":
        return "bg-yellow-100 text-yellow-800";
      case "Platinum":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  const membershipLevel = getMembershipLevel(userProfile.totalBookings);
  const membershipColor = getMembershipColor(membershipLevel);

  const profileFetch = async () => {
    setIsLoading(true);
    const payload = {
      userId: userId,
    };
    try {
      const res = await fetch(`${URL}user/get-user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (res.status === 200) {
        const result = await res.json();
        const mappedProfile = {
          name: result.data.name || "User Name Not Set",
          email: result.data.email || "email@example.com",
          phone: result.data.mobile || "9865432100",
          address: result.data.address
            ? `${result.data.address.street || ""} ${
                result.data.address.city || ""
              } ${result.data.address.state || ""} ${
                result.data.address.country || ""
              } ${result.data.address.zipCode || ""}`.trim() ||
              "Address not provided"
            : "Address not provided",
          joinedDate: result.data.createdAt || new Date().toISOString(),
          // Hard-coded fallback data for missing fields
          totalBookings: result?.data?.totalBookings,
          totalSpent: result?.data?.totalPaymentAmount,
        };

        setUserProfile(mappedProfile);

        // Update edit form data
        setEditFormData({
          name: mappedProfile.name,
          email: mappedProfile.email,
          phone: mappedProfile.phone,
          address: result.data.address
            ? {
                street: result.data.address.street || "",
                city: result.data.address.city || "",
                state: result.data.address.state || "",
                country: result.data.address.country || "",
                zipCode: result.data.address.zipCode || "",
              }
            : {
                street: "",
                city: "",
                state: "",
                country: "",
                zipCode: "",
              },
        });
      } else if (res.status === 404) {
        showAlert("User not found", "error");
        Logout();
      } else if (res.status === 401) {
        showAlert("Failed to fetch user data", "error");
        localStorage.clear();
      } else {
        showAlert("Something went wrong", "error");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      showAlert("Failed to fetch user data", "error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    profileFetch();
  }, []);

  const handleEditClick = () => {
    setEditFormData({
      name: userProfile.name,
      email: userProfile.email,
      phone: userProfile.phone,
      address: {
        street: "",
        city: "",
        state: "",
        country: "",
        zipCode: "",
      },
    });
    setIsEditModalOpen(true);
  };

  const handleSave = async () => {
    setIsLoading(true);

    const payload = {
      userId: userId,
      name: editFormData.name,
      email: editFormData.email,
      address: {
        street: editFormData.address.street,
        city: editFormData.address.city,
        state: editFormData.address.state,
        country: editFormData.address.country,
        zipCode: editFormData.address.zipCode,
      },
    };

    try {
      const res = await fetch(`${URL}user/update-user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (res.status === 200) {
        const result = await res.json();
        profileFetch();
        setIsEditModalOpen(false);
        showAlert("Profile updated successfully", "success");
      } else if (res.status === 404) {
        showAlert("User not found", "error");
        Logout();
      } else if (res.status === 401) {
        showAlert("Failed to update user data", "error");
      } else {
        showAlert("Something went wrong", "error");
      }
    } catch (error) {
      console.error("Error updating user data:", error);
      showAlert("Failed to update user data", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setEditFormData({
      name: userProfile.name,
      email: userProfile.email,
      phone: userProfile.phone,
      address: {
        street: "",
        city: "",
        state: "",
        country: "",
        zipCode: "",
      },
    });
    setIsEditModalOpen(false);
  };

  const handleInputChange = (field, value, addressField?) => {
    if (field === "address" && addressField) {
      setEditFormData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: value,
        },
      }));
    } else {
      setEditFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading profile...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6  3xl:max-w-4xl lg:mx-auto">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Profile
          </h1>
          <p className="text-gray-600 mt-1">
            Manage your account information and preferences
          </p>
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
      <Card className="shadow-none border-0 bg-gradient-to-br from-white to-gray-50">
        <CardHeader className="pb-4 p-0 md:p-2 lg:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 relative">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-[#AC9456] to-[#D4B76A] rounded-full flex items-center justify-center shadow-lg">
                <User className="w-8 h-8 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl sm:text-2xl text-gray-900">
                  {userProfile.name}
                </CardTitle>
                <div className="flex flex-wrap items-center gap-2 mt-2">
                  <Badge className={`${membershipColor} border-0 font-medium`}>
                    <Award className="w-3 h-3 mr-1" />
                    {membershipLevel} Member
                  </Badge>
                  <Badge
                    variant="outline"
                    className="text-gray-600 border-gray-300"
                  >
                    <Shield className="w-3 h-3 mr-1" />
                    Verified
                  </Badge>
                </div>
              </div>
            </div>
            <div
              className="lg:hidden absolute top-[50%] right-0 "
              onClick={handleEditClick}
            >
              <Edit className="w-5 h-5 text-tan-400" />
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6 p-0 md:p-2 lg:p-6">
          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Mail className="w-5 h-5 text-[#AC9456]" />
              Contact Information
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="group p-4 rounded-xl bg-white border border-gray-200 hover:border-[#AC9456]/30 hover:shadow-md transition-all duration-200">
                <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                  Email Address
                </label>
                <p className="text-gray-900 font-medium mt-1 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#AC9456]" />
                  {userProfile.email}
                </p>
              </div>
              <div className="group p-4 rounded-xl bg-white border border-gray-200 hover:border-[#AC9456]/30 hover:shadow-md transition-all duration-200">
                <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                  Phone Number
                </label>
                <p className="text-gray-900 font-medium mt-1 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#AC9456]" />
                  +91 {userProfile.phone}
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
              <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                Primary Address
              </label>
              <p className="text-gray-900 font-medium mt-1 flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#AC9456] mt-0.5 flex-shrink-0" />
                <span className="leading-relaxed">{userProfile.address}</span>
              </p>
            </div>
          </div>

          {/* Account Details */}
          {/* <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[#AC9456]" />
              Account Details
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-white border border-gray-200 hover:border-[#AC9456]/30 hover:shadow-md transition-all duration-200">
                <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                  Member Since
                </label>
                <p className="text-gray-900 font-medium mt-1 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#AC9456]" />
                  {new Date(userProfile.joinedDate).toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )}
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white border border-gray-200 hover:border-[#AC9456]/30 hover:shadow-md transition-all duration-200">
                <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                  Last Booking
                </label>
                <p className="text-gray-900 font-medium mt-1 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-[#AC9456]" />
                  {new Date(userProfile.lastBooking).toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    }
                  )}
                </p>
              </div>
            </div>
          </div> */}
        </CardContent>
      </Card>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <Card className="relative overflow-hidden shadow-lg border-0 bg-gradient-to-r from-blue-50 to-blue-100 hover:shadow-xl transition-all duration-300 group">
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600 uppercase tracking-wide">
                  Total Bookings
                </p>
                <p className="text-3xl font-bold text-blue-700 mt-2">
                  {userProfile.totalBookings}
                </p>
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
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600 uppercase tracking-wide">
                  Total Spent
                </p>
                <p className="text-3xl font-bold text-green-700 mt-2">
                  ₹{userProfile.totalSpent.toLocaleString()}
                </p>
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
      {/* <Card className="block sm:hidden shadow-lg border-0 bg-gradient-to-br from-white to-gray-50">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">
            Quick Actions
          </CardTitle>
          <CardDescription>
            Manage your account settings and preferences
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <Button
              variant="outline"
              className="justify-start h-12 hover:border-[#AC9456] hover:text-[#AC9456] transition-colors duration-200"
              onClick={handleEditClick}
            >
              <Edit3 className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          </div>
        </CardContent>
      </Card> */}

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-white/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 h-full hidden-scrollbar">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white rounded-t-2xl border-b border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">
                  Edit Profile
                </h2>
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
                <Label
                  htmlFor="name"
                  className="text-sm font-medium text-gray-700"
                >
                  Full Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  value={editFormData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="w-full h-12 border-gray-300 focus:border-[#AC9456] focus:ring-[#AC9456] rounded-lg"
                  placeholder="Enter your full name"
                />
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-700"
                >
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={editFormData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="w-full h-12 border-gray-300 focus:border-[#AC9456] focus:ring-[#AC9456] rounded-lg"
                  placeholder="Enter your email address"
                />
              </div>

              {/* Phone Field */}
              <div className="space-y-2">
                <Label
                  htmlFor="phone"
                  className="text-sm font-medium text-gray-700"
                >
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={editFormData.phone}
                  // onChange={(e) => handleInputChange('phone', e.target.value)}
                  disabled
                  className="w-full h-12 border-gray-300 focus:border-[#AC9456] focus:ring-[#AC9456] rounded-lg"
                  placeholder="Enter your phone number"
                />
              </div>

              {/* Address Field */}
              <div className="space-y-4">
                <Label className="text-sm font-medium text-gray-700">
                  Address
                </Label>

                <Input
                  id="street"
                  type="text"
                  value={editFormData.address.street ?? ""}
                  onChange={(e) =>
                    handleInputChange("address", e.target.value, "street")
                  }
                  className="w-full h-12 border-gray-300 focus:border-[#AC9456] focus:ring-[#AC9456] rounded-lg"
                  placeholder="Street"
                />

                <Input
                  id="city"
                  type="text"
                  value={editFormData.address.city ?? ""}
                  onChange={(e) =>
                    handleInputChange("address", e.target.value, "city")
                  }
                  className="w-full h-12 border-gray-300 focus:border-[#AC9456] focus:ring-[#AC9456] rounded-lg"
                  placeholder="City"
                />

                <Input
                  id="state"
                  type="text"
                  value={editFormData.address.state ?? ""}
                  onChange={(e) =>
                    handleInputChange("address", e.target.value, "state")
                  }
                  className="w-full h-12 border-gray-300 focus:border-[#AC9456] focus:ring-[#AC9456] rounded-lg"
                  placeholder="State"
                />

                <Input
                  id="country"
                  type="text"
                  value={editFormData.address.country ?? ""}
                  onChange={(e) =>
                    handleInputChange("address", e.target.value, "country")
                  }
                  className="w-full h-12 border-gray-300 focus:border-[#AC9456] focus:ring-[#AC9456] rounded-lg"
                  placeholder="Country"
                />

                <Input
                  id="zipCode"
                  type="text"
                  value={editFormData.address.zipCode ?? ""}
                  onChange={(e) =>
                    handleInputChange("address", e.target.value, "zipCode")
                  }
                  className="w-full h-12 border-gray-300 focus:border-[#AC9456] focus:ring-[#AC9456] rounded-lg"
                  placeholder="Zip Code"
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
      <Alert alert={alert} hideAlert={hideAlert} />
    </div>
  );
};

export default ProfileTab;
