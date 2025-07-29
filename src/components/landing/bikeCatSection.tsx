import React from 'react';
import { Button } from '../ui/button';
import { Bike } from 'lucide-react';
import { FaCheckCircle } from 'react-icons/fa';

interface BikeCategory {
  name: string;
  image: string;
  models: string[];
  startingPrice: string;
}

interface BikeCategoriesSectionProps {
  categories: BikeCategory[];
}

const BikeCategoriesSection: React.FC<BikeCategoriesSectionProps> = ({ categories }) => {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-100">
  <div className="container mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-16">
      <div className="inline-block">
          <div className="mb-4 sm:mb-6">
              <span className="inline-flex items-center px-4 py-2 rounded-full text-xs sm:text-sm font-semibold text-[#AC9456] bg-[#AC9456]/10 border border-[#AC9456]/20 uppercase tracking-wider">
                <FaCheckCircle className="w-3 h-3 mr-2" />
                Premium Collection
              </span>
            </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          Top Bike Categories
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-[#AC9456] to-[#D4B76A] mx-auto mb-6 rounded-full"></div>
      </div>
      <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
        Choose from our diverse fleet of well-maintained motorcycles
      </p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {categories.map((category, index) => (
        <div 
          key={index} 
          className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 border border-gray-100"
        >
          {/* Image Section - Desktop Only */}
          <div className="hidden sm:block relative h-56 overflow-hidden">
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute top-4 right-4 bg-gradient-to-r from-[#AC9456] to-[#D4B76A] text-white px-3 py-2 rounded-full text-sm font-bold shadow-lg">
              {category.startingPrice}
            </div>
          </div>
          
          {/* Mobile Header with Price Badge */}
          <div className="sm:hidden relative bg-gradient-to-r from-[#AC9456]/10 to-[#D4B76A]/10 px-6 py-4 border-b border-[#AC9456]/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-[#AC9456] to-[#D4B76A] rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg"><Bike /></span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    {category.name}
                  </h3>
                  <div className="w-8 h-0.5 bg-[#AC9456] rounded-full"></div>
                </div>
              </div>
              <div className="bg-gradient-to-r from-[#AC9456] to-[#D4B76A] text-white px-3 py-2 rounded-full text-sm font-bold shadow-lg">
                {category.startingPrice}
              </div>
            </div>
          </div>
          
          <div className="p-6">
            {/* Desktop Header */}
            <div className="hidden sm:block mb-4">
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#AC9456] transition-colors duration-300">
                {category.name}
              </h3>
              <div className="w-12 h-0.5 bg-[#AC9456] rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </div>
            
            {/* Models List */}
            <div className="space-y-3 mb-6">
              <h4 className="sm:hidden text-sm font-semibold text-[#AC9456] uppercase tracking-wider">Available Models</h4>
              {category.models.map((model, idx) => (
                <div key={idx} className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-gradient-to-r from-[#AC9456] to-[#D4B76A] rounded-full flex-shrink-0"></div>
                  <p className="text-sm text-gray-700 font-medium">{model}</p>
                </div>
              ))}
            </div>

            {/* Mobile Features */}
            <div className="sm:hidden bg-gray-50 rounded-lg p-4 mb-6">
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="text-center">
                  <div className="text-[#AC9456] font-semibold">✓ Verified</div>
                  <div className="text-gray-600">Documents</div>
                </div>
                <div className="text-center">
                  <div className="text-[#AC9456] font-semibold">✓ Insured</div>
                  <div className="text-gray-600">Coverage</div>
                </div>
                <div className="text-center">
                  <div className="text-[#AC9456] font-semibold">✓ 24/7</div>
                  <div className="text-gray-600">Support</div>
                </div>
                <div className="text-center">
                  <div className="text-[#AC9456] font-semibold">✓ Free</div>
                  <div className="text-gray-600">Delivery</div>
                </div>
              </div>
            </div>
          
            <Button 
              variant="gold"
              className='py-6 font-semibold text-md w-full'
            >
              <span className="flex items-center justify-center space-x-2">
                <span>View Models</span>
                <svg 
                  className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform duration-300" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </Button>
          </div>
          
          {/* Top accent line */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#AC9456] to-[#D4B76A] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
        </div>
      ))}
    </div>
  </div>
</section>
  );
};

export default BikeCategoriesSection;