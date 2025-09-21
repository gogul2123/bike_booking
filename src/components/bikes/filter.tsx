"use client";

import React from "react";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { SearchFilters } from "./types";
import { useAppContext } from "@/hooks/context";
import { DateTimePicker } from "../ui/dateTimePicker";

interface FilterPanelProps {
  filters: SearchFilters;
  uniqueBrands: string[];
  uniqueTransmissions: string[];
  onFilterChange: (key: keyof SearchFilters, value: any) => void;
  onApplyFilters: () => void;
  onClearFilters: () => void;
  isMobile?: boolean;
  onClose?: () => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  filters,
  uniqueBrands,
  uniqueTransmissions,
  onFilterChange,
  onApplyFilters,
  onClearFilters,
  isMobile = false,
  onClose,
}) => {
  const { fromDate, toDate, setFromDate, setToDate } = useAppContext();

  // Function to ensure time constraints are maintained
  const validateAndSetFromDate = (date: Date) => {
    const newDate = new Date(date);
    let hours = newDate.getHours();

    if (hours < 9) {
      newDate.setHours(9, 0, 0, 0); // minimum 9:00 AM
    } else if (hours > 21) {
      newDate.setHours(21, 0, 0, 0); // maximum 9:00 PM
    }

    console.log("from newDate", newDate);

    setFromDate(newDate);
  };

  const validateAndSetToDate = (date: Date) => {
    const newDate = new Date(date);
    let hours = newDate.getHours();

    if (hours < 9) {
      newDate.setHours(9, 0, 0, 0);
    } else if (hours > 21) {
      newDate.setHours(21, 0, 0, 0);
    }

    // ✅ enforce min 24 hrs gap
    if (
      fromDate &&
      newDate.getTime() < fromDate.getTime() + 24 * 60 * 60 * 1000
    ) {
      const adjusted = new Date(fromDate);
      adjusted.setDate(adjusted.getDate() + 1);
      adjusted.setHours(9, 0, 0, 0);
      setToDate(adjusted);
      return;
    }
    console.log("to newDate", newDate);

    setToDate(newDate);
  };

  return (
    <div
      className={`bg-white ${isMobile ? "p-4" : "p-6"} rounded-lg shadow-md`}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-lg">Filters</h3>
        {isMobile && (
          <button onClick={onClose}>
            <X className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* Date Range */}
      <div className="mb-6">
        <Label className="block text-sm font-medium mb-3">Rental Period</Label>
        <div className="grid grid-cols-1 gap-3">
          <div>
            <Label className="text-xs text-gray-600 mb-2">
              From (9:00 AM - 9:00 PM)
            </Label>
            <DateTimePicker
              date={fromDate}
              setDate={validateAndSetFromDate}
              isFromDate={true}
            />
          </div>
          <div>
            <Label className="text-xs text-gray-600 mb-2">
              To (9:00 AM - 9:00 PM, min 24hrs)
            </Label>
            <DateTimePicker
              date={toDate}
              setDate={validateAndSetToDate}
              isToDate={true}
            />
          </div>
        </div>
      </div>

      {/* Brand Filter */}
      <div className="mb-6">
        <Label className="block text-sm font-medium mb-3">Brand</Label>
        <Select
          value={filters.brand || "ALL"}
          onValueChange={(value) => onFilterChange("brand", value || undefined)}
        >
          <SelectTrigger>
            <SelectValue placeholder="All Brands" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Brands</SelectItem>
            {uniqueBrands.map((brand) => (
              <SelectItem key={brand} value={brand}>
                {brand}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Transmission Filter */}
      <div className="mb-6">
        <Label className="block text-sm font-medium mb-3">Transmission</Label>
        <Select
          value={filters.transmission || "ALL"}
          onValueChange={(value) =>
            onFilterChange("transmission", value || undefined)
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="All Transmissions" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Transmissions</SelectItem>
            {uniqueTransmissions.map((transmission) => (
              <SelectItem key={transmission} value={transmission}>
                {transmission.charAt(0).toUpperCase() + transmission.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Location Filter */}
      <div className="mb-6">
        <Label className="block text-sm font-medium mb-3">Location</Label>
        <Input
          placeholder="Enter location"
          value={filters.location || ""}
          onChange={(e) =>
            onFilterChange("location", e.target.value || undefined)
          }
        />
      </div>

      {/* Min Vehicles */}
      <div className="mb-6">
        <Label className="block text-sm font-medium mb-3">
          Minimum Vehicles Required
        </Label>
        <Input
          type="number"
          min="1"
          value={filters.minVehicles}
          onChange={(e) =>
            onFilterChange("minVehicles", parseInt(e.target.value) || 1)
          }
        />
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-3">
        <Button
          onClick={onApplyFilters}
          className="w-full bg-gradient-to-r from-[#AC9456] to-[#D4B76A] text-white"
        >
          Apply Filters
        </Button>
        <Button
          onClick={() => {
            onClearFilters();
            if (isMobile && onClose) onClose();
          }}
          variant="outline"
          className="w-full"
        >
          Clear All Filters
        </Button>
      </div>
    </div>
  );
};

export default FilterPanel;
