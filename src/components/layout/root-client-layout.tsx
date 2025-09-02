"use client";

import { useEffect, useState } from "react";
import LandingHeader from "../header/landing-header";

export function RootLayoutClient({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="min-w-full">
        <main className={`flex-1 `}>
          <LandingHeader />
          {children}
        </main>
      </div>
    </>
  );
}
