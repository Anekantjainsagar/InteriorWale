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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            Featured Projects
          </h2>
          <p className="text-2xl lg:text-3xl text-gray-700">
            Crafted spaces, tailored to you
          </p>
          <p className="text-base lg:text-lg text-gray-500 mt-2 max-w-2xl mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
          {featuredProjects.slice(0, 2).map((project, idx) => (
            <div key={idx} className="relative group overflow-hidden rounded-sm">
              <Image
                src={project.image}
                alt={project.title}
                width={800}
                height={500}
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-end p-6">
                <h4 className="text-white text-xl font-semibold">{project.title}</h4>
              </div>
            </div>
          ))}
          <div className="relative group overflow-hidden rounded-sm">
            <Image
              src={featuredProjects[2].image}
              alt={featuredProjects[2].title}
              width={800}
              height={500}
              className="w-full h-auto object-cover"
            />
            <div className="absolute inset-0 bg-black/40 flex items-end p-6">
              <h4 className="text-white text-xl font-semibold">
                {featuredProjects[2].title}
              </h4>
            </div>
          </div>

          {/* CTA Block */}
          <div className="bg-[#ffad65] text-center flex items-center justify-center p-8 hover:bg-[#ff9c45] transition rounded-sm">
            <span className="text-black font-semibold text-xl">See our work</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjectsSection;
