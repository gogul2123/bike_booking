// components/StepsSection.tsx
import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';


 interface Step {
  step: string;
  title: string;
  description: string;
}

interface StepsSectionProps {
  steps: Step[];
}

const StepsSection: React.FC<StepsSectionProps> = ({ steps }) => {
  return (
    <section className="py-12 sm:py-16 bg-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block">
              <div className="mb-4 sm:mb-6">
              <span className="inline-flex items-center px-4 py-2 rounded-full text-xs sm:text-sm font-semibold text-[#AC9456] bg-[#AC9456]/10 border border-[#AC9456]/20 uppercase tracking-wider">
                <FaCheckCircle className="w-3 h-3 mr-2" />
                Easy Process
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              How It Works
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#AC9456] to-[#D4B76A] mx-auto mb-6 rounded-full"></div>
          </div>
          <p className="hidden md:block text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Get on the road in just 4 simple steps. We’ve made bike rentals quick, secure, and hassle-free — just the way it should be.
          </p>
          <p className="block sm:hidden text-base text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Get on the road in just 4 simple steps
          </p>
        </div>

        {/* Mobile: Vertical Flow with Connecting Lines */}
        <div className="block sm:hidden space-y-6">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="flex items-start space-x-4">
                {/* Step Number Circle */}
                <div className="flex-shrink-0 inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-[#AC9456] to-[#D4B76A] text-white rounded-full text-lg font-bold shadow-lg">
                  {step.step}
                </div>
                
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold mb-2 text-white">{step.title}</h3>
                  <p className="text-sm text-gray-300 leading-relaxed">{step.description}</p>
                  
                  {/* Mobile Enhancement - Quick Tip */}
                  <div className="mt-2 text-xs text-[#AC9456] font-medium">
                    {index === 0 && "📱 Takes 2 minutes"}
                    {index === 1 && "🔍 Browse 500+ bikes"}
                    {index === 2 && "💳 Secure payment"}
                    {index === 3 && "🏍️ Ready to ride"}
                  </div>
                </div>
              </div>
              
              {/* Connecting Line (except for last item) */}
              {index < steps.length - 1 && (
                <div className="absolute left-6 top-12 w-0.5 h-6 bg-gradient-to-b from-[#AC9456] to-transparent"></div>
              )}
            </div>
          ))}
        </div>

        {/* Desktop: Original Grid Layout */}
        <div className="hidden sm:grid grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#AC9456] to-[#D4B76A] text-white rounded-full text-xl font-bold mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                {step.step}
              </div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-[#AC9456] transition-colors duration-300">{step.title}</h3>
              <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300">{step.description}</p>
            
            </div>
          ))}
        </div>

        {/* Mobile CTA Section */}
        <div className="sm:hidden mt-8 bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
          <div className="text-center">
            <h3 className="text-lg font-bold mb-2">Ready to Get Started?</h3>
            <p className="text-sm text-gray-300 mb-4">Join thousands who chose the smart way to ride</p>
            <div className="flex space-x-3">
              <button className="flex-1 bg-gradient-to-r from-[#AC9456] to-[#D4B76A] text-white font-semibold py-3 rounded-xl transition-all duration-300 transform active:scale-95 shadow-lg text-sm">
                Book Now
              </button>
              <button className="flex-1 border border-[#AC9456] text-[#AC9456] font-semibold py-3 rounded-xl transition-all duration-300 hover:bg-[#AC9456] hover:text-white text-sm">
                View Bikes
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Stats Footer */}
        <div className="sm:hidden mt-6 grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-[#AC9456]">2 min</div>
            <div className="text-xs text-gray-400">Booking Time</div>
          </div>
          <div>
            <div className="text-lg font-bold text-[#AC9456]">24/7</div>
            <div className="text-xs text-gray-400">Available</div>
          </div>
          <div>
            <div className="text-lg font-bold text-[#AC9456]">Free</div>
            <div className="text-xs text-gray-400">Cancellation</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StepsSection;