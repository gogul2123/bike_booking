import React from "react";
import { Button } from "@/components/ui/button";
import { Filter, ChevronDown, ChevronUp, X } from "lucide-react";

interface FilterHeaderProps {
  showFilters: boolean;
  setShowFilters: (value: boolean) => void;
  filteredBikesLength: number;
  selectedTypes: string[];
  selectedCategories: string[];
  selectedBrands: string[];
  availabilityFilter: string;
  clearAllFilters: () => void;
}

const FilterHeader: React.FC<FilterHeaderProps> = ({
  showFilters,
  setShowFilters,
  filteredBikesLength,
  selectedTypes,
  selectedCategories,
  selectedBrands,
  availabilityFilter,
  clearAllFilters,
}) => {
  return (
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
            {filteredBikesLength}
          </span>{" "}
          bikes found
        </div>
      </div>

      {(selectedTypes.length > 0 ||
        selectedCategories.length > 0 ||
        selectedBrands.length > 0 ||
        availabilityFilter !== "all") && (
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
  );
};

export default FilterHeader;
