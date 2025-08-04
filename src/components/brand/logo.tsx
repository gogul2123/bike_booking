import React from "react";
import { FaMotorcycle } from "react-icons/fa6";
import { useRouter } from 'next/navigation';

function Logo({ variant = "dark" }: { variant?: string }) {
  
  const router = useRouter();
  const handleNavigation = (path: string) => {
    console.log(`Navigating to: ${path}`);
    router.push(path);
  };
  return (
    // <div className="flex items-center space-x-3">
    //   <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-[#AC9456] to-[#9B8449] rounded-xl shadow-md">
    //     <FaMotorcycle className="h-5 w-5 text-white" />
    //   </div>
    //   <div className="flex flex-col">
    //     <div
    //       className={`text-lg font-bold ${
    //         variant === "dark" ? "text-gray-800" : "text-white"
    //       } leading-tight`}
    //     >
    //       Indian Bike
    //     </div>
    //     <span className="text-sm font-semibold text-[#AC9456] leading-tight">
    //       RENTAL
    //     </span>
    //   </div>
    // </div>
    <div
                  className="flex-1 md:flex-none flex justify-start items-center space-x-3 cursor-pointer"
                  onClick={() => handleNavigation("/")}
                >
                  <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-[#AC9456] to-[#9B8449] rounded-xl shadow-md">
                    <FaMotorcycle className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex flex-col">
                    <div
                      className={`text-lg font-bold ${
                        variant === "dark" ? "text-gray-800" : "text-white"
                      } leading-tight`}
                    >
                      Indian Bike
                    </div>
                    <span className="text-sm font-semibold text-[#AC9456] leading-tight tracking-wide">
                      RENTAL
                    </span>
                  </div>
                </div>
  );
}

export default Logo;
