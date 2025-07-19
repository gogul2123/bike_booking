"use client";

import Footer from "@/components/footer/footer";
import HomeHeader from "@/components/header/dashboard-header";
import Header from "@/components/header/header";
import LandingHeader from "@/components/header/landing-header";
import { useEffect, useState } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="min-w-full">
        <HomeHeader isLoggedIn={true} />
        {/* <LandingHeader/> */} 
        <main className={`flex-1 `}>{children}</main>
        <Footer />
      </div>
    </>
  );
}
