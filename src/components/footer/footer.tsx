'use client';

import React from 'react';
import { 
    FaMotorcycle, 
    FaMapMarkerAlt, 
    FaPhone, 
    FaEnvelope, 
    FaFacebookF, 
    FaTwitter, 
    FaInstagram, 
    FaLinkedinIn, 
    FaApple, 
    FaGooglePlay 
} from 'react-icons/fa';

// Footer Component
function Footer() {
  const handleNavigation = (path: string) => {
    console.log(`Navigating to: ${path}`);
  };

  const handleSocialClick = (platform: string) => {
    console.log(`Opening ${platform}`);
  };

  const handleAppDownload = (store: string) => {
    console.log(`Opening ${store} store`);
  };

  return (
    <footer className="bg-gradient-to-br from-[#141414] via-gray-800 to-[#141414] text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-0 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Left Section - Company Branding & Contact */}
          <div className="space-y-6">
            {/* Logo */}
            <div
              className="flex items-center space-x-3 cursor-pointer flex-1 justify-center md:justify-start"
              onClick={() => handleNavigation('/')}
            >
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-[#AC9456] to-[#9B8449] rounded-xl shadow-md">
                <FaMotorcycle className="h-5 w-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-white leading-tight tracking-tight">
                  Indian Bike
                </span>
                <span className="text-sm font-semibold text-[#AC9456] leading-tight tracking-wide">
                  RENTAL
                </span>
              </div>
            </div>

            {/* Company Description */}
            <p className="text-gray-300 text-sm leading-relaxed max-w-md">
              Experience the freedom of the road with premium bike rentals across India. 
              Your trusted partner for safe, affordable, and convenient motorcycle adventures.
            </p>

            {/* Contact Information */}
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="flex items-center justify-center w-8 h-8 bg-[#AC9456]/10 rounded-lg mt-0.5">
                  <FaMapMarkerAlt className="h-4 w-4 text-[#AC9456]" />
                </div>
                <div className="flex-1">
                  <p className="text-white font-medium text-sm">Location</p>
                  <p className="text-gray-300 text-sm leading-relaxed">
                   78/B Cheran Tower Near Railway Station<br />
                    Coimbatore, TamilNadu - 641 018
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-8 h-8 bg-[#AC9456]/10 rounded-lg">
                  <FaPhone className="h-4 w-4 text-[#AC9456]" />
                </div>
                <div>
                  <p className="text-white font-medium text-sm">Call Us</p>
                  <a href="tel:+919342153995" className="text-gray-300 hover:text-[#AC9456] text-sm transition-colors">
                    +91 93421 53995
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-8 h-8 bg-[#AC9456]/10 rounded-lg">
                  <FaEnvelope className="h-4 w-4 text-[#AC9456]" />
                </div>
                <div>
                  <p className="text-white font-medium text-sm">Email</p>
                  <a href="mailto:indianbikes24@gmail.com" className="text-gray-300 hover:text-[#AC9456] text-sm transition-colors">
                    indianbikes24@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Middle Section - Navigation Links */}
          <div className="lg:pl-8">
            <h3 className="text-lg font-bold text-white mb-6">Quick Links</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
              
              {/* Features */}
              <div>
                <h4 className="text-[#AC9456] font-semibold text-sm mb-3 uppercase tracking-wide">Features</h4>
                <div className="space-y-2">
                  <button 
                    onClick={() => handleNavigation('/bikes')}
                    className="block text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-200 text-sm"
                  >
                    Our Bikes
                  </button>
                  <button 
                    onClick={() => handleNavigation('/booking')}
                    className="block text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-200 text-sm"
                  >
                    Easy Booking
                  </button>
                  <button 
                    onClick={() => handleNavigation('/insurance')}
                    className="block text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-200 text-sm"
                  >
                    Insurance Coverage
                  </button>
                  <button 
                    onClick={() => handleNavigation('/support')}
                    className="block text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-200 text-sm"
                  >
                    24/7 Support
                  </button>
                </div>
              </div>

              {/* Legal */}
              <div>
                <h4 className="text-[#AC9456] font-semibold text-sm mb-3 uppercase tracking-wide">Legal</h4>
                <div className="space-y-2">
                  <button 
                    onClick={() => handleNavigation('/terms')}
                    className="block text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-200 text-sm"
                  >
                    Terms & Conditions
                  </button>
                  <button 
                    onClick={() => handleNavigation('/privacy')}
                    className="block text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-200 text-sm"
                  >
                    Privacy Policy
                  </button>
                  <button 
                    onClick={() => handleNavigation('/refund')}
                    className="block text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-200 text-sm"
                  >
                    Refund Policy
                  </button>
                  <button 
                    onClick={() => handleNavigation('/rental-policy')}
                    className="block text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-200 text-sm"
                  >
                    Rental Policy
                  </button>
                </div>
              </div>

              {/* Company */}
              <div className="sm:col-span-2 lg:col-span-1">
                <h4 className="text-[#AC9456] font-semibold text-sm mb-3 uppercase tracking-wide">Company</h4>
                <div className="space-y-2">
                  <button 
                    onClick={() => handleNavigation('/about')}
                    className="block text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-200 text-sm"
                  >
                    About Us
                  </button>
                  <button 
                    onClick={() => handleNavigation('/careers')}
                    className="block text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-200 text-sm"
                  >
                    Careers
                  </button>
                  <button 
                    onClick={() => handleNavigation('/contact')}
                    className="block text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-200 text-sm"
                  >
                    Contact Us
                  </button>
                  <button 
                    onClick={() => handleNavigation('/blog')}
                    className="block text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-200 text-sm"
                  >
                    Blog
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Social Media & App Downloads */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-white mb-6">Connect With Us</h3>
              
              {/* Social Media Links */}
              <div className="space-y-4">
                <div>
                  <h4 className="text-[#AC9456] font-semibold text-sm mb-3 uppercase tracking-wide">Follow Us</h4>
                  <div className="flex space-x-3">
                    <button
                      onClick={() => handleSocialClick('Facebook')}
                      className="flex items-center justify-center w-10 h-10 bg-[#AC9456]/10 hover:bg-[#AC9456]/20 rounded-lg transition-colors group"
                    >
                      <FaFacebookF className="h-4 w-4 text-[#AC9456] group-hover:text-white transition-colors" />
                    </button>
                    <button
                      onClick={() => handleSocialClick('Twitter')}
                      className="flex items-center justify-center w-10 h-10 bg-[#AC9456]/10 hover:bg-[#AC9456]/20 rounded-lg transition-colors group"
                    >
                      <FaTwitter className="h-4 w-4 text-[#AC9456] group-hover:text-white transition-colors" />
                    </button>
                    <button
                      onClick={() => handleSocialClick('Instagram')}
                      className="flex items-center justify-center w-10 h-10 bg-[#AC9456]/10 hover:bg-[#AC9456]/20 rounded-lg transition-colors group"
                    >
                      <FaInstagram className="h-4 w-4 text-[#AC9456] group-hover:text-white transition-colors" />
                    </button>
                    <button
                      onClick={() => handleSocialClick('LinkedIn')}
                      className="flex items-center justify-center w-10 h-10 bg-[#AC9456]/10 hover:bg-[#AC9456]/20 rounded-lg transition-colors group"
                    >
                      <FaLinkedinIn className="h-4 w-4 text-[#AC9456] group-hover:text-white transition-colors" />
                    </button>
                  </div>
                </div>

                {/* App Download */}
                {/* <div>
                  <h4 className="text-[#AC9456] font-semibold text-sm mb-3 uppercase tracking-wide">Download App</h4>
                  <div className="space-y-2">
                    <button
                      onClick={() => handleAppDownload('App Store')}
                      className="flex items-center space-x-3 w-full p-3 bg-[#AC9456]/10 hover:bg-[#AC9456]/20 rounded-lg transition-colors group"
                    >
                      <FaApple className="h-5 w-5 text-[#AC9456] group-hover:text-white transition-colors" />
                      <div className="text-left">
                        <p className="text-xs text-gray-400 leading-tight">Download on the</p>
                        <p className="text-sm font-semibold text-white">App Store</p>
                      </div>
                    </button>
                    <button
                      onClick={() => handleAppDownload('Google Play')}
                      className="flex items-center space-x-3 w-full p-3 bg-[#AC9456]/10 hover:bg-[#AC9456]/20 rounded-lg transition-colors group"
                    >
                      <FaGooglePlay className="h-5 w-5 text-[#AC9456] group-hover:text-white transition-colors" />
                      <div className="text-left">
                        <p className="text-xs text-gray-400 leading-tight">Get it on</p>
                        <p className="text-sm font-semibold text-white">Google Play</p>
                      </div>
                    </button>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-0 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-gray-400 text-sm">
                © {new Date().getFullYear()} Indian Bike Rental. All rights reserved.
              </p>
            </div>
            {/* <div className="flex items-center space-x-6">
              <button 
                onClick={() => handleNavigation('/sitemap')}
                className="text-gray-400 hover:text-[#AC9456] text-sm transition-colors"
              >
                Sitemap
              </button>
              <button 
                onClick={() => handleNavigation('/accessibility')}
                className="text-gray-400 hover:text-[#AC9456] text-sm transition-colors"
              >
                Accessibility
              </button>
              <div className="text-gray-400 text-sm">
                Made in India
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;