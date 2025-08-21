import Image from "next/image";
import React from "react";

const HeroSection = () => {
  return (
    <div className="px-4 sm:px-6 md:px-8 lg:px-[5vw] mt-8 md:mt-12 lg:mt-[3vw] mb-12 md:mb-16 lg:mb-[6vw] relative">
      {/* Badge */}
      <p className="bg-black text-white text-sm sm:text-base md:text-lg lg:text-xl py-2 sm:py-2.5 md:py-3 px-6 sm:px-8 md:px-10 rounded-full border-4 sm:border-6 md:border-8 lg:border-[10px] border-newOrange w-fit absolute left-1/2 -translate-x-1/2 -top-4 sm:-top-5 md:-top-6 lg:-top-8 z-10">
        Best of the Year
      </p>

      {/* Main Hero Image */}
      <div className="relative w-full h-auto">
        <Image
          src={"/images/portfolio/hero.png"}
          alt="Hero Portfolio Interior Wale"
          width={10000}
          height={10000}
          className="w-full h-auto object-cover rounded-lg"
          priority
        />
      </div>

      {/* Founder Info */}
      <div className="flex flex-col items-center sm:items-end absolute right-4 sm:right-6 md:right-8 lg:right-[8vw] -bottom-20 sm:-bottom-20 md:-bottom-24 lg:-bottom-[15vh] z-10">
        <div className="relative">
          <Image
            src="/images/aman.png"
            alt="Founder of Interior Wale"
            width={1000}
            height={1000}
            className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-[7vw] lg:h-[7vw] min-w-16 min-h-16 rounded-full object-cover border-4 border-white shadow-lg"
          />
        </div>
        <h4 className="text-base sm:text-lg md:text-xl lg:text-[30px] font-semibold text-white sm:text-black mt-2 text-center sm:text-right">
          Founder
        </h4>
        <p className="text-sm sm:text-base md:text-lg lg:text-2xl xl:text-3xl font-light text-white sm:text-black text-center sm:text-right">
          Prasad Vitkar
        </p>
      </div>
    </div>
  );
};

export default HeroSection;
