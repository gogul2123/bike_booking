"use client";
import { FaMotorcycle } from "react-icons/fa";
import { Button } from "@/components/ui/button";

export default function LandingHeader() {
  const handleNavigation = (path: string) => {
    console.log(`Navigating to: ${path}`);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-0">
        <div className="flex items-center justify-between h-18">
          {/* Logo - Center on mobile, left on desktop */}
          <div
            className="flex-1 flex justify-center md:justify-start items-center space-x-3 cursor-pointer"
            onClick={() => handleNavigation("/")}
          >
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-[#AC9456] to-[#9B8449] rounded-xl shadow-md">
              <FaMotorcycle className="h-5 w-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-gray-800 leading-tight tracking-tight">
                Indian Bike
              </span>
              <span className="text-sm font-semibold text-[#AC9456] leading-tight tracking-wide">
                RENTAL
              </span>
            </div>
          </div>

          {/* Book Now Button */}
          <Button
            onClick={() => handleNavigation("/bikes")}
            className="px-6 py-5 font-bold bg-gradient-to-r from-[#AC9456] to-[#9B8449] hover:from-[#9B8449] hover:to-[#8A7840] text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
          >
            Book Now
          </Button>
        </div>
      </div>
    </header>
  );
}
