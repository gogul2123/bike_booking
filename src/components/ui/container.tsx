import React from "react";

function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`p-4 min-h-screen bg-white ${className}`}>{children}</div>
  );
}

export default Container;
