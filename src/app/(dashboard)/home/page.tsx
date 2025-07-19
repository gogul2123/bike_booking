"use client";

import React, { useState, useEffect } from "react";
import { 
  Search, 
  MapPin, 
  Calendar, 
  Clock, 
  Star, 
  Shield, 
  Zap, 
  Users, 
  ChevronRight,
  Play,
  ArrowRight,
  Menu,
  X,
  Phone,
  Mail,
  Instagram,
  Twitter,
  Facebook,
  ChevronDown,
  Filter,
  Heart,
  Gauge,
  Fuel,
  Settings
} from "lucide-react";

// Motorcycle icon component
const MotorcycleIcon = () => (
  <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
    <path d="M5 18c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm0-3c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm14.5 3c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm0-3c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zM12 4.5c0-1.11-.89-2-2-2s-2 .89-2 2 .89 2 2 2 2-.89 2-2zM21 14h-3.5l-1.19-3.83C16.07 9.47 15.38 9 14.58 9H12.5c-.37 0-.72.1-1.03.26l-1.88.94c-.39.2-.59.63-.59 1.08 0 .83.94 1.28 1.56.72L12 10.5h2l1.5 4.84c.04.17.01.34-.08.49-.13.22-.35.17-.35.17H9.5C8.57 16 8 16.58 8 17.5S8.57 19 9.5 19H21c.55 0 1-.45 1-1v-3c0-.55-.45-1-1-1z"/>
  </svg>
);

// Animated counter component
type AnimatedCounterProps = {
  end: number;
  duration?: number;
};

