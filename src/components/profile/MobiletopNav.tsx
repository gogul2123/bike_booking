
'use client';
import React from 'react';
import { User, CreditCard, Bike } from 'lucide-react';

interface MobileTopNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const MobileTopNav: React.FC<MobileTopNavProps> = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'profile', icon: User, label: 'Profile' },
    { id: 'mybookings', icon: Bike, label: 'Bookings' },
    { id: 'payments', icon: CreditCard, label: 'Payments' },
  ];

  return (
    <div className="bg-white border-t border-gray-200 shadow-lg">
      {/* Progress indicator */}
      <div className="relative h-1 bg-gray-100">
        <div 
          className="absolute top-0 h-full bg-gradient-to-r from-[#AC9456] to-[#D4B76A] transition-all duration-300 ease-in-out rounded-full"
          style={{
            width: '33.33%',
            left: activeTab === 'profile' ? '0%' : activeTab === 'mybookings' ? '33.33%' : '66.66%'
          }}
        />
      </div>
      
      <div className="flex justify-around items-center py-3 px-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-200 min-w-[60px] ${
                isActive 
                  ? 'text-[#AC9456] bg-gradient-to-b from-[#AC9456]/10 to-[#D4B76A]/10' 
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Icon 
                size={20} 
                className={`mb-1 transition-transform duration-200 ${
                  isActive ? 'scale-110' : 'hover:scale-105'
                }`} 
              />
              <span className={`text-xs font-medium ${
                isActive ? 'text-[#AC9456]' : 'text-gray-500'
              }`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MobileTopNav;