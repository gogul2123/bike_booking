import React from "react";
import { FaMotorcycle } from "react-icons/fa6";

function Logo() {
  return (
    <div className="flex items-center space-x-3">
      <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-[#AC9456] to-[#9B8449] rounded-xl shadow-md">
        <FaMotorcycle className="h-5 w-5 text-white" />
      </div>
      <div className="flex flex-col">
        <div className="text-lg font-bold text-gray-800 leading-tight">
          Indian Bike
        </div>
        <span className="text-sm font-semibold text-[#AC9456] leading-tight">
          RENTAL
        </span>
      </div>
    </div>
  );
}

export default Logo;
