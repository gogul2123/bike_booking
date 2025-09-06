// // "use client";
// // import { FaMotorcycle } from "react-icons/fa";
// // import { useRouter } from 'next/navigation';
// // import { Button } from "@/components/ui/button";

// // export default function LandingHeader() {
// //    const router = useRouter();
// //   const handleNavigation = (path: string) => {
// //     console.log(`Navigating to: ${path}`);
// //   };

// //   return (
// //     <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100">
// //       <div className="container mx-auto px-4 sm:px-6 lg:px-0">
// //         <div className="flex items-center justify-between h-18">
// //           {/* Logo - Center on mobile, left on desktop */}
// //           <div
// //             className="flex-1 flex justify-start items-center space-x-3 cursor-pointer"
// //             onClick={() => handleNavigation("/")}
// //           >
// //             <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-[#AC9456] to-[#9B8449] rounded-xl shadow-md">
// //               <FaMotorcycle className="h-5 w-5 text-white" />
// //             </div>
// //             <div className="flex flex-col">
// //               <span className="text-lg font-bold text-gray-800 leading-tight tracking-tight">
// //                 Indian Bike
// //               </span>
// //               <span className="text-sm font-semibold text-[#AC9456] leading-tight tracking-wide">
// //                 RENTAL
// //               </span>
// //             </div>
// //           </div>

// //           {/* Book Now Button */}
// //           <Button
// //             onClick={() => router.push("/signin")}
// //             className="px-6 py-5 font-bold bg-gradient-to-r from-[#AC9456] to-[#9B8449] hover:from-[#9B8449] hover:to-[#8A7840] text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
// //           >
// //             Book Now
// //           </Button>
// //         </div>
// //       </div>
// //     </header>
// //   );
// // }

// "use client";
// import { useState } from "react";
// import { FaMotorcycle, FaBars, FaTimes } from "react-icons/fa";
// import { useRouter } from 'next/navigation';
// import { Button } from "@/components/ui/button";

