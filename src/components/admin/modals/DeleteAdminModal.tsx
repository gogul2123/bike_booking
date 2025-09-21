// src/components/modals/DeleteAdminModal.tsx
'use client';

import React, { useState } from 'react';
import { X, AlertTriangle } from 'lucide-react';
import { Admin } from '../types/admin';

interface DeleteAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: (id: number) => void;
  admin: Admin | null;
}

export default function DeleteAdminModal({ isOpen, onClose, onDelete, admin }: DeleteAdminModalProps) {
  const [confirmText, setConfirmText] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (confirmText.toLowerCase() !== 'delete') {
      setError('Please type "delete" to confirm');
      return;
    }

    if (admin) {
      onDelete(admin.id);
      handleClose();
    }
  };

  const handleClose = () => {
    setConfirmText('');
    setError('');
    onClose();
  };

  if (!isOpen || !admin) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm  flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="w-6 h-6 text-red-600" />
            <h2 className="text-xl font-semibold text-gray-900">Delete Admin</h2>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-6">
          <div className="mb-4">
            <p className="text-gray-700 mb-2">
              Are you sure you want to delete the admin account for:
            </p>
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="font-medium text-gray-900">{admin.name}</p>
              <p className="text-sm text-gray-600">{admin.email}</p>
            </div>
          </div>
          
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
            <p className="text-sm text-red-800">
              <strong>Warning:</strong> This action cannot be undone. The admin account will be permanently deleted.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="confirm-delete" className="block text-sm font-medium text-gray-700 mb-2">
                Type <strong>"delete"</strong> to confirm:
              </label>
              <input
                type="text"
                id="confirm-delete"
                value={confirmText}
                onChange={(e) => {
                  setConfirmText(e.target.value);
                  setError('');
                }}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${
                  error ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Type 'delete' to confirm"
              />
              {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
            </div>

            <div className="flex items-center justify-end space-x-4 pt-4">
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Delete Admin
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}