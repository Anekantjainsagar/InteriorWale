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
    <section className="w-full bg-white px-2 sm:px-3 lg:px-14 py-16 lg:py-24">
      <div className="text-center mb-10">
        <h2 className="text-3xl sm:text-4xl font-bold text-black mb-6">
          Contact Us
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid gap-4" style={{ gridTemplateColumns: "45% 55%" }}>
          <EditText
            placeholder="Name..."
            value={formData.name}
            onChange={handleInputChange("name")}
            className="w-full border border-newOrange"
          />
          <EditText
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleInputChange("phone")}
            className="w-full border border-newOrange"
          />
        </div>

        <div className="grid gap-4" style={{ gridTemplateColumns: "55% 45%" }}>
          <EditText
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange("email")}
            className="w-full border border-newOrange"
          />
          <EditText
            placeholder="Type of requirement"
            value={formData.requirement}
            onChange={handleInputChange("requirement")}
            className="w-full border border-newOrange"
          />
        </div>

        <TextArea
          placeholder="Any message for us..."
          value={formData.message}
          onChange={handleInputChange("message")}
          rows={6}
          className="w-full border border-newOrange"
        />

        <div className="text-center mt-8">
          <button
            type="submit"
            className="bg-newOrange text-black font-semibold text-lg px-[5vw] py-2.5 rounded-full"
          >
            Submit
          </button>
        </div>
      </form>
    </section>
  );
};

export default ContactSection;
