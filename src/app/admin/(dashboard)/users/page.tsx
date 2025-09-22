// src/app/users/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { Search, Plus, Edit, Trash2, Eye, MapPin, Phone, Users } from 'lucide-react';
import { User, UserFormData } from '@/components/adminUser/types/user';
import AddUserModal from '@/components/adminUser/modals/AddUserModal';
import EditUserModal from '@/components/adminUser/modals/EditUserModal';
import DeleteUserModal from '@/components/adminUser/modals/DeleteUserModal';
import Alert from "@/components/ui/alert";
import { useAlert } from '@/hooks/alertHook';
import { useAppContext } from '@/hooks/context';
import { mock } from 'node:test';


// const mockUsers: User[] = [
//   {
//     userId: "USR1757153689834000",
//     createdAt: { $date: "2025-01-06T10:14:49.835Z" },
//     updatedAt: { $date: "2025-01-06T10:14:49.835Z" },
//     role: "user",
//     status: "inactive",
//     email: "acee@gmail.com",
//     name: "Alice Cooper",
//     mobile: "7010562663",
//     address: {
//       street: "Sannathivayal St-1",
//       city: "Aranthangi",
//       state: "Tamil Nadu",
//       country: "India",
//       zipCode: "614616"
//     }
//   },
//   {
//     userId: "USR1757153689834001",
//     createdAt: { $date: "2025-01-05T08:30:15.123Z" },
//     updatedAt: { $date: "2025-01-05T08:30:15.123Z" },
//     role: "user",
//     status: "active",
//     email: "john.doe@gmail.com",
//     name: "John Doe",
//     mobile: "+1234567891",
//     address: {
//       street: "456 Oak Avenue",
//       city: "Los Angeles",
//       state: "CA",
//       country: "USA",
//       zipCode: "90210"
//     }
//   },
//   {
//     userId: "USR1757153689834002",
//     createdAt: { $date: "2025-01-04T15:45:30.456Z" },
//     updatedAt: { $date: "2025-01-04T15:45:30.456Z" },
//     role: "user",
//     status: "active",
//     email: "jane.smith@gmail.com",
//     name: "Jane Smith",
//     mobile: "+1234567892",
//     address: {
//       street: "789 Pine Road",
//       city: "Chicago",
//       state: "IL",
//       country: "USA",
//       zipCode: "60601"
//     }
//   },
//   {
//     userId: "USR1757153689834003",
//     createdAt: { $date: "2025-01-03T12:20:45.789Z" },
//     updatedAt: { $date: "2025-01-03T12:20:45.789Z" },
//     role: "user",
//     status: "inactive",
//     email: "mike.johnson@gmail.com",
//     name: "Mike Johnson",
//     mobile: "+1234567893",
//     address: {
//       street: "321 Elm Street",
//       city: "Miami",
//       state: "FL",
//       country: "USA",
//       zipCode: "33101"
//     }
//   },
//   {
//     userId: "USR1757153689834004",
//     createdAt: { $date: "2025-01-02T09:15:20.012Z" },
//     updatedAt: { $date: "2025-01-02T09:15:20.012Z" },
//     role: "user",
//     status: "active",
//     email: "sarah.wilson@gmail.com",
//     name: "Sarah Wilson",
//     mobile: "+1234567894",
//     address: {
//       street: "654 Maple Drive",
//       city: "Seattle",
//       state: "WA",
//       country: "USA",
//       zipCode: "98101"
//     }
//   },
//   {
//     userId: "USR1757153689834005",
//     createdAt: { $date: "2025-01-01T14:55:35.345Z" },
//     updatedAt: { $date: "2025-01-01T14:55:35.345Z" },
//     role: "user",
//     status: "active",
//     email: "david.brown@gmail.com",
//     name: "David Brown",
//     mobile: "+1234567895",
//     address: {
//       street: "987 Cedar Lane",
//       city: "Boston",
//       state: "MA",
//       country: "USA",
//       zipCode: "02101"
//     }
//   }
// ];

