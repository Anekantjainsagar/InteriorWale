"use client";
import React from "react";
import Image from "next/image";

const AboutSection = () => {
  return (
    <section className="w-full relative h-screen">
      {/* Background Image - Full height */}
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="object-cover w-full h-full"
          poster="/images/img_untitled_1.png" // Fallback image if video doesn't load
        >
          <source src="/images/img_untitled_1.mp4" type="video/mp4" />
          {/* Fallback image if video is not supported */}
          <Image
            src="/images/img_untitled_1.png"
            alt="Luxury interior design"
            fill
            className="object-cover"
            priority
            quality={90}
          />
        </video>
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
      </div>

      {/* Content Container - Right Aligned */}
      <div className="absolute right-0 top-0 h-full w-full lg:w-1/2 xl:w-2/5 flex items-center">
        <div className="bg-white/30 bg-opacity-90 lg:bg-opacity-80 backdrop-blur-sm h-full lg:h-auto w-full p-8 sm:p-12 lg:p-16 flex flex-col justify-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-100 mb-6">
            Who We Are
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl lg:text-2xl xl:text-3xl text-gray-100 mb-4 leading-tight">
                Meet The Interior Wale -<br />
                Crafting Interiors with Purpose & Passion
              </h3>
              <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <p className="text-base sm:text-lg text-gray-300 leading-relaxed mt-4">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam, eaque
                ipsa.
              </p>
            </div>

            <button
              className="bg-newOrange hover:bg-opacity-90 transition-all duration-200 text-gray-200 font-semibold text-base sm:text-lg px-8 sm:px-10 py-3 sm:py-4 rounded-full shadow-md hover:shadow-lg mt-6 w-full sm:w-auto"
              aria-label="Let's talk about your design"
              onClick={() => {
                const formSection = document.getElementById("contact");
                if (formSection) {
                  const offsetTop = formSection.offsetTop - 80; // Adjust for header height if needed
                  window.scrollTo({
                    top: offsetTop,
                    behavior: "smooth",
                  });
                }
              }}
            >
              Let&apos;s talk design
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
