"use client";
import React from "react";
import Image from "next/image";

const testimonials = [
  {
    name: "Aman Kaushik",
    message:
      "The Interior Wale has crafted the most amazing and aesthetic space at home. Their attention to detail and ability to blend functionality with beauty is unmatched. I would recommend them for any type of interior designing.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6yytxc15LLLTdRd0VoTe1YgsxMY0Qx3ESNw&s",
    rating: 5,
  },
  {
    name: "Riya Sharma",
    message:
      "Working with Interior Wale was a seamless experience. They understood my vision perfectly and transformed my apartment into a modern yet cozy haven. Every corner feels personalized and thoughtfully designed.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlUkjGYJ6drjQzplDtXZyJ3-wB5e1La7wcgg&s",
    rating: 5,
  },
  {
    name: "Arjun Mehta",
    message:
      "From concept to execution, Interior Wale delivered beyond expectations. The team was professional, creative, and attentive to every detail. My office space now feels inspiring and productive thanks to their design expertise.",
    image:
      "https://t4.ftcdn.net/jpg/03/80/58/23/360_F_380582318_5lJ52eVLcePphpM4pMHdew3wgopfhQSc.jpg",
    rating: 5,
  },
];


const TestimonialsSection = () => {
  return (
    <section className="w-full py-16 lg:py-24 bg-newGrey">
      <div className="w-[90%] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-1">
            What Our Clients Say
          </h2>
          <p className="text-base lg:text-lg text-gray-800 font-light max-w-3xl mx-auto">
            We take pride in creating spaces that truly reflect the
            personalities and lifestyles of our clients. Here&apos;s what they have
            to say about working with Interior Wale:
          </p>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-md text-center shadow-sm hover:shadow-md transition"
            >
              <div className="w-32 h-32 mx-auto mb-4 overflow-hidden rounded-full">
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  width={128}
                  height={128}
                  className="w-full h-full object-cover object-top scale-125"
                  unoptimized
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
              <p className="text-gray-800 font-light">{testimonial.message}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
