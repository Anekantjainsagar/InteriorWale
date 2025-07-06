// components/HomePage.jsx - Main Component
import React from "react";
import HeroSection from "./components/sections/HeroSection";
import AboutSection from "./components/sections/AboutSection";
import ServicesSection from "./components/sections/ServicesSection";
import WhyChooseSection from "./components/sections/WhyChooseSection";
import ContactSection from "./components/sections/ContactSection";
import OurExpertiseSection from "./components/sections/OurExpertiseSection";
import FeaturedProjectsSection from "./components/sections/FeaturedProjects";
import TestimonialsSection from "./components/sections/TestimonialsSection";

const HomePage = () => {
  return (
    <main className="w-full bg-white">
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <WhyChooseSection />
      <OurExpertiseSection />
      <FeaturedProjectsSection />
      <TestimonialsSection />
      <ContactSection />
    </main>
  );
};

export default HomePage;
