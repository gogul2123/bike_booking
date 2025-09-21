// src/app/admin/(dashboard)/dashboard/page.tsx
import React from 'react';
import { Users, TrendingUp, ShoppingCart, DollarSign } from 'lucide-react';

const StatsCard = ({ 
  title, 
  value, 
  icon, 
  change, 
  changeType 
}: { 
  title: string; 
  value: string; 
  icon: React.ReactNode; 
  change: string; 
  changeType: 'positive' | 'negative';
}) => (
  <div className="bg-white rounded-lg shadow p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
      <div className="p-3 bg-blue-50 rounded-full">
        {icon}
      </div>
    </div>
    <div className="mt-4 flex items-center">
      <span className={`text-sm font-medium ${
        changeType === 'positive' ? 'text-green-600' : 'text-red-600'
      }`}>
        {change}
      </span>
      <span className="text-sm text-gray-500 ml-2">from last month</span>
    </div>
  </div>
);

export default function AdminDashboard() {
  const stats = [
    {
      title: 'Total Users',
      value: '2,543',
      icon: <Users className="w-6 h-6 text-blue-600" />,
      change: '+12.5%',
      changeType: 'positive' as const
    },
    {
      title: 'Revenue',
      value: '$45,231',
      icon: <DollarSign className="w-6 h-6 text-green-600" />,
      change: '+8.2%',
      changeType: 'positive' as const
    },
    {
      title: 'Orders',
      value: '1,234',
      icon: <ShoppingCart className="w-6 h-6 text-purple-600" />,
      change: '-2.4%',
      changeType: 'negative' as const
    },
    {
      title: 'Growth',
      value: '23.1%',
      icon: <TrendingUp className="w-6 h-6 text-orange-600" />,
      change: '+4.1%',
      changeType: 'positive' as const
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Users className="w-4 h-4 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">New user registered</p>
                <p className="text-sm text-gray-500">john@example.com joined 2 minutes ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <DollarSign className="w-4 h-4 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Payment received</p>
                <p className="text-sm text-gray-500">$250 payment from Order #1234</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <ShoppingCart className="w-4 h-4 text-purple-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">New order placed</p>
                <p className="text-sm text-gray-500">Order #1235 for $125</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}