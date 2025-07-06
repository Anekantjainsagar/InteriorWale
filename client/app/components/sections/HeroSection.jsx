// components/sections/HeroSection.jsx
import React from "react";
import Image from "next/image";

const HeroSection = () => {
  return (
    <section className="w-full px-2 sm:px-3 lg:px-14 py-12 lg:py-20">
      <div className="flex justify-between items-center h-screen">
        {/* Left Content */}
        <div className="space-y-3 lg:space-y-5">
          <div className="relative">
            {/* Floating Orange Circle */}
            <div className="absolute top-0 right-[8vw] w-24 h-12 bg-global-3 rotate-[235deg] rounded-t-full"></div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light text-gray-900 leading-[100px] relative z-10">
              <span className="font-bold block leading-[90px]">
                Elevate Your
              </span>
              <span className="block leading-[90px]">
                <span className="font-bold">Home</span> with Elegant,
              </span>{" "}
              <span className="block leading-[90px]">
                <span className="font-bold">Personalized</span> Interior
              </span>
              <span className="block leading-[90px]">Design</span>
            </h1>
          </div>

          {/* Testimonial */}
          <p className="text-base sm:text-lg text-gray-700 max-w-2xl leading-relaxed">
            Thank you for all of the beautiful ideas! I just love my new living
            room design. I love that this is a perfect blend of contemporary
            without being too cold. Thank you so much for achieving this for us.
          </p>

          {/* CTA and Badge */}
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <button className="bg-newOrange hover:bg-newOrange mt-5 text-black font-semibold text-lg px-10 py-4 rounded-full shadow-md">
              Get started today
            </button>

            {/* Interior Badge Image */}
            <Image
              src="/images/interior_button.png"
              alt="Best Interior Designers Badge"
              width={100}
              height={100}
              className="w-20 h-20 object-contain mt-5"
            />
          </div>
        </div>

        {/* Right Image */}
        <div className="relative w-[35%]">
          <Image
            src={"/images/hero_image.png"}
            alt="Interior wale hero image"
            width={1000}
            height={1000}
            className="w-full h-auto"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
