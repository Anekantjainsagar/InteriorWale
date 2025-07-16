"use client";
import React from "react";
import Button from "../ui/Button";
import { RxArrowTopRight } from "react-icons/rx";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="w-full bg-newGrey">
      <div className="px-4 sm:px-6 lg:px-24 py-8 lg:py-12">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-8 lg:gap-28">
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
      <h3 className="text-lg sm:text-xl lg:text-2xl font-medium font-muller text-global-1 mb-2.5 lg:mb-3.5">
        {title}
      </h3>
      <ul className="space-y-1.5 lg:space-y-3.5">
        {links.map((link, idx) => (
          <li key={idx}>
            <button className="text-base sm:text-lg lg:text-xl font-normal font-muller text-global-1 hover:text-newOrange transition-colors duration-200 text-left">
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
    <div className="w-full bg-newOrange px-4 sm:px-6 lg:px-8 py-0.5">
      <div className="w-full text-center text-xs sm:text-sm lg:text-base font-medium font-muller text-global-1 bg-transparent hover:bg-transparent py-2">
        Copyright © 2025, theinteriorwale.com, All Rights Reserved, Designed &
        Developed by Anekant & Sarthak
      </div>
    </div>
  );
};

const FooterLeft = () => {
  return (
    <div className="w-full lg:w-1/3">
      <Image
        width={1000}
        height={1000}
        src="/images/img_footer_logo.png"
        alt="The Interior Wale Footer Logo"
        className="w-[240px] sm:w-[280px] lg:w-[324px] h-auto"
      />
      <p className="text-base sm:text-lg lg:text-xl font-light font-muller text-global-1 leading-relaxed mt-3 lg:mt-6">
        The interior wale has crafted the most amazing & aesthetic space at
        home. I would recommend them for any type of interior designing.
      </p>
      <div className="flex justify-start items-center gap-3 lg:gap-6 mt-6 lg:mt-8">
        {[
          "img_vector_orange_300_38x36.svg",
          "img_vector_38x36.svg",
          "img_vector_1.svg",
        ].map((icon, idx) => (
          <Image
            width={10000}
            height={10000}
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
    <div className="w-full lg:w-2/3 flex flex-col sm:flex-row justify-between items-start gap-8 lg:gap-16">
      {/* Site Map + Legal Sections */}
      <div className="w-full sm:w-2/3">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-8 lg:gap-16">
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
      </div>

      {/* Decorative Element */}
      <div className="w-full sm:w-1/3 lg:w-auto flex justify-center lg:justify-end items-center">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="bg-newOrange py-5 sm:py-6 lg:py-7 px-2 sm:px-3 lg:px-4 rounded-sm"
          aria-label="Scroll to top"
        >
          <RxArrowTopRight className="rotate-[-45deg] text-4xl" />
        </button>
      </div>
    </div>
  );
};

export default Footer;
