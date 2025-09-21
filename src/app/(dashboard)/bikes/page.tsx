// "use client";
// import React, { useState, useMemo, useEffect } from "react";
// import {
//   Filter,
//   X,
//   Calendar,
//   Clock,
//   Mountain,
//   MapPin,
//   Zap,
//   Bike,
//   ChevronDown,
//   ChevronUp,
//   Search,
//   Star,
//   Heart,
//   Users,
//   Fuel,
//   Settings,
//   ShoppingCart,
// } from "lucide-react";
// import BookingModal from "@/components/bikes/bike-model";
// import {
//   getFromLocalStorage,
//   saveToLocalStorage,
// } from "@/components/ui/encryption";
// // Types
// interface BikeEngine {
//   cc: number;
//   type: string;
//   power_bhp: string;
//   torque_nm: string;
// }

// interface BikeInventory {
//   total: number;
//   by_color: { [key: string]: number };
// }

// interface BikeInsurance {
//   included: boolean;
//   type: string;
//   coverage: string;
// }

// interface BikeData {
//   _id: string;
//   brand: string;
//   model: string;
//   category: string;
//   type: string;
//   availability: boolean;
//   price_per_day_INR: number;
//   colors: string[];
//   inventory: BikeInventory;
//   imageUrl: string;
//   color_image_urls: { [key: string]: string };
//   transmission: string;
//   engine: BikeEngine;
//   fuel_type: string;
//   mileage_kmpl: number;
//   top_speed_kmph: number;
//   seat_height_mm: number;
//   weight_kg: number;
//   features: string[];
//   documents_required: string[];
//   insurance: BikeInsurance;
//   rating: number;
//   reviews_count: number;
//   location_available: string[];
// }

// interface BikeTypeData {
//   id: string;
//   biketype: string;
//   data: BikeData[];
// }

// interface SearchData {
//   city: string;
//   pickupDate: string;
//   pickupTime: string;
//   dropoffDate: string;
//   dropoffTime: string;
// }

// interface Filters {
//   priceRange: [number, number];
//   selectedTypes: string[];
//   selectedCategories: string[];
//   selectedBrands: string[];
//   availability: string;
//   favorites: boolean;
// }

// interface CartItem {
//   bike: BikeData;
//   quantity: number;
//   selectedColor: string;
// }

