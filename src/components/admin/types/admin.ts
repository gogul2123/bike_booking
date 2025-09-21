// src/types/admin.ts
export interface Admin {
  id: number;
  name: string;
  email: string;
  role: 'Admin';
  status: 'Active' | 'Inactive';
  joinDate: string;
}

export interface AdminFormData {
  name: string;
  email: string;
  status: 'Active' | 'Inactive';
  role: 'Admin';
}