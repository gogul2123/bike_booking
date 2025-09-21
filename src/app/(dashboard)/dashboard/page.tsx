import Dashboard from "@/components/dashboard";
import React from "react";

function Page() {
  return (
    <Dashboard
      user={{ name: "Golu", id: "user123", avatar: "G" }}
      recentBookings={[]}
      recommendedBikes={[]}
    />
  );
}

export default Page;
