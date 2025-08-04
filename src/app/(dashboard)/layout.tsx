"use client";

import Footer from "@/components/footer/footer";
import { useEffect, useState } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="min-w-full">
        <main className={`flex-1 `}>{children}</main>
        <Footer />
      </div>
    </>
  );
}
