import React from "react";
import Header from "../components/sections/portfolio/Header";
import PortfolioSection from "../components/sections/portfolio/PortfolioSection";
import HeroSection from "../components/sections/portfolio/HeroSection";
import Numbers from "../components/sections/portfolio/Numbers";

const PortfolioPage = () => {
  return (
    <div className="px-4 sm:px-6 lg:px-14 py-6 sm:py-8 lg:py-7 mt-[8vh] md:mt-[10vh]">
      <Header />
      <HeroSection />
      <Numbers />
      <PortfolioSection />
    </div>
  );
};

export default PortfolioPage;
