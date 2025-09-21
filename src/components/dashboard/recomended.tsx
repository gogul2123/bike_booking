"use client";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import React from "react";
import { useRouter } from "next/navigation";
import BikeCard from "../bikes/bikeCard";
import { BikeData } from "../bikes/types";

export interface Bike {
  _id: string;
  brand: string;
  model: string;
  category: string;
  type: string;
  availability: boolean;
  price_per_day_INR: number;
  colors: string[];
  inventory: {
    total: number;
    by_color: Record<string, number>;
  };
  imageUrl: string;
  transmission: string;
  created_at: string; // ISO 8601 string (Date in string format)
  updated_at: string;
}

interface RecommendedSectionProps {
  bikesData: BikeData[];
  scrollLeft: () => void;
  scrollRight: () => void;
  scrollContainerRef: React.RefObject<HTMLDivElement>;
}

export function RecommendedSection({
  bikesData,
  scrollLeft,
  scrollRight,
  scrollContainerRef,
}: RecommendedSectionProps) {
  const router = useRouter();
  return (
    <section className="animate-in slide-in-from-right duration-600 delay-900">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-base md:text-lg lg:text-2xl font-bold text-tan-800 flex items-center">
          <Star className="w-4 h-4 lg:w-6 lg:h-6 mr-2 text-tan-600" />
          Recommended for You
        </h2>
        <Button
          variant="ghost"
          className="text-[13px] lg:text-base text-tan-600 hover:text-tan-700 hover:bg-tan-50"
          onClick={() => router.push("/bikes")}
        >
          View All Bikes
          <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </div>
      <div className="relative group">
        <Button
          variant="outline"
          size="icon"
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur-sm border-tan-200 hover:bg-tan-50 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          onClick={scrollLeft}
        >
          <ChevronLeft className="w-4 h-4 text-tan-600" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur-sm border-tan-200 hover:bg-tan-50 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          onClick={scrollRight}
        >
          <ChevronRight className="w-4 h-4 text-tan-600" />
        </Button>

        <div
          ref={scrollContainerRef}
          className="flex flex-row gap-4 md:gap-6 overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory pb-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {bikesData.map((bike, index) => (
            <div
              key={index}
              className="snap-start flex-shrink-0 w-[91vw]  md:w-[calc(50vw-1.5rem)] lg:w-auto"
            >
              <BikeCard index={index} bike={bike} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
