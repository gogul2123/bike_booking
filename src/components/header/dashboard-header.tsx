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
  FaCog,
} from "react-icons/fa";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import Logo from "../brand/logo";

export default function HomeHeader({ isLoggedIn = false }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isBikesDropdownOpen, setIsBikesDropdownOpen] = useState(false);
  const [isMobileBikesOpen, setIsMobileBikesOpen] = useState(false);

  const handleNavigation = (path: string) => {
    console.log(`Navigating to: ${path}`);
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    console.log("Logging out...");
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100">
        <div className="container mx-auto px-2 sm:px-6 lg:px-4">
          <div className="flex items-center justify-between h-18">
            <div className="flex items-center space-x-2 md:space-x-6">
              {/* Mobile Menu Button */}
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="md:hidden p-2 text-gray-700 hover:text-[#AC9456] hover:bg-gray-50"
                  >
                    <FaBars className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80 p-0">
                  <SheetHeader className="p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                    <Logo />
                  </SheetHeader>

                  {/* Mobile Menu Content */}
                  <div className="flex flex-col h-full">
                    <nav className="flex-1 px-6 py-6 space-y-2">
                      <Button
                        variant="ghost"
                        onClick={() => handleNavigation("/")}
                        className="flex items-center justify-between w-full p-4 text-gray-700 hover:bg-gradient-to-r hover:from-[#AC9456]/5 hover:to-[#9B8449]/5 hover:text-[#AC9456] transition-all duration-200 rounded-xl font-medium h-auto"
                      >
                        <div className="flex items-center space-x-4">
                          <FaHome className="h-5 w-5" />
                          <span>Home</span>
                        </div>
                        <FaChevronRight className="h-4 w-4" />
                      </Button>

                      {/* Bikes Collapsible */}
                      <Collapsible
                        open={isMobileBikesOpen}
                        onOpenChange={setIsMobileBikesOpen}
                      >
                        <CollapsibleTrigger asChild>
                          <Button
                            variant="ghost"
                            className="flex items-center justify-between w-full p-4 text-gray-700 hover:bg-gradient-to-r hover:from-[#AC9456]/5 hover:to-[#9B8449]/5 hover:text-[#AC9456] transition-all duration-200 rounded-xl font-medium h-auto"
                          >
                            <div className="flex items-center space-x-4">
                              <FaMotorcycle className="h-5 w-5" />
                              <span>Bikes</span>
                            </div>
                            <FaChevronDown
                              className={`h-4 w-4 transition-transform duration-200 ${
                                isMobileBikesOpen ? "rotate-180" : ""
                              }`}
                            />
                          </Button>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="ml-6 space-y-1">
                          <Button
                            variant="ghost"
                            onClick={() => handleNavigation("/bikes?type=gear")}
                            className="w-full text-left p-3 text-gray-600 hover:bg-gradient-to-r hover:from-[#AC9456]/5 hover:to-[#9B8449]/5 hover:text-[#AC9456] transition-all duration-200 rounded-lg justify-start h-auto"
                          >
                            Gear Bikes
                          </Button>
                          <Button
                            variant="ghost"
                            onClick={() =>
                              handleNavigation("/bikes?type=gearless")
                            }
                            className="w-full text-left p-3 text-gray-600 hover:bg-gradient-to-r hover:from-[#AC9456]/5 hover:to-[#9B8449]/5 hover:text-[#AC9456] transition-all duration-200 rounded-lg justify-start h-auto"
                          >
                            Gearless Bikes
                          </Button>
                        </CollapsibleContent>
                      </Collapsible>

                      <Button
                        variant="ghost"
                        onClick={() => handleNavigation("/contact")}
                        className="flex items-center justify-between w-full p-4 text-gray-700 hover:bg-gradient-to-r hover:from-[#AC9456]/5 hover:to-[#9B8449]/5 hover:text-[#AC9456] transition-all duration-200 rounded-xl font-medium h-auto"
                      >
                        <div className="flex items-center space-x-4">
                          <FaPhone className="h-5 w-5" />
                          <span>Contact</span>
                        </div>
                        <FaChevronRight className="h-4 w-4" />
                      </Button>
                    </nav>

                    {/* Mobile Auth Section */}
                    <div className="p-6 border-t border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                      {!isLoggedIn ? (
                        <div className="space-y-3">
                          <Button
                            variant="outline"
                            onClick={() => handleNavigation("/auth/login")}
                            className="w-full p-4 text-gray-700 hover:bg-gradient-to-r hover:from-[#AC9456]/5 hover:to-[#9B8449]/5 hover:text-[#AC9456] transition-all duration-200 rounded-xl font-medium border-gray-200 hover:border-[#AC9456]/20"
                          >
                            Login
                          </Button>
                          <Button
                            onClick={() => handleNavigation("/auth/signup")}
                            className="w-full bg-gradient-to-r from-[#AC9456] to-[#9B8449] hover:from-[#9B8449] hover:to-[#8A7840] text-white font-semibold py-4 rounded-xl transition-all duration-200 shadow-lg"
                          >
                            Sign Up
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <Button
                            variant="ghost"
                            onClick={() => handleNavigation("/cart")}
                            className="flex items-center justify-between w-full p-4 text-gray-700 hover:bg-gradient-to-r hover:from-[#AC9456]/5 hover:to-[#9B8449]/5 hover:text-[#AC9456] transition-all duration-200 rounded-xl font-medium h-auto"
                          >
                            <div className="flex items-center space-x-4">
                              <FaShoppingCart className="h-5 w-5" />
                              <span>Cart</span>
                              <span className="bg-gradient-to-r from-[#AC9456] to-[#9B8449] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                                2
                              </span>
                            </div>
                            <FaChevronRight className="h-4 w-4" />
                          </Button>

                          <Button
                            variant="ghost"
                            onClick={() => handleNavigation("/profile")}
                            className="flex items-center justify-between w-full p-4 text-gray-700 hover:bg-gradient-to-r hover:from-[#AC9456]/5 hover:to-[#9B8449]/5 hover:text-[#AC9456] transition-all duration-200 rounded-xl font-medium h-auto"
                          >
                            <div className="flex items-center space-x-4">
                              <FaUser className="h-5 w-5" />
                              <span>Profile</span>
                            </div>
                            <FaChevronRight className="h-4 w-4" />
                          </Button>

                          <Button
                            variant="ghost"
                            onClick={() => handleNavigation("/bookings")}
                            className="flex items-center justify-between w-full p-4 text-gray-700 hover:bg-gradient-to-r hover:from-[#AC9456]/5 hover:to-[#9B8449]/5 hover:text-[#AC9456] transition-all duration-200 rounded-xl font-medium h-auto"
                          >
                            <div className="flex items-center space-x-4">
                              <FaCog className="h-5 w-5" />
                              <span>My Bookings</span>
                            </div>
                            <FaChevronRight className="h-4 w-4" />
                          </Button>

                          <Button
                            variant="ghost"
                            onClick={handleLogout}
                            className="w-full p-4 text-red-600 hover:bg-red-50 transition-colors duration-200 rounded-xl font-medium text-left justify-start h-auto"
                          >
                            Logout
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </SheetContent>
              </Sheet>

              {/* Logo */}
              <Logo />
            </div>

            <div className="flex items-center space-x-4 md:space-x-6">
              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center space-x-8">
                <Button
                  variant="ghost"
                  onClick={() => handleNavigation("/")}
                  className="flex items-center space-x-2 text-gray-700 hover:text-[#AC9456] transition-colors duration-200 font-medium"
                >
                  <FaHome className="h-4 w-4" />
                  <span>Home</span>
                </Button>

                {/* Bikes Dropdown */}
                <DropdownMenu
                  open={isBikesDropdownOpen}
                  onOpenChange={setIsBikesDropdownOpen}
                >
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="flex items-center space-x-2 text-gray-700 hover:text-[#AC9456] transition-colors duration-200 font-medium"
                    >
                      <FaMotorcycle className="h-4 w-4" />
                      <span>Bikes</span>
                      <FaChevronDown
                        className={`h-3 w-3 transition-transform duration-200 ${
                          isBikesDropdownOpen ? "rotate-180" : ""
                        }`}
                      />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-48 bg-white rounded-xl shadow-xl border border-gray-100">
                    <DropdownMenuItem
                      onClick={() => handleNavigation("/bikes?type=gear")}
                      className="px-4 py-3 text-gray-700 hover:bg-[#AC9456]/5 hover:text-[#AC9456] transition-colors duration-200 font-medium rounded-lg cursor-pointer"
                    >
                      Gear Bikes
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleNavigation("/bikes?type=gearless")}
                      className="px-4 py-3 text-gray-700 hover:bg-[#AC9456]/5 hover:text-[#AC9456] transition-colors duration-200 font-medium rounded-lg cursor-pointer"
                    >
                      Gearless Bikes
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <Button
                  variant="ghost"
                  onClick={() => handleNavigation("/contact")}
                  className="flex items-center space-x-2 text-gray-700 hover:text-[#AC9456] transition-colors duration-200 font-medium"
                >
                  <FaPhone className="h-4 w-4" />
                  <span>Contact</span>
                </Button>
              </nav>

              {/* Right Side Actions */}
              <div className="flex items-center space-x-4">
                {/* Not Logged In */}
                {!isLoggedIn && (
                  <div className="hidden md:flex items-center space-x-4">
                    <Button
                      variant="ghost"
                      onClick={() => handleNavigation("/auth/login")}
                      className="text-gray-700 hover:text-[#AC9456] transition-colors duration-200 font-medium px-4 py-2 rounded-lg hover:bg-gray-50"
                    >
                      Login
                    </Button>
                    <Button
                      onClick={() => handleNavigation("/auth/signup")}
                      className="bg-gradient-to-r from-[#AC9456] to-[#9B8449] hover:from-[#9B8449] hover:to-[#8A7840] text-white font-semibold px-6 py-2.5 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                      Sign Up
                    </Button>
                  </div>
                )}

                {/* Logged In */}
                {isLoggedIn && (
                  <div className="hidden md:flex items-center space-x-4">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleNavigation("/cart")}
                      className="relative p-2.5 text-gray-700 hover:text-[#AC9456] hover:bg-gray-50 transition-colors duration-200 rounded-lg"
                    >
                      <FaShoppingCart className="h-5 w-5" />
                      <span className="absolute -top-1 -right-1 bg-gradient-to-r from-[#AC9456] to-[#9B8449] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold shadow-md">
                        2
                      </span>
                    </Button>

                    {/* User Dropdown */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          className="flex items-center space-x-2 p-2.5 text-gray-700 hover:text-[#AC9456] hover:bg-gray-50 transition-colors duration-200 rounded-lg"
                        >
                          <FaUser className="h-4 w-4" />
                          <FaChevronDown className="h-3 w-3" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-48 bg-white rounded-xl shadow-xl border border-gray-100">
                        <DropdownMenuItem
                          onClick={() => handleNavigation("/profile")}
                          className="px-4 py-3 text-gray-700 hover:bg-[#AC9456]/5 hover:text-[#AC9456] transition-colors duration-200 font-medium rounded-lg cursor-pointer"
                        >
                          <FaUser className="h-4 w-4 mr-3" />
                          Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleNavigation("/bookings")}
                          className="px-4 py-3 text-gray-700 hover:bg-[#AC9456]/5 hover:text-[#AC9456] transition-colors duration-200 font-medium rounded-lg cursor-pointer"
                        >
                          <FaCog className="h-4 w-4 mr-3" />
                          My Bookings
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="my-2 border-gray-100" />
                        <DropdownMenuItem
                          onClick={handleLogout}
                          className="px-4 py-3 text-red-600 hover:bg-red-50 transition-colors duration-200 font-medium rounded-lg cursor-pointer"
                        >
                          Logout
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                )}

                {/* Mobile Auth Buttons */}
                {!isLoggedIn && (
                  <Button
                    onClick={() => handleNavigation("/auth/login")}
                    className="md:hidden bg-gradient-to-r from-[#AC9456] to-[#9B8449] text-white font-semibold px-4 py-2 rounded-lg text-sm"
                  >
                    Login
                  </Button>
                )}

                {/* Mobile User Actions when logged in */}
                {isLoggedIn && (
                  <div className="md:hidden flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleNavigation("/cart")}
                      className="relative p-2 text-gray-700 hover:text-[#AC9456] transition-colors duration-200"
                    >
                      <FaShoppingCart className="h-5 w-5" />
                      <span className="absolute -top-1 -right-1 bg-gradient-to-r from-[#AC9456] to-[#9B8449] text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-bold">
                        2
                      </span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleNavigation("/profile")}
                      className="p-2 text-gray-700 hover:text-[#AC9456] transition-colors duration-200"
                    >
                      <FaUser className="h-5 w-5" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
