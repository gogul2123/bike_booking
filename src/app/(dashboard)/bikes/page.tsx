"use client";
import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import sampleImage from "../../../../public/bikeImg/landing/Royal_Enfield_Himalayan.jpg";
import Image from "next/image";
import {
  Filter,
  X,
  Calendar,
  Clock,
  Mountain,
  MapPin,
  Zap,
  Bike,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import BikeCard from "@/components/bikes/bike-card";
import Container from "@/components/ui/container";
import PageTitle from "@/components/ui/page-title";

// Sample data (you can replace this with your import)
const bikesData = [
  {
    _id: "650a1fb9f1d2c45678abc001",
    brand: "Royal Enfield",
    model: "Himalayan 411",
    category: "motorcycle",
    type: "off-road",
    availability: true,
    price_per_day_INR: 1800,
    colors: ["Gravel Grey", "Pine Green", "Rock Red"],
    inventory: {
      total: 6,
      by_color: { "Gravel Grey": 2, "Pine Green": 2, "Rock Red": 2 },
    },
    imageUrl: sampleImage,
    transmission: "gear",
    created_at: "2025-07-01T08:00:00Z",
    updated_at: "2025-07-12T08:00:00Z",
  },
  {
    _id: "650a1fb9f1d2c45678abc002",
    brand: "Royal Enfield",
    model: "Himalayan 452",
    category: "motorcycle",
    type: "off-road",
    availability: true,
    price_per_day_INR: 3000,
    colors: ["Kaza Brown", "Slate Salt", "Hanle Black"],
    inventory: {
      total: 4,
      by_color: { "Kaza Brown": 1, "Slate Salt": 1, "Hanle Black": 2 },
    },
    imageUrl: sampleImage,
    transmission: "gear",
    created_at: "2025-07-01T08:10:00Z",
    updated_at: "2025-07-12T08:10:00Z",
  },
  {
    _id: "650a1fb9f1d2c45678abc003",
    brand: "Royal Enfield",
    model: "Hunter 350",
    category: "motorcycle",
    type: "roadster",
    availability: true,
    price_per_day_INR: 1600,
    colors: ["Rebel Black", "Retro Green"],
    inventory: { total: 5, by_color: { "Rebel Black": 3, "Retro Green": 2 } },
    imageUrl: sampleImage,
    transmission: "gear",
    created_at: "2025-07-01T08:20:00Z",
    updated_at: "2025-07-12T08:20:00Z",
  },
  {
    _id: "650a1fb9f1d2c45678abc004",
    brand: "Royal Enfield",
    model: "Guerrilla 450",
    category: "motorcycle",
    type: "roadster",
    availability: false,
    price_per_day_INR: 2400,
    colors: ["Urban Metallic", "Classic Bronze"],
    inventory: {
      total: 3,
      by_color: { "Urban Metallic": 1, "Classic Bronze": 2 },
    },
    imageUrl: sampleImage,
    transmission: "gear",
    created_at: "2025-07-01T08:30:00Z",
    updated_at: "2025-07-12T08:30:00Z",
    bookedUntil: "2025-07-15T10:00:00Z",
  },
  {
    _id: "650a1fb9f1d2c45678abc005",
    brand: "Royal Enfield",
    model: "Interceptor 650",
    category: "motorcycle",
    type: "roadster",
    availability: true,
    price_per_day_INR: 2200,
    colors: ["Red", "Blue", "Chrome"],
    inventory: { total: 4, by_color: { Red: 1, Blue: 2, Chrome: 1 } },
    imageUrl: sampleImage,
    transmission: "gear",
    created_at: "2025-07-01T08:40:00Z",
    updated_at: "2025-07-12T08:40:00Z",
  },
  {
    _id: "650a1fb9f1d2c45678abc006",
    brand: "Bajaj",
    model: "Pulsar NS200",
    category: "motorcycle",
    type: "sport",
    availability: true,
    price_per_day_INR: 1400,
    colors: ["Ebony Black", "Pearl White"],
    inventory: { total: 4, by_color: { "Ebony Black": 2, "Pearl White": 2 } },
    imageUrl: sampleImage,
    transmission: "gear",
    created_at: "2025-07-01T08:50:00Z",
    updated_at: "2025-07-12T08:50:00Z",
  },
  {
    _id: "650a1fb9f1d2c45678abc007",
    brand: "Bajaj",
    model: "Avenger 220 Cruise",
    category: "motorcycle",
    type: "cruiser",
    availability: true,
    price_per_day_INR: 1000,
    colors: ["Midnight Black", "Silver"],
    inventory: { total: 3, by_color: { "Midnight Black": 2, Silver: 1 } },
    imageUrl: sampleImage,
    transmission: "gear",
    created_at: "2025-07-01T09:00:00Z",
    updated_at: "2025-07-12T09:00:00Z",
  },
  {
    _id: "650a1fb9f1d2c45678abc008",
    brand: "TVS",
    model: "Apache RTR 160",
    category: "motorcycle",
    type: "commuter",
    availability: true,
    price_per_day_INR: 950,
    colors: ["Matte Black", "Racing Red"],
    inventory: { total: 5, by_color: { "Matte Black": 3, "Racing Red": 2 } },
    imageUrl: sampleImage,
    transmission: "gear",
    created_at: "2025-07-01T09:10:00Z",
    updated_at: "2025-07-12T09:10:00Z",
  },
  {
    _id: "650a1fb9f1d2c45678abc009",
    brand: "KTM",
    model: "Duke 200",
    category: "motorcycle",
    type: "naked/sport",
    availability: true,
    price_per_day_INR: 1600,
    colors: ["Orange Black"],
    inventory: { total: 2, by_color: { "Orange Black": 2 } },
    imageUrl: sampleImage,
    transmission: "gear",
    created_at: "2025-07-01T09:20:00Z",
    updated_at: "2025-07-12T09:20:00Z",
  },
  {
    _id: "650a1fb9f1d2c45678abc010",
    brand: "KTM",
    model: "390 Adventure",
    category: "motorcycle",
    type: "adventure",
    availability: true,
    price_per_day_INR: 2500,
    colors: ["White"],
    inventory: { total: 2, by_color: { White: 2 } },
    imageUrl: sampleImage,
    transmission: "gear",
    created_at: "2025-07-01T09:30:00Z",
    updated_at: "2025-07-12T09:30:00Z",
  },
];

const BikeListingPage = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    priceRange: [500, 3500],
    selectedTypes: [] as string[],
    selectedCategories: [] as string[],
    selectedBrands: [] as string[],
    availability: "all",
  });

  // Get unique values for filters
  const uniqueTypes = [...new Set(bikesData.map((bike) => bike.type))];
  const uniqueCategories = [...new Set(bikesData.map((bike) => bike.category))];
  const uniqueBrands = [...new Set(bikesData.map((bike) => bike.brand))];

  // Filter bikes based on selected filters
  const filteredBikes = useMemo(() => {
    return bikesData.filter((bike) => {
      const priceCheck =
        bike.price_per_day_INR >= filters.priceRange[0] &&
        bike.price_per_day_INR <= filters.priceRange[1];
      const typeCheck =
        filters.selectedTypes.length === 0 ||
        filters.selectedTypes.includes(bike.type);
      const categoryCheck =
        filters.selectedCategories.length === 0 ||
        filters.selectedCategories.includes(bike.category);
      const brandCheck =
        filters.selectedBrands.length === 0 ||
        filters.selectedBrands.includes(bike.brand);
      const availabilityCheck =
        filters.availability === "all" ||
        (filters.availability === "available" && bike.availability) ||
        (filters.availability === "booked" && !bike.availability);

      return (
        priceCheck &&
        typeCheck &&
        categoryCheck &&
        brandCheck &&
        availabilityCheck
      );
    });
  }, [filters]);

  const toggleFilter = (
    value: string,
    filterArray: string[],
    setFilterArray: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    if (filterArray.includes(value)) {
      setFilterArray(filterArray.filter((item) => item !== value));
    } else {
      setFilterArray([...filterArray, value]);
    }
  };

  const clearAllFilters = () => {
    setFilters({
      priceRange: [500, 3500],
      selectedTypes: [],
      selectedCategories: [],
      selectedBrands: [],
      availability: "all",
    });
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "off-road":
      case "adventure":
        return <Mountain className="w-4 h-4" />;
      case "roadster":
      case "commuter":
        return <MapPin className="w-4 h-4" />;
      case "sport":
      case "naked/sport":
        return <Zap className="w-4 h-4" />;
      case "cruiser":
        return <Bike className="w-4 h-4" />;
      default:
        return <Bike className="w-4 h-4" />;
    }
  };

  const formatDate = (dateString: string | number | Date) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Container>
      {/* Header */}
      <PageTitle
        title="Premium Bikes"
        description="Discover your perfect ride for every adventure"
      />

      <div className="lg:max-w-[80vw] 2xl:max-w-7xl mx-auto px-4 lg:px-2 py-8 lg:py-4">
        {/* Filter Toggle & Results Count */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 border-tan-600 text-tan-600 hover:bg-tan-50"
            >
              <Filter className="w-4 h-4" />
              <span>Filters</span>
              {showFilters ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </Button>

            <div className="text-gray-600">
              <span className="font-semibold text-tan-600">
                {filteredBikes.length}
              </span>{" "}
              bikes found
            </div>
          </div>

          {(filters.selectedTypes.length > 0 ||
            filters.selectedCategories.length > 0 ||
            filters.selectedBrands.length > 0 ||
            filters.availability !== "all") && (
            <Button
              variant="ghost"
              onClick={clearAllFilters}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-4 h-4 mr-2" />
              Clear All
            </Button>
          )}
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="bg-gray-50 rounded-lg p-6 mb-8 border animate-in slide-in-from-top duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Price Range */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Price Range (₹/day)
                </label>
                <div className="px-2">
                  <Slider
                    value={filters.priceRange}
                    onValueChange={(value) =>
                      setFilters((prev) => ({ ...prev, priceRange: value }))
                    }
                    max={3500}
                    min={500}
                    step={50}
                    className="mb-3"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>₹{filters.priceRange[0]}</span>
                    <span>₹{filters.priceRange[1]}</span>
                  </div>
                </div>
              </div>

              {/* Ride Type */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Ride Experience
                </label>
                <div className="space-y-2">
                  {uniqueTypes.map((type) => (
                    <div key={type} className="flex items-center space-x-2">
                      <Checkbox
                        id={type}
                        checked={filters.selectedTypes.includes(type)}
                        onCheckedChange={() =>
                          setFilters((prev) => ({
                            ...prev,
                            selectedTypes: prev.selectedTypes.includes(type)
                              ? prev.selectedTypes.filter(
                                  (item) => item !== type
                                )
                              : [...prev.selectedTypes, type],
                          }))
                        }
                      />
                      <label
                        htmlFor={type}
                        className="text-sm text-gray-700 capitalize flex items-center space-x-1 cursor-pointer"
                      >
                        {getTypeIcon(type)}
                        <span>{type.replace("-", " ")}</span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Vehicle Category
                </label>
                <div className="space-y-2">
                  {uniqueCategories.map((category) => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox
                        id={category}
                        checked={filters.selectedCategories.includes(category)}
                        onCheckedChange={() =>
                          setFilters((prev) => ({
                            ...prev,
                            selectedCategories:
                              prev.selectedCategories.includes(category)
                                ? prev.selectedCategories.filter(
                                    (item) => item !== category
                                  )
                                : [...prev.selectedCategories, category],
                          }))
                        }
                      />
                      <label
                        htmlFor={category}
                        className="text-sm text-gray-700 capitalize cursor-pointer"
                      >
                        {category}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Brand & Availability */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Brand
                  </label>
                  <div className="space-y-2">
                    {uniqueBrands.map((brand) => (
                      <div key={brand} className="flex items-center space-x-2">
                        <Checkbox
                          id={brand}
                          checked={filters.selectedBrands.includes(brand)}
                          onCheckedChange={() =>
                            setFilters((prev) => ({
                              ...prev,
                              selectedBrands: prev.selectedBrands.includes(
                                brand
                              )
                                ? prev.selectedBrands.filter(
                                    (item) => item !== brand
                                  )
                                : [...prev.selectedBrands, brand],
                            }))
                          }
                        />
                        <label
                          htmlFor={brand}
                          className="text-sm text-gray-700 cursor-pointer"
                        >
                          {brand}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Availability
                  </label>
                  <select
                    value={filters.availability}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        availability: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-tan-500"
                  >
                    <option value="all">All Bikes</option>
                    <option value="available">Available Now</option>
                    <option value="booked">Currently Booked</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bikes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBikes.map((bike, index) => (
            <BikeCard index={index} bike={bike} />
          ))}
        </div>

        {/* No Results */}
        {filteredBikes.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Bike className="w-16 h-16 mx-auto mb-4" />
              <h3 className="text-xl font-semibold">No bikes found</h3>
              <p>Try adjusting your filters to see more results</p>
            </div>
            <Button
              onClick={clearAllFilters}
              className="bg-tan-600 hover:bg-tan-700 text-white"
            >
              Clear All Filters
            </Button>
          </div>
        )}
      </div>
    </Container>
  );
};

export default BikeListingPage;
