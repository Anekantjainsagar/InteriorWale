import React from "react";

const HamburgerMenu = ({ menuOpen, setMenuOpen }) => (
  <button
    className="lg:hidden p-2 focus:outline-none focus:ring-2 focus:ring-global-2 rounded-md transition-all"
    aria-label="Toggle menu"
    aria-expanded={menuOpen}
    onClick={() => setMenuOpen(!menuOpen)}
  >
    <div className="w-6 h-6 relative">
      <span
        className={`block absolute left-0 w-full h-0.5 bg-global-1 transition-all duration-300 ${
          menuOpen ? "rotate-45 top-1/2 -translate-y-1/2" : "top-1"
        }`}
      ></span>
      <span
        className={`block absolute left-0 w-full h-0.5 bg-global-1 transition-all duration-300 ${
          menuOpen ? "opacity-0" : "top-1/2 -translate-y-1/2"
        }`}
      ></span>
      <span
        className={`block absolute left-0 w-full h-0.5 bg-global-1 transition-all duration-300 ${
          menuOpen ? "-rotate-45 top-1/2 -translate-y-1/2" : "bottom-1"
        }`}
      ></span>
    </div>
  </button>
);

export default HamburgerMenu;
