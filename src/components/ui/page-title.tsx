import React from "react";

interface PageTitleProps {
  title: string;
  description?: string;
}

const PageTitle: React.FC<PageTitleProps> = ({ title, description }) => {
  return (
    <div className="text-black py-2 lg:py-4 xl:py-8 2xl:py-8 lg:max-w-[80vw] 2xl:max-w-7xl mx-auto">
      <div className="px-4 mx-auto">
        <h1 className="text-lg md:text-xl lg:text-2xl xl:text-4xl font-bold lg:mb-2 xl:mb-4">
          {title}
        </h1>
        {description && (
          <p className="text-sm md:text-base lg:text-xl opacity-90">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

export default PageTitle;
