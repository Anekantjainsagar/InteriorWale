"use client";
import React from "react";
import Image from "next/image";

const features = [
  {
    icon: "/images/icon_feature.svg", // Replace with actual orange icon
    title: "Tailored to your lifestyle",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
  },
  {
    icon: "/images/icon_feature.svg",
    title: "Hassle free process",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
  },
  {
    icon: "/images/icon_feature.svg",
    title: "Timeless",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
  },
  {
    icon: "/images/icon_feature.svg",
    title: "Sustainable",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
  },
];

const FeatureList = () => (
  <div className="space-y-8">
    {features.map((feature, idx) => (
      <div key={idx} className="flex flex-col items-start gap-2">
        <div className="flex gap-x-4">
          <Image src={feature.icon} alt="Feature Icon" width={48} height={48} />
          <h4 className="text-xl font-semibold text-gray-800">
            {feature.title}
          </h4>
        </div>
        <p className="text-gray-800 font-light">{feature.description}</p>
      </div>
    ))}
  </div>
);

const WhyChooseSection = () => {
  return (
    <section className="w-full bg-white py-16 lg:py-24">
      <div className="max-w-[80%] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black">
            Why choose The Interior Wale?
          </h2>
          <p className="text-xl lg:text-2xl text-gray-900 mt-2">
            Crafted spaces, tailored to you
          </p>
          <p className="text-base lg:text-lg text-gray-800 mt-2 font-light mx-auto w-6/12">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor
          </p>
        </div>

        {/* Images + Features */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-16">
          {/* Left Ellipse Image */}
          <div className="overflow-hidden rounded-full border border-black">
            <Image
              width={10000}
              height={10000}
              src="/images/img_ellipse_1.png"
              alt="Left Interior"
              className="object-cover h-full w-full"
            />
          </div>

          {/* Features */}
          <div className="w-[50%] space-y-8 mx-[4vh]">
            <FeatureList />
            <button className="bg-newOrange hover:bg-newOrange mt-5 text-black font-semibold px-10 py-2.5 rounded-full shadow-md">
              Start your project
            </button>
          </div>

          {/* Right Ellipse Image */}
          <div className="overflow-hidden rounded-full border border-black">
            <Image
              src="/images/img_ellipse_2.png"
              alt="Right Interior"
              width={10000}
              height={10000}
              className="object-cover h-full w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;
