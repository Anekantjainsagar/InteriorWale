"use client";
import React from "react";
import { RxArrowTopRight } from "react-icons/rx";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="w-full bg-newGrey">
      <div className="max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-24 py-8 lg:py-12">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-8 lg:gap-16 xl:gap-28">
          <FooterLeft />
          <FooterRight />
        </div>
      </div>
      <FooterCopyright />
    </footer>
  );
};

const FooterSection = ({ title, links }) => {
  return (
    <div className="w-full sm:w-auto">
      <h3 className="text-lg sm:text-xl lg:text-2xl font-medium font-muller text-global-1 mb-3 lg:mb-4">
        {title}
      </h3>
      <ul className="space-y-2 lg:space-y-3">
        {links.map((link, idx) => (
          <li key={idx}>
            <button className="text-base sm:text-lg lg:text-xl font-normal font-muller text-global-1 hover:text-newOrange transition-colors duration-200 text-left w-full text-start">
              {link}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const FooterCopyright = () => {
  return (
    <div className="w-full bg-newOrange">
      <div className="max-w-[1800px] mx-auto px-4 sm:px-6 py-3 text-center text-sm sm:text-base font-medium font-muller text-global-1">
        Copyright © 2025, theinteriorwale.com, All Rights Reserved, Designed &
        Developed by Anekant & Sarthak
      </div>
    </div>
  );
};

const FooterLeft = () => {
  return (
    <div className="w-full lg:w-[40%] xl:w-1/3">
      <Image
        width={324}
        height={100}
        src="/images/img_footer_logo.png"
        alt="The Interior Wale Footer Logo"
        className="w-[200px] sm:w-[240px] lg:w-[280px] xl:w-[324px] h-auto"
        priority
      />
      <p className="text-base sm:text-lg lg:text-xl font-light font-muller text-global-1 leading-relaxed mt-4 lg:mt-6">
        The interior wale has crafted the most amazing & aesthetic space at
        home. I would recommend them for any type of interior designing.
      </p>
      <div className="flex justify-start items-center gap-4 lg:gap-6 mt-6 lg:mt-8">
        {[
          "img_vector_orange_300_38x36.svg",
          "img_vector_38x36.svg",
          "img_vector_1.svg",
        ].map((icon, idx) => (
          <Image
            width={38}
            height={36}
            key={idx}
            src={`/images/${icon}`}
            alt="Social Media"
            className="w-7 h-7 lg:w-8 lg:h-8 hover:scale-110 transition-transform duration-200 cursor-pointer"
          />
        ))}
      </div>
    </div>
  );
};

const FooterRight = () => {
  return (
    <div className="w-full lg:w-[60%] xl:w-2/3 flex flex-col sm:flex-row justify-between items-start gap-8 lg:gap-12 xl:gap-16">
      {/* Site Map + Legal Sections */}
      <div className="w-full sm:w-[70%] flex flex-col sm:flex-row justify-between gap-8 lg:gap-12 xl:gap-16">
        <FooterSection
          title="Site Map"
          links={[
            "Home",
            "Who we are",
            "What we do",
            "Why choose Us?",
            "Our Expertise",
            "Featured Projects",
            "Testimonials",
          ]}
        />
        <FooterSection
          title="Legal"
          links={["Contact Us", "Privacy Policy", "Terms of Service"]}
        />
      </div>

      {/* Scroll to Top Button */}
      <div className="w-full sm:w-[30%] flex justify-center sm:justify-end">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="bg-newOrange hover:bg-opacity-90 p-4 sm:p-5 lg:p-6 rounded-sm transition-all duration-200"
          aria-label="Scroll to top"
        >
          <RxArrowTopRight className="rotate-[-45deg] text-3xl sm:text-4xl" />
        </button>
      </div>
    </div>
  );
};

export default Footer;
