// src/types/user.ts
export interface Address {
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
}

export interface User {
  userId: string;
  createdAt: {
    $date: string;
  };
  updatedAt: {
    $date: string;
  };
  role: 'user';
  status: 'active' | 'inactive';
  email: string;
  name: string;
  mobile: string;
  address: Address;
}

export interface UserFormData {
  name: string;
  email: string;
  mobile: string;
  status: 'active' | 'inactive';
  role: 'user';
  address: Address;
}
