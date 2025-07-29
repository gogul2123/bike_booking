
import React, { useState, useEffect } from 'react';
import { FaCheckCircle } from 'react-icons/fa';

interface Review {
  name: string;
  location: string;
  rating: number;
  comment: string;
  avatar?: string;
}

interface ReviewsSectionProps {
  reviews?: Review[];
  speed?: 'slow' | 'normal' | 'fast' | number;
  className?: string;
}

const ReviewsSection: React.FC<ReviewsSectionProps> = ({ 
  reviews = [], 
  speed = 'normal',
  className = ''
}) => {
  const [currentStartIndex, setCurrentStartIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Sample data for demonstration
  const sampleReviews: Review[] = [
    {
      name: 'Arjun Kumar',
      location: 'Chennai',
      rating: 5,
      comment: 'Amazing service! The bike was in perfect condition and the staff was very helpful. I rented a Royal Enfield for a weekend trip to Mahabalipuram and it was an incredible experience. The bike was well-maintained, fuel-efficient, and perfect for long rides. The booking process was seamless through their app, and the customer support team was available 24/7 to help with any queries.',
    },
    {
      name: 'Priya Sharma',
      location: 'Coimbatore',
      rating: 5,
      comment: 'Best bike rental experience. Clean bikes, fair pricing, and excellent customer service. I needed a bike for my office commute for a month and they provided me with a Honda Activa that was in pristine condition. The maintenance team regularly checked the bike and ensured everything was working perfectly. Highly recommend for both short-term and long-term rentals.',
    },
    {
      name: 'Rajesh Patel',
      location: 'Madurai',
      rating: 5,
      comment: 'Highly recommend! The booking process was smooth and the bike exceeded my expectations. I booked a Yamaha FZ for a solo trip across Tamil Nadu and it was the best decision I made. The bike performed exceptionally well on highways and city roads alike. The pickup and drop services were punctual and the staff was very professional.',
    },
    {
      name: 'Sneha Reddy',
      location: 'Bangalore',
      rating: 4,
      comment: 'Great bikes and reasonable prices. The pickup and drop service made it very convenient. I used their service for a corporate event where we needed multiple bikes for our team outing. They provided us with different types of bikes based on our preferences and all were in excellent condition. The group booking discount was also quite attractive.',
    },
    {
      name: 'Vikram Singh',
      location: 'Hyderabad',
      rating: 5,
      comment: 'Excellent maintenance of bikes. Rode for 300km without any issues. Will definitely book again! The bike I rented was a Bajaj Pulsar and it handled beautifully on both city roads and highways. The GPS tracking feature gave me peace of mind and the emergency roadside assistance service is commendable. Their insurance coverage is comprehensive too.',
    },
    {
      name: 'Meera Nair',
      location: 'Kochi',
      rating: 5,
      comment: 'Professional service and well-maintained bikes. Perfect for exploring the city and nearby places. I rented a scooter for my vacation in Kerala and it was perfect for navigating through the narrow streets and exploring local markets. The fuel efficiency was impressive and the comfort level was excellent even for long rides.',
    },
    {
      name: 'Karthik Raman',
      location: 'Trichy',
      rating: 4,
      comment: 'Good quality bikes at affordable rates. Staff was courteous and explained everything clearly. The documentation process was quick and hassle-free. They accepted both online and offline payments which was very convenient. The bike I got was clean, well-serviced, and came with all necessary accessories including helmet and tool kit.',
    },
    {
      name: 'Deepika Iyer',
      location: 'Pondicherry',
      rating: 5,
      comment: 'Fantastic experience! The bike was fuel-efficient and perfect for our weekend getaway. We rented two bikes for our couple trip and both bikes were in excellent condition. The French Quarter exploration was amazing on these bikes. The staff even provided us with route suggestions and local tips for our trip.',
    },
    {
      name: 'Arun Krishnan',
      location: 'Vellore',
      rating: 5,
      comment: 'Outstanding service! Quick booking process and the bike was delivered on time as promised. I needed a bike urgently for a family emergency and they delivered it to my doorstep within 2 hours. The bike was well-maintained and fuel-ready. Their customer service team followed up to ensure everything was satisfactory.',
    },
    {
      name: 'Kavya Menon',
      location: 'Thrissur',
      rating: 4,
      comment: 'Very satisfied with the service. Clean bikes, transparent pricing, and friendly staff. The mobile app is user-friendly and makes booking very convenient. I appreciate their flexible rental plans - from hourly to monthly options. The damage protection policy is fair and transparent. Will definitely use their service again for future trips.',
    }
  ];

  const displayReviews = reviews.length > 0 ? reviews : sampleReviews;
  
  // Triple the reviews for seamless infinite scroll (desktop only)
  const infiniteReviews = [...displayReviews, ...displayReviews, ...displayReviews];

  // Calculate animation duration based on speed prop
  const getAnimationDuration = () => {
    switch (speed) {
      case 'slow':
        return 60;
      case 'normal':
        return 45;
      case 'fast':
        return 25;
      default:
        return typeof speed === 'number' ? speed : 45;
    }
  };

  const animationDuration = getAnimationDuration();

  // Handle view all reviews for mobile
  const handleViewAllReviews = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentStartIndex((prev) => (prev + 1) % displayReviews.length);
      setIsAnimating(false);
    }, 300);
  };

  // Get current reviews for mobile display (4 reviews with smooth rotation)
  const getCurrentMobileReviews = () => {
    const result = [];
    for (let i = 0; i < 4; i++) {
      result.push(displayReviews[(currentStartIndex + i) % displayReviews.length]);
    }
    return result;
  };

  // Open review modal
  const openReviewModal = (review: Review) => {
    setSelectedReview(review);
    setIsModalOpen(true);
  };

  // Close review modal
  const closeReviewModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedReview(null), 300);
  };

  // Generate star rating component
  const StarRating: React.FC<{ rating: number; size?: 'sm' | 'default' | 'large' }> = ({ rating, size = 'default' }) => {
    const starSize = size === 'sm' ? 'w-3 h-3' : size === 'large' ? 'w-6 h-6' : 'w-4 h-4';
    
    return (
      <div className={`flex items-center space-x-1 ${size === 'sm' ? 'mb-2' : size === 'large' ? 'mb-6' : 'mb-4'}`} role="img" aria-label={`${rating} out of 5 stars`}>
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`${starSize} transition-colors duration-300 ${
              i < rating 
                ? 'text-yellow-400 group-hover:text-yellow-500' 
                : 'text-gray-200'
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  // Generate avatar with initials
  const Avatar: React.FC<{ name: string; size?: 'sm' | 'default' | 'large' }> = ({ name, size = 'default' }) => {
    const avatarSize = size === 'sm' ? 'w-8 h-8 text-xs' : size === 'large' ? 'w-16 h-16 text-lg' : 'w-12 h-12 text-sm';
    
    return (
      <div className={`${avatarSize} bg-gradient-to-br from-[#AC9456] to-[#D4B76A] rounded-full flex items-center justify-center text-white font-semibold shadow-lg group-hover:shadow-xl transition-shadow duration-300 flex-shrink-0`}>
        {name.split(' ').map(n => n.charAt(0)).join('').toUpperCase().slice(0, 2)}
      </div>
    );
  };

  // Truncate text function
  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
  };

  return (
    <>
      <section className={`py-12 sm:py-16 bg-gradient-to-br from-gray-50 to-white overflow-hidden ${className}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-block">
                <div className="mb-4 sm:mb-6">
                  <span className="inline-flex items-center px-4 py-2 rounded-full text-xs sm:text-sm font-semibold text-[#AC9456] bg-[#AC9456]/10 border border-[#AC9456]/20 uppercase tracking-wider">
                    <FaCheckCircle className="w-3 h-3 mr-2" />
                   Testimonials
                  </span>
                </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                What Our Customers Say
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-[#AC9456] to-[#D4B76A] mx-auto mb-4 rounded-full"></div>
            </div>

            {/* Show only on mobile */}
            <p className="block sm:hidden text-base text-gray-600 max-w-2xl mx-auto px-4">
              Don't just take our word for it – hear from our happy riders!
            </p>

            {/* Optional: Show different text on tablet/desktop */}
            <p className="hidden sm:block text-xl text-gray-600 max-w-2xl mx-auto">
              Hear what our satisfied customers have to say about their biking experiences with us.
            </p>
          </div>


          {/* Mobile: Animated Grid Layout */}
          <div className="block sm:hidden">
            <div className={`space-y-4 mb-6 transition-all duration-300 ${isAnimating ? 'opacity-0 transform translate-y-4' : 'opacity-100 transform translate-y-0'}`}>
              {getCurrentMobileReviews().map((review, index) => (
                <div 
                  key={`mobile-${review.name}-${currentStartIndex}-${index}`} 
                  className="bg-white rounded-xl p-4 shadow-md border border-gray-100 group cursor-pointer hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]"
                  onClick={() => openReviewModal(review)}
                >
                  {/* Mobile Compact Layout */}
                  <div className="flex items-start space-x-3">
                    <Avatar name={review.name} size="sm" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <div className="min-w-0 flex-1">
                          <p className="font-semibold text-gray-900 text-sm truncate">
                            {review.name}
                          </p>
                          <p className="text-xs text-gray-500 truncate">
                            {review.location}
                          </p>
                        </div>
                        <StarRating rating={review.rating} size="sm" />
                      </div>
                      <blockquote className="text-gray-600 text-sm leading-relaxed">
                        "{truncateText(review.comment, 80)}"
                      </blockquote>
                      <p className="text-xs text-[#AC9456] mt-2 font-medium">Tap to read more</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile Trust Indicators */}
            <div className="bg-gradient-to-r from-[#AC9456]/10 to-[#D4B76A]/10 rounded-xl p-4 border border-[#AC9456]/20 mb-6">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-lg font-bold text-[#AC9456]">4.8★</div>
                  <div className="text-xs text-gray-600">Avg Rating</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-[#AC9456]">5000+</div>
                  <div className="text-xs text-gray-600">Reviews</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-[#AC9456]">98%</div>
                  <div className="text-xs text-gray-600">Recommend</div>
                </div>
              </div>
            </div>

            {/* Mobile CTA */}
            <div className="text-center">
              <button 
                onClick={handleViewAllReviews}
                disabled={isAnimating}
                className="bg-gradient-to-r from-[#AC9456] to-[#D4B76A] text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 transform active:scale-95 shadow-lg text-sm disabled:opacity-70 hover:shadow-xl"
              >
                {isAnimating ? 'Loading...' : 'View More Reviews'}
              </button>
            </div>
          </div>

          {/* Desktop: Infinite Scroll Container */}
          <div className="hidden sm:block relative">
            {/* Gradient overlays for smooth edges */}
            <div className="absolute -left-25 top-0 w-32 h-full bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute -right-25 top-0 w-32 h-full bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none"></div>

            <div
              className="flex"
              style={{ 
                animation: `scroll-infinite ${animationDuration}s linear infinite`,
                width: 'fit-content'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.animationPlayState = 'paused';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.animationPlayState = 'running';
              }}
            >
              {infiniteReviews.map((review, index) => (
                <div 
                  key={`desktop-${review.name}-${index}`} 
                  className="flex-shrink-0 w-80 mx-4 group cursor-pointer"
                  onClick={() => openReviewModal(review)}
                >
                  <div className="flex flex-col bg-white rounded-2xl p-6 h-full shadow-md hover:shadow-xl transition-all duration-500 transform hover:scale-105 hover:bg-gradient-to-br hover:from-white hover:to-gray-50 border border-gray-100 hover:border-blue-200">
                    {/* Rating Stars */}
                    <div>
                      <StarRating rating={review.rating} />
                    
                      {/* Review Comment */}
                      <blockquote className="text-gray-600 mb-6 italic text-sm leading-relaxed group-hover:text-gray-700 transition-colors duration-300 min-h-[3rem]">
                        "{truncateText(review.comment, 120)}"
                      </blockquote>
                    </div>
                    
                    {/* Reviewer Info */}
                    <div className="flex items-center space-x-3 mt-auto group-hover:opacity-100 transition-opacity duration-300">
                      <Avatar name={review.name} />
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-gray-900 text-sm group-hover:text-blue-600 transition-colors duration-300 truncate">
                          {review.name}
                        </p>
                        <p className="text-xs text-gray-500 group-hover:text-gray-600 transition-colors duration-300 truncate">
                          {review.location}
                        </p>
                      </div>
                    </div>
                    {/* <p className="text-xs text-[#AC9456] mt-2 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">Click to read full review</p> */}
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Trust Section */}
            <div className="mt-12 text-center">
              <div className="inline-flex items-center space-x-8 text-sm text-gray-500">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span>4.8★ Average Rating</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>5000+ Reviews</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>98% Recommendation Rate</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes scroll-infinite {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-33.333%);
            }
          }
        `}</style>
      </section>

      {/* Review Detail Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div
            className={`bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto transition-all duration-300 transform ${
              isModalOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
            }`}
          >
            {selectedReview && (
              <div className="p-6">
                {/* Modal Header */}
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">Customer Review</h3>
                  <button
                    onClick={closeReviewModal}
                    className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors duration-200"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Reviewer Info */}
                <div className="flex items-center space-x-4 mb-6">
                  <Avatar name={selectedReview.name} size="large" />
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">{selectedReview.name}</h4>
                    <p className="text-gray-500">{selectedReview.location}</p>
                  </div>
                </div>

                {/* Rating */}
                <StarRating rating={selectedReview.rating} size="large" />

                {/* Full Review */}
                <blockquote className="text-gray-700 leading-relaxed text-base mb-6">
                  "{selectedReview.comment}"
                </blockquote>

                {/* Modal Footer */}
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={closeReviewModal}
                    className="px-6 py-2 text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  >
                    Close
                  </button>
                  <button className="px-6 py-2 bg-gradient-to-r from-[#AC9456] to-[#D4B76A] text-white rounded-lg hover:shadow-lg transition-all duration-200 transform hover:scale-105">
                    Book Now
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ReviewsSection;