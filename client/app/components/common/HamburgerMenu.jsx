import React from "react";

const HamburgerMenu = ({ menuOpen, setMenuOpen }) => (
  <button
    className="block lg:hidden p-3"
    aria-label="Toggle menu"
    onClick={() => setMenuOpen(!menuOpen)}
  >
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
  </button>
);

export default HamburgerMenu;
