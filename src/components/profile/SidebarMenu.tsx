

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

const SidebarMenu: React.FC<SidebarProps> = ({ activeTab, setActiveTab, isOpen, setIsOpen }) => {
  return (
    <>
      {/* Sidebar */}
      <div className={`
        fixed md:relative md:translate-x-0 transition-transform duration-300 ease-in-out    
        w-64 bg-gray-100 border-r p-4 space-y-4 h-full z-50
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        {/* Close button for mobile */}
        <div className="md:hidden flex justify-end mb-4">
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-gray-200 rounded-lg"
          >
            <X size={20} />
          </button>
        </div>
        
        <button
          className={`flex items-center gap-2 w-full px-4 py-2 rounded-lg transition-all duration-200 ${
            activeTab === 'profile' 
              ? 'bg-gradient-to-r from-[#AC9456] to-[#D4B76A] text-white hover:from-[#9B8449] hover:to-[#C4A659] transform hover:scale-105 shadow-lg hover:shadow-xl' 
              : 'hover:bg-gray-200'
          }`}
          onClick={() => {
            setActiveTab('profile');
            setIsOpen(false);
          }}
        >
          <User size={18} /> Profile
        </button>
        
        <button
          className={`flex items-center gap-2 w-full px-4 py-2 rounded-lg transition-all duration-200 ${
            activeTab === 'mybookings' 
              ? 'bg-gradient-to-r from-[#AC9456] to-[#D4B76A] text-white hover:from-[#9B8449] hover:to-[#C4A659] transform hover:scale-105 shadow-lg hover:shadow-xl' 
              : 'hover:bg-gray-200'
          }`}
          onClick={() => {
            setActiveTab('mybookings');
            setIsOpen(false);
          }}
        >
          <Bike size={18} /> My Bookings
        </button>
        
        <button
          className={`flex items-center gap-2 w-full px-4 py-2 rounded-lg transition-all duration-200 ${
            activeTab === 'payments' 
              ? 'bg-gradient-to-r from-[#AC9456] to-[#D4B76A] text-white hover:from-[#9B8449] hover:to-[#C4A659] transform hover:scale-105 shadow-lg hover:shadow-xl' 
              : 'hover:bg-gray-200'
          }`}
          onClick={() => {
            setActiveTab('payments');
            setIsOpen(false);
          }}
        >
          <CreditCard size={18} /> Payment History
        </button>
      </div>

      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default SidebarMenu;