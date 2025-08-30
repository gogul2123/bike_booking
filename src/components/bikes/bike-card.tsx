import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock } from "lucide-react";
import BookingModal from "./bike-model";
import { useCart } from "@/hooks/CartContext";

type Bike = {
  _id: string;
  brand: string;
  model: string;
  type: string;
  transmission: string;
  price_per_day_INR: number;
  availability: boolean;
  bookedUntil?: string;
  imageUrl: string | { src: string };
  inventory: { total: number };
  colors: string[];
};

type BikeCardProps = {
  bike: Bike;
  index?: number;
  onAddToCart?: (bike: Bike, days: number, selectedColor: string) => void;
  onBookNow?: (bike: Bike, days: number, selectedColor: string) => void;
};

const BikeCard: React.FC<BikeCardProps> = ({
  bike, 
  index, 
  onAddToCart = () => {}, 
  onBookNow = () => {}
  }) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const { addToCart } = useCart();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const handleBookNowClick = () => {
    if (bike.availability) {
      setIsModalOpen(true);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleAddToCart = (bike: Bike, days: number, selectedColor: string) => {
    addToCart({ ...bike, days, selectedColor, quantity: 1 });
    console.log('Added to cart:', { bike: bike.brand + ' ' + bike.model, days, selectedColor });
  };

  const handleBookNow = (bike: Bike, days: number, selectedColor: string) => {
    onBookNow(bike, days, selectedColor);
    console.log('Booked:', { bike: bike.brand + ' ' + bike.model, days, selectedColor });
  };

  return (
    <>
    <div
      key={bike._id || index}
      className=" sm:min-h-[500px] md:min-h-[500px] lg:min-h-0 group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 border border-gray-100 relative"
    >
      <div className="relative h-56 overflow-hidden">
        <img
          src={
            typeof bike.imageUrl === "string"
              ? bike.imageUrl
              : bike.imageUrl.src
          }
          alt={`${bike.brand} ${bike.model}`}
          className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        <div className="absolute top-4 right-4 bg-gradient-to-r from-tan-600 to-tan-500 text-white px-3 py-2 rounded-full text-sm font-bold shadow-lg">
          ₹{bike.price_per_day_INR}/day
        </div>

        {/* <div className="absolute top-4 left-4">
          {bike.availability ? (
            <Badge className="bg-green-500 text-white">
              <Calendar className="w-3 h-3 mr-1" />
              Available
            </Badge>
          ) : (
            <Badge className="bg-red-500 text-white">
              <Clock className="w-3 h-3 mr-1" />
              Booked until{" "}
              {bike.bookedUntil ? formatDate(bike.bookedUntil) : "TBD"}
            </Badge>
          )}
        </div> */}
      </div>

      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-tan-600 transition-colors duration-300">
            {bike.brand} {bike.model}
          </h3>
          <div className="w-12 h-0.5 bg-tan-600 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
        </div>

        <div className="space-y-2 mb-6">
          <div className="flex items-center space-x-2">
            <div className="w-1.5 h-1.5 bg-tan-600 rounded-full"></div>
            <p className="text-sm text-gray-700 font-medium">
              Type: {bike.type.replace("-", " ")}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-1.5 h-1.5 bg-tan-600 rounded-full"></div>
            <p className="text-sm text-gray-700 font-medium">
              Transmission: {bike.transmission}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-1.5 h-1.5 bg-tan-600 rounded-full"></div>
            <p className="text-sm text-gray-700 font-medium">
              Available: {bike.inventory.total} units
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-1.5 h-1.5 bg-tan-600 rounded-full"></div>
            <p className="text-sm text-gray-700 font-medium">
              Colors: {bike.colors.join(", ")}
            </p>
          </div>
        </div>

        <Button
          onClick={handleBookNowClick}
          className="w-full py-6 font-semibold text-md bg-tan-600 hover:bg-tan-700 text-white group/btn"
          disabled={!bike.availability}
        >
          <span className="flex items-center justify-center space-x-2">
            <span>
              {bike.availability ? "Book Now" : "Currently Unavailable"}
            </span>
            {bike.availability && (
              <svg
                className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            )}
          </span>
        </Button>
      </div>

      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-tan-600 to-tan-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
       
    </div>
    {/* Booking Modal */}
        <BookingModal
          bike={bike}
          isOpen={isModalOpen}
          onClose={handleModalClose}
          onAddToCart={handleAddToCart}
          onBookNow={handleBookNow}
        />
    </>

  );
};

export default BikeCard;