const AnimatedCounter = ({ end, duration = 2000 }: AnimatedCounterProps) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | undefined;
    const animate = (currentTime: number) => {
      if (startTime === undefined) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [end, duration]);

  return <span>{count.toLocaleString()}</span>;
};

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  type BikeCategoryKey = "all" | "sports" | "cruiser" | "commuter" | "adventure";
  const [selectedCategory, setSelectedCategory] = useState<BikeCategoryKey>("all");
  const [selectedCity, setSelectedCity] = useState("");
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [dropoffDate, setDropoffDate] = useState("");
  const [dropoffTime, setDropoffTime] = useState("");

  const cities = [
    "Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem", "Tirunelveli", 
    "Tiruppur", "Vellore", "Erode", "Thoothukudi", "Dindigul", "Thanjavur", 
    "Ranipet", "Sivaganga", "Karur", "Cuddalore", "Kanchipuram", "Tiruvannamalai", 
    "Virudhunagar", "Ramanathapuram", "Nagapattinam", "Dharmapuri", "Krishnagiri", 
    "Ariyalur", "Perambalur", "Pudukkottai", "Theni", "Nilgiris", "Namakkal", 
    "Villupuram", "Kallakurichi", "Tirupathur", "Tenkasi", "Chengalpattu", 
    "Tiruvallur", "Mayiladuthurai", "Kanyakumari"
  ];

  const bikeCategories = [
    { id: "all", name: "All Bikes", count: 40 },
    { id: "sports", name: "Sports Bikes", count: 10 },
    { id: "cruiser", name: "Cruiser Bikes", count: 10 },
    { id: "commuter", name: "Commuter Bikes", count: 10 },
    { id: "adventure", name: "Adventure Bikes", count: 10 }
  ];

  const featuredBikes = {
    sports: [
      { id: 1, name: "Yamaha R15 V4", price: "₹1,200", rating: 4.8, reviews: 124, features: ["ABS", "LED", "Digital Display"], specs: { engine: "155cc", mileage: "45 kmpl", fuel: "Petrol" } },
      { id: 2, name: "KTM Duke 390", price: "₹1,800", rating: 4.9, reviews: 89, features: ["ABS", "TFT Display", "Ride Modes"], specs: { engine: "373cc", mileage: "35 kmpl", fuel: "Petrol" } },
      { id: 3, name: "Bajaj Pulsar RS200", price: "₹1,000", rating: 4.6, reviews: 156, features: ["ABS", "LED DRL", "Racing DNA"], specs: { engine: "199cc", mileage: "40 kmpl", fuel: "Petrol" } },
      { id: 4, name: "TVS Apache RTR 200", price: "₹950", rating: 4.7, reviews: 112, features: ["ABS", "Race Tuned", "GTT"], specs: { engine: "197cc", mileage: "42 kmpl", fuel: "Petrol" } },
      { id: 5, name: "Honda CBR250R", price: "₹1,500", rating: 4.8, reviews: 78, features: ["ABS", "LED", "Sport Mode"], specs: { engine: "249cc", mileage: "32 kmpl", fuel: "Petrol" } },
      { id: 6, name: "Kawasaki Ninja 300", price: "₹2,200", rating: 4.9, reviews: 45, features: ["ABS", "Twin Cylinder", "Slipper Clutch"], specs: { engine: "296cc", mileage: "30 kmpl", fuel: "Petrol" } },
      { id: 7, name: "Bajaj Dominar 400", price: "₹1,300", rating: 4.5, reviews: 98, features: ["ABS", "LED", "Touring"], specs: { engine: "373cc", mileage: "35 kmpl", fuel: "Petrol" } },
      { id: 8, name: "Yamaha R3", price: "₹2,500", rating: 4.9, reviews: 34, features: ["ABS", "Twin Cylinder", "Racing"], specs: { engine: "321cc", mileage: "28 kmpl", fuel: "Petrol" } },
      { id: 9, name: "KTM RC 390", price: "₹1,900", rating: 4.8, reviews: 67, features: ["ABS", "TFT", "Track Mode"], specs: { engine: "373cc", mileage: "32 kmpl", fuel: "Petrol" } },
      { id: 10, name: "Honda CB300R", price: "₹1,700", rating: 4.7, reviews: 89, features: ["ABS", "LED", "Neo Sports"], specs: { engine: "286cc", mileage: "35 kmpl", fuel: "Petrol" } }
    ],
    cruiser: [
      { id: 11, name: "Royal Enfield Classic 350", price: "₹1,500", rating: 4.7, reviews: 234, features: ["Vintage", "Comfortable", "Retro"], specs: { engine: "349cc", mileage: "40 kmpl", fuel: "Petrol" } },
      { id: 12, name: "Royal Enfield Meteor 350", price: "₹1,600", rating: 4.8, reviews: 189, features: ["Tripper Navigation", "LED", "Comfortable"], specs: { engine: "349cc", mileage: "42 kmpl", fuel: "Petrol" } },
      { id: 13, name: "Bajaj Avenger Cruise 220", price: "₹1,100", rating: 4.5, reviews: 145, features: ["Comfortable", "Touring", "Digital Console"], specs: { engine: "220cc", mileage: "40 kmpl", fuel: "Petrol" } },
      { id: 14, name: "Royal Enfield Thunderbird 350X", price: "₹1,400", rating: 4.6, reviews: 167, features: ["Alloy Wheels", "Tubeless", "Modern"], specs: { engine: "349cc", mileage: "38 kmpl", fuel: "Petrol" } },
      { id: 15, name: "Jawa Classic", price: "₹1,700", rating: 4.9, reviews: 98, features: ["Vintage", "Chrome", "Classic"], specs: { engine: "293cc", mileage: "38 kmpl", fuel: "Petrol" } },
      { id: 16, name: "Bajaj Avenger Street 160", price: "₹900", rating: 4.4, reviews: 156, features: ["Street Style", "Comfortable", "Affordable"], specs: { engine: "160cc", mileage: "45 kmpl", fuel: "Petrol" } },
      { id: 17, name: "Royal Enfield Bullet 350", price: "₹1,300", rating: 4.5, reviews: 189, features: ["Classic", "Thump Sound", "Reliable"], specs: { engine: "346cc", mileage: "40 kmpl", fuel: "Petrol" } },
      { id: 18, name: "Harley Davidson Street 750", price: "₹3,500", rating: 4.8, reviews: 34, features: ["Premium", "V-Twin", "Harley"], specs: { engine: "749cc", mileage: "25 kmpl", fuel: "Petrol" } },
      { id: 19, name: "Indian Scout Bobber", price: "₹4,200", rating: 4.9, reviews: 23, features: ["Premium", "Bobber Style", "V-Twin"], specs: { engine: "1133cc", mileage: "20 kmpl", fuel: "Petrol" } },
      { id: 20, name: "Benelli Leoncino 500", price: "₹2,800", rating: 4.6, reviews: 45, features: ["Scrambler", "Italian", "Stylish"], specs: { engine: "500cc", mileage: "25 kmpl", fuel: "Petrol" } }
    ],
    commuter: [
      { id: 21, name: "Honda Activa 6G", price: "₹600", rating: 4.6, reviews: 567, features: ["Fuel Efficient", "Comfortable", "Reliable"], specs: { engine: "109cc", mileage: "60 kmpl", fuel: "Petrol" } },
      { id: 22, name: "TVS Jupiter", price: "₹550", rating: 4.5, reviews: 423, features: ["Fuel Efficient", "Spacious", "Comfortable"], specs: { engine: "109cc", mileage: "62 kmpl", fuel: "Petrol" } },
      { id: 23, name: "Bajaj Platina 110", price: "₹500", rating: 4.4, reviews: 234, features: ["Fuel Efficient", "Comfortable", "Affordable"], specs: { engine: "115cc", mileage: "70 kmpl", fuel: "Petrol" } },
      { id: 24, name: "Hero Splendor Plus", price: "₹450", rating: 4.3, reviews: 345, features: ["Fuel Efficient", "Reliable", "Low Maintenance"], specs: { engine: "97cc", mileage: "70 kmpl", fuel: "Petrol" } },
      { id: 25, name: "Honda Shine", price: "₹650", rating: 4.5, reviews: 289, features: ["Smooth Engine", "Comfortable", "Refined"], specs: { engine: "124cc", mileage: "65 kmpl", fuel: "Petrol" } },
      { id: 26, name: "Yamaha Fascino 125", price: "₹580", rating: 4.6, reviews: 198, features: ["Stylish", "Fuel Efficient", "Hybrid"], specs: { engine: "125cc", mileage: "58 kmpl", fuel: "Petrol" } },
      { id: 27, name: "TVS Ntorq 125", price: "₹700", rating: 4.7, reviews: 167, features: ["Smart Connect", "Sporty", "Performance"], specs: { engine: "124cc", mileage: "50 kmpl", fuel: "Petrol" } },
      { id: 28, name: "Suzuki Access 125", price: "₹620", rating: 4.5, reviews: 234, features: ["Fuel Efficient", "Comfortable", "Spacious"], specs: { engine: "124cc", mileage: "58 kmpl", fuel: "Petrol" } },
      { id: 29, name: "Hero Destini 125", price: "₹590", rating: 4.4, reviews: 145, features: ["Fuel Efficient", "Comfortable", "Affordable"], specs: { engine: "124cc", mileage: "60 kmpl", fuel: "Petrol" } },
      { id: 30, name: "Bajaj Chetak Electric", price: "₹800", rating: 4.8, reviews: 89, features: ["Electric", "Eco-Friendly", "Modern"], specs: { engine: "Electric", mileage: "95 km", fuel: "Electric" } }
    ],
    adventure: [
      { id: 31, name: "Royal Enfield Himalayan", price: "₹2,000", rating: 4.7, reviews: 156, features: ["Adventure Ready", "Long Range", "Rugged"], specs: { engine: "411cc", mileage: "35 kmpl", fuel: "Petrol" } },
      { id: 32, name: "KTM 390 Adventure", price: "₹2,500", rating: 4.8, reviews: 89, features: ["TFT Display", "Adventure Mode", "Off-Road"], specs: { engine: "373cc", mileage: "30 kmpl", fuel: "Petrol" } },
      { id: 33, name: "BMW G310 GS", price: "₹3,200", rating: 4.9, reviews: 45, features: ["BMW Quality", "Adventure", "Premium"], specs: { engine: "313cc", mileage: "32 kmpl", fuel: "Petrol" } },
      { id: 34, name: "Kawasaki Versys-X 300", price: "₹2,800", rating: 4.8, reviews: 67, features: ["Adventure Touring", "Comfortable", "Versatile"], specs: { engine: "296cc", mileage: "28 kmpl", fuel: "Petrol" } },
      { id: 35, name: "Honda CB500X", price: "₹3,500", rating: 4.9, reviews: 34, features: ["Adventure", "Comfortable", "Reliable"], specs: { engine: "471cc", mileage: "25 kmpl", fuel: "Petrol" } },
      { id: 36, name: "Suzuki V-Strom 650", price: "₹4,000", rating: 4.8, reviews: 23, features: ["Adventure Touring", "Comfortable", "Reliable"], specs: { engine: "645cc", mileage: "22 kmpl", fuel: "Petrol" } },
      { id: 37, name: "Yamaha Tenere 700", price: "₹4,500", rating: 4.9, reviews: 18, features: ["Rally Bred", "Off-Road", "Adventure"], specs: { engine: "689cc", mileage: "20 kmpl", fuel: "Petrol" } },
      { id: 38, name: "Triumph Tiger 800", price: "₹5,200", rating: 4.9, reviews: 15, features: ["Premium", "Adventure", "Triumph"], specs: { engine: "800cc", mileage: "18 kmpl", fuel: "Petrol" } },
      { id: 39, name: "Ducati Multistrada 950", price: "₹6,000", rating: 4.8, reviews: 12, features: ["Italian", "Adventure", "Premium"], specs: { engine: "937cc", mileage: "15 kmpl", fuel: "Petrol" } },
      { id: 40, name: "Benelli TRK 502", price: "₹2,200", rating: 4.6, reviews: 56, features: ["Adventure", "Twin Cylinder", "Affordable"], specs: { engine: "500cc", mileage: "25 kmpl", fuel: "Petrol" } }
    ]
  };

  const stats = [
    { label: "Happy Customers", value: 15000, suffix: "+" },
    { label: "Bikes Available", value: 500, suffix: "+" },
    { label: "Cities Covered", value: 25, suffix: "+" },
    { label: "Years of Service", value: 5, suffix: "+" }
  ];

  const features = [
    {
      icon: <Shield className="w-8 h-8 text-[#AC9456]" />,
      title: "Secure & Safe",
      description: "All bikes are regularly maintained and insured for your safety"
    },
    {
      icon: <Zap className="w-8 h-8 text-[#AC9456]" />,
      title: "Instant Booking",
      description: "Book your bike in seconds with our quick and easy process"
    },
    {
      icon: <Users className="w-8 h-8 text-[#AC9456]" />,
      title: "24/7 Support",
      description: "Our team is always available to help you with any issues"
    }
  ];

  const getCurrentBikes = () => {
    if (selectedCategory === "all") {
      return [
        ...featuredBikes.sports.slice(0, 3),
        ...featuredBikes.cruiser.slice(0, 3),
        ...featuredBikes.commuter.slice(0, 2),
        ...featuredBikes.adventure.slice(0, 2)
      ];
    }
    // Only allow valid keys for featuredBikes
    if (
      selectedCategory === "sports" ||
      selectedCategory === "cruiser" ||
      selectedCategory === "commuter" ||
      selectedCategory === "adventure"
    ) {
      return featuredBikes[selectedCategory];
    }
    return [];
  };

  type Bike = {
    id: number;
    name: string;
    price: string;
    rating: number;
    reviews: number;
    features: string[];
    specs: {
      engine: string;
      mileage: string;
      fuel: string;
    };
  };

  const BikeCard = ({ bike }: { bike: Bike }) => (
    <div className="bg-gray-800 rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-300 border border-gray-700 hover:border-[#AC9456]/50 group">
      <div className="relative">
        <div className="aspect-video bg-gradient-to-br from-gray-700 to-gray-900 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#AC9456]/10 to-[#D4B76A]/10 group-hover:from-[#AC9456]/20 group-hover:to-[#D4B76A]/20 transition-all duration-300"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <MotorcycleIcon />
          </div>
        </div>
        <button className="absolute top-4 right-4 p-2 bg-black/50 rounded-full hover:bg-[#AC9456]/20 transition-colors">
          <Heart className="w-5 h-5 text-white hover:text-[#AC9456]" />
        </button>
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-white group-hover:text-[#AC9456] transition-colors">
              {bike.name}
            </h3>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium text-gray-300">{bike.rating}</span>
              </div>
              <span className="text-sm text-gray-500">({bike.reviews} reviews)</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-[#AC9456]">{bike.price}</div>
            <div className="text-sm text-gray-400">per day</div>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {bike.features.map((feature: string, idx: number) => (
            <span key={idx} className="px-2 py-1 bg-[#AC9456]/20 text-[#AC9456] text-xs rounded-full">
              {feature}
            </span>
          ))}
        </div>
        
        <div className="grid grid-cols-3 gap-4 mb-6 text-sm">
          <div className="flex items-center gap-2 text-gray-400">
            <Settings className="w-4 h-4" />
            <span>{bike.specs.engine}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <Gauge className="w-4 h-4" />
            <span>{bike.specs.mileage}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <Fuel className="w-4 h-4" />
            <span>{bike.specs.fuel}</span>
          </div>
        </div>
        
        <button className="w-full bg-gradient-to-r from-[#AC9456] to-[#D4B76A] hover:from-[#9B8449] hover:to-[#C4A659] text-black font-semibold py-3 rounded-lg transition-all duration-300 group flex items-center justify-center">
          Book Now
          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );

  return (
    <>
      <div className="min-h-screen bg-black text-white">

        {/* Hero Section */}
        <section className="relative py-20 lg:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-black via-gray-900 to-black"></div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23AC9456\' fill-opacity=\'0.05\'%3E%3Ccircle cx=\'30\' cy=\'30\' r=\'2\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>
          <div className="container mx-auto px-4 relative">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <div className="inline-flex items-center px-4 py-2 bg-[#AC9456]/10 border border-[#AC9456]/20 rounded-full text-[#AC9456] text-sm font-medium">
                India's Leading Bike Rental Platform
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
                Your Perfect
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#AC9456] to-[#D4B76A]">
                  {" "}Ride{" "}
                </span>
                Awaits
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto">
                Discover freedom on two wheels. Rent premium bikes for your next adventure, 
                business trip, or daily commute.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={() => setIsBookingOpen(true)}
                  className="bg-gradient-to-r from-[#AC9456] to-[#D4B76A] hover:from-[#9B8449] hover:to-[#C4A659] text-black font-semibold px-8 py-4 rounded-lg transition-all text-lg"
                >
                  Book Your Ride
                </button>
                <button className="border border-[#AC9456] text-[#AC9456] hover:bg-[#AC9456]/10 font-semibold px-8 py-4 rounded-lg transition-all text-lg flex items-center justify-center">
                  <Play className="w-5 h-5 mr-2" />
                  Watch Demo
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Booking Modal */}
        {isBookingOpen && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-gray-900 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-700">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Book Your Ride</h2>
                <button 
                  onClick={() => setIsBookingOpen(false)}
                  className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6 text-gray-400" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Category Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">Select Bike Category</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {bikeCategories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id as BikeCategoryKey)}
                        className={`p-3 rounded-lg border text-left transition-all ${
                          selectedCategory === category.id
                            ? 'bg-[#AC9456]/20 border-[#AC9456] text-[#AC9456]'
                            : 'bg-gray-800 border-gray-700 text-gray-300 hover:border-[#AC9456]/50'
                        }`}
                      >
                        <div className="font-medium">{category.name}</div>
                        <div className="text-sm opacity-75">{category.count} bikes</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* City Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">Select City</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <select 
                      value={selectedCity}
                      onChange={(e) => setSelectedCity(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-[#AC9456] focus:ring-2 focus:ring-[#AC9456]/20 focus:outline-none"
                    >
                      <option value="">Choose a city</option>
                      {cities.map((city) => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Date and Time Selection */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">Pick Up Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="date"
                        value={pickupDate}
                        onChange={(e) => setPickupDate(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-[#AC9456] focus:ring-2 focus:ring-[#AC9456]/20 focus:outline-none"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">Pick Up Time</label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="time"
                        value={pickupTime}
                        onChange={(e) => setPickupTime(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-[#AC9456] focus:ring-2 focus:ring-[#AC9456]/20 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">Drop Off Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="date"
                        value={dropoffDate}
                        onChange={(e) => setDropoffDate(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-[#AC9456] focus:ring-2 focus:ring-[#AC9456]/20 focus:outline-none"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">Drop Off Time</label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="time"
                        value={dropoffTime}
                        onChange={(e) => setDropoffTime(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-[#AC9456] focus:ring-2 focus:ring-[#AC9456]/20 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <button className="w-full bg-gradient-to-r from-[#AC9456] to-[#D4B76A] hover:from-[#9B8449] hover:to-[#C4A659] text-black font-semibold py-4 rounded-lg transition-all text-lg">
                  <Search className="w-5 h-5 mr-2 inline" />
                  Search Available Bikes
                </button>
              </div>
            </div>
          </div>
        )}

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-[#AC9456] to-[#D4B76A]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center text-black">
                <div className="text-3xl md:text-4xl font-bold mb-2">
                  <AnimatedCounter end={stat.value} />
                  {stat.suffix}
                </div>
                <div className="text-sm md:text-base opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bike Categories and Listing */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-[#AC9456]/10 border border-[#AC9456]/20 rounded-full text-[#AC9456] text-sm font-medium mb-4">
              Premium Collection
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Our Bike Fleet
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Choose from our extensive collection of premium bikes for every riding style
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {bikeCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id as BikeCategoryKey)}
                className={`px-6 py-3 rounded-full font-medium transition-all ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-[#AC9456] to-[#D4B76A] text-black'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'
                }`}
              >
                {category.name}
                <span className="ml-2 text-sm opacity-75">({category.count})</span>
              </button>
            ))}
          </div>

          {/* Bike Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {getCurrentBikes().map((bike) => (
              <BikeCard key={bike.id} bike={bike} />
            ))}
          </div>

          {selectedCategory !== "all" && (
            <div className="text-center mt-12">
              <button className="bg-gradient-to-r from-[#AC9456] to-[#D4B76A] hover:from-[#9B8449] hover:to-[#C4A659] text-black font-semibold px-8 py-4 rounded-lg transition-all">
                View All {bikeCategories.find(cat => cat.id === selectedCategory)?.name}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-[#AC9456]/10 border border-[#AC9456]/20 rounded-full text-[#AC9456] text-sm font-medium mb-4">
              Why Choose Us
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ride with Confidence
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Experience the best bike rental service with our premium features
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-8 bg-gray-900 rounded-2xl border border-gray-800 hover:border-[#AC9456]/50 transition-all">
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-[#AC9456]/10 rounded-full">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#AC9456] to-[#D4B76A]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center text-black">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of satisfied customers who trust BikeRent for their mobility needs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => setIsBookingOpen(true)}
                className="bg-black text-[#AC9456] hover:bg-gray-900 font-semibold px-8 py-4 rounded-lg transition-all text-lg"
              >
                Get Started Today
              </button>
              <button className="border border-black text-black hover:bg-black/10 font-semibold px-8 py-4 rounded-lg transition-all text-lg flex items-center justify-center">
                <Play className="w-5 h-5 mr-2" />
                Watch Demo
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
    </>
  );
}