export default function UsersManagement() {
  const { alert, hideAlert, showAlert } = useAlert();
  const { URL } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<User[]>();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'All' | 'active' | 'inactive'>('All');
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 5;
  
  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Calculate statistics
  const totalUsers = users.length;
  const activeUsers = users.filter(user => user.status === 'active').length;
  const inactiveUsers = users.filter(user => user.status === 'inactive').length;

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.mobile.includes(searchTerm);
    const matchesStatus = filterStatus === 'All' || user.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterStatus]);

    const fetchUsers = async () => {
    setLoading(true);
    try {

      const response = await fetch(`${URL}user/get-all-users`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          }
        }
      );
      if(response.status === 200){
        const result = await response.json();
        setUsers(result?.data);
      }
      else if(response.status === 401){
        console.log("Unauthorized access");
      }
      else{
        console.log("Error fetching users");
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";
      showAlert(errorMessage, "error");
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleResetFilters = () => {
    setSearchTerm('');
    setFilterStatus('All');
    setCurrentPage(1);
  };

  const generateUserId = () => {
    return `USR${Date.now()}${Math.floor(Math.random() * 1000)}`;
  };

  const handleAddUser = (userData: UserFormData) => {
    const newUser: User = {
      userId: generateUserId(),
      ...userData,
      createdAt: {
        $date: new Date().toISOString()
      },
      updatedAt: {
        $date: new Date().toISOString()
      }
    };
    setUsers([...users, newUser]);
  };

  const handleEditUser = (userId: string, updatedData: Partial<User>) => {
    setUsers(users.map(user => 
      user.userId === userId ? { ...user, ...updatedData } : user
    ));
  };

  const handleDeleteUser = (userId: string) => {
    setUsers(users.filter(user => user.userId !== userId));
  };

  const openEditModal = (user: User) => {
    setSelectedUser(user);
    setShowEditModal(true);
  };

  const openDeleteModal = (user: User) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  const formatDate = (dateObj: { $date: string }) => {
    return new Date(dateObj.$date).toLocaleDateString();
  };

  const getFullAddress = (address: User['address']) => {
    const parts = [address.street, address.city, address.state, address.country].filter(Boolean);
    return parts.join(', ') || 'No address provided';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Users Management</h1>
          <p className="text-gray-600">Manage your users and their permissions</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add User</span>
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Users</p>
              <p className="text-2xl font-bold text-gray-900">{totalUsers}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Users</p>
              <p className="text-2xl font-bold text-gray-900">{activeUsers}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-lg">
              <Users className="w-6 h-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Inactive Users</p>
              <p className="text-2xl font-bold text-gray-900">{inactiveUsers}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search users by name, email, or mobile..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as 'All' | 'active' | 'inactive')}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <div>
            <button
              onClick={handleResetFilters}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Address
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Join Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedUsers.map((user) => (
                <tr key={user.userId} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-medium">
                          {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {user.name || 'No Name'}
                        </div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                        <div className="text-xs text-gray-400">ID: {user.userId}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      <div className="flex items-center">
                        <Phone className="w-4 h-4 text-gray-400 mr-2" />
                        {user.mobile || 'No mobile'}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 max-w-xs">
                      <div className="flex items-start">
                        <MapPin className="w-4 h-4 text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="truncate">{getFullAddress(user.address)}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatDate(user.createdAt)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button className="text-blue-600 hover:text-blue-900" title="View">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => openEditModal(user)}
                        className="text-yellow-600 hover:text-yellow-900"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => openDeleteModal(user)}
                        className="text-red-600 hover:text-red-900"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="bg-white px-6 py-3 flex items-center justify-between border-t border-gray-200 rounded-lg shadow">
        <div className="flex-1 flex justify-between sm:hidden">
          <button 
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <button 
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">{startIndex + 1}</span> to <span className="font-medium">{Math.min(endIndex, filteredUsers.length)}</span> of{' '}
              <span className="font-medium">{filteredUsers.length}</span> results
            </p>
          </div>
          <div>
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
              <button 
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              
              {/* Page Numbers */}
              {Array.from({ length: totalPages }, (_, index) => {
                const page = index + 1;
                const isCurrentPage = page === currentPage;
                
                // Show first page, last page, current page, and pages around current
                const showPage = page === 1 || page === totalPages || Math.abs(page - currentPage) <= 1;
                const showEllipsis = (page === 2 && currentPage > 4) || (page === totalPages - 1 && currentPage < totalPages - 3);
                
                if (showEllipsis) {
                  return (
                    <span key={page} className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                      ...
                    </span>
                  );
                }
                
                if (!showPage) return null;
                
                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                      isCurrentPage
                        ? 'border-blue-500 bg-blue-50 text-blue-600'
                        : 'border-gray-300 bg-white text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </button>
                );
              })}
              
              <button 
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </nav>
          </div>
        </div>
      </div>

      {/* Modals */}
      <AddUserModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={handleAddUser}
      />

      <EditUserModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        onEdit={handleEditUser}
        user={selectedUser}
      />

      <DeleteUserModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onDelete={handleDeleteUser}
        user={selectedUser}
      />
      <Alert alert={alert} hideAlert={hideAlert} />
    </div>
  );
}