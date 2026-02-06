import { usePathname, useRouter } from "next/navigation";
import React from "react";

const links = [
  { title: "HOME", link: "/" },
  { title: "ABOUT", link: "/#about" },
  { title: "PORTFOLIO", link: "/portfolio" },
  { title: "BLOG", link: "/blogs" },
];

const NavMenu = ({ menuOpen }) => {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <nav
      className={`${
        menuOpen ? "block" : "hidden"
      } lg:block w-full lg:w-auto transition-all duration-300`}
    >
      <ul className="flex flex-col lg:flex-row items-center gap-4 lg:gap-8 xl:gap-10 py-4 lg:py-0">
        {links.map((link) => (
          <li key={link.title} className="w-full lg:w-auto text-center">
            <button
              role="menuitem"
              className={`text-base lg:text-lg font-medium font-muller ${
                pathname === link.link ? "text-global-2" : "text-global-1"
              } hover:text-global-2 transition-colors duration-200 py-2 lg:py-1 px-4 w-full lg:w-auto`}
              onClick={() => router.push(link.link)}
            >
              {link.title}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavMenu;
