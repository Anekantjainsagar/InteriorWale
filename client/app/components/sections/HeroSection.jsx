import React from "react";
import Image from "next/image";

const HeroSection = () => {
  return (
    <section className="w-full px-4 sm:px-6 md:px-8 lg:px-14 xl:px-16 md:mt-0 mt-[10vw]">
      <div className="flex flex-col lg:flex-row justify-between items-center lg:min-h-screen gap-6 sm:gap-8 lg:gap-12 xl:gap-16 py-8 sm:py-12 lg:py-16 xl:py-20">
        {/* Left Content */}
        <div className="w-full lg:w-[60%] xl:w-[55%] space-y-4 sm:space-y-5 lg:space-y-6 order-2 lg:order-1">
          <div className="relative">
            {/* Floating Orange Circle - Responsive positioning */}
            <div className="absolute -top-1 sm:-top-2 right-[10%] sm:right-[15%] md:right-[18%] lg:right-[20%] w-12 h-6 sm:w-16 sm:h-8 md:w-20 md:h-10 lg:w-24 lg:h-12 bg-newOrange rotate-[235deg] rounded-t-full z-0 opacity-90"></div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light text-gray-900 leading-tight relative z-10">
              <span className="font-bold block">Elevate Your</span>
              <span className="block my-1 md:my-3.5">
                <span className="font-bold">Home</span> with Elegant,
              </span>
              <span className="block my-1 md:my-3.5">
                <span className="font-bold">Personalized</span> Interior
              </span>
              <span className="block font-light">Design</span>
            </h1>
          </div>

          {/* Testimonial */}
          <div className="mt-6 sm:mt-8 lg:mt-10">
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 max-w-full lg:max-w-2xl leading-relaxed">
              &quot;Thank you for all of the beautiful ideas! I just love my new
              living room design. I love that this is a perfect blend of
              contemporary without being too cold. Thank you so much for
              achieving this for us.&quot;
            </p>
          </div>

          {/* CTA and Badge */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 mt-8 sm:mt-10 lg:mt-12">
            <button className="bg-newOrange hover:bg-opacity-90 transition-all duration-200 text-black font-semibold text-sm sm:text-base lg:text-lg px-6 sm:px-8 lg:px-10 py-3 sm:py-4 rounded-full shadow-md hover:shadow-lg w-fit">
              Get started today
            </button>

            {/* Interior Badge Image */}
            <div className="flex-shrink-0">
              <Image
                src="/images/interior_button.png"
                alt="Best Interior Designers Badge"
                width={120}
                height={120}
                className="w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 lg:w-20 lg:h-20 object-contain"
                priority
              />
            </div>
          </div>
        </div>

        {/* Right Image */}
        <div className="w-full lg:w-[40%] xl:w-[45%] relative order-1 lg:order-2">
          <div className="relative aspect-square w-full max-h-[70vh] lg:max-h-[70vh] xl:max-h-[80vh]">
            <Image
              src="/images/hero_image.png"
              alt="Interior wale hero image"
              fill
              className="object-contain"
              priority
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
