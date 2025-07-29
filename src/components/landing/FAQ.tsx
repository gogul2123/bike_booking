import React, { useState } from 'react';
import { FaChevronDown, FaQuestionCircle, FaShieldAlt, FaClock, FaMapMarkerAlt, FaCreditCard, FaPhone, FaUsers, FaCheckCircle } from 'react-icons/fa';

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      id: 1,
      icon: FaQuestionCircle,
      question: "How do I book a bike rental?",
      answer: "Booking is simple! You can book online through our website, call us directly at +91 93421 53995, or visit our location. We recommend booking in advance, especially during peak seasons, to ensure availability of your preferred bike model."
    },
    {
      id: 2,
      icon: FaClock,
      question: "What are your operating hours?",
      answer: "We're open 7 days a week from 8:00 AM to 8:00 PM. For early morning or late evening pickups, please contact us in advance to make special arrangements. Our customer support is available 24/7 for emergencies."
    },
    {
      id: 3,
      icon: FaShieldAlt,
      question: "What documents do I need to rent a bike?",
      answer: "You'll need a valid driving license, government-issued ID proof (Aadhaar/Passport/Voter ID), and a security deposit. For outstation trips, additional documentation may be required. All documents should be original and valid."
    },
    {
      id: 4,
      icon: FaCreditCard,
      question: "What payment methods do you accept?",
      answer: "We accept cash, UPI, credit/debit cards, and bank transfers. A security deposit is required at the time of booking, which will be refunded after the safe return of the vehicle. EMI options are available for longer rentals."
    },
    {
      id: 5,
      icon: FaMapMarkerAlt,
      question: "Do you offer delivery and pickup services?",
      answer: "Yes! We provide free delivery and pickup within a 10km radius of our location. For locations beyond this range, nominal charges apply. We also offer airport and railway station pickup services with prior booking."
    },
    {
      id: 6,
      icon: FaUsers,
      question: "Can I extend my rental period?",
      answer: "Absolutely! You can extend your rental period by contacting us at least 2 hours before your original return time. Extension rates apply as per our standard pricing, and availability is subject to our booking schedule."
    },
    {
      id: 7,
      icon: FaShieldAlt,
      question: "What happens if the bike breaks down?",
      answer: "We provide 24/7 roadside assistance for all our rentals. In case of breakdown, call our emergency helpline and we'll arrange immediate assistance or replacement vehicle. Basic maintenance issues are covered at no extra cost."
    },
    {
      id: 8,
      icon: FaClock,
      question: "What is your fuel policy?",
      answer: "All bikes are provided with a full tank of fuel. You need to return the bike with the same fuel level. If returned with less fuel, charges will be deducted from your security deposit based on current fuel prices."
    }
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'40\' height=\'40\' viewBox=\'0 0 40 40\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23AC9456\' fill-opacity=\'0.02\'%3E%3Cpath d=\'M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z\'/%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-12 lg:mb-16">
          <div className="mb-4 sm:mb-6">
            <span className="inline-flex items-center px-4 py-2 rounded-full text-xs sm:text-sm font-semibold text-[#AC9456] bg-[#AC9456]/10 border border-[#AC9456]/20 uppercase tracking-wider">
              <FaCheckCircle className="w-3 h-3 mr-2" />
              Got Questions?
            </span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            Frequently Asked
            <span className="block bg-gradient-to-r from-[#AC9456] to-[#D4B76A] bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
          
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl lg:max-w-3xl mx-auto leading-relaxed">
            Find answers to the most common questions about our bike rental services. 
            Can't find what you're looking for? Contact us directly!
          </p>
        </div>

        {/* FAQ Grid */}
        <div className="max-w-4xl mx-auto">
          <div className="grid gap-4 sm:gap-6">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              const IconComponent = faq.icon;
              
              return (
                <div 
                  key={faq.id}
                  className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 overflow-hidden"
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full px-4 sm:px-6 py-4 sm:py-5 text-left focus:outline-none focus:bg-gray-50 hover:bg-gray-50 transition-colors duration-200"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3 sm:space-x-4 flex-1">
                        <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-[#AC9456] to-[#D4B76A] flex items-center justify-center">
                          <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                        </div>
                        <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900 pr-2">
                          {faq.question}
                        </h3>
                      </div>
                      <div className="flex-shrink-0 ml-2">
                        <FaChevronDown 
                          className={`w-4 h-4 sm:w-5 sm:h-5 text-gray-500 transform transition-transform duration-300 ${
                            isOpen ? 'rotate-180' : 'rotate-0'
                          }`}
                        />
                      </div>
                    </div>
                  </button>
                  
                  <div 
                    className={`transition-all duration-300 ease-in-out ${
                      isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="px-4 sm:px-6 pb-4 sm:pb-5">
                      <div className="ml-11 sm:ml-14">
                        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Contact CTA */}
        <div className="mt-12 sm:mt-16 lg:mt-20 text-center">
          <div className="bg-gradient-to-r from-[#AC9456]/10 to-[#D4B76A]/10 rounded-2xl p-6 sm:p-8 lg:p-10 border border-[#AC9456]/20 max-w-2xl mx-auto">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
              Still have questions?
            </h3>
            <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8">
              Our friendly team is here to help. Get in touch and we'll get back to you as soon as possible.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <button className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-[#AC9456] to-[#D4B76A] text-white font-semibold rounded-lg hover:from-[#9A8449] hover:to-[#C2A55B] transform hover:-translate-y-0.5 transition-all duration-300 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#AC9456] focus:ring-offset-2">
                <FaPhone className="w-4 h-4 mr-2" />
                Call Us Now
              </button>
              
              <button className="inline-flex items-center justify-center px-6 py-3 bg-white text-[#AC9456] font-semibold rounded-lg border-2 border-[#AC9456]/30 hover:bg-[#AC9456] hover:text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#AC9456] focus:ring-offset-2">
                <FaQuestionCircle className="w-4 h-4 mr-2" />
                Send Message
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;