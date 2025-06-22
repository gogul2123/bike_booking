import React from 'react';
import { FaCheckCircle, FaPhone, FaCalendarAlt, FaShieldAlt, FaHeadphones } from 'react-icons/fa';
import { Button } from '../ui/button';

const CTASection = () => {
  return (
    <>
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.05\'%3E%3Ccircle cx=\'30\' cy=\'30\' r=\'1\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <span className="text-sm font-semibold text-[#AC9456] uppercase tracking-wider mb-2 block">
                Start Your Journey Today
              </span>
            </div>
            
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Ready to Start Your
              <span className="block bg-gradient-to-r from-[#AC9456] to-[#D4B76A] bg-clip-text text-transparent">
                Adventure?
              </span>
            </h2>
            
            <p className="text-xl sm:text-2xl text-gray-600 mb-12 leading-relaxed max-w-3xl mx-auto">
              Join thousands of satisfied customers who trust us for their bike rental needs. 
              Book now and experience the freedom of the road!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
              
            {/* Book Now Button */}
            <Button variant="gold" className="w-60 h-14">
              <span className="flex items-center justify-center space-x-2">
                <FaCalendarAlt className="w-4 h-4" />
                <span>Book Now</span>
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

            {/* Call Button */}
            <Button variant="gold" className="w-60 h-14">
              <span className="flex items-center justify-center space-x-2">
                <FaPhone className="w-4 h-4" />
                <span>Call: +91 93421 53995</span>
              </span>
            </Button>
            </div>

            {/* <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="flex flex-col items-center space-y-3 p-6 rounded-2xl bg-gray-50 border border-gray-200 hover:bg-gray-100 hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <FaCheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <span className="text-gray-800 font-medium">Instant Booking</span>
              </div>
              
              <div className="flex flex-col items-center space-y-3 p-6 rounded-2xl bg-gray-50 border border-gray-200 hover:bg-gray-100 hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <FaShieldAlt className="w-6 h-6 text-blue-600" />
                </div>
                <span className="text-gray-800 font-medium">No Hidden Fees</span>
              </div>
              
              <div className="flex flex-col items-center space-y-3 p-6 rounded-2xl bg-gray-50 border border-gray-200 hover:bg-gray-100 hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <FaHeadphones className="w-6 h-6 text-purple-600" />
                </div>
                <span className="text-gray-800 font-medium">24/7 Support</span>
              </div>
            </div> */}
          </div>
        </div>
      </section>
    </>
  );
};

export default CTASection;