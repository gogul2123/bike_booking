import React from 'react';
import { FaCheckCircle, FaPhone, FaCalendarAlt, FaShieldAlt, FaHeadphones } from 'react-icons/fa';
import { Button } from '@/components/ui/button';


const CTASection = () => {
  return (
    <>
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
        {/* Enhanced Background Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23AC9456\' fill-opacity=\'0.03\'%3E%3Ccircle cx=\'30\' cy=\'30\' r=\'2\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>
        
        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-br from-[#AC9456]/10 to-[#D4B76A]/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-gradient-to-br from-[#D4B76A]/10 to-[#AC9456]/10 rounded-full blur-xl"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Badge */}
            <div className="mb-4 sm:mb-6">
              <span className="inline-flex items-center px-4 py-2 rounded-full text-xs sm:text-sm font-semibold text-[#AC9456] bg-[#AC9456]/10 border border-[#AC9456]/20 uppercase tracking-wider">
                <FaCheckCircle className="w-3 h-3 mr-2" />
                Start Your Journey Today
              </span>
            </div>
            
            {/* Main Heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
              Ready to Start Your
              <span className="block bg-gradient-to-r from-[#AC9456] to-[#D4B76A] bg-clip-text text-transparent mt-1">
                Adventure?
              </span>
            </h2>
            
            {/* Description */}
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-8 sm:mb-10 lg:mb-12 leading-relaxed max-w-2xl lg:max-w-3xl mx-auto px-2">
              Join thousands of satisfied customers who trust us for their bike rental needs. 
              Book now and experience the freedom of the road!
            </p>
            
            {/* Trust Indicators - Mobile Optimized */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mb-8 sm:mb-10 max-w-2xl mx-auto">
              <div className="flex flex-col items-center p-3 sm:p-4 bg-white/60 backdrop-blur-sm rounded-lg border border-gray-100">
                <FaShieldAlt className="w-4 h-4 sm:w-5 sm:h-5 text-[#AC9456] mb-1 sm:mb-2" />
                <span className="text-xs sm:text-sm font-medium text-gray-700">Secure</span>
              </div>
              <div className="flex flex-col items-center p-3 sm:p-4 bg-white/60 backdrop-blur-sm rounded-lg border border-gray-100">
                <FaCheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-[#AC9456] mb-1 sm:mb-2" />
                <span className="text-xs sm:text-sm font-medium text-gray-700">Verified</span>
              </div>
              <div className="flex flex-col items-center p-3 sm:p-4 bg-white/60 backdrop-blur-sm rounded-lg border border-gray-100 col-span-2 sm:col-span-1">
                <FaHeadphones className="w-4 h-4 sm:w-5 sm:h-5 text-[#AC9456] mb-1 sm:mb-2" />
                <span className="text-xs sm:text-sm font-medium text-gray-700">24/7 Support</span>
              </div>
            </div>
            
            {/* Action Buttons - Mobile First Design */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 lg:gap-6 justify-center items-center mb-6 sm:mb-8">
              
              {/* Primary CTA - Book Now */}
              <Button 
                variant={"gold"}   
                className="w-full sm:w-auto sm:min-w-[200px] lg:min-w-[240px] h-12 sm:h-14 text-sm sm:text-base group">
                <span className="flex items-center justify-center space-x-2">
                  <FaCalendarAlt className="w-4 h-4" />
                  <span className="font-semibold">Book Your Ride</span>
                  <svg 
                    className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </Button>

              {/* Secondary CTA - Call Button */}
              <Button 
                variant={"gold"}   
                className="w-full sm:w-auto sm:min-w-[200px] lg:min-w-[240px] h-12 sm:h-14 text-sm sm:text-base group">
                <span className="flex items-center justify-center space-x-2">
                  <FaPhone className="w-4 h-4" />
                  <span className="font-semibold">
                    <span className="hidden sm:inline">Call: </span>
                    +91 93421 53995
                  </span>
                </span>
              </Button>
            </div>
            
            {/* Additional Info - Mobile Optimized */}
            <div className="text-xs sm:text-sm text-gray-500 space-y-1">
              <p>✓ Instant confirmation • ✓ Free cancellation • ✓ Best price guarantee</p>
              <p className="font-medium">Over 1000+ happy customers</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CTASection;