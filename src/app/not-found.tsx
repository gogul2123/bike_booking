"use client";
import React from 'react';
import { FaMotorcycle, FaHome, FaSearch, FaPhone } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

export default function NotFoundPage() {
    const router = useRouter();
  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center px-4">
      {/* Main Content Container */}
      <div className="max-w-2xl mx-auto text-center">
        {/* Large 404 with Motorcycle Icon */}
        <div className="relative mb-8">
          <h1 className="text-9xl md:text-[12rem] font-black text-gray-200 select-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-gradient-to-br from-[#AC9456] to-[#9B8449] rounded-full p-6 shadow-2xl animate-bounce">
              <FaMotorcycle className="h-12 w-12 md:h-16 md:w-16 text-white" />
            </div>
          </div>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Oops! Wrong Route
          </h2>
          <p className="text-lg md:text-xl text-gray-600 mb-2">
            Looks like you took a detour on your bike journey!
          </p>
          <p className="text-gray-500">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <button
            onClick={() => handleNavigation('/')}
            className="flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-[#AC9456] to-[#9B8449] hover:from-[#9B8449] hover:to-[#8A7840] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            <FaHome className="h-5 w-5" />
            Back to Home
          </button>

          <button
            onClick={() => handleNavigation('/bikes')}
            className="flex items-center justify-center gap-3 px-8 py-4 bg-white hover:bg-gray-50 text-gray-700 font-semibold rounded-xl shadow-lg hover:shadow-xl border-2 border-gray-200 hover:border-[#AC9456] transform hover:scale-105 transition-all duration-200"
          >
            <FaSearch className="h-5 w-5" />
            Browse Bikes
          </button>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-gray-600 mb-2">
          <div className="flex items-center gap-2">
            <FaPhone className="h-4 w-4 text-[#AC9456]" />
            <span className="text-sm">Need help? Call us at +91 98765 43210</span>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      {/* <div className="fixed top-20 left-10 text-6xl text-gray-100 transform -rotate-12 select-none hidden lg:block">
        🏍️
      </div>
      <div className="fixed bottom-20 right-10 text-4xl text-gray-100 transform rotate-12 select-none hidden lg:block">
        🛣️
      </div> */}
      
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-[#AC9456] rounded-full opacity-20 animate-ping"></div>
        <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-[#9B8449] rounded-full opacity-30 animate-ping animation-delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-[#AC9456] rounded-full opacity-25 animate-ping animation-delay-2000"></div>
      </div>
    </div>
  );
}