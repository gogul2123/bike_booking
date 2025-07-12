"use client";

import { useEffect, useState } from "react";

export function RootLayoutClient({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="min-w-full">
        <main className={`flex-1 `}>{children}</main>
      </div>
    </>
  );
}
