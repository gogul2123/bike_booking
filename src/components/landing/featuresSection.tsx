
import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface FeaturesSectionProps {
  features: Feature[];
}

const FeaturesSection: React.FC<FeaturesSectionProps> = ({ features }) => {
  return (
    <section className="py-12 sm:py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block">
              <div className="mb-4 sm:mb-6">
              <span className="inline-flex items-center px-4 py-2 rounded-full text-xs sm:text-sm font-semibold text-[#AC9456] bg-[#AC9456]/10 border border-[#AC9456]/20 uppercase tracking-wider">
                <FaCheckCircle className="w-3 h-3 mr-2" />
                Our Promise
              </span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Us
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#AC9456] to-[#D4B76A] mx-auto mb-6 rounded-full"></div>
          </div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Experience the difference with our premium service and commitment to excellence
          </p>
        </div>

        {/* Mobile Layout - 2 columns */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="group text-center p-4 sm:p-8 rounded-xl sm:rounded-2xl bg-white hover:bg-gradient-to-br hover:from-gray-50 hover:to-white shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100"
            >
              {/* Mobile Compact Icon */}
              <div className="inline-flex items-center justify-center w-12 h-12 sm:w-20 sm:h-20 bg-[#141414] text-white rounded-full mb-3 sm:mb-6 text-lg sm:text-2xl group-hover:scale-110 group-hover:bg-gradient-to-br group-hover:from-[#141414] group-hover:to-[#2a2a2a] transition-all duration-300 shadow-lg group-hover:shadow-xl">
                {feature.icon}
              </div>
              
              <div className="mb-2 sm:mb-4">
                <h3 className="text-sm sm:text-xl font-bold text-gray-900 mb-1 sm:mb-2 group-hover:text-[#AC9456] transition-colors duration-300 leading-tight">
                  {feature.title}
                </h3>
                <div className="w-8 sm:w-12 h-0.5 bg-[#AC9456] rounded-full mx-auto transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              </div>
              
              {/* Mobile Simplified Description */}
              <p className="text-xs sm:text-base text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300 line-clamp-3 sm:line-clamp-none">
                {feature.description}
              </p>
              
              {/* Mobile Enhancement - Key Point */}
              <div className="sm:hidden mt-2 pt-2 border-t border-gray-100">
                <div className="text-[#AC9456] text-xs font-semibold">
                  ✓ Guaranteed
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile CTA Section */}
        <div className="sm:hidden mt-8 text-center bg-gradient-to-r from-[#AC9456]/10 to-[#D4B76A]/10 rounded-2xl p-6 border border-[#AC9456]/20">
          <h3 className="text-lg font-bold text-gray-900 mb-2">Ready to Experience the Difference?</h3>
          <p className="text-sm text-gray-600 mb-4">Join thousands of satisfied customers across Tamil Nadu</p>
          <button className="bg-gradient-to-r from-[#AC9456] to-[#D4B76A] text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 transform active:scale-95 shadow-lg text-sm">
            Start Your Journey
          </button>
        </div>

        {/* Desktop Trust Indicators */}
        <div className="hidden sm:block mt-12 text-center">
          <div className="inline-flex items-center space-x-8 text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>5000+ Happy Rides</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>99.9% Uptime</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <span>4.8★ Rating</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;