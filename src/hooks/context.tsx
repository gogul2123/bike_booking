"use client";

import { BikeData } from "@/components/bikes/types";
import { getFromLocalStorage } from "@/components/ui/encryption";
import React, { createContext, useContext, useState } from "react";

interface UserData {
  email: string;
  userId: string;
  role: string;
  status: string;
  mobile: string;
}

interface AppContextProps {
  URL: string;
  userData: UserData | null;
  setUserData: (data: UserData | null) => void;
  IMAGE_URL: string;
  isLogedIn: boolean;
  setIsLogedIn: React.Dispatch<React.SetStateAction<boolean>>;
  cart: any[];
  setCart: React.Dispatch<React.SetStateAction<any[]>>;
  fromDate: Date;
  toDate: Date;
  setFromDate: (date: Date) => void;
  setToDate: (date: Date) => void;
  bike: BikeData | null;
  setBike: (bike: BikeData | null) => void;
}

// In your context file
const getDefaultFromDate = () => {
  const date = new Date();
  // Set to next 9 AM if current time is after 9 PM
  if (date.getHours() >= 21) {
    date.setDate(date.getDate() + 1);
  }
  date.setHours(9, 0, 0, 0); // 9:00 AM
  return date;
};

const getDefaultToDate = () => {
  const date = new Date();
  // Set to tomorrow 9 AM (24 hours after fromDate)
  date.setDate(date.getDate() + 1);
  date.setHours(9, 0, 0, 0); // 9:00 AM
  return date;
};

const AppContext = createContext<AppContextProps | undefined>(undefined);

const token = getFromLocalStorage("token");
const userId = getFromLocalStorage("userId");
const name = getFromLocalStorage("name");
const email = getFromLocalStorage("email");
const status = getFromLocalStorage("status");
const role = getFromLocalStorage("role");
const mobile = getFromLocalStorage("mobile");
const logedIn =
  token !== null &&
  userId !== null &&
  name !== null &&
  email !== null &&
  status !== "inactive" &&
  role !== null &&
  mobile !== null;

console.log(logedIn, "logedIn");

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const URL = process.env.NEXT_PUBLIC_API_URL ?? "";
  const IMAGE_URL = process.env.NEXT_PUBLIC_IMAGE_URL ?? "";
  const [userData, setUserData] = useState<UserData | null>({
    email: email ?? "",
    userId: userId ?? "",
    role: role ?? "",
    status: status ?? "",
    mobile,
  });
  const [isLogedIn, setIsLogedIn] = useState<boolean>(logedIn);
  const [cart, setCart] = useState<any[]>([]);
  const [fromDate, setFromDate] = useState<Date>(getDefaultFromDate());
  const [toDate, setToDate] = useState<Date>(getDefaultToDate());
  const [bike, setBike] = useState<BikeData | null>();

  return (
    <AppContext.Provider
      value={{
        bike,
        setBike,
        fromDate,
        setFromDate,
        toDate,
        setToDate,
        URL,
        setUserData,
        IMAGE_URL,
        userData,
        isLogedIn,
        setIsLogedIn,
        cart,
        setCart,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within AppProvider");
  }
  return context;
};
