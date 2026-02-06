"use client";
import React, { useState } from "react";
import Button from "../ui/Button";
import EditText from "../ui/EditText";
import TextArea from "../ui/TextArea";

// Submission Popup Component
const SubmissionPopup = ({ isOpen, onClose, isSuccess, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full mx-4 shadow-2xl transform transition-all duration-300 scale-100">
        {/* Close button */}
        <div className="flex justify-end mb-2">
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors duration-200 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        {/* Icon */}
        <div className="flex justify-center mb-4">
          {isSuccess ? (
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          ) : (
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          )}
        </div>

        {/* Title */}
        <h3 className="text-xl sm:text-2xl font-bold text-center text-black mb-3">
          {isSuccess ? "Thank You!" : "Oops!"}
        </h3>

        {/* Message */}
        <p className="text-gray-600 text-center mb-6 text-sm sm:text-base leading-relaxed">
          {message}
        </p>

        {/* Action Button */}
        <div className="flex justify-center">
          <button
            onClick={onClose}
            className={`px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold text-sm sm:text-base transition-all duration-200 min-w-[120px] ${
              isSuccess
                ? "bg-green-500 hover:bg-green-600 text-white shadow-md hover:shadow-lg"
                : "bg-newOrange hover:bg-opacity-90 text-black shadow-md hover:shadow-lg"
            }`}
          >
            {isSuccess ? "Great!" : "Got it"}
          </button>
        </div>
      </div>
    </div>
  );
};

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    requirement: "",
    message: "",
  });

  const [popup, setPopup] = useState({
    isOpen: false,
    isSuccess: false,
    message: "",
  });

  const handleInputChange = (field) => (e) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const validateForm = () => {
    const requiredFields = [
      { field: "name", label: "Name" },
      { field: "phone", label: "Phone Number" },
      { field: "email", label: "Email" },
      { field: "requirement", label: "Type of requirement" },
    ];

    const emptyFields = requiredFields.filter(
      ({ field }) => !formData[field].trim()
    );

    if (emptyFields.length > 0) {
      const fieldNames = emptyFields.map(({ label }) => label).join(", ");
      return {
        isValid: false,
        message: `Please fill in the following required fields: ${fieldNames}`,
      };
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return {
        isValid: false,
        message: "Please enter a valid email address.",
      };
    }

    // Basic phone validation (at least 10 digits)
    const phoneRegex = /\d{10,}/;
    if (!phoneRegex.test(formData.phone.replace(/\D/g, ""))) {
      return {
        isValid: false,
        message: "Please enter a valid phone number with at least 10 digits.",
      };
    }

    return {
      isValid: true,
      message:
        "Your message has been submitted successfully! We'll get back to you soon.",
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validation = validateForm();

    if (validation.isValid) {
      console.log("Form submitted:", formData);

      // Show success popup
      setPopup({
        isOpen: true,
        isSuccess: true,
        message: validation.message,
      });

      // Reset form on successful submission
      setFormData({
        name: "",
        phone: "",
        email: "",
        requirement: "",
        message: "",
      });

      // Here you would typically make an API call to submit the form
      // Example:
      // try {
      //   await submitContactForm(formData);
      //   // Success handling above
      // } catch (error) {
      //   setPopup({
      //     isOpen: true,
      //     isSuccess: false,
      //     message: "Something went wrong. Please try again later.",
      //   });
      // }
    } else {
      // Show error popup
      setPopup({
        isOpen: true,
        isSuccess: false,
        message: validation.message,
      });
    }
  };

  const closePopup = () => {
    setPopup({ isOpen: false, isSuccess: false, message: "" });
  };

  return (
    <>
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
                  placeholder="Name*"
                  value={formData.name}
                  onChange={handleInputChange("name")}
                  className="w-full border border-newOrange"
                />
              </div>
              <div className="w-full sm:w-[55%]">
                <EditText
                  placeholder="Phone Number*"
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
                  placeholder="Email*"
                  value={formData.email}
                  onChange={handleInputChange("email")}
                  className="w-full border border-newOrange"
                />
              </div>
              <div className="w-full sm:w-[45%]">
                <EditText
                  placeholder="Type of requirement*"
                  value={formData.requirement}
                  onChange={handleInputChange("requirement")}
                  className="w-full border border-newOrange"
                />
              </div>
            </div>

            {/* Message TextArea */}
            <div className="w-full">
              <TextArea
                placeholder="Any message for us... (optional)"
                value={formData.message}
                onChange={handleInputChange("message")}
                rows={4}
                className="w-full border border-newOrange min-h-[120px] sm:min-h-[140px] lg:min-h-[160px]"
              />
            </div>

            {/* Required fields note */}
            <p className="text-xs sm:text-sm text-gray-500 text-center">
              * Required fields
            </p>

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

      {/* Submission Popup */}
      <SubmissionPopup
        isOpen={popup.isOpen}
        onClose={closePopup}
        isSuccess={popup.isSuccess}
        message={popup.message}
      />
    </>
  );
};

export default ContactSection;
