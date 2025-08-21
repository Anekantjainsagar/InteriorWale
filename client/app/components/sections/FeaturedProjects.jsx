"use client";
import React from "react";
import Image from "next/image";

const featuredProjects = [
  {
    title: "Modern Home Decor",
    image: "/images/featured-1.png", // Update with actual image path
  },
  {
    title: "Modern Home Decor",
    image: "/images/featured-2.png",
  },
  {
    title: "Modern Home Decor",
    image: "/images/featured-3.png",
  },
];

const FeaturedProjectsSection = () => {
  return (
    <section className="w-full bg-white py-16 lg:py-24">
      <div className="w-[90%] md:w-[70%] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-2">
            Featured Projects
          </h2>
          <p className="text-xl lg:text-2xl text-gray-800">
            Crafted spaces, tailored to you
          </p>
          <p className="text-base lg:text-lg font-light text-gray-500 mt-2 w-11/12 md:w-6/12 mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
          {featuredProjects.slice(0, 2).map((project, idx) => (
            <div key={idx} className="relative overflow-hidden rounded-sm">
              <Image
                src={project.image}
                alt={project.title}
                width={800}
                height={500}
                className="w-full h-auto object-cover"
              />
              <div className="absolute z-10 bottom-0 right-0 w-full flex items-center justify-center h-[12vh] bg-black/60">
                <h4 className="text-white text-xl font-semibold">
                  {project.title}
                </h4>
              </div>
            </div>
          ))}
          <div className="relative overflow-hidden rounded-sm">
            <Image
              src={featuredProjects[2].image}
              alt={featuredProjects[2].title}
              width={800}
              height={500}
              className="w-full h-auto object-cover"
            />
            <div className="absolute z-10 bottom-0 right-0 w-full flex items-center justify-center h-[12vh] bg-black/60">
              <h4 className="text-white text-xl font-semibold">
                {featuredProjects[2].title}
              </h4>
            </div>
          </div>

          {/* CTA Block */}
          <div className="bg-[#ffad65] text-center flex items-center justify-center p-8 hover:bg-[#ff9c45] transition rounded-sm">
            <span className="text-black font-semibold text-xl">
              See our work
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjectsSection;
