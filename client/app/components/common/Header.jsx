"use client";
import React, { useState } from "react";
import Logo from "./Logo";
import HamburgerMenu from "./HamburgerMenu";
import NavMenu from "./NavMenu";
import CTABtn from "./CTABtn";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full px-2 sm:px-3 lg:px-14 py-7 sm:py-8 lg:py-7 fixed top-0 left-0 z-50 bg-white">
      <div className="flex flex-col lg:flex-row justify-between items-center gap-4 lg:gap-0">
        <Logo />

        <HamburgerMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

        <NavMenu menuOpen={menuOpen} />

        <CTABtn />
      </div>
    </header>
  );
};

export default Header;