// // Sample data from your original code
// const bikesData: BikeTypeData[] = [
//   {
//     id: "101",
//     biketype: "commuter",
//     data: [
//       {
//         _id: "650a1fb9f1d2c45678abc101",
//         brand: "Honda",
//         model: "SP 125",
//         category: "motorcycle",
//         type: "commuter",
//         availability: false,
//         price_per_day_INR: 500,
//         colors: ["Black", "Blue", "Grey"],
//         inventory: {
//           total: 2,
//           by_color: {
//             Black: 1,
//             Blue: 1,
//             Grey: 0,
//           },
//         },
//         imageUrl: "/bikeImg/commuter/Honda-SP-125.webp",
//         color_image_urls: {
//           Black: "/bikeImg/commuter/Honda-SP-125-Black.jpg",
//           Blue: "/bikeImg/commuter/Honda-SP-125-Blue.webp",
//         },
//         transmission: "manual",
//         engine: {
//           cc: 124,
//           type: "Single-cylinder, air-cooled",
//           power_bhp: "10.8",
//           torque_nm: "10.9 Nm @ 6000 rpm",
//         },
//         fuel_type: "petrol",
//         mileage_kmpl: 65,
//         top_speed_kmph: 100,
//         seat_height_mm: 790,
//         weight_kg: 117,
//         features: [
//           "Digital meter",
//           "LED headlamp",
//           "eSP Technology",
//           "Silent start",
//           "Tubeless tires",
//         ],
//         documents_required: [
//           "Valid Driving License",
//           "Government-issued ID Proof",
//         ],
//         insurance: {
//           included: true,
//           type: "Comprehensive",
//           coverage: "Covers accidental and third-party damage",
//         },
//         rating: 4.4,
//         reviews_count: 98,
//         location_available: [
//           "Coimbatore",
//           "Ghandipuram",
//           "Coimbatore Railway Station",
//         ],
//       },
//       {
//         _id: "650a1fb9f1d2c45678abc102",
//         brand: "Hero",
//         model: "Splendor Plus",
//         category: "motorcycle",
//         type: "commuter",
//         availability: true,
//         price_per_day_INR: 450,
//         colors: ["Black with Silver", "Red", "Blue"],
//         inventory: {
//           total: 1,
//           by_color: {
//             "Black with Silver": 0,
//             Red: 0,
//             Blue: 1,
//           },
//         },
//         imageUrl: "/bikeImg/commuter/hero_splendor_plus.jpg",
//         color_image_urls: {
//           Black: "/bikeImg/commuter/Honda-SP-125-Black.webp",
//           Blue: "/bikeImg/commuter/Honda-SP-125-Blue.webp",
//           Grey: "/bikeImg/commuter/Honda-SP-125-Grey.webp",
//         },
//         transmission: "manual",
//         engine: {
//           cc: 97,
//           type: "Air-cooled, 4-stroke",
//           power_bhp: "7.9",
//           torque_nm: "8.05 Nm @ 6000 rpm",
//         },
//         fuel_type: "petrol",
//         mileage_kmpl: 70,
//         top_speed_kmph: 87,
//         seat_height_mm: 785,
//         weight_kg: 110,
//         features: [
//           "i3s Technology",
//           "Kick and electric start",
//           "Tubeless tyres",
//           "Alloy wheels",
//           "USB charger",
//         ],
//         documents_required: [
//           "Valid Driving License",
//           "Government-issued ID Proof",
//         ],
//         insurance: {
//           included: true,
//           type: "Third-party",
//           coverage: "Basic accident and liability coverage",
//         },
//         rating: 4.3,
//         reviews_count: 76,
//         location_available: [
//           "Coimbatore",
//           "Ghandipuram",
//           "Coimbatore Railway Station",
//         ],
//       },
//     ],
//   },
//   {
//     id: "102",
//     biketype: "sports",
//     data: [
//       {
//         _id: "650a1fb9f1d2c45678abc201",
//         brand: "Yamaha",
//         model: "R15 V4",
//         category: "motorcycle",
//         type: "sport",
//         availability: true,
//         price_per_day_INR: 1200,
//         colors: ["Racing Blue", "Metallic Grey"],
//         inventory: {
//           total: 1,
//           by_color: {
//             "Racing Blue": 0,
//             "Metallic Grey": 1,
//           },
//         },
//         imageUrl: "/bikeImg/sport/yamaha_r15_v4.webp",
//         color_image_urls: {
//           Black: "/bikeImg/commuter/Honda-SP-125-Black.webp",
//           Blue: "/bikeImg/commuter/Honda-SP-125-Blue.webp",
//           Grey: "/bikeImg/commuter/Honda-SP-125-Grey.webp",
//         },
//         transmission: "manual",
//         engine: {
//           cc: 155,
//           type: "Liquid-cooled, 4-stroke",
//           power_bhp: "18.1",
//           torque_nm: "14.2 Nm @ 7500 rpm",
//         },
//         fuel_type: "petrol",
//         mileage_kmpl: 40,
//         top_speed_kmph: 140,
//         seat_height_mm: 815,
//         weight_kg: 142,
//         features: [
//           "Variable Valve Actuation",
//           "LED lighting",
//           "Dual-channel ABS",
//           "Digital instrument cluster",
//         ],
//         documents_required: [
//           "Valid Driving License",
//           "Government-issued ID Proof",
//         ],
//         insurance: {
//           included: true,
//           type: "Comprehensive",
//           coverage: "Full damage and third-party coverage",
//         },
//         rating: 4.6,
//         reviews_count: 201,
//         location_available: [
//           "Coimbatore",
//           "Ghandipuram",
//           "Coimbatore Railway Station",
//         ],
//       },
//       {
//         _id: "650a1fb9f1d2c45678abc202",
//         brand: "KTM",
//         model: "RC 200",
//         category: "motorcycle",
//         type: "sport",
//         availability: true,
//         price_per_day_INR: 1400,
//         colors: ["White", "Orange"],
//         inventory: {
//           total: 1,
//           by_color: {
//             White: 0,
//             Orange: 1,
//           },
//         },
//         imageUrl: "/bikeImg/sport/KTM_RC_200.jpg",
//         color_image_urls: {
//           Black: "/bikeImg/commuter/Honda-SP-125-Black.webp",
//           Blue: "/bikeImg/commuter/Honda-SP-125-Blue.webp",
//           Grey: "/bikeImg/commuter/Honda-SP-125-Grey.webp",
//         },
//         transmission: "manual",
//         engine: {
//           cc: 199.5,
//           type: "Liquid-cooled, DOHC",
//           power_bhp: "25",
//           torque_nm: "19.2 Nm @ 8000 rpm",
//         },
//         fuel_type: "petrol",
//         mileage_kmpl: 35,
//         top_speed_kmph: 140,
//         seat_height_mm: 835,
//         weight_kg: 160,
//         features: [
//           "Split LED headlamp",
//           "LCD dashboard",
//           "ABS",
//           "Trellis frame",
//         ],
//         documents_required: [
//           "Valid Driving License",
//           "Government-issued ID Proof",
//         ],
//         insurance: {
//           included: true,
//           type: "Comprehensive",
//           coverage: "Full body and engine protection",
//         },
//         rating: 4.5,
//         reviews_count: 162,
//         location_available: [
//           "Coimbatore",
//           "Ghandipuram",
//           "Coimbatore Railway Station",
//         ],
//       },
//     ],
//   },
//   {
//     id: "103",
//     biketype: "cruiser",
//     data: [
//       {
//         _id: "650a1fb9f1d2c45678abc301",
//         brand: "Royal Enfield",
//         model: "Meteor 350",
//         category: "motorcycle",
//         type: "cruiser",
//         availability: true,
//         price_per_day_INR: 1600,
//         colors: ["Fireball Red", "Supernova Brown"],
//         inventory: {
//           total: 1,
//           by_color: {
//             "Fireball Red": 0,
//             "Supernova Brown": 1,
//           },
//         },
//         imageUrl: "/bikeImg/cruiser/royal_enfield_meteor_350.webp",
//         color_image_urls: {
//           Black: "/bikeImg/commuter/Honda-SP-125-Black.webp",
//           Blue: "/bikeImg/commuter/Honda-SP-125-Blue.webp",
//           Grey: "/bikeImg/commuter/Honda-SP-125-Grey.webp",
//         },
//         transmission: "manual",
//         engine: {
//           cc: 349,
//           type: "Air-oil cooled, SOHC",
//           power_bhp: "20.2",
//           torque_nm: "27 Nm @ 4000 rpm",
//         },
//         fuel_type: "petrol",
//         mileage_kmpl: 35,
//         top_speed_kmph: 120,
//         seat_height_mm: 765,
//         weight_kg: 191,
//         features: [
//           "Tripper Navigation",
//           "Comfortable seating",
//           "USB charging port",
//           "ABS",
//         ],
//         documents_required: [
//           "Valid Driving License",
//           "Government-issued ID Proof",
//         ],
//         insurance: {
//           included: true,
//           type: "Third-party",
//           coverage: "Liability and minor damage coverage",
//         },
//         rating: 4.6,
//         reviews_count: 134,
//         location_available: [
//           "Coimbatore",
//           "Ghandipuram",
//           "Coimbatore Railway Station",
//         ],
//       },
//       {
//         _id: "650a1fb9f1d2c45678abc302",
//         brand: "Bajaj",
//         model: "Avenger Cruise 220",
//         category: "motorcycle",
//         type: "cruiser",
//         availability: true,
//         price_per_day_INR: 1500,
//         colors: ["Moon White", "Auburn Black"],
//         inventory: {
//           total: 1,
//           by_color: {
//             "Moon White": 1,
//             "Auburn Black": 0,
//           },
//         },
//         imageUrl: "/bikeImg/cruiser/bajaj_avenger.avif",
//         color_image_urls: {
//           Black: "/bikeImg/commuter/Honda-SP-125-Black.webp",
//           Blue: "/bikeImg/commuter/Honda-SP-125-Blue.webp",
//           Grey: "/bikeImg/commuter/Honda-SP-125-Grey.webp",
//         },
//         transmission: "manual",
//         engine: {
//           cc: 220,
//           type: "Twin spark, oil-cooled",
//           power_bhp: "19",
//           torque_nm: "17.5 Nm @ 7000 rpm",
//         },
//         fuel_type: "petrol",
//         mileage_kmpl: 40,
//         top_speed_kmph: 115,
//         seat_height_mm: 737,
//         weight_kg: 163,
//         features: [
//           "Low seat height",
//           "Long wheelbase",
//           "Cruiser handlebar",
//           "Windshield",
//         ],
//         documents_required: [
//           "Valid Driving License",
//           "Government-issued ID Proof",
//         ],
//         insurance: {
//           included: true,
//           type: "Third-party",
//           coverage: "Basic damage and liability",
//         },
//         rating: 4.4,
//         reviews_count: 97,
//         location_available: [
//           "Coimbatore",
//           "Ghandipuram",
//           "Coimbatore Railway Station",
//         ],
//       },
//     ],
//   },
//   {
//     id: "104",
//     biketype: "adventure",
//     data: [
//       {
//         _id: "650a1fb9f1d2c45678abc401",
//         brand: "KTM",
//         model: "390 Adventure",
//         category: "motorcycle",
//         type: "adventure",
//         availability: true,
//         price_per_day_INR: 2000,
//         colors: ["Orange", "White"],
//         inventory: {
//           total: 1,
//           by_color: {
//             Orange: 1,
//             White: 0,
//           },
//         },
//         imageUrl: "/bikeImg/adventure/ktm_390_adventure.avif",
//         color_image_urls: {
//           Black: "/bikeImg/commuter/Honda-SP-125-Black.webp",
//           Blue: "/bikeImg/commuter/Honda-SP-125-Blue.webp",
//           Grey: "/bikeImg/commuter/Honda-SP-125-Grey.webp",
//         },
//         transmission: "manual",
//         engine: {
//           cc: 373,
//           type: "Liquid-cooled, single-cylinder",
//           power_bhp: "43",
//           torque_nm: "37 Nm @ 7000 rpm",
//         },
//         fuel_type: "petrol",
//         mileage_kmpl: 28,
//         top_speed_kmph: 170,
//         seat_height_mm: 855,
//         weight_kg: 177,
//         features: [
//           "TFT display",
//           "Cornering ABS",
//           "Traction Control",
//           "Ride-by-wire",
//         ],
//         documents_required: [
//           "Valid Driving License",
//           "Government-issued ID Proof",
//         ],
//         insurance: {
//           included: true,
//           type: "Comprehensive",
//           coverage: "Full damage and off-road cover",
//         },
//         rating: 4.8,
//         reviews_count: 142,
//         location_available: [
//           "Coimbatore",
//           "Ghandipuram",
//           "Coimbatore Railway Station",
//         ],
//       },
//       {
//         _id: "650a1fb9f1d2c45678abc003",
//         brand: "BMW",
//         model: "G 310 GS",
//         category: "motorcycle",
//         type: "adventure",
//         availability: true,
//         price_per_day_INR: 2500,
//         colors: ["Racing Red", "Polar White", "Cosmic Black"],
//         inventory: {
//           total: 1,
//           by_color: {
//             "Racing Red": 0,
//             "Polar White": 1,
//             "Cosmic Black": 0,
//           },
//         },
//         imageUrl: "/bikeImg/adventure/bmw.jpg",
//         color_image_urls: {
//           Black: "/bikeImg/commuter/Honda-SP-125-Black.webp",
//           Blue: "/bikeImg/commuter/Honda-SP-125-Blue.webp",
//           Grey: "/bikeImg/commuter/Honda-SP-125-Grey.webp",
//         },
//         transmission: "manual",
//         engine: {
//           cc: 313,
//           type: "Single-cylinder, liquid-cooled, 4-stroke",
//           power_bhp: "33.5",
//           torque_nm: "28 Nm @ 7500 rpm",
//         },
//         fuel_type: "petrol",
//         mileage_kmpl: 30,
//         top_speed_kmph: 143,
//         seat_height_mm: 835,
//         weight_kg: 169.5,
//         features: [
//           "Upside-down front forks",
//           "Dual-channel ABS",
//           "LED Headlight",
//           "Adjustable brake and clutch levers",
//           "Multifunction LCD display",
//         ],
//         documents_required: [
//           "Valid Driving License",
//           "Government-issued ID Proof",
//         ],
//         insurance: {
//           included: true,
//           type: "Comprehensive",
//           coverage: "Covers damage, theft, and third-party liability",
//         },
//         rating: 4.6,
//         reviews_count: 87,
//         location_available: [
//           "Coimbatore",
//           "Ghandipuram",
//           "Coimbatore Railway Station",
//         ],
//       },
//     ],
//   },
// ];

