// // components/FeaturesSection.tsx
// import React from 'react';

// interface Feature {
//   icon: string;
//   title: string;
//   description: string;
// }

// interface FeaturesSectionProps {
//   features: Feature[];
// }

// const FeaturesSection: React.FC<FeaturesSectionProps> = ({ features }) => {
//   return (
//     <section className="py-16 bg-white">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center mb-12">
//           <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Why Choose Us</h2>
//           <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//             Experience the difference with our premium service and commitment to excellence
//           </p>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
//           {features.map((feature, index) => (
//             <div key={index} className="text-center p-6 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
//               <div className="inline-flex items-center justify-center w-16 h-16 bg-[#AC9456] text-white rounded-full mb-4 text-2xl">
//                 {feature.icon}
//               </div>
//               <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
//               <p className="text-gray-600">{feature.description}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default FeaturesSection;

// components/FeaturesSection.tsx
import React from 'react';

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface FeaturesSectionProps {
  features: Feature[];
}

const FeaturesSection: React.FC<FeaturesSectionProps> = ({ features }) => {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block">
            <span className="text-sm font-semibold text-[#AC9456] uppercase tracking-wider mb-2 block">
              Our Promise
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Why Choose Us
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#AC9456] to-[#D4B76A] mx-auto mb-6 rounded-full"></div>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Experience the difference with our premium service and commitment to excellence
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="group text-center p-8 rounded-2xl bg-white hover:bg-gradient-to-br hover:from-gray-50 hover:to-white shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 bg-[#141414] text-white rounded-full mb-6 text-2xl group-hover:scale-110 group-hover:bg-gradient-to-br group-hover:from-[#141414] group-hover:to-[#2a2a2a] transition-all duration-300 shadow-lg group-hover:shadow-xl">
                {feature.icon}
              </div>
              <div className="mb-4">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#AC9456] transition-colors duration-300">
                  {feature.title}
                </h3>
                <div className="w-12 h-0.5 bg-[#AC9456] rounded-full mx-auto transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              </div>
              <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;