import React from "react";
import PortfolioSection from "../components/sections/portfolio/PortfolioSection";
import Image from "next/image";

const PortfolioPage = () => {
  return (
    <div className="px-2 sm:px-3 lg:px-14 py-7 sm:py-8 lg:py-7 mt-[10vh]">
      <div className="flex items-center justify-center p-4">
        <div className="max-w-4xl w-full">
          {/* Main heading container */}
          <div className="text-center mb-8">
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold leading-tight">
              Luxurious Interior
            </h1>

            {/* Images and "And" section */}
            <div className="flex items-center justify-center gap-6 my-8">
              {/* Left image */}
              <Image
                src={"/images/portfolio/text-left.png"}
                alt="Luxurious Interior left text"
                width={10000}
                height={10000}
                className="w-[15vw]"
              />
              {/* "And" text */}
              <span
                className="text-6xl md:text-7xl lg:text-8xl font-bold mx-4"
              >
                And
              </span>
              {/* Right image */}
              <Image
                src={"/images/portfolio/text-right.png"}
                alt="Luxurious Interior right text"
                width={10000}
                height={10000}
                className="w-[15vw]"
              />
            </div>

            {/* Industrial Design text */}
            <h2 className="text-6xl md:text-7xl lg:text-8xl font-bold leading-tight">
              Industrial Design
            </h2>
          </div>
        </div>
      </div>
      <PortfolioSection />
    </div>
  );
};

export default PortfolioPage;
