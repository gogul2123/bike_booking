// components/SidebarMenu.tsx
'use client';
import React from 'react';
import { User, CreditCard, Bike, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

// SidebarMenu Component
const SidebarMenu: React.FC<SidebarProps> = ({ activeTab, setActiveTab, isOpen, setIsOpen }) => {
  return (
    <>
      
      {/* Sidebar */}
      <div className={`
        fixed md:relative md:translate-x-0 transition-transform duration-300 ease-in-out    
        w-64 bg-gray-100 border-r p-4 space-y-4 h-full
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        
        <button
          className={`flex items-center gap-2 w-full px-4 py-2 rounded-lg ${activeTab === 'profile' ? 'bg-gradient-to-r from-[#AC9456] to-[#D4B76A] text-white hover:from-[#9B8449] hover:to-[#C4A659] transform hover:scale-105  shadow-lg hover:shadow-xl group/btn' : 'hover:bg-gray-200'}`}
          onClick={() => {
            setActiveTab('profile');
            setIsOpen(false);
          }}
        >
          <User size={18} /> Profile
        </button>
        <button
          className={`flex items-center gap-2 w-full px-4 py-2 rounded-lg ${activeTab === 'mybookings' ? 'bg-gradient-to-r from-[#AC9456] to-[#D4B76A] text-white hover:from-[#9B8449] hover:to-[#C4A659] transform hover:scale-105  shadow-lg hover:shadow-xl group/btn' : 'hover:bg-gray-200'}`}
          onClick={() => {
            setActiveTab('mybookings');
            setIsOpen(false);
          }}
        >
          <Bike size={18} /> My Bookings
        </button>
        <button
          className={`flex items-center gap-2 w-full px-4 py-2 rounded-lg ${activeTab === 'payments' ? 'bg-gradient-to-r from-[#AC9456] to-[#D4B76A] text-white hover:from-[#9B8449] hover:to-[#C4A659] transform hover:scale-105  shadow-lg hover:shadow-xl group/btn' : 'hover:bg-gray-200'}`}
          onClick={() => {
            setActiveTab('payments');
            setIsOpen(false);
          }}
        >
          <CreditCard size={18} /> Payment History
        </button>
      </div>
    </>
  );
};

export default SidebarMenu;