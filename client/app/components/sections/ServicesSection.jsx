// components/sections/ServicesSection.jsx
import React from "react";
import ServiceCard from "../cards/ServiceCard";

const ServicesSection = () => {
  const services = [
    {
      id: 1,
      title: "Luxury Home Styling",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium ",
      image: "/images/img_rectangle_10.png",
    },
    {
      id: 2,
      title: "Modern Office Design",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium ",
      image: "/images/img_rectangle_10_220x514.png",
    },
    {
      id: 3,
      title: "Complete Home Renovation",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium ",
      image: "/images/img_rectangle_10_1.png",
    },
  ];

  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-16 lg:py-24 bg-newGrey">
      <div className="max-w-[97%] mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-2">
            What We Do
          </h2>
          <p className="text-xl lg:text-2xl text-black mb-1">
            Crafted spaces, tailored to you
          </p>
          <p className="text-base lg:text-lg text-gray-800 max-w-2xl font-light mx-auto">
            We specialize in creating unique, personalized interior solutions
            that reflect your style and enhance your daily life.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <ServiceCard key={service.id} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
