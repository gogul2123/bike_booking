import React from "react";

function PageTitle({
  title = "Page Tittle",
  description = "Decription",
  className = "",
}: {
  title?: string;
  description?: string;
  className?: string;
}) {
  return (
    <div className={`space-y-2 ${className}`}>
      {title && (
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          {title}
        </h1>
      )}
      {description && (
        <p className="text-gray-600 text-sm md:text-base">{description}</p>
      )}
    </div>
  );
}

export default PageTitle;
