
'use client';
import React, { useState } from 'react';
import SidebarMenu from '@/components/profile/SidebarMenu';
import ProfileTab from '@/components/profile/ProfileTab';
import PaymentHistory from '@/components/profile/PaymentHistory';
import MyBookings from '@/components/profile/MyBookings';
import MobileTopNav from '@/components/profile/MobiletopNav';

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderTab = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileTab />;
      case 'mybookings':  
        return <MyBookings />;
      case 'payments':
        return <PaymentHistory />;
      default:
        return <ProfileTab />;
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Mobile Bottom Navigation - Only visible on mobile */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50">
        <MobileTopNav 
          activeTab={activeTab} 
          setActiveTab={setActiveTab}
        />
      </div>

      {/* Sidebar - Hidden on mobile, visible on desktop */}
      <div className="hidden md:block w-64 flex-shrink-0">
        <SidebarMenu 
          activeTab={activeTab} 
          setActiveTab={setActiveTab}
          isOpen={false}
          setIsOpen={setSidebarOpen}
        />
      </div>

      {/* Mobile Sidebar - Only shown when menu is open */}
      <div className="md:hidden">
        <SidebarMenu 
          activeTab={activeTab} 
          setActiveTab={setActiveTab}
          isOpen={sidebarOpen}
          setIsOpen={setSidebarOpen}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-6 pb-20 md:pb-6">
        {renderTab()}
      </div>
    </div>
  );
};

export default ProfilePage;