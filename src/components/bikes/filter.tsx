import React from "react";
import { Button } from "@/components/ui/button";
import { Filter, ChevronUp, ChevronDown, X } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface BikeFilterPanelProps {
  showFilters: boolean;
  setShowFilters: (val: boolean) => void;
  filters: {
    priceRange: number[];
    selectedTypes: string[];
    selectedCategories: string[];
    selectedBrands: string[];
    availability: string;
  };
  setFilters: React.Dispatch<React.SetStateAction<any>>;
  filteredBikes: any[];
  clearAllFilters: () => void;
  uniqueTypes: string[];
  uniqueCategories: string[];
  uniqueBrands: string[];
  getTypeIcon: (type: string) => React.ReactNode;
}

const BikeFilterPanel: React.FC<BikeFilterPanelProps> = ({
  showFilters,
  setShowFilters,
  filters,
  setFilters,
  filteredBikes,
  clearAllFilters,
  uniqueTypes,
  uniqueCategories,
  uniqueBrands,
  getTypeIcon,
}) => {
  return (
    <>
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

      {showFilters && (
        <div className="bg-gray-50 rounded-lg p-6 mb-8 border animate-in slide-in-from-top duration-300">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Price Range */}
            <div>
              <Label className="block text-sm font-semibold text-gray-700 mb-3">
                Price Range (₹/day)
              </Label>
              <div className="px-2">
                <Slider
                  value={filters.priceRange}
                  onValueChange={(value) =>
                    setFilters((prev: any) => ({ ...prev, priceRange: value }))
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
              <Label className="block text-sm font-semibold text-gray-700 mb-3">
                Ride Experience
              </Label>
              <div className="space-y-2">
                {uniqueTypes.map((type) => (
                  <div key={type} className="flex items-center space-x-2">
                    <Checkbox
                      id={type}
                      checked={filters.selectedTypes.includes(type)}
                      onCheckedChange={() =>
                        setFilters((prev: any) => ({
                          ...prev,
                          selectedTypes: prev.selectedTypes.includes(type)
                            ? prev.selectedTypes.filter(
                                (item: string) => item !== type
                              )
                            : [...prev.selectedTypes, type],
                        }))
                      }
                    />
                    <Label
                      htmlFor={type}
                      className="text-sm text-gray-700 capitalize flex items-center space-x-1 cursor-pointer"
                    >
                      {getTypeIcon(type)}
                      <span>{type.replace("-", " ")}</span>
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Category */}
            <div>
              <Label className="block text-sm font-semibold text-gray-700 mb-3">
                Vehicle Category
              </Label>
              <div className="space-y-2">
                {uniqueCategories.map((category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox
                      id={category}
                      checked={filters.selectedCategories.includes(category)}
                      onCheckedChange={() =>
                        setFilters((prev: any) => ({
                          ...prev,
                          selectedCategories: prev.selectedCategories.includes(
                            category
                          )
                            ? prev.selectedCategories.filter(
                                (item: string) => item !== category
                              )
                            : [...prev.selectedCategories, category],
                        }))
                      }
                    />
                    <Label
                      htmlFor={category}
                      className="text-sm text-gray-700 capitalize cursor-pointer"
                    >
                      {category}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Brand & Availability */}
            <div className="space-y-6">
              <div>
                <Label className="block text-sm font-semibold text-gray-700 mb-3">
                  Brand
                </Label>
                <div className="space-y-2">
                  {uniqueBrands.map((brand) => (
                    <div key={brand} className="flex items-center space-x-2">
                      <Checkbox
                        id={brand}
                        checked={filters.selectedBrands.includes(brand)}
                        onCheckedChange={() =>
                          setFilters((prev: any) => ({
                            ...prev,
                            selectedBrands: prev.selectedBrands.includes(brand)
                              ? prev.selectedBrands.filter(
                                  (item: string) => item !== brand
                                )
                              : [...prev.selectedBrands, brand],
                          }))
                        }
                      />
                      <Label
                        htmlFor={brand}
                        className="text-sm text-gray-700 cursor-pointer"
                      >
                        {brand}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label className="block text-sm font-semibold text-gray-700 mb-3">
                  Availability
                </Label>
                <Select
                  value={filters.availability}
                  onValueChange={(value) =>
                    setFilters((prev: any) => ({
                      ...prev,
                      availability: value,
                    }))
                  }
                >
                  <SelectTrigger className="w-full focus:bg-tan-50">
                    <SelectValue placeholder="Select availability" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all" className="focus:bg-tan-300">
                      All Bikes
                    </SelectItem>
                    <SelectItem value="available" className="focus:bg-tan-200">
                      Available Now
                    </SelectItem>
                    <SelectItem value="booked" className="focus:bg-tan-200">
                      Currently Booked
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BikeFilterPanel;
