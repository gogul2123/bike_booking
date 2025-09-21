import React from "react";
import { Calendar, MapPin, Search, Loader2, Users } from "lucide-react";
import { Input } from "@/components/ui/input";
import { SearchFilters } from "./types";
import { format } from "path";
import { useAppContext } from "@/hooks/context";

interface SearchHeaderProps {
  filters: SearchFilters;
  loading: boolean;
  onFilterChange: (key: keyof SearchFilters, value: any) => void;
  onSearch: () => void;
}

const SearchHeader: React.FC<SearchHeaderProps> = ({
  filters,
  loading,
  onFilterChange,
  onSearch,
}) => {
  const { fromDate, toDate } = useAppContext();

  return (
    <div className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Available Bikes
          </h1>
        </div>

        {/* Desktop Search Summary */}
        <div className="hidden md:flex flex-wrap items-center gap-4 bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 flex-1">
            <MapPin className="w-5 h-5 text-gray-500" />
            <input
              type="text"
              value={filters.location || "All Locations"}
              onChange={(e) =>
                onFilterChange("location", e.target.value || undefined)
              }
              placeholder="City"
              className="bg-transparent border-none outline-none flex-1 font-medium"
            />
          </div>

          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-gray-500" />
            <span className="text-sm">
              {fromDate.toISOString().split("T")[0]} to{" "}
              {toDate.toISOString().split("T")[0]}
            </span>
          </div>

          <button
            onClick={onSearch}
            className="bg-gradient-to-r from-[#AC9456] to-[#D4B76A] text-white px-6 py-2 rounded-lg transition-colors"
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Search className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Mobile Search Summary */}
        <div className="md:hidden bg-gray-50 p-4 rounded-lg">
          <div className="text-sm text-gray-600">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-4 h-4" />
              <span>
                {fromDate.toISOString().split("T")[0]} to{" "}
                {toDate.toISOString().split("T")[0]}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>Min {filters.minVehicles} vehicle(s)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchHeader;
