// components/BookingSection.tsx
import React, { useEffect } from "react";
import { FiMapPin, FiCalendar, FiClock } from "react-icons/fi";
import { Button } from "../ui/button";

interface SearchData {
  city: string;
  pickupDate: string;
  pickupTime: string;
  dropoffDate: string;
  dropoffTime: string;
}

interface BookingSectionProps {
  searchData: SearchData;
  onInputChange: (field: keyof SearchData, value: string) => void;
  onSearch: () => void;
}

const BookingSection: React.FC<BookingSectionProps> = ({
  searchData,
  onInputChange,
  onSearch,
}) => {
  // data/constants.ts
  const tnDistricts = [
    "Coimbatore",
    "Ghandhipuram",
    "Coimbatore Railway Station",
  ];

    // Set default date & time when component mounts
  useEffect(() => {
    const now = new Date();

    const formatDate = (d: Date) => d.toISOString().split("T")[0];
    const formatTime = (d: Date) =>
      d.toTimeString().slice(0, 5); // HH:MM

    if (!searchData.pickupDate) {
      onInputChange("pickupDate", formatDate(now));
    }
    if (!searchData.pickupTime) {
      onInputChange("pickupTime", formatTime(now));
    }
    if (!searchData.dropoffDate) {
      // default dropoff = +1 day
      const tomorrow = new Date(now);
      tomorrow.setDate(now.getDate() + 1);
      onInputChange("dropoffDate", formatDate(tomorrow));
    }
    if (!searchData.dropoffTime) {
      onInputChange("dropoffTime", formatTime(now));
    }
  }, []);

  // min values
  const today = new Date().toISOString().split("T")[0];
  const nowTime = new Date().toTimeString().slice(0, 5);

  return (
    <section className="relative -mt-16 z-20 lg:w-[90vw] block mx-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-0">
        <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Book Your Ride
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* City Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                <FiMapPin className="text-[#141414]" size={15} />
                Select City
              </label>
              <select
                value={searchData.city}
                onChange={(e) => onInputChange("city", e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#AC9456] focus:border-transparent"
              >
                <option value="">Choose a city</option>
                {tnDistricts.map((city: string) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            {/* Pick Up Date */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                <FiCalendar className="text-[#141414]" size={15} />
                Pick Up Date
              </label>
              <input
                type="date"
                value={searchData.pickupDate}
                min={today}  
                onChange={(e) => onInputChange("pickupDate", e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#AC9456] focus:border-transparent"
              />
            </div>

            {/* Pick Up Time */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                <FiClock className="text-[#141414]" size={15} />
                Pick Up Time
              </label>
              <input
                type="time"
                value={searchData.pickupTime}
                min={nowTime}
                onChange={(e) => onInputChange("pickupTime", e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#AC9456] focus:border-transparent"
              />
            </div>

            {/* Drop Off Date */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                <FiCalendar className="text-[#141414]" size={15} />
                Drop Off Date
              </label>
              <input
                type="date"
                value={searchData.dropoffDate}
                min={searchData.pickupDate || today}
                onChange={(e) => onInputChange("dropoffDate", e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#AC9456] focus:border-transparent"
              />
            </div>

            {/* Drop Off Time */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                <FiClock className="text-[#141414]" size={15} />
                Drop Off Time
              </label>
              <input
                type="time"
                value={searchData.dropoffTime}
                min={searchData.pickupTime || nowTime}
                onChange={(e) => onInputChange("dropoffTime", e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#AC9456] focus:border-transparent"
              />
            </div>
          </div>

          <div className="mt-6 text-center">
            <Button
              onClick={onSearch}
              variant="gold"
              className="w-60 py-6 font-semibold text-md"
            >
              <span className="flex items-center justify-center space-x-2">
                <span>Search & Book Now</span>
                <svg
                  className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingSection;
