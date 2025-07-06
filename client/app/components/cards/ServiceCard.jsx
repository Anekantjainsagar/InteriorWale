// components/cards/ServiceCard.jsx
import Image from "next/image";
import React from "react";

const ServiceCard = ({ id, title, description, image }) => {
  return (
    <div className="bg-white relative shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
      <div className="flex items-center absolute top-0 left-0 ">
        <div className="w-16 h-16 bg-newOrange flex items-center justify-center text-black font-bold text-3xl">
          {id}
        </div>
      </div>
      <div className="px-8 pt-20">
        <h3 className="text-xl font-bold text-gray-900">{title}</h3>
        <p className="text-gray-600 font-light leading-relaxed mb-6">
          {description}
        </p>
      </div>

      <div className="relative overflow-hidden">
        <Image
          width={1000}
          height={1000}
          src={image}
          alt={title}
          className="w-full h-[25vh] object-cover"
        />
      </div>
    </div>
  );
};

export default ServiceCard;
