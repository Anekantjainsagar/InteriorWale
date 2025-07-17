import React from "react";
import Image from "next/image";

const HeroSection = () => {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-14 py-12 lg:py-16 xl:py-20">
      <div className="flex flex-col lg:flex-row justify-between items-center min-h-screen gap-8 lg:gap-12 xl:gap-16">
        {/* Left Content */}
        <div className="w-full lg:w-[60%] space-y-4 sm:space-y-5 lg:space-y-6 order-2 lg:order-1">
          <div className="relative">
            {/* Floating Orange Circle */}
            <div className="absolute -top-2 right-[15%] sm:right-[20%] w-16 h-8 sm:w-20 sm:h-10 lg:w-24 lg:h-12 bg-global-3 rotate-[235deg] rounded-t-full z-0"></div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-gray-900 leading-tight sm:leading-[1.2] relative z-10">
              <span className="font-bold block">Elevate Your</span>
              <span className="block">
                <span className="font-bold">Home</span> with Elegant,
              </span>
              <span className="block">
                <span className="font-bold">Personalized</span> Interior
              </span>
              <span className="block">Design</span>
            </h1>
          </div>

          {/* Testimonial */}
          <p className="text-base sm:text-lg md:text-xl text-gray-700 max-w-2xl leading-relaxed sm:leading-loose mt-4 sm:mt-6">
            Thank you for all of the beautiful ideas! I just love my new living
            room design. I love that this is a perfect blend of contemporary
            without being too cold. Thank you so much for achieving this for us.
          </p>

          {/* CTA and Badge */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 mt-6 sm:mt-8">
            <button className="bg-newOrange hover:bg-opacity-90 transition-all duration-200 text-black font-semibold text-base sm:text-lg px-8 sm:px-10 py-3 sm:py-4 rounded-full shadow-md hover:shadow-lg">
              Get started today
            </button>

            {/* Interior Badge Image */}
            <Image
              src="/images/interior_button.png"
              alt="Best Interior Designers Badge"
              width={120}
              height={120}
              className="w-16 h-16 sm:w-20 sm:h-20 object-contain"
              priority
            />
          </div>
        </div>

        {/* Right Image - Hidden on mobile */}
        <div className="w-full lg:w-[40%] relative order-1 lg:order-2 mb-8 lg:mb-0">
          <div className="relative aspect-square w-full h-auto">
            <Image
              src="/images/hero_image.png"
              alt="Interior wale hero image"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
