"use client";
import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const expertiseData = [
  {
    icon: "/images/icons/commercial 1.png",
    title: "Commercial Spaces",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
  },
  {
    icon: "/images/icons/resident 1.png",
    title: "Residential Interiors",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
  },
  {
    icon: "/images/icons/sofa 1.png",
    title: "Luxury Decorations & Living Spaces",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
  },
  {
    icon: "/images/icons/kitchen 1.png",
    title: "Kitchen & Bath Transformations",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
  },
];

const OurExpertiseSection = () => {
  return (
    <section className="w-full bg-[#f3f3f3] py-16 lg:py-24">
      <div className="w-[90%] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-2">
            Our Expertise
          </h2>
          <p className="text-xl lg:text-2xl text-gray-800">
            Crafted spaces, tailored to you
          </p>
          <p className="text-base lg:text-lg text-gray-800 font-light mt-2 w-6/12 mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor
          </p>
        </div>

        {/* Grid Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {expertiseData.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-md shadow-md border-t-[6px] border-newOrange px-6 py-10 text-center flex flex-col items-center"
            >
              <Image
                src={item.icon}
                alt={item.title}
                width={75}
                height={75}
                className="mb-4"
              />
              <h4 className="text-lg font-semibold text-gray-900 mb-1">
                {item.title}
              </h4>
              <p className="w-11/12 mx-auto font-light text-gray-600">
                {item.description}
              </p>
            </div>
          ))}

          {/* Interior Image */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-1">
            <Image
              src="/images/img_rectangle_ourwork.png"
              alt="Our Work"
              width={500}
              height={300}
              className="w-full h-full object-cover rounded shadow-md"
            />
          </div>

          {/* See Our Work CTA */}
          <div className="bg-white rounded-sm shadow-md border-t-[6px] border-newOrange px-6 py-10 flex items-center justify-center text-center cursor-pointer hover:bg-newOrange/10 transition">
            <div className="flex items-center gap-2 text-newOrange text-lg font-semibold">
              <span>See our work</span>
              <ArrowRight className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurExpertiseSection;
