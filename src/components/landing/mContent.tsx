// components/HeroSection.tsx
import React from "react";
import Image from "next/image";

const MContent = () => {
  return (
  <>
    <section className="block sm:hidden mt-16 py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">

            {/* Main Heading */}
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold leading-tight mb-6">
                    Ride Your Dream
                    <span className="block text-[#AC9456]">Bike Today</span>
                </h1>
                <p className="text-lg text-gray-300 text-justify leading-relaxed max-w-md mx-auto mb-8">
                    Experience the freedom of the road with premium bike rentals
                    across Tamil Nadu. Safe, affordable, and always available.
                </p>
            </div>

            {/* Stats Section */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 mb-12">
            <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                <div className="text-2xl font-bold text-[#AC9456] mb-1">1000+</div>
                <div className="text-xs text-gray-400 leading-tight">Happy<br />Customers</div>
                </div>
                <div className="text-center border-l border-r border-white/20">
                <div className="text-2xl font-bold text-[#AC9456] mb-1">500+</div>
                <div className="text-xs text-gray-400 leading-tight">Premium<br />Bikes</div>
                </div>
                <div className="text-center">
                <div className="text-2xl font-bold text-[#AC9456] mb-1">50+</div>
                <div className="text-xs text-gray-400 leading-tight">Cities<br />Covered</div>
                </div>
            </div>
            </div>

            {/* Highlights */}
            <div className="space-y-4 mb-10 px-2">
            <div className="flex items-start gap-3">
                <span className="text-[#AC9456] font-bold text-xl">✓</span>
                <p className="text-sm text-gray-300">No hidden charges – pay only for what you ride</p>
            </div>
            <div className="flex items-start gap-3">
                <span className="text-[#AC9456] font-bold text-xl">✓</span>
                <p className="text-sm text-gray-300">Easy online booking in just 2 minutes</p>
            </div>
            <div className="flex items-start gap-3">
                <span className="text-[#AC9456] font-bold text-xl">✓</span>
                <p className="text-sm text-gray-300">Wide range of bikes to suit every rider</p>
            </div>
            </div>


        </div>
    </section>


  </>
  );
};

export default MContent;
