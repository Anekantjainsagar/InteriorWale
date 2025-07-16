import { usePathname, useRouter } from "next/navigation";
import React from "react";

const links = [
  { title: "HOME", link: "/" },
  { title: "ABOUT", link: "/about" },
  { title: "PORTFOLIO", link: "/portfolio" },
  { title: "BLOG", link: "/blogs" },
];

const NavMenu = ({ menuOpen }) => {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <nav
      className={`${menuOpen ? "block" : "hidden"} lg:block w-full lg:w-auto`}
    >
      <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-16 xl:gap-20 py-4 lg:py-0">
        {links.map((link) => (
          <button
            key={link?.title}
            role="menuitem"
            className={`text-base sm:text-base lg:text-lg font-medium font-muller ${
              pathname === link?.link ? "text-global-2" : "text-global-1"
            } hover:text-global-2 transition-colors duration-200 py-2 lg:py-0`}
            onClick={() => {
              router.push(link?.link);
            }}
          >
            {link?.title}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default NavMenu;
