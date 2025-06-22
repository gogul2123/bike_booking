// // components/BikeCategoriesSection.tsx
// import React from 'react';

// interface BikeCategory {
//   name: string;
//   image: string;
//   models: string[];
//   startingPrice: string;
// }

// interface BikeCategoriesSectionProps {
//   categories: BikeCategory[];
// }

// const BikeCategoriesSection: React.FC<BikeCategoriesSectionProps> = ({ categories }) => {
//   return (
//     <section className="py-16 bg-gray-50">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center mb-12">
//           <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Top Bike Categories</h2>
//           <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//             Choose from our diverse fleet of well-maintained motorcycles
//           </p>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
//           {categories.map((category, index) => (
//             <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
//               <div className="relative h-48">
//                 <img
//                   src={category.image}
//                   alt={category.name}
//                   className="w-full h-full object-cover"
//                 />
//                 <div className="absolute top-4 right-4 bg-[#AC9456] text-white px-2 py-1 rounded-md text-sm font-semibold">
//                   {category.startingPrice}
//                 </div>
//               </div>
//               <div className="p-6">
//                 <h3 className="text-xl font-bold text-gray-900 mb-2">{category.name}</h3>
//                 <div className="space-y-1 mb-4">
//                   {category.models.map((model, idx) => (
//                     <p key={idx} className="text-sm text-gray-600">• {model}</p>
//                   ))}
//                 </div>
//                 <button className="w-full bg-[#AC9456] text-white py-2 rounded-lg hover:bg-[#9B8449] transition-colors">
//                   View Models
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default BikeCategoriesSection;


// components/BikeCategoriesSection.tsx
import React from 'react';
import { Button } from '../ui/button';

interface BikeCategory {
  name: string;
  image: string;
  models: string[];
  startingPrice: string;
}

interface BikeCategoriesSectionProps {
  categories: BikeCategory[];
}

const BikeCategoriesSection: React.FC<BikeCategoriesSectionProps> = ({ categories }) => {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block">
            <span className="text-sm font-semibold text-[#AC9456] uppercase tracking-wider mb-2 block">
              Premium Collection
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Top Bike Categories
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#AC9456] to-[#D4B76A] mx-auto mb-6 rounded-full"></div>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Choose from our diverse fleet of well-maintained motorcycles
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <div 
              key={index} 
              className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 border border-gray-100"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute top-4 right-4 bg-gradient-to-r from-[#AC9456] to-[#D4B76A] text-white px-3 py-2 rounded-full text-sm font-bold shadow-lg">
                  {category.startingPrice}
                </div>
              </div>
              
              <div className="p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#AC9456] transition-colors duration-300">
                    {category.name}
                  </h3>
                  <div className="w-12 h-0.5 bg-[#AC9456] rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                </div>
                
                <div className="space-y-2 mb-6">
                  {category.models.map((model, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-[#AC9456] rounded-full"></div>
                      <p className="text-sm text-gray-700 font-medium">{model}</p>
                    </div>
                  ))}
                </div>
              
                <Button 
                  variant="gold"
                  className='py-6 font-semibold text-md'
                >
                  <span className="flex items-center justify-center space-x-2">
                    <span>View Models</span>
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
              </div>
              
              {/* Top accent line */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#AC9456] to-[#D4B76A] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BikeCategoriesSection;