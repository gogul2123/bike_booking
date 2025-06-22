// // components/ReviewsSection.tsx
// import React from 'react';

// interface Review {
//   name: string;
//   location: string;
//   rating: number;
//   comment: string;
//   avatar: string;
// }

// interface ReviewsSectionProps {
//   reviews: Review[];
// }

// const ReviewsSection: React.FC<ReviewsSectionProps> = ({ reviews }) => {
//   return (
//     <section className="py-16 bg-white">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center mb-12">
//           <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
//           <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//             Don't just take our word for it - hear from our satisfied customers
//           </p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {reviews.map((review, index) => (
//             <div key={index} className="bg-gray-50 rounded-xl p-6">
//               <div className="flex items-center space-x-1 mb-4">
//                 {[...Array(review.rating)].map((_, i) => (
//                   <span key={i} className="text-yellow-400 text-lg">⭐</span>
//                 ))}
//               </div>
//               <p className="text-gray-600 mb-4 italic">"{review.comment}"</p>
//               <div className="flex items-center space-x-3">
//                 <div className="w-10 h-10 bg-[#AC9456] rounded-full flex items-center justify-center text-white font-bold">
//                   {review.name.charAt(0)}
//                 </div>
//                 <div>
//                   <p className="font-semibold text-gray-900">{review.name}</p>
//                   <p className="text-sm text-gray-500">{review.location}</p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ReviewsSection;
import React from 'react';

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
  // Sample data for demonstration
  const sampleReviews: Review[] = [
    {
      name: 'Arjun Kumar',
      location: 'Chennai',
      rating: 5,
      comment: 'Amazing service! The bike was in perfect condition and the staff was very helpful.',
    },
    {
      name: 'Priya Sharma',
      location: 'Coimbatore',
      rating: 5,
      comment: 'Best bike rental experience. Clean bikes, fair pricing, and excellent customer service.',
    },
    {
      name: 'Rajesh Patel',
      location: 'Madurai',
      rating: 5,
      comment: 'Highly recommend! The booking process was smooth and the bike exceeded my expectations.',
    },
    {
      name: 'Sneha Reddy',
      location: 'Bangalore',
      rating: 4,
      comment: 'Great bikes and reasonable prices. The pickup and drop service made it very convenient.',
    },
    {
      name: 'Vikram Singh',
      location: 'Hyderabad',
      rating: 5,
      comment: 'Excellent maintenance of bikes. Rode for 300km without any issues. Will definitely book again!',
    },
    {
      name: 'Meera Nair',
      location: 'Kochi',
      rating: 5,
      comment: 'Professional service and well-maintained bikes. Perfect for exploring the city and nearby places.',
    },
    {
      name: 'Karthik Raman',
      location: 'Trichy',
      rating: 4,
      comment: 'Good quality bikes at affordable rates. Staff was courteous and explained everything clearly.',
    },
    {
      name: 'Deepika Iyer',
      location: 'Pondicherry',
      rating: 5,
      comment: 'Fantastic experience! The bike was fuel-efficient and perfect for our weekend getaway.',
    },
    {
      name: 'Arun Krishnan',
      location: 'Vellore',
      rating: 5,
      comment: 'Outstanding service! Quick booking process and the bike was delivered on time as promised.',
    },
    {
      name: 'Kavya Menon',
      location: 'Thrissur',
      rating: 4,
      comment: 'Very satisfied with the service. Clean bikes, transparent pricing, and friendly staff.',
    }
  ];

  const displayReviews = reviews.length > 0 ? reviews : sampleReviews;
  
  // Triple the reviews for seamless infinite scroll
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

  // Generate star rating component
  const StarRating: React.FC<{ rating: number }> = ({ rating }) => (
    <div className="flex items-center space-x-1 mb-4" role="img" aria-label={`${rating} out of 5 stars`}>
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 transition-colors duration-300 ${
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

  // Generate avatar with initials
  const Avatar: React.FC<{ name: string }> = ({ name }) => (
    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-lg group-hover:shadow-xl transition-shadow duration-300 flex-shrink-0">
      {name.split(' ').map(n => n.charAt(0)).join('').toUpperCase().slice(0, 2)}
    </div>
  );

  return (
    <section className={`py-16 bg-gradient-to-br from-gray-50 to-white overflow-hidden ${className}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it - hear from our satisfied customers
          </p>
        </div>

        {/* Infinite Scroll Container */}
        <div className="relative">
          {/* Gradient overlays for smooth edges */}
          {/* Left Gradient Overlay (hidden on small screens) */}
          <div className="hidden sm:block absolute -left-25 top-0 w-32 h-full bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none"></div>

          {/* Right Gradient Overlay (hidden on small screens) */}
          <div className="hidden sm:block absolute -right-25 top-0 w-32 h-full bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none"></div>

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
                key={`${review.name}-${index}`} 
                className="flex-shrink-0 w-80 mx-4 group cursor-pointer"
              >
                <div className="bg-white rounded-2xl p-6 h-full shadow-md hover:shadow-xl transition-all duration-500 transform hover:scale-105 hover:bg-gradient-to-br hover:from-white hover:to-gray-50 border border-gray-100 hover:border-blue-200">
                  {/* Rating Stars */}
                  <StarRating rating={review.rating} />
                  
                  {/* Review Comment */}
                  <blockquote className="text-gray-600 mb-6 italic text-sm leading-relaxed group-hover:text-gray-700 transition-colors duration-300 min-h-[3rem]">
                    "{review.comment}"
                  </blockquote>
                  
                  {/* Reviewer Info */}
                  <div className="flex items-center space-x-3 mt-auto">
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
                </div>
              </div>
            ))}
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
  );
};

export default ReviewsSection;