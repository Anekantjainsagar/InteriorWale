// components/sections/AboutSection.jsx
import React from "react";
import Button from "../ui/Button";
import Image from "next/image";

const AboutSection = () => {
  return (
    <section className="w-full h-full relative">
      <Image
        src={"/images/img_untitled_1.png"}
        alt="About SEction"
        className="w-full h-full object-cover"
        width={10000}
        height={10000}
      />
      <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10 flex items-center justify-end px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="w-[90%]">
          <div className="max-w-3xl ml-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Who We Are
            </h2>

            <div className="space-y-8">
              <div>
                <h3 className="text-xl lg:text-2xl text-white mb-4">
                  Meet The Interior Wale - Crafting Interiors
                  <br />
                  with Purpose & Passion
                </h3>
                <p className="text-lg lg:text-xl text-gray-800 font-light w-10/12 leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua
                  <br />
                  <br />
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque laudantium, totam rem aperiam, eaque
                  ipsa
                </p>
              </div>

              <button className="bg-newOrange hover:bg-newOrange mt-5 text-black font-semibold text-lg px-10 py-4 rounded-full shadow-md">
                Let's talk design
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
