"use client";
import React, { useState } from 'react';
import { FaQuestionCircle, FaHeadset, FaBook, FaPhone, FaEnvelope, FaWhatsapp, FaChevronDown, FaChevronUp, FaMotorcycle, FaCreditCard, FaShieldAlt, FaTools } from 'react-icons/fa';

export default function HelpSupportPage() {
  const [activeTab, setActiveTab] = useState('faq');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      category: 'Booking & Reservations',
      icon: FaMotorcycle,
      questions: [
        {
          question: 'How do I book a motorcycle?',
          answer: 'You can book a motorcycle through our website, mobile app, or by calling our customer service. Select your preferred bike, choose dates, provide required documents, and complete the payment to confirm your booking.'
        },
        {
          question: 'What documents do I need to rent a bike?',
          answer: 'You need a valid driving license, government-issued ID proof (Aadhar card, passport, etc.), and a security deposit. International customers need a valid passport and international driving permit.'
        },
        {
          question: 'Can I cancel or modify my booking?',
          answer: 'Yes, you can cancel or modify your booking up to 24 hours before the rental start time. Cancellation charges may apply based on our cancellation policy.'
        },
        {
          question: 'What is the minimum age requirement?',
          answer: 'The minimum age to rent a motorcycle is 18 years. Riders must have a valid driving license that has been held for at least 1 year.'
        }
      ]
    },
    {
      category: 'Payment & Pricing',
      icon: FaCreditCard,
      questions: [
        {
          question: 'What payment methods do you accept?',
          answer: 'We accept all major credit cards, debit cards, UPI payments, net banking, and cash payments. Online payments are secure and processed through encrypted gateways.'
        },
        {
          question: 'How is the rental price calculated?',
          answer: 'Rental prices are based on the bike model, rental duration, season, and additional services. Long-term rentals get better rates. Check our pricing page for detailed information.'
        },
        {
          question: 'What is included in the rental price?',
          answer: 'The rental price includes the motorcycle, basic insurance, helmet, and 24/7 roadside assistance. Fuel, additional accessories, and damage protection are charged separately.'
        },
        {
          question: 'Do you require a security deposit?',
          answer: 'Yes, a refundable security deposit is required based on the bike model. This can be paid by card or cash and is returned after the bike is returned in good condition.'
        }
      ]
    },
    {
      category: 'Safety & Insurance',
      icon: FaShieldAlt,
      questions: [
        {
          question: 'Are the motorcycles insured?',
          answer: 'Yes, all our motorcycles come with comprehensive insurance coverage. However, riders are responsible for any damage deductible as per the insurance policy.'
        },
        {
          question: 'What safety equipment is provided?',
          answer: 'We provide ISI-certified helmets with every rental. Additional safety gear like knee guards, gloves, and riding jackets are available for rent at additional cost.'
        },
        {
          question: 'What happens if I have an accident?',
          answer: 'In case of an accident, immediately contact our emergency helpline. We will guide you through the process and arrange necessary assistance. Police complaint and insurance claim procedures will be handled.'
        },
        {
          question: 'Can I add additional riders to my booking?',
          answer: 'Yes, you can add additional authorized riders to your booking. Each additional rider must provide valid documents and pay the additional rider fee.'
        }
      ]
    },
    {
      category: 'Technical Support',
      icon: FaTools,
      questions: [
        {
          question: 'What if the motorcycle breaks down?',
          answer: 'Contact our 24/7 roadside assistance immediately. We will either fix the issue on-site or provide a replacement motorcycle. Breakdown assistance is included in your rental.'
        },
        {
          question: 'How often are the bikes maintained?',
          answer: 'All motorcycles undergo regular maintenance every 1000 km or monthly, whichever comes first. We also perform pre-rental inspections to ensure optimal performance.'
        },
        {
          question: 'Can I extend my rental period?',
          answer: 'Yes, you can extend your rental period subject to bike availability. Contact us at least 24 hours before your scheduled return time to arrange an extension.'
        },
        {
          question: 'What fuel type should I use?',
          answer: 'Use only the recommended fuel type specified for each motorcycle. Most of our bikes run on petrol, and we will brief you about the specific requirements during pickup.'
        }
      ]
    }
  ];

  const supportChannels = [
    {
      icon: FaPhone,
      title: 'Phone Support',
      description: 'Speak directly with our support team',
      contact: '+91 98765 43210',
      hours: '24/7 Available',
      color: 'bg-blue-500'
    },
    {
      icon: FaWhatsapp,
      title: 'WhatsApp Chat',
      description: 'Quick responses via WhatsApp',
      contact: '+91 87654 32109',
      hours: '9 AM - 9 PM',
      color: 'bg-green-500'
    },
    {
      icon: FaEnvelope,
      title: 'Email Support',
      description: 'Detailed support via email',
      contact: 'support@indianbikerental.com',
      hours: 'Response within 2 hours',
      color: 'bg-purple-500'
    },
    {
      icon: FaHeadset,
      title: 'Live Chat',
      description: 'Instant chat on our website',
      contact: 'Available on website',
      hours: '9 AM - 9 PM',
      color: 'bg-orange-500'
    }
  ];

  const quickLinks = [
    { title: 'Download User Manual', description: 'Complete guide for bike rental process' },
    { title: 'Safety Guidelines', description: 'Important safety tips for riders' },
    { title: 'Terms & Conditions', description: 'Rental terms and conditions' },
    { title: 'Insurance Policy', description: 'Details about insurance coverage' },
    { title: 'Cancellation Policy', description: 'Information about booking cancellations' },
    { title: 'Maintenance Schedule', description: 'Our bike maintenance procedures' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                <FaHeadset className="h-12 w-12" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Help & Support</h1>
            <p className="text-xl md:text-2xl opacity-90 max-w-2xl mx-auto">
              We're here to help you every step of the way
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Support Channels */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">Get Instant Help</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {supportChannels.map((channel, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300">
                <div className={`${channel.color} rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center`}>
                  <channel.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{channel.title}</h3>
                <p className="text-gray-600 mb-3">{channel.description}</p>
                <div className="text-[#AC9456] font-semibold mb-1">{channel.contact}</div>
                <div className="text-sm text-gray-500">{channel.hours}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content Tabs */}
        <div className="mb-16">
          <div className="flex flex-wrap justify-center mb-8 bg-white rounded-xl shadow-lg p-2">
            <button
              onClick={() => setActiveTab('faq')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                activeTab === 'faq'
                  ? 'bg-gradient-to-r from-[#AC9456] to-[#9B8449] text-white shadow-md'
                  : 'text-gray-600 hover:text-[#AC9456]'
              }`}
            >
              <FaQuestionCircle className="inline mr-2" />
              FAQ
            </button>
            <button
              onClick={() => setActiveTab('guides')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                activeTab === 'guides'
                  ? 'bg-gradient-to-r from-[#AC9456] to-[#9B8449] text-white shadow-md'
                  : 'text-gray-600 hover:text-[#AC9456]'
              }`}
            >
              <FaBook className="inline mr-2" />
              Guides & Resources
            </button>
          </div>

          {/* FAQ Section */}
          {activeTab === 'faq' && (
            <div className="space-y-8">
              {faqs.map((category, categoryIndex) => (
                <div key={categoryIndex} className="bg-white rounded-2xl shadow-lg p-8">
                  <div className="flex items-center mb-6">
                    <div className="bg-gradient-to-br from-[#AC9456] to-[#9B8449] rounded-full p-3 mr-4">
                      <category.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800">{category.category}</h3>
                  </div>
                  <div className="space-y-4">
                    {category.questions.map((faq, faqIndex) => {
                      const globalIndex = categoryIndex * 100 + faqIndex;
                      return (
                        <div key={faqIndex} className="border border-gray-200 rounded-lg">
                          <button
                            onClick={() => toggleFaq(globalIndex)}
                            className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                          >
                            <span className="font-semibold text-gray-800">{faq.question}</span>
                            {openFaq === globalIndex ? (
                              <FaChevronUp className="h-5 w-5 text-[#AC9456]" />
                            ) : (
                              <FaChevronDown className="h-5 w-5 text-gray-400" />
                            )}
                          </button>
                          {openFaq === globalIndex && (
                            <div className="px-6 pb-4">
                              <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Guides Section */}
          {activeTab === 'guides' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {quickLinks.map((link, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 cursor-pointer">
                  <div className="bg-gradient-to-br from-[#AC9456] to-[#9B8449] rounded-full p-3 w-12 h-12 mb-4 flex items-center justify-center">
                    <FaBook className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{link.title}</h3>
                  <p className="text-gray-600">{link.description}</p>
                  <div className="mt-4">
                    <span className="text-[#AC9456] font-semibold hover:underline">Learn More →</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Emergency Contact */}
        <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-2xl text-white p-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
              <FaPhone className="h-8 w-8" />
            </div>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Emergency Assistance</h2>
          <p className="text-lg mb-6 opacity-90">
            For urgent roadside assistance or emergencies, call our 24/7 helpline
          </p>
          <div className="text-3xl font-bold mb-2">+91 98765 43210</div>
          <p className="opacity-90">Available 24 hours a day, 7 days a week</p>
        </div>
      </div>
    </div>
  );
}