// export default function LandingHeader() {
//   const router = useRouter();
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   const handleNavigation = (path: string) => {
//     console.log(`Navigating to: ${path}`);
//     router.push(path);
//     setIsSidebarOpen(false);
//   };

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   const menuItems = [
//     { label: "Home", path: "/" },
//     { label: "Our Bikes", path: "/bikes" },
//     { label: "Contact", path: "/contact" },
//     { label: "About Us", path: "/about" },
//     { label: "Help & Support", path: "/support" },
//   ];

//   return (
//     <>
//       <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-0">
//           <div className="flex items-center justify-between h-18">
//             {/* Mobile Menu Button - Only visible on mobile */}
//             <button
//               onClick={toggleSidebar}
//               className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100 transition-colors duration-200"
//               aria-label="Toggle menu"
//             >
//               <FaBars className="h-5 w-5 text-gray-700" />
//             </button>

//             {/* Logo - Center on mobile, left on desktop */}
//             <div
//               className="flex-1 md:flex-none flex justify-start items-center space-x-3 cursor-pointer"
//               onClick={() => handleNavigation("/")}
//             >
//               <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-[#AC9456] to-[#9B8449] rounded-xl shadow-md">
//                 <FaMotorcycle className="h-5 w-5 text-white" />
//               </div>
//               <div className="flex flex-col">
//                 <span className="text-lg font-bold text-gray-800 leading-tight tracking-tight">
//                   Indian Bike
//                 </span>
//                 <span className="text-sm font-semibold text-[#AC9456] leading-tight tracking-wide">
//                   RENTAL
//                 </span>
//               </div>
//             </div>

//             {/* Desktop Navigation - Hidden on mobile */}
//             <nav className="hidden lg:flex items-center space-x-8">
//               {menuItems.slice(0, 4).map((item) => (
//                 <button
//                   key={item.path}
//                   onClick={() => handleNavigation(item.path)}
//                   className="text-gray-700 hover:text-[#AC9456] font-medium transition-colors duration-200"
//                 >
//                   {item.label}
//                 </button>
//               ))}
//                {/* Book Now Button */}
//               <Button
//                 onClick={() => router.push("/signin")}
//                 className="px-4 md:px-6 py-3 md:py-5 font-bold bg-gradient-to-r from-[#AC9456] to-[#9B8449] hover:from-[#9B8449] hover:to-[#8A7840] text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 text-sm md:text-base"
//               >
//                 Book Now
//               </Button>
//             </nav>
//           </div>
//         </div>
//       </header>

//       {/* Mobile Sidebar Overlay */}
//       {isSidebarOpen && (
//         <div
//           className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden"
//           onClick={() => setIsSidebarOpen(false)}
//         />
//       )}

//       {/* Mobile Sidebar */}
//       <div
//         className={`fixed top-0 left-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
//           isSidebarOpen ? "translate-x-0" : "-translate-x-full"
//         }`}
//       >
//         {/* Sidebar Header */}
//         <div className="flex items-center justify-between p-6 border-b border-gray-200">
//           <div className="flex items-center space-x-3">
//             <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-[#AC9456] to-[#9B8449] rounded-xl shadow-md">
//               <FaMotorcycle className="h-5 w-5 text-white" />
//             </div>
//             <div className="flex flex-col">
//               <span className="text-lg font-bold text-gray-800 leading-tight tracking-tight">
//                 Indian Bike
//               </span>
//               <span className="text-sm font-semibold text-[#AC9456] leading-tight tracking-wide">
//                 RENTAL
//               </span>
//             </div>
//           </div>
//           <button
//             onClick={() => setIsSidebarOpen(false)}
//             className="flex items-center justify-center w-8 h-8 rounded-lg hover:bg-gray-100 transition-colors duration-200"
//             aria-label="Close menu"
//           >
//             <FaTimes className="h-5 w-5 text-gray-600" />
//           </button>
//         </div>

//         {/* Sidebar Navigation */}
//         <nav className="py-6">
//           <div className="px-6 space-y-2">
//             {menuItems.map((item) => (
//               <button
//                 key={item.path}
//                 onClick={() => handleNavigation(item.path)}
//                 className="w-full text-left px-4 py-3 text-gray-700 hover:text-[#AC9456] hover:bg-[#AC9456]/5 rounded-lg font-medium transition-all duration-200 flex items-center"
//               >
//                 {item.label}
//               </button>
//             ))}
//           </div>

//           {/* Sidebar Footer */}
//           <div className="px-6 mt-8 pt-6 border-t border-gray-200">
//             <Button
//               onClick={() => {
//                 router.push("/signin");
//                 setIsSidebarOpen(false);
//               }}
//               className="w-full px-6 py-3 font-bold bg-gradient-to-r from-[#AC9456] to-[#9B8449] hover:from-[#9B8449] hover:to-[#8A7840] text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
//             >
//               Sign In / Register
//             </Button>
//           </div>
//         </nav>
//       </div>
//     </>
//   );
// }
"use client";
import { useMemo, useState } from "react";
import {
  FaMotorcycle,
  FaBars,
  FaTimes,
  FaShoppingCart,
  FaUser,
} from "react-icons/fa";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { useAppContext } from "@/hooks/context";
import { useLogOut } from "@/hooks/useLogout";

// interface LandingHeaderProps {
//   isLogedIn: boolean;
//   cartItemCount?: number;
//   onLogout?: () => void;
// }

export default function LandingHeader() {
  const {  cart } = useAppContext();
  const isLogedIn = true;
  const router = useRouter();
  const pathname = usePathname();
  const logOut = useLogOut();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const cartItemCount = useMemo(() => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }, [cart]);

  const handleNavigation = (path: string) => {
    console.log(`Navigating to: ${path}`);
    router.push(path);
    setIsSidebarOpen(false);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const menuItems = [
    { label: "Home", path: "/" },
    { label: "Our Bikes", path: "/bikes" },
    { label: "Contact", path: "/contact" },
    { label: "About Us", path: "/about" },
    { label: "Help & Support", path: "/support" },
  ];

  // Additional menu items for logged in users (mobile sidebar)
  // const loggedInMenuItems = [
  //   { label: "Cart", path: "/cart", icon: FaShoppingCart },
  //   { label: "Profile", path: "/profile", icon: FaUser },
  // ];

  return (
    <>
      <header className="sticky px-4 md:px-6  top-0 z-50 w-full bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100 ">
        <div className=" mx-auto lg:px-0">
          <div className="flex items-center justify-between h-18">
            {/* Mobile Menu Button - Only visible on mobile */}
            <button
              onClick={toggleSidebar}
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              aria-label="Toggle menu"
            >
              <FaBars className="h-5 w-5 text-gray-700" />
            </button>

            {/* Logo - Center on mobile, left on desktop */}
            <div
              className="flex-1 md:flex-none flex justify-start items-center space-x-3 cursor-pointer"
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

            {/* Mobile Right Side Icons */}
            <div className="md:hidden flex items-center space-x-3">
              {/* Profile Icon - Only show when logged in */}
              {isLogedIn && (
                <button
                  onClick={() => handleNavigation("/profile")}
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-[#AC9456] to-[#9B8449] hover:from-[#9B8449] hover:to-[#8A7840] shadow-md hover:shadow-lg transition-all duration-200"
                  aria-label="User Profile"
                >
                  <FaUser className="h-4 w-4 text-white" />
                </button>
              )}
            </div>

            {/* Desktop Navigation - Hidden on mobile */}
            <nav className="hidden lg:flex items-center space-x-8">
              {menuItems.slice(0, 4).map((item) => (
                <button
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  // className="text-gray-700 hover:text-[#AC9456] font-medium transition-colors duration-200"
                  className={`font-medium transition-colors duration-200 ${
                    pathname === item.path
                      ? "text-[#AC9456] font-semibold"
                      : "text-gray-700 hover:text-[#AC9456]"
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => handleNavigation("/cart")}
                className={`flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100 transition-colors duration-200 relative ${
                  pathname === "/cart"
                    ? "text-[#AC9456] bg-[#AC9456]/10"
                    : "text-gray-700 hover:text-[#AC9456] hover:bg-[#AC9456]/5"
                }`}
                aria-label="Shopping Cart"
              >
                <FaShoppingCart className="h-5 w-5 text-gray-700 hover:text-[#AC9456]" />
                {/* Cart item count badge */}
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#AC9456] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemCount > 99 ? "99+" : cartItemCount}
                  </span>
                )}
              </button>

              {/* Desktop Cart and Profile Icons - Only show when logged in */}
              {isLogedIn && (
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => handleNavigation("/profile")}
                    className={`flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100 transition-colors duration-200 ${
                      pathname === "/profile"
                        ? "text-[#AC9456] bg-[#AC9456]/10"
                        : "text-gray-700 hover:text-[#AC9456] hover:bg-[#AC9456]/5"
                    }`}
                    aria-label="User Profile"
                  >
                    <FaUser className="h-5 w-5 text-gray-700 hover:text-[#AC9456]" />
                  </button>
                </div>
              )}

              {/* Book Now Button - Show for all users, but change text based on login state */}
              {!isLogedIn && (
                <Button
                  onClick={() => router.push("/signin")}
                  className="px-4 md:px-6 py-3 md:py-5 font-bold bg-gradient-to-r from-[#AC9456] to-[#9B8449] hover:from-[#9B8449] hover:to-[#8A7840] text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 text-sm md:text-base"
                >
                  Book Now
                </Button>
              )}
            </nav>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
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
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="flex items-center justify-center w-8 h-8 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            aria-label="Close menu"
          >
            <FaTimes className="h-5 w-5 text-gray-600" />
          </button>
        </div>

        {/* Sidebar Navigation */}
        <nav className="py-6">
          {/* <div className="px-6 space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className="w-full text-left px-4 py-3 text-gray-700 hover:text-[#AC9456] hover:bg-[#AC9456]/5 rounded-lg font-medium transition-all duration-200 flex items-center"
              >
                {item.label}
              </button>
            ))}
            {isLogedIn && (
              <>
                <div className="my-4 border-t border-gray-200"></div>
                {loggedInMenuItems.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <button
                      key={item.path}
                      onClick={() => handleNavigation(item.path)}
                      className="w-full text-left px-4 py-3 text-gray-700 hover:text-[#AC9456] hover:bg-[#AC9456]/5 rounded-lg font-medium transition-all duration-200 flex items-center space-x-3"
                    >
                      <IconComponent className="h-4 w-4" />
                      <span>{item.label}</span>
                      {item.label === "Cart" && cartItemCount > 0 && (
                        <span className="ml-auto bg-[#AC9456] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                          {cartItemCount > 99 ? '99+' : cartItemCount}
                        </span>
                      )}
                    </button>
                  );
                })}
              </>
            )}
          </div> */}
          <div className="px-6 space-y-2">
            {/* Regular menu items */}
            {menuItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className={`w-full text-left px-4 py-3 text-gray-700 hover:text-[#AC9456] hover:bg-[#AC9456]/5 rounded-lg font-medium transition-all duration-200 flex items-center ${
                  pathname === item.path ? "text-[#AC9456] bg-[#AC9456]/10" : ""
                }`}
              >
                {item.label}
              </button>
            ))}

            {/* Divider for mobile extras */}
            <div className="my-4 border-t border-gray-200"></div>

            {/* Cart - Always visible */}
            <button
              onClick={() => handleNavigation("/cart")}
              className={`w-full text-left px-4 py-3 text-gray-700 hover:text-[#AC9456] hover:bg-[#AC9456]/5 rounded-lg font-medium transition-all duration-200 flex items-center space-x-3 ${
                pathname === "/cart"
                  ? "text-[#AC9456] bg-[#AC9456]/10"
                  : "text-gray-700 hover:text-[#AC9456] hover:bg-[#AC9456]/5"
              }`}
            >
              <FaShoppingCart className="h-4 w-4" />
              <span>Cart</span>
              {cartItemCount > 0 && (
                <span className="ml-auto bg-[#AC9456] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount > 99 ? "99+" : cartItemCount}
                </span>
              )}
            </button>

            {/* Profile - Only for logged in users */}
            {isLogedIn && (
              <button
                onClick={() => handleNavigation("/profile")}
                className={`w-full text-left px-4 py-3 text-gray-700 hover:text-[#AC9456] hover:bg-[#AC9456]/5 rounded-lg font-medium transition-all duration-200 flex items-center space-x-3 ${
                  pathname === "/profile"
                    ? "text-[#AC9456] bg-[#AC9456]/10"
                    : "text-gray-700 hover:text-[#AC9456] hover:bg-[#AC9456]/5"
                }`}
              >
                <FaUser className="h-4 w-4" />
                <span>Profile</span>
              </button>
            )}
          </div>

          {/* Sidebar Footer */}
          <div className="px-6 mt-8 pt-6 border-t border-gray-200">
            {isLogedIn ? (
              <div className="space-y-3">
                <Button
                  onClick={() => {
                    logOut();
                    setIsSidebarOpen(false);
                  }}
                  variant="outline"
                  className="w-full px-6 py-3 font-bold bg-gradient-to-r from-[#AC9456] to-[#9B8449] hover:from-[#9B8449] hover:to-[#8A7840] text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  Sign Out
                </Button>
              </div>
            ) : (
              <Button
                onClick={() => {
                  router.push("/signin");
                  setIsSidebarOpen(false);
                }}
                className="w-full px-6 py-3 font-bold bg-gradient-to-r from-[#AC9456] to-[#9B8449] hover:from-[#9B8449] hover:to-[#8A7840] text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Sign In / Register
              </Button>
            )}
          </div>
        </nav>
      </div>
    </>
  );
}
