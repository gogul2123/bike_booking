"use client";
import { useState, useEffect } from "react";
import { 
  FaBars, 
  FaTimes, 
  FaMotorcycle, 
  FaHome, 
  FaPhone, 
  FaShoppingCart, 
  FaUser, 
  FaChevronDown,
  FaChevronRight,
  FaCog
} from "react-icons/fa";
import { Button } from "../ui/button";

export default function Header({ variant = "home", isLoggedIn = false }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isBikesDropdownOpen, setIsBikesDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  // Close mobile menu when screen size changes
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as HTMLElement).closest('.dropdown-container')) {
        setIsBikesDropdownOpen(false);
        setIsUserDropdownOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleNavigation = (path: string) => {
    console.log(`Navigating to: ${path}`);
    closeMobileMenu();
  };

  const handleLogout = () => {
    console.log("Logging out...");
    closeMobileMenu();
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-0">
          <div className="flex items-center justify-between h-18">
            
            <div className="flex items-center space-x-2 md:space-x-6">
              {/* Left Side - Mobile Menu Button (for home variant only) */}
              {variant === "home" && (
                <button
                  className="md:hidden p-2 rounded-lg text-gray-700 hover:text-[#AC9456] hover:bg-gray-50 transition-all duration-200"
                  onClick={toggleMobileMenu}
                  aria-label="Toggle mobile menu"
                >
                  <FaBars className="h-5 w-5" />
                </button>
              )}
              {/* Logo - Center on mobile for landing, left for others */}
              <div 
                className={`flex justify-start items-center space-x-3 cursor-pointer ${
                  variant === "landing" ? "flex-1 justify-center md:justify-start" : ""
                }`}
                onClick={() => handleNavigation('/')}
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
            </div>

            <div className="flex items-center space-x-4 md:space-x-6">
              {/* Desktop Navigation - Home variant only */}
              {variant === "home" && (
                <nav className="hidden md:flex items-center  space-x-8">
                  <button
                    onClick={() => handleNavigation('/')}
                    className="flex items-center space-x-2 text-gray-700 hover:text-[#AC9456] transition-colors duration-200 font-medium"
                  >
                    <FaHome className="h-4 w-4" />
                    <span>Home</span>
                  </button>

                  {/* Bikes Dropdown */}
                  <div className="relative dropdown-container">
                    <button
                      onClick={() => setIsBikesDropdownOpen(!isBikesDropdownOpen)}
                      className="flex items-center space-x-2 text-gray-700 hover:text-[#AC9456] transition-colors duration-200 font-medium"
                    >
                      <FaMotorcycle className="h-4 w-4" />
                      <span>Bikes</span>
                      <FaChevronDown className={`h-3 w-3 transition-transform duration-200 ${isBikesDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {isBikesDropdownOpen && (
                      <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50">
                        <button
                          onClick={() => handleNavigation('/bikes?type=gear')}
                          className="w-full text-left px-4 py-3 text-gray-700 hover:bg-[#AC9456]/5 hover:text-[#AC9456] transition-colors duration-200 font-medium rounded-lg mx-2"
                        >
                          Gear Bikes
                        </button>
                        <button
                          onClick={() => handleNavigation('/bikes?type=gearless')}
                          className="w-full text-left px-4 py-3 text-gray-700 hover:bg-[#AC9456]/5 hover:text-[#AC9456] transition-colors duration-200 font-medium rounded-lg mx-2"
                        >
                          Gearless Bikes
                        </button>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => handleNavigation('/contact')}
                    className="flex items-center space-x-2 text-gray-700 hover:text-[#AC9456] transition-colors duration-200 font-medium"
                  >
                    <FaPhone className="h-4 w-4" />
                    <span>Contact</span>
                  </button>
                </nav>
              )}

              {/* Right Side Actions */}
              <div className="flex items-center space-x-4">
                {/* Landing Page - Book Now Button */}
                {variant === "landing" && (
                 <Button
                    onClick={() => handleNavigation('/bikes')}
                    variant="gold"
                    className="px-6 py-5 font-bold"
                  >
                    Book Now
                  </Button>
                )}

                {/* Home Page - Not Logged In */}
                {variant === "home" && !isLoggedIn && (
                  <div className="hidden md:flex items-center space-x-4">
                    <button
                      onClick={() => handleNavigation('/auth/login')}
                      className="text-gray-700 hover:text-[#AC9456] transition-colors duration-200 font-medium px-4 py-2 rounded-lg hover:bg-gray-50"
                    >
                      Login
                    </button>
                    <button
                      onClick={() => handleNavigation('/auth/signup')}
                      className="bg-gradient-to-r from-[#AC9456] to-[#9B8449] hover:from-[#9B8449] hover:to-[#8A7840] text-white font-semibold px-6 py-2.5 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                      Sign Up
                    </button>
                  </div>
                )}

                {/* Home Page - Logged In */}
                {variant === "home" && isLoggedIn && (
                  <div className="hidden md:flex items-center space-x-4">
                    <button
                      onClick={() => handleNavigation('/cart')}
                      className="relative p-2.5 text-gray-700 hover:text-[#AC9456] hover:bg-gray-50 transition-colors duration-200 rounded-lg"
                    >
                      <FaShoppingCart className="h-5 w-5" />
                      <span className="absolute -top-1 -right-1 bg-gradient-to-r from-[#AC9456] to-[#9B8449] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold shadow-md">
                        2
                      </span>
                    </button>
                    
                    {/* User Dropdown */}
                    <div className="relative dropdown-container">
                      <button
                        onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                        className="flex items-center space-x-2 p-2.5 text-gray-700 hover:text-[#AC9456] hover:bg-gray-50 transition-colors duration-200 rounded-lg"
                      >
                        <FaUser className="h-4 w-4" />
                        <FaChevronDown className={`h-3 w-3 transition-transform duration-200 ${isUserDropdownOpen ? 'rotate-180' : ''}`} />
                      </button>
                      
                      {isUserDropdownOpen && (
                        <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50">
                          <button
                            onClick={() => handleNavigation('/profile')}
                            className="w-full text-left px-4 py-3 text-gray-700 hover:bg-[#AC9456]/5 hover:text-[#AC9456] transition-colors duration-200 flex items-center space-x-3 font-medium rounded-lg mx-2"
                          >
                            <FaUser className="h-4 w-4" />
                            <span>Profile</span>
                          </button>
                          <button
                            onClick={() => handleNavigation('/bookings')}
                            className="w-full text-left px-4 py-3 text-gray-700 hover:bg-[#AC9456]/5 hover:text-[#AC9456] transition-colors duration-200 flex items-center space-x-3 font-medium rounded-lg mx-2"
                          >
                            <FaCog className="h-4 w-4" />
                            <span>My Bookings</span>
                          </button>
                          <hr className="my-2 border-gray-100 mx-2" />
                          <button
                            onClick={handleLogout}
                            className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 transition-colors duration-200 font-medium rounded-lg mx-2"
                          >
                            Logout
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Mobile Auth Buttons for Home variant */}
                {variant === "home" && !isLoggedIn && (
                  <button
                    onClick={() => handleNavigation('/auth/login')}
                    className="md:hidden bg-gradient-to-r from-[#AC9456] to-[#9B8449] text-white font-semibold px-4 py-2 rounded-lg text-sm"
                  >
                    Login
                  </button>
                )}

                {/* Mobile User Actions for Home variant when logged in */}
                {variant === "home" && isLoggedIn && (
                  <div className="md:hidden flex items-center space-x-2">
                    <button
                      onClick={() => handleNavigation('/cart')}
                      className="relative p-2 text-gray-700 hover:text-[#AC9456] transition-colors duration-200"
                    >
                      <FaShoppingCart className="h-5 w-5" />
                      <span className="absolute -top-1 -right-1 bg-gradient-to-r from-[#AC9456] to-[#9B8449] text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-bold">
                        2
                      </span>
                    </button>
                    <button
                      onClick={() => handleNavigation('/profile')}
                      className="p-2 text-gray-700 hover:text-[#AC9456] transition-colors duration-200"
                    >
                      <FaUser className="h-5 w-5" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay - Only for home variant */}
      {variant === "home" && isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 md:hidden"
          onClick={closeMobileMenu}
        />
      )}

      {/* Mobile Menu Drawer - Only for home variant */}
      {variant === "home" && (
        <div className={`fixed top-0 left-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-[#AC9456] to-[#9B8449] rounded-xl shadow-md">
                <FaMotorcycle className="h-5 w-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-gray-800 leading-tight">
                  Indian Bike
                </span>
                <span className="text-sm font-semibold text-[#AC9456] leading-tight">
                  RENTAL
                </span>
              </div>
            </div>
            <button
              onClick={closeMobileMenu}
              className="p-2 text-gray-600 hover:text-[#AC9456] hover:bg-gray-100 rounded-lg transition-colors duration-200"
              aria-label="Close mobile menu"
            >
              <FaTimes className="h-5 w-5" />
            </button>
          </div>

          {/* Mobile Menu Content */}
          <div className="flex flex-col h-full">
            <nav className="flex-1 px-6 py-6 space-y-2">
              <button
                onClick={() => handleNavigation('/')}
                className="flex items-center justify-between w-full p-4 text-gray-700 hover:bg-gradient-to-r hover:from-[#AC9456]/5 hover:to-[#9B8449]/5 hover:text-[#AC9456] transition-all duration-200 rounded-xl font-medium"
              >
                <div className="flex items-center space-x-4">
                  <FaHome className="h-5 w-5" />
                  <span>Home</span>
                </div>
                <FaChevronRight className="h-4 w-4" />
              </button>

              {/* Bikes Section */}
              <div className="space-y-2">
                <button
                  onClick={() => setIsBikesDropdownOpen(!isBikesDropdownOpen)}
                  className="flex items-center justify-between w-full p-4 text-gray-700 hover:bg-gradient-to-r hover:from-[#AC9456]/5 hover:to-[#9B8449]/5 hover:text-[#AC9456] transition-all duration-200 rounded-xl font-medium"
                >
                  <div className="flex items-center space-x-4">
                    <FaMotorcycle className="h-5 w-5" />
                    <span>Bikes</span>
                  </div>
                  <FaChevronDown className={`h-4 w-4 transition-transform duration-200 ${isBikesDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isBikesDropdownOpen && (
                  <div className="ml-6 space-y-1">
                    <button
                      onClick={() => handleNavigation('/bikes?type=gear')}
                      className="w-full text-left p-3 text-gray-600 hover:bg-gradient-to-r hover:from-[#AC9456]/5 hover:to-[#9B8449]/5 hover:text-[#AC9456] transition-all duration-200 rounded-lg"
                    >
                      Gear Bikes
                    </button>
                    <button
                      onClick={() => handleNavigation('/bikes?type=gearless')}
                      className="w-full text-left p-3 text-gray-600 hover:bg-gradient-to-r hover:from-[#AC9456]/5 hover:to-[#9B8449]/5 hover:text-[#AC9456] transition-all duration-200 rounded-lg"
                    >
                      Gearless Bikes
                    </button>
                  </div>
                )}
              </div>

              <button
                onClick={() => handleNavigation('/contact')}
                className="flex items-center justify-between w-full p-4 text-gray-700 hover:bg-gradient-to-r hover:from-[#AC9456]/5 hover:to-[#9B8449]/5 hover:text-[#AC9456] transition-all duration-200 rounded-xl font-medium"
              >
                <div className="flex items-center space-x-4">
                  <FaPhone className="h-5 w-5" />
                  <span>Contact</span>
                </div>
                <FaChevronRight className="h-4 w-4" />
              </button>
            </nav>

            {/* Mobile Auth Section */}
            <div className="p-6 border-t border-gray-100 bg-gradient-to-r from-gray-50 to-white">
              {!isLoggedIn ? (
                <div className="space-y-3">
                  <button
                    onClick={() => handleNavigation('/auth/login')}
                    className="w-full p-4 text-gray-700 hover:bg-gradient-to-r hover:from-[#AC9456]/5 hover:to-[#9B8449]/5 hover:text-[#AC9456] transition-all duration-200 rounded-xl font-medium border border-gray-200 hover:border-[#AC9456]/20"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => handleNavigation('/auth/signup')}
                    className="w-full bg-gradient-to-r from-[#AC9456] to-[#9B8449] hover:from-[#9B8449] hover:to-[#8A7840] text-white font-semibold py-4 rounded-xl transition-all duration-200 shadow-lg"
                  >
                    Sign Up
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <button
                    onClick={() => handleNavigation('/cart')}
                    className="flex items-center justify-between w-full p-4 text-gray-700 hover:bg-gradient-to-r hover:from-[#AC9456]/5 hover:to-[#9B8449]/5 hover:text-[#AC9456] transition-all duration-200 rounded-xl font-medium"
                  >
                    <div className="flex items-center space-x-4">
                      <FaShoppingCart className="h-5 w-5" />
                      <span>Cart</span>
                      <span className="bg-gradient-to-r from-[#AC9456] to-[#9B8449] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                        2
                      </span>
                    </div>
                    <FaChevronRight className="h-4 w-4" />
                  </button>
                  
                  <button
                    onClick={() => handleNavigation('/profile')}
                    className="flex items-center justify-between w-full p-4 text-gray-700 hover:bg-gradient-to-r hover:from-[#AC9456]/5 hover:to-[#9B8449]/5 hover:text-[#AC9456] transition-all duration-200 rounded-xl font-medium"
                  >
                    <div className="flex items-center space-x-4">
                      <FaUser className="h-5 w-5" />
                      <span>Profile</span>
                    </div>
                    <FaChevronRight className="h-4 w-4" />
                  </button>
                  
                  <button
                    onClick={() => handleNavigation('/bookings')}
                    className="flex items-center justify-between w-full p-4 text-gray-700 hover:bg-gradient-to-r hover:from-[#AC9456]/5 hover:to-[#9B8449]/5 hover:text-[#AC9456] transition-all duration-200 rounded-xl font-medium"
                  >
                    <div className="flex items-center space-x-4">
                      <FaCog className="h-5 w-5" />
                      <span>My Bookings</span>
                    </div>
                    <FaChevronRight className="h-4 w-4" />
                  </button>
                  
                  <button
                    onClick={handleLogout}
                    className="w-full p-4 text-red-600 hover:bg-red-50 transition-colors duration-200 rounded-xl font-medium text-left"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}