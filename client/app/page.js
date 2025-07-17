// components/HomePage.jsx - Optimized Main Component
import React from "react";
import dynamic from "next/dynamic";

// Dynamically import heavier sections (optional optimization)
const HeroSection = dynamic(() => import("./components/sections/HeroSection"));
const AboutSection = dynamic(() =>
  import("./components/sections/AboutSection")
);
const ServicesSection = dynamic(() =>
  import("./components/sections/ServicesSection")
);
const WhyChooseSection = dynamic(() =>
  import("./components/sections/WhyChooseSection")
);
const OurExpertiseSection = dynamic(() =>
  import("./components/sections/OurExpertiseSection")
);
const FeaturedProjectsSection = dynamic(() =>
  import("./components/sections/FeaturedProjects")
);
const TestimonialsSection = dynamic(() =>
  import("./components/sections/TestimonialsSection")
);
const ContactSection = dynamic(() =>
  import("./components/sections/ContactSection")
);

const HomePage = () => {
  return (
    <main className="w-full bg-white overflow-hidden">
      {/* Hero Section */}
      <section id="hero">
        <HeroSection />
      </section>

      {/* About Section */}
      <section id="about" className="scroll-mt-20">
        <AboutSection />
      </section>

      {/* Services Section */}
      <section id="services" className="scroll-mt-20">
        <ServicesSection />
      </section>

      {/* Why Choose Us Section */}
      <section id="why-choose-us" className="scroll-mt-20">
        <WhyChooseSection />
      </section>

      {/* Our Expertise Section */}
      <section id="expertise" className="scroll-mt-20">
        <OurExpertiseSection />
      </section>

      {/* Projects Section */}
      <section id="projects" className="scroll-mt-20">
        <FeaturedProjectsSection />
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="scroll-mt-20">
        <TestimonialsSection />
      </section>

      {/* Contact Section */}
      <section id="contact" className="scroll-mt-20">
        <ContactSection />
      </section>
    </main>
  );
};

export default HomePage;
