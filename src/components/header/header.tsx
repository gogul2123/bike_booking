"use client";
import { navbarLinks } from "@/data/navbarLinks";
import { useState } from "react";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Bike, Menu, X } from "lucide-react";

export default function Header() {
  const [activeLink, setActiveLink] = useState("/");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLinkClick = (link: string) => {
    setActiveLink(link);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Bike className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-primary">BikeRent</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navbarLinks.map((item) => {
              const IconComponent = item.icon;
              const isActive = activeLink === item.link;

              return (
                <Button
                  key={item.name}
                  variant="none"
                  size="sm"
                  className={`border-0 flex items-center space-x-2 transition-colors cursor-pointer ${
                    isActive
                      ? "!border-b-amber-300 border text-amber-400"
                      : "hover:text-amber-400 "
                  }`}
                  onClick={() => handleLinkClick(item.link)}
                >
                  {/* <IconComponent className="h-4 w-4" /> */}
                  <span className="hidden lg:inline">{item.name}</span>
                </Button>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden ">
              <Button variant="ghost" size="sm">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] p-2 py-3">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2 px-2">
                  <Bike className="h-6 w-6 text-primary" />
                  <span className="text-xl font-bold text-primary">
                    BikeRent
                  </span>
                </div>
                {/* <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button> */}
              </div>

              <nav className="flex flex-col space-y-2">
                {navbarLinks.map((item) => {
                  const IconComponent = item.icon;
                  const isActive = activeLink === item.link;

                  return (
                    <Button
                      key={item.name}
                      variant="none"
                      className={`justify-start space-x-3 h-12 cursor-pointer ${
                        isActive
                          ? "bg-amber-400 text-primary-foreground hover:bg-amber-500"
                          : "hover:bg-amber-100 hover:text-accent-foreground"
                      }`}
                      onClick={() => handleLinkClick(item.link)}
                    >
                      <IconComponent className="h-[15px] w-[15px]" />
                      <span>{item.name}</span>
                    </Button>
                  );
                })}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
