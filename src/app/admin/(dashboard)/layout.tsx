// src/app/admin/(dashboard)/layout.tsx
'use client';

import React, { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Menu, X, ChevronDown, User, LogOut, Home, Users, Settings, BarChart3 } from 'lucide-react';
import { RiUserStarFill } from 'react-icons/ri';

interface MenuItem {
  icon: React.ReactNode;
  label: string;
  href: string;
}

const menuItems: MenuItem[] = [
  { icon: <Home className="w-5 h-5" />, label: 'Dashboard', href: '/admin/dashboard' },
  { icon: <RiUserStarFill className="w-5 h-5" />, label: 'Admin', href: '/admin/admin' },
  { icon: <Users className="w-5 h-5" />, label: 'Users', href: '/admin/users' },
  { icon: <BarChart3 className="w-5 h-5" />, label: 'Analytics', href: '/admin/analytics' },
  { icon: <Settings className="w-5 h-5" />, label: 'Settings', href: '/admin/settings' },
];

const Header = ({ onMenuClick, isSidebarOpen, onSignOut }: { 
  onMenuClick: () => void; 
  isSidebarOpen: boolean;
  onSignOut: () => void;
}) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between relative z-40">
      {/* Left side - Menu button */}
      <div className="flex items-center">
        <button
          onClick={onMenuClick}
          className="p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 lg:hidden"
        >
          {isSidebarOpen ? (
            <X className="w-6 h-6 text-gray-600" />
          ) : (
            <Menu className="w-6 h-6 text-gray-600" />
          )}
        </button>
        <h1 className="ml-4 text-xl font-semibold text-gray-800 hidden sm:block">
          Admin Dashboard
        </h1>
      </div>

      {/* Right side - Profile dropdown */}
      <div className="relative">
        {/* Desktop Profile Dropdown */}
        <div className="hidden md:block">
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">A</span>
            </div>
            <span className="text-gray-700 font-medium">Admin</span>
            <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Desktop Dropdown Menu */}
          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1">
              <div className="px-4 py-2 border-b border-gray-100">
                <p className="text-sm text-gray-900 font-medium">Admin User</p>
                <p className="text-sm text-gray-500">admin@example.com</p>
              </div>
              <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span>Profile</span>
              </button>
              <button 
                onClick={onSignOut}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign out</span>
              </button>
            </div>
          )}
        </div>

        {/* Mobile Profile Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <span className="text-white text-sm font-medium">A</span>
          </button>
        </div>
      </div>

      {/* Mobile Profile Dropdown Overlay */}
      {isProfileOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black bg-opacity-50" onClick={() => setIsProfileOpen(false)}>
          <div className="absolute right-4 top-16 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
            <div className="px-4 py-3 border-b border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-medium">A</span>
                </div>
                <div>
                  <p className="text-gray-900 font-medium">Admin User</p>
                  <p className="text-sm text-gray-500">admin@example.com</p>
                </div>
              </div>
            </div>
            <div className="py-2">
              <button className="w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-100 flex items-center space-x-3">
                <User className="w-5 h-5" />
                <span>Profile</span>
              </button>
              <button 
                onClick={onSignOut}
                className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 flex items-center space-x-3"
              >
                <LogOut className="w-5 h-5" />
                <span>Sign out</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

const Sidebar = ({ isOpen }: { isOpen: boolean }) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleNavigation = (href: string) => {
    router.push(href);
  };

  const isActiveRoute = (href: string) => {
    return pathname === href;
  };
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm lg:hidden" />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 z-30 h-full w-64 bg-gray-900 transform transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:inset-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          {/* Logo/Brand */}
          <div className="flex items-center justify-center h-16 bg-gray-800 border-b border-gray-700">
            <h2 className="text-white text-lg font-bold">Admin Panel</h2>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={() => handleNavigation(item.href)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 group text-left ${
                  isActiveRoute(item.href)
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <span className={`transition-colors ${
                  isActiveRoute(item.href) ? 'text-white' : 'text-gray-400 group-hover:text-white'
                }`}>
                  {item.icon}
                </span>
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">A</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">Admin</p>
                <p className="text-xs text-gray-400 truncate">admin@example.com</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Close sidebar when clicking outside on mobile
  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  // Handle sign out
  const handleSignOut = () => {
    // Add your sign out logic here
    console.log('Signing out...');
    // router.push('/admin/login');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        {/* Header */}
        <Header onMenuClick={toggleSidebar} isSidebarOpen={isSidebarOpen} onSignOut={handleSignOut} />

        {/* Page Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile sidebar overlay click handler */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-20 lg:hidden" 
          onClick={closeSidebar}
        />
      )}
    </div>
  );
}