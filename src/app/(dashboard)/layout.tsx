"use client";

import Footer from "@/components/footer/footer";
import HomeHeader from "@/components/header/dashboard-header";
import Header from "@/components/header/header";
import { useEffect, useState } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="min-w-full">
        <HomeHeader />
        <main className={`flex-1 `}>{children}</main>
        <Footer />
      </div>
    </>
  );
}
