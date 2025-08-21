"use client";
import React, { useState } from "react";
import Button from "../ui/Button";
import EditText from "../ui/EditText";
import TextArea from "../ui/TextArea";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    requirement: "",
    message: "",
  });

  const handleInputChange = (field) => (e) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission logic here
  };

  return (
    <section className="w-full bg-white px-4 sm:px-6 md:px-8 lg:px-14 xl:px-16 py-12 sm:py-16 lg:py-24">
      <div className="md:max-w-full max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10 lg:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-3 sm:mb-4 lg:mb-6">
            Contact Us
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto">
            Ready to transform your space? Get in touch with us today.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 sm:space-y-5 lg:space-y-6"
        >
          {/* First Row - Mobile: Stack, Desktop: 45%-55% split */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            <div className="w-full sm:w-[45%]">
              <EditText
                placeholder="Name..."
                value={formData.name}
                onChange={handleInputChange("name")}
                className="w-full border border-newOrange"
              />
            </div>
            <div className="w-full sm:w-[55%]">
              <EditText
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleInputChange("phone")}
                className="w-full border border-newOrange"
              />
            </div>
          </div>

          {/* Second Row - Mobile: Stack, Desktop: 55%-45% split */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            <div className="w-full sm:w-[55%]">
              <EditText
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange("email")}
                className="w-full border border-newOrange"
              />
            </div>
            <div className="w-full sm:w-[45%]">
              <EditText
                placeholder="Type of requirement"
                value={formData.requirement}
                onChange={handleInputChange("requirement")}
                className="w-full border border-newOrange"
              />
            </div>
          </div>

          {/* Message TextArea */}
          <div className="w-full">
            <TextArea
              placeholder="Any message for us..."
              value={formData.message}
              onChange={handleInputChange("message")}
              rows={4}
              className="w-full border border-newOrange min-h-[120px] sm:min-h-[140px] lg:min-h-[160px]"
            />
          </div>

          {/* Submit Button */}
          <div className="text-center mt-6 sm:mt-8 lg:mt-10">
            <button
              type="submit"
              className="bg-newOrange hover:bg-opacity-90 transition-all duration-200 text-black font-semibold text-sm sm:text-base lg:text-lg px-8 sm:px-12 lg:px-16 xl:px-20 py-2.5 sm:py-3 lg:py-3.5 rounded-full shadow-md hover:shadow-lg w-full sm:w-auto max-w-xs"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactSection;
