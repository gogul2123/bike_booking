"use client";

import React, { createContext, useContext } from "react";

interface AppContextProps {
  URL: string;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const URL = process.env.NEXT_PUBLIC_API_URL ?? "";

  return (
    <AppContext.Provider value={{ URL }}>
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
