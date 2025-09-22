import React from "react";
import { Star, Heart, Users, Fuel, Settings } from "lucide-react";
import { BikeData } from "./types";
import Image from "next/image";
import { cloudinaryLoader } from "@/lib/ImageLoader";

interface BikeCardProps {
  bike: BikeData;
  index?: number;
  isLiked?: boolean;
  onToggleLike?: (bikeId: string) => void;
  onShowAlert?: (message: string, type: string) => void;
  onBookNow?: (bike: BikeData) => void;
}

const BikeCard: React.FC<BikeCardProps> = ({
  bike,
  isLiked,
  onToggleLike,
  onShowAlert,
  onBookNow,
}) => {
  console.log("bike", bike, "isLiked", isLiked, "onToggleLike");
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group w-auto relative">
      <div className="relative ">
        <Image
          src={bike.modelInfo.imageUrl}
          alt={`${bike.modelInfo.brand} ${bike.modelInfo.model}`}
          width={600}
          height={500}
          className="object-contain group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, 250px" // optimization hint
          loading="lazy"
          loader={cloudinaryLoader}
        />
        {/* <button
          onClick={() => onToggleLike(bike.bikeId)}
          className="absolute top-3 right-3 p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
        >
          <Heart
            className={`w-5 h-5 transition-colors ${
              isLiked ? "text-red-500 fill-red-500" : "text-gray-600"
            }`}
          />
        </button> */}
        <div className="absolute bottom-3 left-3">
          <span className="bg-black/70 text-white px-2 py-1 rounded text-xs font-medium capitalize">
            {bike.modelInfo.transmission}
          </span>
        </div>
      </div>

      <div className="p-4">
        <div className="md:h-24 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold text-lg text-gray-900">
              {bike.modelInfo.model}
            </h3>
            {/* <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">4.5</span>
              <span className="text-sm text-gray-500">(125)</span>
            </div> */}
          </div>

          <div className="flex items-center gap-4 mb-3 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>Available: {bike.counters.available}</span>
            </div>
            <div className="flex items-center gap-1">
              <Fuel className="w-4 h-4" />
              <span>25 kmpl</span>
            </div>
            <div className="flex items-center gap-1">
              <Settings className="w-4 h-4" />
              <span className="capitalize">{bike.modelInfo.transmission}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-[#AC9456]">
              ₹{bike.price}
            </span>
            <span className="text-gray-500 text-sm">/day</span>
          </div>
          <div className="flex gap-2">
            <button
              className="bg-gradient-to-r from-[#AC9456] to-[#D4B76A] text-white px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={bike.counters.available === 0}
              onClick={() => onBookNow(bike)}
            >
              {bike.counters.available === 0 ? "Not Available" : "Book Now"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BikeCard;