// const BikeListingPage: React.FC = () => {
//   const [searchData, setSearchData] = useState<SearchData>({
//     city: "Coimbatore",
//     pickupDate: "2025-07-28",
//     pickupTime: "09:00",
//     dropoffDate: "2025-07-29",
//     dropoffTime: "18:00",
//   });

//   const [showMobileSearch, setShowMobileSearch] = useState<boolean>(false);
//   const [showMobileFilters, setShowMobileFilters] = useState<boolean>(false);
//   const [showDesktopFilters, setShowDesktopFilters] = useState<boolean>(true);

//   const [likedBikes, setLikedBikes] = useState<string[]>([]);
//   const [cart, setCart] = useState<CartItem[]>([]);
//   const [selectedBike, setSelectedBike] = useState<BikeData | null>(null);
//   const [showBookingModal, setShowBookingModal] = useState<boolean>(false);

//   const [filters, setFilters] = useState<Filters>({
//     priceRange: [500, 3500],
//     selectedTypes: [],
//     selectedCategories: [],
//     selectedBrands: [],
//     availability: "all",
//     favorites: false,
//   });

//   // Flatten bikes data for easier processing
//   const allBikes: BikeData[] = useMemo(() => {
//     return bikesData.flatMap((bikeType) => bikeType.data);
//   }, []);

//   // Get unique values for filters
//   const uniqueTypes = [...new Set(allBikes.map((bike) => bike.type))];
//   const uniqueCategories = [...new Set(allBikes.map((bike) => bike.category))];
//   const uniqueBrands = [...new Set(allBikes.map((bike) => bike.brand))];

//   // Filter bikes based on selected filters
//   const filteredBikes = useMemo(() => {
//     return allBikes.filter((bike) => {
//       const priceCheck =
//         bike.price_per_day_INR >= filters.priceRange[0] &&
//         bike.price_per_day_INR <= filters.priceRange[1];
//       const typeCheck =
//         filters.selectedTypes.length === 0 ||
//         filters.selectedTypes.includes(bike.type);
//       const categoryCheck =
//         filters.selectedCategories.length === 0 ||
//         filters.selectedCategories.includes(bike.category);
//       const brandCheck =
//         filters.selectedBrands.length === 0 ||
//         filters.selectedBrands.includes(bike.brand);
//       const availabilityCheck =
//         filters.availability === "all" ||
//         (filters.availability === "available" && bike.availability) ||
//         (filters.availability === "booked" && !bike.availability);
//       const favoritesCheck =
//         !filters.favorites || likedBikes.includes(bike._id);

//       return (
//         priceCheck &&
//         typeCheck &&
//         categoryCheck &&
//         brandCheck &&
//         availabilityCheck &&
//         favoritesCheck
//       );
//     });
//   }, [allBikes, filters, likedBikes]);

//   const getTypeIcon = (type: string): React.JSX.Element => {
//     switch (type) {
//       case "adventure":
//         return <Mountain className="w-4 h-4" />;
//       case "commuter":
//         return <MapPin className="w-4 h-4" />;
//       case "sport":
//         return <Zap className="w-4 h-4" />;
//       case "cruiser":
//         return <Bike className="w-4 h-4" />;
//       default:
//         return <Bike className="w-4 h-4" />;
//     }
//   };

//   const clearAllFilters = (): void => {
//     setFilters({
//       priceRange: [500, 3500],
//       selectedTypes: [],
//       selectedCategories: [],
//       selectedBrands: [],
//       availability: "all",
//       favorites: false,
//     });
//   };

//   const toggleArrayFilter = (
//     value: string,
//     filterKey: keyof Pick<
//       Filters,
//       "selectedTypes" | "selectedCategories" | "selectedBrands"
//     >
//   ): void => {
//     setFilters((prev) => ({
//       ...prev,
//       [filterKey]: prev[filterKey].includes(value)
//         ? prev[filterKey].filter((item) => item !== value)
//         : [...prev[filterKey], value],
//     }));
//   };

//   const openBookingModal = (bike: BikeData): void => {
//     setSelectedBike(bike);
//     setShowBookingModal(true);
//   };

//   const closeBookingModal = (): void => {
//     setShowBookingModal(false);
//     setSelectedBike(null);
//   };

//   const addToCart = (
//     bike: BikeData,
//     days: number,
//     selectedColor: string
//   ): void => {
//     setCart((prev) => {
//       const existingItem = prev.find(
//         (item) =>
//           item.bike._id === bike._id && item.selectedColor === selectedColor
//       );

//       if (existingItem) {
//         return prev.map((item) =>
//           item.bike._id === bike._id && item.selectedColor === selectedColor
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         );
//       } else {
//         return [...prev, { bike, quantity: 1, selectedColor }];
//       }
//     });
//   };

//   const handleBookNow = (
//     bike: BikeData,
//     days: number,
//     selectedColor: string
//   ): void => {
//     // Handle booking logic here
//     console.log("Booking:", { bike, days, selectedColor });
//   };

//   const getCartItemCount = (bikeId: string): number => {
//     return cart.reduce(
//       (total, item) =>
//         item.bike._id === bikeId ? total + item.quantity : total,
//       0
//     );
//   };

//   const getTotalCartItems = (): number => {
//     return cart.reduce((total, item) => total + item.quantity, 0);
//   };

//   const BikeCard: React.FC<{ bike: BikeData; index: number }> = ({
//     bike,
//     index,
//   }) => {
//     const cartCount = getCartItemCount(bike._id);
//     const [liked, setLiked] = useState<boolean>(false);
//     // const isLiked = likedBikes.includes(bike._id);

//     // Load liked state from localStorage on mount
//     const safeParse = <T,>(value: string | null, fallback: T): T => {
//       try {
//         if (!value) return fallback;
//         return JSON.parse(value);
//       } catch {
//         return fallback;
//       }
//     };
//     useEffect(() => {
//       const storedLikes = safeParse<string[]>(
//         getFromLocalStorage("likedBikes"),
//         []
//       );
//       setLiked(storedLikes.includes(bike._id));
//       console.log("Running");
//     }, [bike._id]);

//     // Toggle like state and update localStorage
//     const toggleLike = () => {
//       const storedLikes = safeParse(getFromLocalStorage("likedBikes"), []);
//       let updatedLikes;

//       if (liked) {
//         updatedLikes = storedLikes.filter((id) => id !== bike._id);
//       } else {
//         updatedLikes = [...storedLikes, bike._id];
//       }

//       saveToLocalStorage("likedBikes", JSON.stringify(updatedLikes));
//       setLiked(!liked);
//       setLikedBikes(updatedLikes); // sync global state
//     };

//     return (
//       <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">
//         <div className="relative">
//           <img
//             src={bike.imageUrl}
//             alt={`${bike.brand} ${bike.model}`}
//             className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
//           />
//           <button
//             onClick={toggleLike}
//             className="absolute top-3 right-3 p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
//           >
//             <Heart
//               className={`w-5 h-5 transition-colors ${
//                 liked ? "text-red-500 fill-red-500" : "text-gray-600"
//               }`}
//             />
//           </button>
//           <div className="absolute bottom-3 left-3">
//             <span className="bg-black/70 text-white px-2 py-1 rounded text-xs font-medium">
//               {bike.engine.cc}cc
//             </span>
//           </div>
//         </div>

//         <div className="p-4">
//           <div className="md:h-24 flex flex-col justify-between">
//             <div className="flex items-center justify-between mb-2">
//               <h3 className="font-bold text-lg text-gray-900">
//                 {bike.brand} {bike.model}
//               </h3>
//               <div className="flex items-center gap-1">
//                 <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
//                 <span className="text-sm font-medium">{bike.rating}</span>
//                 <span className="text-sm text-gray-500">
//                   ({bike.reviews_count})
//                 </span>
//               </div>
//             </div>

