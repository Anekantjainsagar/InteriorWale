"use client";
import React, { useState } from "react";
import Logo from "./Logo";
import HamburgerMenu from "./HamburgerMenu";
import NavMenu from "./NavMenu";
import CTABtn from "./CTABtn";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full px-4 lg:px-14 py-5 fixed top-0 left-0 z-50 bg-white">
      <div className="max-w-[1800px] mx-auto flex justify-between items-center">
        {/* Logo - Left aligned */}
        <div className="flex items-center">
          <Logo />
        </div>

        {/* Middle Navigation - Centered */}
        <div className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2">
          <NavMenu />
        </div>

        {/* CTA Button - Right aligned */}
        <div className="hidden lg:block">
          <CTABtn />
        </div>

        {/* Mobile Menu Button - Only shows on mobile */}
        <div className="lg:hidden">
          <HamburgerMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        </div>
      </div>

      {/* Mobile Menu - Shows when hamburger is clicked */}
      <div className={`lg:hidden ${menuOpen ? "block" : "hidden"}`}>
        <NavMenu menuOpen={menuOpen} />
        <CTABtn />
      </div>
    </header>
  );
};

export default Header;
