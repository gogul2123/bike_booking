import React from "react";

function Container({ children }: { children: React.ReactNode }) {
  return <div className="container p-4">{children}</div>;
}

export default Container;
