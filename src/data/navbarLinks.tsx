import {
  Home,
  Bike,
  Calendar,
  MapPin,
  User,
  LogIn,
  LogOut,
  Info,
  Settings,
  ShoppingCart,
} from "lucide-react";

export const navbarLinks = [
  {
    name: "Home",
    link: "/",
    icon: Home,
  },
  {
    name: "Browse Bikes",
    link: "/bikes",
    icon: Bike,
  },
  {
    name: "Book Now",
    link: "/book",
    icon: Calendar,
  },
  {
    name: "Locations",
    link: "/locations",
    icon: MapPin,
  },
  {
    name: "My Rentals",
    link: "/my-rentals",
    icon: ShoppingCart,
  },
  {
    name: "Account",
    link: "/account",
    icon: User,
  },
  {
    name: "Settings",
    link: "/settings",
    icon: Settings,
  },
  {
    name: "About Us",
    link: "/about",
    icon: Info,
  },
];
