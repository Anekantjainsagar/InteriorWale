"use client";
import React from "react";
import Image from "next/image";

const testimonials = [
  {
    name: "Aman Kaushik",
    message:
      "The interior wale has crafted the most amazing & aesthetic space at home. I would recommend them for any type of interior designing.",
    image: "/images/aman.png", // Replace with actual path
    rating: 4,
  },
  {
    name: "Aman Kaushik",
    message:
      "The interior wale has crafted the most amazing & aesthetic space at home. I would recommend them for any type of interior designing.",
    image: "/images/aman.png",
    rating: 4,
  },
  {
    name: "Aman Kaushik",
    message:
      "The interior wale has crafted the most amazing & aesthetic space at home. I would recommend them for any type of interior designing.",
    image: "/images/aman.png",
    rating: 4,
  },
];

const TestimonialsSection = () => {
  return (
    <section className="w-full py-16 lg:py-24 bg-newGrey">
      <div className="w-[90%] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-1">
            Our Testimonials
          </h2>
          <p className="text-base lg:text-lg text-gray-800 font-light max-w-xl mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor
          </p>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-md text-center shadow-sm hover:shadow-md transition"
            >
              <div className="w-32 h-32 mx-auto mb-4">
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  width={1200}
                  height={1200}
                  className="rounded-full object-cover"
                />
              </div>
              {/* Rating */}
              <div className="flex justify-center mb-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className={`w-7 h-7 ${
                      star <= testimonial.rating
                        ? "text-newOrange"
                        : "text-gray-300"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967h4.175c.969 0 1.371 1.24.588 1.81l-3.379 2.455 1.286 3.966c.3.921-.755 1.688-1.538 1.117L10 13.347l-3.379 2.455c-.783.571-1.838-.196-1.538-1.117l1.286-3.966-3.379-2.455c-.783-.57-.38-1.81.588-1.81h4.175l1.286-3.967z" />
                  </svg>
                ))}
              </div>
              {/* Name and Message */}
              <h4 className="font-semibold text-2xl mb-2">{testimonial.name}</h4>
              <p className="text-gray-800 w-11/12 font-light">{testimonial.message}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
