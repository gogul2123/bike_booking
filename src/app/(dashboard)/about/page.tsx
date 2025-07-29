"use client";
import React from 'react';
import { FaMotorcycle, FaUsers, FaShieldAlt, FaClock, FaHeart, FaAward, FaRoad, FaTools } from 'react-icons/fa';

export default function AboutUsPage() {
  const stats = [
    { icon: FaUsers, number: '10,000+', label: 'Happy Customers' },
    { icon: FaMotorcycle, number: '500+', label: 'Bikes Available' },
    { icon: FaRoad, number: '50,000+', label: 'KM Traveled' },
    { icon: FaAward, number: '5', label: 'Years Experience' }
  ];

  const features = [
    {
      icon: FaShieldAlt,
      title: 'Safety First',
      description: 'All our bikes undergo regular maintenance and safety checks to ensure your ride is secure and reliable.'
    },
    {
      icon: FaClock,
      title: '24/7 Support',
      description: 'Round-the-clock customer support and roadside assistance for any issues during your journey.'
    },
    {
      icon: FaTools,
      title: 'Well-Maintained Fleet',
      description: 'Our motorcycles are regularly serviced by certified mechanics and kept in pristine condition.'
    },
    {
      icon: FaHeart,
      title: 'Customer-Centric',
      description: 'We prioritize customer satisfaction and go the extra mile to make your rental experience memorable.'
    }
  ];

  const team = [
    {
      name: 'Rajesh Kumar',
      role: 'Founder & CEO',
      description: 'Passionate motorcyclist with 15+ years in the automotive industry.',
      image: '👨‍💼'
    },
    {
      name: 'Priya Sharma',
      role: 'Operations Manager',
      description: 'Ensures smooth operations and exceptional customer service.',
      image: '👩‍💼'
    },
    {
      name: 'Arjun Patel',
      role: 'Technical Head',
      description: 'Expert mechanic ensuring all bikes are in perfect condition.',
      image: '👨‍🔧'
    },
    {
      name: 'Meera Singh',
      role: 'Customer Relations',
      description: 'Dedicated to providing the best customer experience.',
      image: '👩‍💻'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                <FaMotorcycle className="h-12 w-12" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">About Indian Bike Rental</h1>
            <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
              Your trusted partner for motorcycle adventures across India
            </p>
          </div>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Our Story</h2>
            <div className="space-y-4 text-lg text-gray-600">
              <p>
                Founded in 2019, Indian Bike Rental started with a simple vision: to make motorcycle adventures accessible to everyone. What began as a small fleet of 10 bikes has grown into one of India's most trusted motorcycle rental services.
              </p>
              <p>
                We understand the thrill of the open road, the freedom of two wheels, and the joy of exploring new destinations. Our mission is to provide you with reliable, well-maintained motorcycles that turn your travel dreams into unforgettable memories.
              </p>
              <p>
                From weekend getaways to cross-country expeditions, we've been the trusted companion for thousands of riders across Tamil Nadu and beyond. Every bike in our fleet tells a story of adventure, and we're here to help you write yours.
              </p>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="text-center mb-6">
              <div className="bg-gradient-to-br from-[#AC9456] to-[#9B8449] rounded-full p-6 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <FaMotorcycle className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">Our Mission</h3>
            </div>
            <p className="text-gray-600 text-center leading-relaxed">
              To provide safe, reliable, and affordable motorcycle rental services that enable our customers to explore India's diverse landscapes with confidence and comfort.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg p-6 text-center">
              <div className="bg-gradient-to-br from-[#AC9456] to-[#9B8449] rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <stat.icon className="h-8 w-8 text-white" />
              </div>
              <div className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">{stat.number}</div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Features Section */}
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-12">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300">
                <div className="bg-gradient-to-br from-[#AC9456] to-[#9B8449] rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-12">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300">
                <div className="text-6xl mb-4">{member.image}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{member.name}</h3>
                <div className="text-[#AC9456] font-semibold mb-3">{member.role}</div>
                <p className="text-gray-600 text-sm leading-relaxed">{member.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Values Section */}
        <div className="bg-gradient-to-r from-[#AC9456] to-[#9B8449] rounded-2xl text-white p-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Values</h2>
            <p className="text-xl opacity-90">The principles that guide everything we do</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <FaShieldAlt className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Trust & Safety</h3>
              <p className="opacity-90">We prioritize the safety and security of our customers above everything else.</p>
            </div>
            <div className="text-center">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <FaHeart className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Passion</h3>
              <p className="opacity-90">Our love for motorcycles and travel drives us to deliver exceptional experiences.</p>
            </div>
            <div className="text-center">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <FaUsers className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Community</h3>
              <p className="opacity-90">We believe in building lasting relationships with our customers and partners.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}