//             <div className="flex items-center gap-4 mb-3 text-sm text-gray-600">
//               <div className="flex items-center gap-1">
//                 <Users className="w-4 h-4" />
//                 <span>2 seats</span>
//               </div>
//               <div className="flex items-center gap-1">
//                 <Fuel className="w-4 h-4" />
//                 <span>{bike.mileage_kmpl} kmpl</span>
//               </div>
//               <div className="flex items-center gap-1">
//                 <Settings className="w-4 h-4" />
//                 <span>{bike.transmission}</span>
//               </div>
//             </div>
//           </div>

//           <div className="flex items-center justify-between">
//             <div>
//               <span className="text-2xl font-bold text-[#AC9456]">
//                 ₹{bike.price_per_day_INR}
//               </span>
//               <span className="text-gray-500 text-sm">/day</span>
//             </div>
//             <div className="flex gap-2">
//               {cartCount > 0 && (
//                 <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2">
//                   <ShoppingCart className="w-4 h-4" />
//                   <span className="text-sm font-medium">{cartCount}</span>
//                 </div>
//               )}
//               <button
//                 onClick={() => openBookingModal(bike)}
//                 className="bg-gradient-to-r from-[#AC9456] to-[#D4B76A] text-white px-6 py-2 rounded-lg font-medium transition-colors"
//               >
//                 Book Now
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   const FilterPanel: React.FC<{ isMobile?: boolean }> = ({
//     isMobile = false,
//   }) => (
//     <>
//       <div
//         className={`bg-white ${isMobile ? "p-4" : "p-6"} rounded-lg shadow-md`}
//       >
//         <div className=" flex items-center justify-between mb-4">
//           <h3 className="font-semibold text-lg">Filters</h3>
//           {isMobile && (
//             <button onClick={() => setShowMobileFilters(false)}>
//               <X className="w-6 h-6" />
//             </button>
//           )}
//         </div>

//         {/* Favorites Filter */}
//         <div className="mb-6">
//           <label className="flex items-center gap-2 cursor-pointer">
//             <input
//               type="checkbox"
//               checked={filters.favorites}
//               onChange={(e) =>
//                 setFilters((prev) => ({ ...prev, favorites: e.target.checked }))
//               }
//               className="rounded border-gray-300"
//             />
//             <div className="flex items-center gap-2">
//               <Heart className="w-4 h-4" />
//               <span className="text-sm font-medium">Show Favorites Only</span>
//             </div>
//           </label>
//         </div>

//         {/* Price Range */}
//         <div className="mb-6">
//           <label className="block text-sm font-medium mb-2">
//             Price Range (per day)
//           </label>
//           <div className="px-2">
//             <input
//               type="range"
//               min="500"
//               max="3500"
//               step="100"
//               value={filters.priceRange[1]}
//               onChange={(e) =>
//                 setFilters((prev) => ({
//                   ...prev,
//                   priceRange: [prev.priceRange[0], parseInt(e.target.value)],
//                 }))
//               }
//               className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
//             />
//             <div className="flex justify-between text-sm text-gray-600 mt-1">
//               <span>₹{filters.priceRange[0]}</span>
//               <span>₹{filters.priceRange[1]}</span>
//             </div>
//           </div>
//         </div>

//         {/* Bike Types */}
//         <div className="mb-6">
//           <label className="block text-sm font-medium mb-3">Bike Type</label>
//           <div className="space-y-2">
//             {uniqueTypes.map((type) => (
//               <label
//                 key={type}
//                 className="flex items-center gap-2 cursor-pointer"
//               >
//                 <input
//                   type="checkbox"
//                   checked={filters.selectedTypes.includes(type)}
//                   onChange={() => toggleArrayFilter(type, "selectedTypes")}
//                   className="rounded border-gray-300"
//                 />
//                 <div className="flex items-center gap-2">
//                   {getTypeIcon(type)}
//                   <span className="capitalize text-sm">{type}</span>
//                 </div>
//               </label>
//             ))}
//           </div>
//         </div>

//         {/* Categories */}
//         <div className="mb-6">
//           <label className="block text-sm font-medium mb-3">Category</label>
//           <div className="space-y-2">
//             {uniqueCategories.map((category) => (
//               <label
//                 key={category}
//                 className="flex items-center gap-2 cursor-pointer"
//               >
//                 <input
//                   type="checkbox"
//                   checked={filters.selectedCategories.includes(category)}
//                   onChange={() =>
//                     toggleArrayFilter(category, "selectedCategories")
//                   }
//                   className="rounded border-gray-300"
//                 />
//                 <span className="capitalize text-sm">{category}</span>
//               </label>
//             ))}
//           </div>
//         </div>

//         {/* Brands */}
//         <div className="mb-6">
//           <label className="block text-sm font-medium mb-3">Brand</label>
//           <div className="space-y-2">
//             {uniqueBrands.map((brand) => (
//               <label
//                 key={brand}
//                 className="flex items-center gap-2 cursor-pointer"
//               >
//                 <input
//                   type="checkbox"
//                   checked={filters.selectedBrands.includes(brand)}
//                   onChange={() => toggleArrayFilter(brand, "selectedBrands")}
//                   className="rounded border-gray-300"
//                 />
//                 <span className="text-sm">{brand}</span>
//               </label>
//             ))}
//           </div>
//         </div>

//         {/* Availability */}
//         <div className="mb-6">
//           <label className="block text-sm font-medium mb-3">Availability</label>
//           <select
//             value={filters.availability}
//             onChange={(e) =>
//               setFilters((prev) => ({ ...prev, availability: e.target.value }))
//             }
//             className="w-full p-2 border rounded-lg"
//           >
//             <option value="all">All</option>
//             <option value="available">Available</option>
//             <option value="booked">Booked</option>
//           </select>
//         </div>

//         {/* Clear Filters */}
//         <button
//           onClick={() => {
//             clearAllFilters();
//             setShowMobileFilters(false);
//           }}
//           className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg transition-colors"
//         >
//           Clear All Filters
//         </button>
//       </div>
//     </>
//   );

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <div className="bg-white shadow-sm">
//         <div className="max-w-7xl mx-auto px-4 py-4">
//           <div className="flex items-center justify-between">
//             <h1 className="text-2xl font-bold text-gray-900 mb-4">
//               Premium Bikes
//             </h1>
//             {/* Cart Icon */}
//             {/* <div className="relative">
//                 <ShoppingCart className="w-6 h-6 text-gray-700" />
//                 {getTotalCartItems() > 0 && (
//                   <span className="absolute -top-2 -right-2 bg-[#AC9456] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
//                     {getTotalCartItems()}
//                   </span>
//                 )}
//               </div> */}
//           </div>

//           {/* Desktop Search Bar */}
//           <div className="hidden md:flex flex-wrap items-center gap-4 bg-gray-50 p-4 rounded-lg">
//             <div className="flex items-center gap-2 flex-1">
//               <MapPin className="w-5 h-5 text-gray-500" />
//               <input
//                 type="text"
//                 value={searchData.city}
//                 onChange={(e) =>
//                   setSearchData((prev) => ({ ...prev, city: e.target.value }))
//                 }
//                 placeholder="City"
//                 className="bg-transparent border-none outline-none flex-1 font-medium"
//               />
//             </div>

//             <div className="flex items-center gap-2">
//               <Calendar className="w-5 h-5 text-gray-500" />
//               <input
//                 type="date"
//                 value={searchData.pickupDate}
//                 onChange={(e) =>
//                   setSearchData((prev) => ({
//                     ...prev,
//                     pickupDate: e.target.value,
//                   }))
//                 }
//                 className="bg-transparent border-none outline-none"
//               />
//               <input
//                 type="time"
//                 value={searchData.pickupTime}
//                 onChange={(e) =>
//                   setSearchData((prev) => ({
//                     ...prev,
//                     pickupTime: e.target.value,
//                   }))
//                 }
//                 className="bg-transparent border-none outline-none"
//               />
//             </div>

//             <div className="flex items-center gap-2">
//               <Calendar className="w-5 h-5 text-gray-500" />
//               <input
//                 type="date"
//                 value={searchData.dropoffDate}
//                 onChange={(e) =>
//                   setSearchData((prev) => ({
//                     ...prev,
//                     dropoffDate: e.target.value,
//                   }))
//                 }
//                 className="bg-transparent border-none outline-none"
//               />
//               <input
//                 type="time"
//                 value={searchData.dropoffTime}
//                 onChange={(e) =>
//                   setSearchData((prev) => ({
//                     ...prev,
//                     dropoffTime: e.target.value,
//                   }))
//                 }
//                 className="bg-transparent border-none outline-none"
//               />
//             </div>

//             <button className=" bg-gradient-to-r from-[#AC9456] to-[#D4B76A] text-white px-6 py-2 rounded-lg transition-colors">
//               <Search className="w-5 h-5" />
//             </button>
//           </div>

//           {/* Mobile Search Bar */}
//           <div className="md:hidden">
//             <div
//               className="flex items-center justify-between bg-gray-50 p-4 rounded-lg cursor-pointer"
//               onClick={() => setShowMobileSearch(!showMobileSearch)}
//             >
//               <div className="flex items-center gap-2">
//                 <MapPin className="w-5 h-5 text-gray-500" />
//                 <span className="font-medium">{searchData.city}</span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <span className="text-sm text-gray-600">
//                   {new Date(searchData.pickupDate).toLocaleDateString()} -{" "}
//                   {new Date(searchData.dropoffDate).toLocaleDateString()}
//                 </span>
//                 <ChevronDown
//                   className={`w-5 h-5 transition-transform ${
//                     showMobileSearch ? "rotate-180" : ""
//                   }`}
//                 />
//               </div>
//             </div>

//             {showMobileSearch && (
//               <div className="mt-4 bg-white p-4 rounded-lg shadow-md space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium mb-1">City</label>
//                   <div className="flex items-center gap-2 border rounded-lg p-2">
//                     <MapPin className="w-5 h-5 text-gray-500" />
//                     <input
//                       type="text"
//                       value={searchData.city}
//                       onChange={(e) =>
//                         setSearchData((prev) => ({
//                           ...prev,
//                           city: e.target.value,
//                         }))
//                       }
//                       className="flex-1 border-none outline-none"
//                     />
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium mb-1">
//                       Pick Up
//                     </label>
//                     <input
//                       type="date"
//                       value={searchData.pickupDate}
//                       onChange={(e) =>
//                         setSearchData((prev) => ({
//                           ...prev,
//                           pickupDate: e.target.value,
//                         }))
//                       }
//                       className="w-full border rounded-lg p-2"
//                     />
//                     <input
//                       type="time"
//                       value={searchData.pickupTime}
//                       onChange={(e) =>
//                         setSearchData((prev) => ({
//                           ...prev,
//                           pickupTime: e.target.value,
//                         }))
//                       }
//                       className="w-full border rounded-lg p-2 mt-2"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium mb-1">
//                       Drop Off
//                     </label>
//                     <input
//                       type="date"
//                       value={searchData.dropoffDate}
//                       onChange={(e) =>
//                         setSearchData((prev) => ({
//                           ...prev,
//                           dropoffDate: e.target.value,
//                         }))
//                       }
//                       className="w-full border rounded-lg p-2"
//                     />
//                     <input
//                       type="time"
//                       value={searchData.dropoffTime}
//                       onChange={(e) =>
//                         setSearchData((prev) => ({
//                           ...prev,
//                           dropoffTime: e.target.value,
//                         }))
//                       }
//                       className="w-full border rounded-lg p-2 mt-2"
//                     />
//                   </div>
//                 </div>

//                 <button
//                   className="w-full  bg-gradient-to-r from-[#AC9456] to-[#D4B76A] text-white py-3 rounded-lg font-medium transition-colors"
//                   onClick={() => setShowMobileSearch(false)}
//                 >
//                   Search Bikes
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="max-w-7xl mx-auto px-4 py-6">
//         <div className="flex gap-6">
//           {/* Desktop Filters Sidebar */}
//           <div
//             className={`hidden lg:block w-80 transition-all duration-300 ${
//               showDesktopFilters ? "opacity-100" : "opacity-0 w-0"
//             }`}
//           >
//             {showDesktopFilters && <FilterPanel />}
//           </div>

//           {/* Bikes Grid */}
//           <div className="flex-1">
//             <div className="flex items-center justify-between mb-6">
//               <p className="text-gray-600">
//                 {filteredBikes.length} bikes available
//               </p>
//               <button
//                 onClick={() => setShowDesktopFilters(!showDesktopFilters)}
//                 className="hidden lg:flex items-center gap-2 text-gray-600 hover:text-gray-900"
//               >
//                 <Filter className="w-5 h-5" />
//                 {showDesktopFilters ? "Hide Filters" : "Show Filters"}
//               </button>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
//               {filteredBikes.map((bike, index) => (
//                 <BikeCard key={bike._id} bike={bike} index={index} />
//               ))}
//             </div>

//             {filteredBikes.length === 0 && (
//               <div className="text-center py-12">
//                 <Bike className="w-16 h-16 mx-auto mb-4 text-gray-400" />
//                 <h3 className="text-xl font-semibold text-gray-900 mb-2">
//                   No bikes found
//                 </h3>
//                 <p className="text-gray-600 mb-4">
//                   Try adjusting your filters to see more results
//                 </p>
//                 <button
//                   onClick={clearAllFilters}
//                   className=" bg-gradient-to-r from-[#AC9456] to-[#D4B76A] text-white px-6 py-2 rounded-lg transition-colors"
//                 >
//                   Clear All Filters
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Mobile Filter Button */}
//       <div className="lg:hidden fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
//         <button
//           onClick={() => setShowMobileFilters(true)}
//           className=" bg-gradient-to-r from-[#AC9456] to-[#D4B76A] text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2 transition-colors"
//         >
//           <Filter className="w-5 h-5" />
//           Filters
//         </button>
//       </div>

//       {/* Mobile Filter Modal */}
//       {showMobileFilters && (
//         <div className="lg:hidden fixed inset-0 bg-black/50 z-50">
//           <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-xl max-h-[80vh] overflow-y-auto">
//             <FilterPanel isMobile={true} />
//           </div>
//         </div>
//       )}
//       {/* Booking Modal */}
//       <BookingModal
//         bike={selectedBike}
//         isOpen={showBookingModal}
//         onClose={closeBookingModal}
//         // onAddToCart={addToCart}
//         onBookNow={handleBookNow}
//       />
//     </div>
//   );
// };

// export default BikeListingPage;

// "use client";
// import React, { useState, useEffect, useMemo } from "react";
// import {
//   Filter,
//   X,
//   Calendar,
//   MapPin,
//   Search,
//   Star,
//   Heart,
//   Users,
//   Fuel,
//   Settings,
//   ChevronDown,
//   Bike,
//   Loader2,
//   AlertCircle,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Label } from "@/components/ui/label";
// import { Card, CardContent } from "@/components/ui/card";
// import { Slider } from "@/components/ui/slider";
// import Alert from "@/components/ui/alert";
// import { useAlert } from "@/hooks/alertHook";

// // Types based on your API response
// interface Vehicle {
//   vehicleId: string;
//   vehicleNumber: string;
// }

// interface ModelInfo {
//   brand: string;
//   model: string;
//   imageUrl: string;
//   transmission: string;
// }

// interface Counters {
//   available: number;
//   total: number;
// }

// interface BikeData {
//   bikeId: string;
//   modelInfo: ModelInfo;
//   vehicles: Vehicle[];
//   counters: Counters;
//   price: number;
// }

// interface ApiResponse {
//   success: boolean;
//   message: string;
//   data: {
//     data: BikeData[];
//     pagination: {
//       currentPage: number;
//       limit: number;
//       totalDocuments: number;
//       totalPages: number;
//       hasNextPage: boolean;
//       hasPreviousPage: boolean;
//       totalFiltered: number;
//     };
//   };
// }

// interface SearchFilters {
//   fromDate: string;
//   toDate: string;
//   minVehicles: number;
//   page: number;
//   limit: number;
//   category?: string;
//   location?: string;
//   transmission?: string;
//   brand?: string;
// }

// const BikeListingPage: React.FC = () => {
//   const { alert, hideAlert, showAlert } = useAlert();
//   const [bikes, setBikes] = useState<BikeData[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [likedBikes, setLikedBikes] = useState<string[]>([]);
//   const [showMobileFilters, setShowMobileFilters] = useState<boolean>(false);
//   const [showDesktopFilters, setShowDesktopFilters] = useState<boolean>(true);
//   const [pagination, setPagination] = useState<any>(null);

//   // Search and filter state
//   const [filters, setFilters] = useState<SearchFilters>({
//     fromDate: new Date().toISOString().split("T")[0],
//     toDate: new Date(Date.now() + 24 * 60 * 60 * 1000)
//       .toISOString()
//       .split("T")[0],
//     minVehicles: 1,
//     page: 1,
//     limit: 10,
//     transmission: "ALL",
//     brand: "ALL",
//   });

//   // Get unique values from current bike data for filters
//   const uniqueBrands = useMemo(
//     () => [...new Set(bikes.map((bike) => bike.modelInfo.brand))],
//     [bikes]
//   );

//   const uniqueTransmissions = useMemo(
//     () => [...new Set(bikes.map((bike) => bike.modelInfo.transmission))],
//     [bikes]
//   );

//   // Fetch bikes from API using POST method
//   const fetchBikes = async () => {
//     setLoading(true);

//     try {
//       const requestBody = {
//         fromDate: filters.fromDate,
//         toDate: filters.toDate,
//         minVehicles: filters.minVehicles,
//         page: filters.page,
//         limit: filters.limit,
//         ...(filters.category && { category: filters.category }),
//         ...(filters.location && { location: filters.location }),
//         ...(filters.transmission !== "ALL" &&
//           filters.transmission && { transmission: filters.transmission }),
//         ...(filters.brand !== "ALL" &&
//           filters.brand && { brand: filters.brand }),
//       };

//       const response = await fetch(
//         "http://localhost:8000/api/bike/availableBikes",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(requestBody),
//         }
//       );

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const data: ApiResponse = await response.json();

//       if (data.success) {
//         setBikes(data.data.data);
//         setPagination(data.data.pagination);
//         if (data.data.data.length === 0 && filters.page === 1) {
//           showAlert("No bikes available for the selected criteria", "info");
//         }
//       } else {
//         throw new Error(data.message || "Failed to fetch bikes");
//       }
//     } catch (err) {
//       const errorMessage =
//         err instanceof Error
//           ? err.message
//           : "An error occurred while fetching bikes";
//       showAlert(errorMessage, "error");
//       console.error("Error fetching bikes:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch bikes on component mount and when filters change
//   useEffect(() => {
//     fetchBikes();
//   }, [filters]);

//   // Load liked bikes from localStorage
//   useEffect(() => {
//     const storedLikes = localStorage.getItem("likedBikes");
//     if (storedLikes) {
//       try {
//         setLikedBikes(JSON.parse(storedLikes));
//       } catch (error) {
//         console.error("Error parsing liked bikes from localStorage:", error);
//       }
//     }
//   }, []);

//   const toggleLike = (bikeId: string) => {
//     const updatedLikes = likedBikes.includes(bikeId)
//       ? likedBikes.filter((id) => id !== bikeId)
//       : [...likedBikes, bikeId];

//     setLikedBikes(updatedLikes);
//     localStorage.setItem("likedBikes", JSON.stringify(updatedLikes));
//   };

//   const handleFilterChange = (key: keyof SearchFilters, value: any) => {
//     setFilters((prev) => ({ ...prev, [key]: value, page: 1 })); // Reset to page 1 when filters change
//   };

//   const clearAllFilters = () => {
//     setFilters({
//       fromDate: new Date().toISOString().split("T")[0],
//       toDate: new Date(Date.now() + 24 * 60 * 60 * 1000)
//         .toISOString()
//         .split("T")[0],
//       minVehicles: 1,
//       page: 1,
//       limit: 10,
//     });
//     showAlert("Filters cleared successfully", "success");
//   };

//   const BikeCard: React.FC<{ bike: BikeData }> = ({ bike }) => {
//     const isLiked = likedBikes.includes(bike.bikeId);

//     return (
//       <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">
//         <div className="relative">
//           <img
//             src={bike.modelInfo.imageUrl}
//             alt={bike.modelInfo.model}
//             className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
//             onError={(e) => {
//               (e.target as HTMLImageElement).src = "/api/placeholder/400/300";
//             }}
//           />
//           <button
//             onClick={() => toggleLike(bike.bikeId)}
//             className="absolute top-3 right-3 p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
//           >
//             <Heart
//               className={`w-5 h-5 transition-colors ${
//                 isLiked ? "text-red-500 fill-red-500" : "text-gray-600"
//               }`}
//             />
//           </button>
//           <div className="absolute bottom-3 left-3">
//             <span className="bg-black/70 text-white px-2 py-1 rounded text-xs font-medium capitalize">
//               {bike.modelInfo.transmission}
//             </span>
//           </div>
//         </div>

//         <div className="p-4">
//           <div className="md:h-24 flex flex-col justify-between">
//             <div className="flex items-center justify-between mb-2">
//               <h3 className="font-bold text-lg text-gray-900">
//                 {bike.modelInfo.model}
//               </h3>
//               <div className="flex items-center gap-1">
//                 <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
//                 <span className="text-sm font-medium">4.5</span>
//                 <span className="text-sm text-gray-500">(125)</span>
//               </div>
//             </div>

//             <div className="flex items-center gap-4 mb-3 text-sm text-gray-600">
//               <div className="flex items-center gap-1">
//                 <Users className="w-4 h-4" />
//                 <span>Available: {bike.counters.available}</span>
//               </div>
//               <div className="flex items-center gap-1">
//                 <Fuel className="w-4 h-4" />
//                 <span>25 kmpl</span>
//               </div>
//               <div className="flex items-center gap-1">
//                 <Settings className="w-4 h-4" />
//                 <span className="capitalize">
//                   {bike.modelInfo.transmission}
//                 </span>
//               </div>
//             </div>
//           </div>

//           <div className="flex items-center justify-between">
//             <div>
//               <span className="text-2xl font-bold text-[#AC9456]">
//                 ₹{bike.price}
//               </span>
//               <span className="text-gray-500 text-sm">/day</span>
//             </div>
//             <div className="flex gap-2">
//               <button
//                 className="bg-gradient-to-r from-[#AC9456] to-[#D4B76A] text-white px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                 disabled={bike.counters.available === 0}
//                 onClick={() =>
//                   showAlert(`Booking ${bike.modelInfo.model}...`, "info")
//                 }
//               >
//                 {bike.counters.available === 0 ? "Not Available" : "Book Now"}
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   const FilterPanel: React.FC<{ isMobile?: boolean }> = ({
//     isMobile = false,
//   }) => (
//     <div
//       className={`bg-white ${isMobile ? "p-4" : "p-6"} rounded-lg shadow-md`}
//     >
//       <div className="flex items-center justify-between mb-4">
//         <h3 className="font-semibold text-lg">Filters</h3>
//         {isMobile && (
//           <button onClick={() => setShowMobileFilters(false)}>
//             <X className="w-6 h-6" />
//           </button>
//         )}
//       </div>

//       {/* Date Range */}
//       <div className="mb-6">
//         <Label className="block text-sm font-medium mb-3">Rental Period</Label>
//         <div className="grid grid-cols-1 gap-3">
//           <div>
//             <Label className="text-xs text-gray-600">From</Label>
//             <Input
//               type="date"
//               value={filters.fromDate}
//               onChange={(e) => handleFilterChange("fromDate", e.target.value)}
//               className="mt-1"
//             />
//           </div>
//           <div>
//             <Label className="text-xs text-gray-600">To</Label>
//             <Input
//               type="date"
//               value={filters.toDate}
//               onChange={(e) => handleFilterChange("toDate", e.target.value)}
//               className="mt-1"
//             />
//           </div>
//         </div>
//       </div>

//       {/* Brand Filter */}
//       <div className="mb-6">
//         <Label className="block text-sm font-medium mb-3">Brand</Label>
//         <Select
//           value={filters.brand || "ALL"}
//           onValueChange={(value) =>
//             handleFilterChange("brand", value || undefined)
//           }
//         >
//           <SelectTrigger>
//             <SelectValue placeholder="All Brands" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="ALL">All Brands</SelectItem>
//             {uniqueBrands.map((brand) => (
//               <SelectItem key={brand} value={brand}>
//                 {brand}
//               </SelectItem>
//             ))}
//           </SelectContent>
//         </Select>
//       </div>

//       {/* Transmission Filter */}
//       <div className="mb-6">
//         <Label className="block text-sm font-medium mb-3">Transmission</Label>
//         <Select
//           value={filters.transmission || "ALL"}
//           onValueChange={(value) =>
//             handleFilterChange("transmission", value || undefined)
//           }
//         >
//           <SelectTrigger>
//             <SelectValue placeholder="All Transmissions" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="ALL">All Transmissions</SelectItem>
//             {uniqueTransmissions.map((transmission) => (
//               <SelectItem key={transmission} value={transmission}>
//                 {transmission.charAt(0).toUpperCase() + transmission.slice(1)}
//               </SelectItem>
//             ))}
//           </SelectContent>
//         </Select>
//       </div>

//       {/* Location Filter */}
//       <div className="mb-6">
//         <Label className="block text-sm font-medium mb-3">Location</Label>
//         <Input
//           placeholder="Enter location"
//           value={filters.location || ""}
//           onChange={(e) =>
//             handleFilterChange("location", e.target.value || undefined)
//           }
//         />
//       </div>

//       {/* Min Vehicles */}
//       <div className="mb-6">
//         <Label className="block text-sm font-medium mb-3">
//           Minimum Vehicles Required
//         </Label>
//         <Input
//           type="number"
//           min="1"
//           value={filters.minVehicles}
//           onChange={(e) =>
//             handleFilterChange("minVehicles", parseInt(e.target.value) || 1)
//           }
//         />
//       </div>

//       {/* Clear Filters */}
//       <button
//         onClick={() => {
//           clearAllFilters();
//           if (isMobile) setShowMobileFilters(false);
//         }}
//         className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg transition-colors"
//       >
//         Clear All Filters
//       </button>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Alert alert={alert} hideAlert={hideAlert} />

//       {/* Header */}
//       <div className="bg-white shadow-sm">
//         <div className="max-w-7xl mx-auto px-4 py-4">
//           <div className="flex items-center justify-between">
//             <h1 className="text-2xl font-bold text-gray-900 mb-4">
//               Available Bikes
//             </h1>
//           </div>

//           {/* Desktop Search Summary */}
//           <div className="hidden md:flex flex-wrap items-center gap-4 bg-gray-50 p-4 rounded-lg">
//             <div className="flex items-center gap-2 flex-1">
//               <MapPin className="w-5 h-5 text-gray-500" />
//               <input
//                 type="text"
//                 value={filters.location || "All Locations"}
//                 onChange={(e) =>
//                   handleFilterChange("location", e.target.value || undefined)
//                 }
//                 placeholder="City"
//                 className="bg-transparent border-none outline-none flex-1 font-medium"
//               />
//             </div>

//             <div className="flex items-center gap-2">
//               <Calendar className="w-5 h-5 text-gray-500" />
//               <span className="text-sm">
//                 {filters.fromDate} to {filters.toDate}
//               </span>
//             </div>

//             <button
//               onClick={fetchBikes}
//               className="bg-gradient-to-r from-[#AC9456] to-[#D4B76A] text-white px-6 py-2 rounded-lg transition-colors"
//               disabled={loading}
//             >
//               {loading ? (
//                 <Loader2 className="w-5 h-5 animate-spin" />
//               ) : (
//                 <Search className="w-5 h-5" />
//               )}
//             </button>
//           </div>

//           {/* Mobile Search Summary */}
//           <div className="md:hidden bg-gray-50 p-4 rounded-lg">
//             <div className="text-sm text-gray-600">
//               <div className="flex items-center gap-2 mb-2">
//                 <Calendar className="w-4 h-4" />
//                 <span>
//                   {filters.fromDate} to {filters.toDate}
//                 </span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <Users className="w-4 h-4" />
//                 <span>Min {filters.minVehicles} vehicle(s)</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="max-w-7xl mx-auto px-4 py-6">
//         <div className="flex gap-6">
//           {/* Desktop Filters Sidebar */}
//           <div
//             className={`hidden lg:block w-80 transition-all duration-300 ${
//               showDesktopFilters ? "opacity-100" : "opacity-0 w-0"
//             }`}
//           >
//             {showDesktopFilters && <FilterPanel />}
//           </div>

//           {/* Bikes Grid */}
//           <div className="flex-1">
//             <div className="flex items-center justify-between mb-6">
//               <p className="text-gray-600">
//                 {loading
//                   ? "Loading..."
//                   : pagination
//                   ? `${pagination.totalFiltered} bikes available`
//                   : ""}
//               </p>
//               <button
//                 onClick={() => setShowDesktopFilters(!showDesktopFilters)}
//                 className="hidden lg:flex items-center gap-2 text-gray-600 hover:text-gray-900"
//               >
//                 <Filter className="w-5 h-5" />
//                 {showDesktopFilters ? "Hide Filters" : "Show Filters"}
//               </button>
//             </div>

//             {/* Loading State */}
//             {loading && (
//               <div className="flex items-center justify-center py-12">
//                 <Loader2 className="w-8 h-8 animate-spin text-[#AC9456]" />
//                 <span className="ml-2 text-gray-600">Loading bikes...</span>
//               </div>
//             )}

//             {/* Bikes Grid */}
//             {!loading && (
//               <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
//                 {bikes.map((bike) => (
//                   <BikeCard key={bike.bikeId} bike={bike} />
//                 ))}
//               </div>
//             )}

//             {/* Empty State */}
//             {!loading && bikes.length === 0 && (
//               <div className="text-center py-12">
//                 <Bike className="w-16 h-16 mx-auto mb-4 text-gray-400" />
//                 <h3 className="text-xl font-semibold text-gray-900 mb-2">
//                   No bikes available
//                 </h3>
//                 <p className="text-gray-600 mb-4">
//                   Try adjusting your filters or search criteria
//                 </p>
//                 <button
//                   onClick={clearAllFilters}
//                   className="bg-gradient-to-r from-[#AC9456] to-[#D4B76A] text-white px-6 py-2 rounded-lg transition-colors"
//                 >
//                   Clear All Filters
//                 </button>
//               </div>
//             )}

//             {/* Pagination */}
//             {pagination && pagination.totalPages > 1 && (
//               <div className="flex items-center justify-center gap-2 mt-8">
//                 <button
//                   disabled={!pagination.hasPreviousPage || loading}
//                   onClick={() => handleFilterChange("page", filters.page - 1)}
//                   className="px-4 py-2 bg-white border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
//                 >
//                   Previous
//                 </button>
//                 <span className="text-sm text-gray-600 px-4">
//                   Page {pagination.currentPage} of {pagination.totalPages}
//                 </span>
//                 <button
//                   disabled={!pagination.hasNextPage || loading}
//                   onClick={() => handleFilterChange("page", filters.page + 1)}
//                   className="px-4 py-2 bg-white border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
//                 >
//                   Next
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Mobile Filter Button */}
//       <div className="lg:hidden fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
//         <button
//           onClick={() => setShowMobileFilters(true)}
//           className="bg-gradient-to-r from-[#AC9456] to-[#D4B76A] text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2 transition-colors"
//         >
//           <Filter className="w-5 h-5" />
//           Filters
//         </button>
//       </div>

//       {/* Mobile Filter Modal */}
//       {showMobileFilters && (
//         <div className="lg:hidden fixed inset-0 bg-black/50 z-50">
//           <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-xl max-h-[80vh] overflow-y-auto">
//             <FilterPanel isMobile={true} />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default BikeListingPage;

"use client";
import React, { useState, useEffect, useMemo } from "react";
import { Bike, Filter, Loader2 } from "lucide-react";
import { useAlert } from "@/hooks/alertHook";
import Alert from "@/components/ui/alert";
import { BikeData, SearchFilters } from "@/components/bikes/types";
import SearchHeader from "@/components/bikes/searchHeadder";
import FilterPanel from "@/components/bikes/filter";
import BikeCard from "@/components/bikes/bikeCard";
import Container from "@/components/ui/container";
import { useAppContext } from "@/hooks/context";
import BookingModal from "@/components/bikes/bike-model";
import { useRouter } from "next/navigation";

const BikeListingPage: React.FC = () => {
  const { alert, hideAlert, showAlert } = useAlert();
  const { URL, fromDate, toDate, setFromDate, setToDate, bike, setBike } =
    useAppContext();
  const [open, setOpen] = useState(false);
  const [bikes, setBikes] = useState<BikeData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [likedBikes, setLikedBikes] = useState<string[]>([]);
  const [showMobileFilters, setShowMobileFilters] = useState<boolean>(false);
  const [showDesktopFilters, setShowDesktopFilters] = useState<boolean>(true);
  const [pagination, setPagination] = useState<any>(null);
  const [tempFilters, setTempFilters] = useState<SearchFilters | null>(null);
  const router = useRouter();

  // Search and filter state
  const [filters, setFilters] = useState<SearchFilters>({
    minVehicles: 1,
    page: 1,
    limit: 10,
    transmission: "ALL",
    brand: "ALL",
  });

  // Get unique values from current bike data for filters
  const uniqueBrands = useMemo(
    () => [...new Set(bikes.map((bike) => bike.modelInfo.brand))],
    [bikes]
  );

  const uniqueTransmissions = useMemo(
    () => [...new Set(bikes.map((bike) => bike.modelInfo.transmission))],
    [bikes]
  );

  // Fetch bikes from API using POST method
  const fetchBikes = async (searchFilters: SearchFilters = filters) => {
    setLoading(true);
    console.log("from date", fromDate, toDate);
    try {
      const requestBody = {
        fromDate: fromDate,
        toDate: toDate,
        minVehicles: searchFilters.minVehicles,
        page: searchFilters.page,
        limit: searchFilters.limit,
        ...(searchFilters.category && { category: searchFilters.category }),
        ...(searchFilters.location && { location: searchFilters.location }),
        ...(searchFilters.transmission !== "ALL" &&
          searchFilters.transmission && {
            transmission: searchFilters.transmission,
          }),
        ...(searchFilters.brand !== "ALL" &&
          searchFilters.brand && { brand: searchFilters.brand }),
      };

      const response = await fetch(
        "http://localhost:8000/api/bike/availableBikes",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        setBikes(data.data.data);
        setPagination(data.data.pagination);
        if (data.data.data.length === 0 && searchFilters.page === 1) {
          showAlert("No bikes available for the selected criteria", "info");
        }
      } else {
        throw new Error(data.message || "Failed to fetch bikes");
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "An error occurred while fetching bikes";
      showAlert(errorMessage, "error");
      console.error("Error fetching bikes:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch bikes on component mount and when filters change
  useEffect(() => {
    fetchBikes();
  }, []);

  // Load liked bikes from localStorage
  useEffect(() => {
    const storedLikes = localStorage.getItem("likedBikes");
    if (storedLikes) {
      try {
        setLikedBikes(JSON.parse(storedLikes));
      } catch (error) {
        console.error("Error parsing liked bikes from localStorage:", error);
      }
    }
  }, []);

  const toggleLike = (bikeId: string) => {
    const updatedLikes = likedBikes.includes(bikeId)
      ? likedBikes.filter((id) => id !== bikeId)
      : [...likedBikes, bikeId];

    setLikedBikes(updatedLikes);
    localStorage.setItem("likedBikes", JSON.stringify(updatedLikes));
  };

  const handleFilterChange = (key: keyof SearchFilters, value: any) => {
    // For mobile filters, store changes temporarily until Apply is clicked
    if (showMobileFilters) {
      setTempFilters((prev) => ({ ...(prev || filters), [key]: value }));
    } else {
      // For desktop, apply immediately
      setFilters((prev) => ({ ...prev, [key]: value, page: 1 }));
    }
  };

  const applyFilters = () => {
    if (tempFilters) {
      setFilters({ ...tempFilters, page: 1 });
      setTempFilters(null);
    }
    if (showMobileFilters) {
      setShowMobileFilters(false);
    }
    fetchBikes(tempFilters || filters);
  };

  const clearAllFilters = () => {
    const defaultFilters = {
      fromDate: new Date().toISOString().split("T")[0],
      toDate: new Date(Date.now() + 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
      minVehicles: 1,
      page: 1,
      limit: 10,
      transmission: "ALL",
      brand: "ALL",
    };

    setFilters(defaultFilters);
    setTempFilters(null);
    showAlert("Filters cleared successfully", "success");
  };

  return (
    <Container className=" bg-gray-50">
      <Alert alert={alert} hideAlert={hideAlert} />
      {/* Header */}
      <SearchHeader
        filters={filters}
        loading={loading}
        onFilterChange={handleFilterChange}
        onSearch={fetchBikes}
      />
      {/* Main Content */}
      <div className="3xl:max-w-7xl 3xl:mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Desktop Filters Sidebar */}
          <div
            className={`hidden lg:block w-80 transition-all duration-300 ${
              showDesktopFilters ? "opacity-100" : "opacity-0 w-0"
            }`}
          >
            {showDesktopFilters && (
              <FilterPanel
                filters={filters}
                uniqueBrands={uniqueBrands}
                uniqueTransmissions={uniqueTransmissions}
                onFilterChange={handleFilterChange}
                onApplyFilters={applyFilters}
                onClearFilters={clearAllFilters}
              />
            )}
          </div>

          {/* Bikes Grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">
                {loading
                  ? "Loading..."
                  : pagination
                  ? `${pagination.totalFiltered} bikes available`
                  : ""}
              </p>
              <button
                onClick={() => setShowDesktopFilters(!showDesktopFilters)}
                className="hidden lg:flex items-center gap-2 text-gray-600 hover:text-gray-900"
              >
                <Filter className="w-5 h-5" />
                {showDesktopFilters ? "Hide Filters" : "Show Filters"}
              </button>
            </div>

            {/* Loading State */}
            {loading && (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-[#AC9456]" />
                <span className="ml-2 text-gray-600">Loading bikes...</span>
              </div>
            )}

            {/* Bikes Grid */}
            {!loading && (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                {bikes.map((bike) => (
                  <BikeCard
                    key={bike.bikeId}
                    bike={bike}
                    isLiked={likedBikes.includes(bike.bikeId)}
                    onToggleLike={toggleLike}
                    onShowAlert={showAlert}
                    onBookNow={(bike: BikeData) => {
                      setBike(bike);
                      setOpen(true);
                    }}
                  />
                ))}
              </div>
            )}

            {/* Empty State */}
            {!loading && bikes.length === 0 && (
              <div className="text-center py-12">
                <Bike className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No bikes available
                </h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your filters or search criteria
                </p>
                <button
                  onClick={clearAllFilters}
                  className="bg-gradient-to-r from-[#AC9456] to-[#D4B76A] text-white px-6 py-2 rounded-lg transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            )}

            {/* Pagination */}
            {pagination && pagination.totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-8">
                <button
                  disabled={!pagination.hasPreviousPage || loading}
                  onClick={() => handleFilterChange("page", filters.page - 1)}
                  className="px-4 py-2 bg-white border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Previous
                </button>
                <span className="text-sm text-gray-600 px-4">
                  Page {pagination.currentPage} of {pagination.totalPages}
                </span>
                <button
                  disabled={!pagination.hasNextPage || loading}
                  onClick={() => handleFilterChange("page", filters.page + 1)}
                  className="px-4 py-2 bg-white border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Mobile Filter Button */}
      <div className="lg:hidden fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
        <button
          onClick={() => {
            setTempFilters(filters);
            setShowMobileFilters(true);
          }}
          className="bg-gradient-to-r from-[#AC9456] to-[#D4B76A] text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2 transition-colors"
        >
          <Filter className="w-5 h-5" />
          Filters
        </button>
      </div>
      {/* Mobile Filter Modal */}
      {showMobileFilters && (
        <div className="lg:hidden fixed inset-0 bg-black/50 z-50">
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-xl max-h-[80vh] overflow-y-auto">
            <FilterPanel
              filters={tempFilters || filters}
              uniqueBrands={uniqueBrands}
              uniqueTransmissions={uniqueTransmissions}
              onFilterChange={handleFilterChange}
              onApplyFilters={applyFilters}
              onClearFilters={clearAllFilters}
              isMobile={true}
              onClose={() => setShowMobileFilters(false)}
            />
          </div>
        </div>
      )}
      <BookingModal
        isOpen={open}
        onClose={() => {
          setBike(null);
          setOpen(false);
        }}
        bike={bike as BikeData}
        onBookNow={() => {
          router.push("/book");
          setOpen(false);
        }}
      />
    </Container>
  );
};

export default BikeListingPage;
