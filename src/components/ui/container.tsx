import React from "react";

function Container({ children }: { children: React.ReactNode }) {
  return <div className="p-4 min-h-screen bg-white">{children}</div>;
}

export default Container;
