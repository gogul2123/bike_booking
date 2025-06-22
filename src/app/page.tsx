// // components/LandingPage.tsx (Main component)
'use client';

import React, { useState } from 'react';
import HeroSection from '../components/landing/heroSection';
import BookingSection from '../components/landing/bookingSection';
import BikeCategoriesSection from '../components/landing/bikeCatSection';
import FeaturesSection from '../components/landing/featuresSection';
import StepsSection from '../components/landing/stepsSection';
import ReviewsSection from '../components/landing/reviewsSection';
import CTASection from '../components/landing/CTASection';
import { FaShieldAlt, FaClock, FaWrench, FaHeadphones } from 'react-icons/fa';

interface SearchData {
  city: string;
  pickupDate: string;
  pickupTime: string;
  dropoffDate: string;
  dropoffTime: string;
}

const LandingPage = () => {
  const [searchData, setSearchData] = useState<SearchData>({
    city: '',
    pickupDate: '',
    pickupTime: '',
    dropoffDate: '',
    dropoffTime: ''
  });

  const bikeCategories = [
  {
    name: 'Sports Bikes',
    image: '/bikeImg/landing/ktm_RC.jpg',
    models: ['Yamaha R15', 'KTM RC 200', 'Bajaj Pulsar RS'],
    startingPrice: '₹800/day'
  },
  {
    name: 'Cruiser Bikes',
    image: '/bikeImg/landing/Classic350.jpg',
    models: ['Royal Enfield Classic', 'Bajaj Avenger', 'Harley Davidson'],
    startingPrice: '₹1200/day'
  },
  {
    name: 'Commuter Bikes',
    image: '/bikeImg/landing/hondaActive.jpg',
    models: ['Honda Activa', 'TVS Jupiter', 'Bajaj Platina'],
    startingPrice: '₹400/day'
  },
  {
    name: 'Adventure Bikes',
    image: '/bikeImg/landing/Royal_Enfield_Himalayan.jpg',
    models: ['Royal Enfield Himalayan', 'KTM Adventure', 'BMW GS'],
    startingPrice: '₹1500/day'
  }
];

const features = [
  {
    icon: <FaShieldAlt />,
    title: 'Comprehensive Insurance',
    description: 'All bikes come with full insurance coverage for your peace of mind'
  },
  {
    icon: <FaHeadphones />,
    title: '24/7 Support',
    description: 'Round-the-clock customer support and roadside assistance'
  },
  {
    icon: <FaClock />,
    title: 'Easy Booking',
    description: 'Simple online booking with instant confirmation and flexible payment'
  },
  {
    icon: <FaWrench />,
    title: 'Well-Maintained Fleet',
    description: 'Regular maintenance and quality checks ensure safe rides'
  }
];

const steps = [
  {
    step: '01',
    title: 'Choose Your Bike',
    description: 'Browse our extensive collection and select your perfect ride'
  },
  {
    step: '02',
    title: 'Book Online',
    description: 'Fill in your details and confirm your booking instantly'
  },
  {
    step: '03',
    title: 'Pick Up',
    description: 'Collect your bike from our convenient locations'
  },
  {
    step: '04',
    title: 'Ride & Enjoy',
    description: 'Hit the road and create unforgettable memories'
  }
];

  const handleSearch = () => {
    console.log('Search data:', searchData);
  };

  const handleInputChange = (field: keyof SearchData, value: string) => {
    setSearchData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <BookingSection 
        searchData={searchData}
        onInputChange={handleInputChange}
        onSearch={handleSearch}
      />
      <BikeCategoriesSection categories={bikeCategories} />
      <FeaturesSection features={features} />
      <StepsSection steps={steps} />
      <ReviewsSection speed="normal"  />
      <CTASection />
    </div>
  );
};

export default LandingPage;