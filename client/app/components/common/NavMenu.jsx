import React from "react";

const links = ["HOME", "ABOUT", "PORTFOLIO", "BLOG"];

const NavMenu = ({ menuOpen }) => (
  <nav className={`${menuOpen ? "block" : "hidden"} lg:block w-full lg:w-auto`}>
    <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-16 xl:gap-20 py-4 lg:py-0">
      {links.map((link) => (
        <button
          key={link}
          role="menuitem"
          className="text-base sm:text-base lg:text-lg font-medium font-muller text-global-1 hover:text-global-2 transition-colors duration-200 py-2 lg:py-0"
        >
          {link}
        </button>
      ))}
    </div>
  </nav>
);

export default NavMenu;
