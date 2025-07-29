// components/HeroSection.tsx
import React from "react";
import Image from "next/image";

const HeroSection = () => {
  return (
  <>
    <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white min-h-24 md:min-h-screen flex items-center pt-8 sm:pt-10 lg:pt-0 lg:px-10">
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-0 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10 lg:gap-12 items-center lg:mb-15">
          
          {/* --- Desktop View --- */}
          <div className="hidden sm:block space-y-6 sm:space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                Ride Your Dream
                <span className="block text-[#AC9456]">Bike Today</span>
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed max-w-lg text-justify md:text-left">
                Experience the freedom of the road with premium bike rentals
                across Tamil Nadu. Safe, affordable, and always available.
              </p>
            </div>

            <div className="flex items-center justify-center sm:justify-start space-x-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-[#AC9456]">1000+</div>
                <div className="text-sm text-gray-400">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#AC9456]">500+</div>
                <div className="text-sm text-gray-400">Premium Bikes</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#AC9456]">50+</div>
                <div className="text-sm text-gray-400">Cities Covered</div>
              </div>
            </div>
          </div>

          {/* --- Image Section (Desktop Only) --- */}
          <div className="hidden sm:block relative mb-8 sm:mb-0">
            <div className="relative z-10">
              <Image
                src="/image/HeroBike.png"
                alt="Premium Motorcycle"
                width={800}
                height={600}
                className="rounded-xl w-full h-auto shadow-2xl"
                quality={85}
                priority={true}
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ..."
              />
            </div>

            <div className="absolute -top-4 -right-4 w-full h-full bg-gradient-to-br from-[#AC9456] to-[#9B8449] rounded-2xl -z-10 opacity-80"></div>
          </div>

        </div>
      </div>
    </section>
  </>
  );
};

export default HeroSection;
