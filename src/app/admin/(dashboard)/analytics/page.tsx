// src/app/admin/analytics/page.tsx
'use client';

import React, { useState } from 'react';
import { TrendingUp, Users, DollarSign, ShoppingCart, Calendar, Download } from 'lucide-react';

const MetricCard = ({ 
  title, 
  value, 
  change, 
  changeType, 
  icon 
}: { 
  title: string; 
  value: string; 
  change: string; 
  changeType: 'positive' | 'negative'; 
  icon: React.ReactNode;
}) => (
  <div className="bg-white rounded-lg shadow p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        <div className="flex items-center mt-2">
          <span className={`text-sm font-medium ${
            changeType === 'positive' ? 'text-green-600' : 'text-red-600'
          }`}>
            {change}
          </span>
          <span className="text-sm text-gray-500 ml-2">vs last period</span>
        </div>
      </div>
      <div className={`p-3 rounded-full ${
        changeType === 'positive' ? 'bg-green-50' : 'bg-red-50'
      }`}>
        {icon}
      </div>
    </div>
  </div>
);

export default function AdminAnalytics() {
  const [dateRange, setDateRange] = useState('7d');

  const metrics = [
    {
      title: 'Total Revenue',
      value: '$124,563',
      change: '+12.5%',
      changeType: 'positive' as const,
      icon: <DollarSign className="w-6 h-6 text-green-600" />
    },
    {
      title: 'Active Users',
      value: '8,549',
      change: '+8.2%',
      changeType: 'positive' as const,
      icon: <Users className="w-6 h-6 text-blue-600" />
    },
    {
      title: 'Orders',
      value: '2,341',
      change: '-2.4%',
      changeType: 'negative' as const,
      icon: <ShoppingCart className="w-6 h-6 text-purple-600" />
    },
    {
      title: 'Conversion Rate',
      value: '3.2%',
      change: '+0.8%',
      changeType: 'positive' as const,
      icon: <TrendingUp className="w-6 h-6 text-orange-600" />
    }
  ];

  const chartData = [
    { name: 'Mon', revenue: 4000, users: 240 },
    { name: 'Tue', revenue: 3000, users: 139 },
    { name: 'Wed', revenue: 5000, users: 280 },
    { name: 'Thu', revenue: 4500, users: 390 },
    { name: 'Fri', revenue: 6000, users: 480 },
    { name: 'Sat', revenue: 5500, users: 380 },
    { name: 'Sun', revenue: 7000, users: 430 }
  ];

  const topPages = [
    { page: '/dashboard', views: 12543, bounce: '32%' },
    { page: '/products', views: 8932, bounce: '28%' },
    { page: '/about', views: 5421, bounce: '45%' },
    { page: '/contact', views: 3210, bounce: '52%' },
    { page: '/blog', views: 2876, bounce: '38%' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-600">Track your performance and insights</p>
        </div>
        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-gray-500" />
            <select 
              value={dateRange} 
              onChange={(e) => setDateRange(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="24h">Last 24 hours</option>
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
            </select>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Revenue Trend</h2>
            <div className="flex space-x-2">
              <span className="inline-flex items-center px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
                Revenue
              </span>
            </div>
          </div>
          <div className="h-64 flex items-end justify-between space-x-2">
            {chartData.map((data, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div 
                  className="w-full bg-blue-500 rounded-t"
                  style={{ height: `${(data.revenue / 7000) * 200}px` }}
                ></div>
                <span className="text-xs text-gray-500 mt-2">{data.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Users Chart */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">User Activity</h2>
            <div className="flex space-x-2">
              <span className="inline-flex items-center px-2 py-1 text-xs bg-green-100 text-green-800 rounded">
                Users
              </span>
            </div>
          </div>
          <div className="h-64 flex items-end justify-between space-x-2">
            {chartData.map((data, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div 
                  className="w-full bg-green-500 rounded-t"
                  style={{ height: `${(data.users / 480) * 200}px` }}
                ></div>
                <span className="text-xs text-gray-500 mt-2">{data.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Pages Table */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Top Pages</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Page
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Views
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Bounce Rate
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Performance
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {topPages.map((page, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{page.page}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{page.views.toLocaleString()}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{page.bounce}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${100 - parseInt(page.bounce)}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600">{100 - parseInt(page.bounce)}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}