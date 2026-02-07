"use client";
import React from "react";
import Link from "next/link";
import { BiWorld } from "react-icons/bi";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  return (
    pathname != "/admin/login" && (
      <div className="flex items-center justify-between px-5 bg-[#fff] py-3 border-b">
        <Link href="/" target="_blank">
          <div className="bg-gray-200 p-2 rounded-full cursor-pointer">
            <BiWorld size={20} />
          </div>
        </Link>
        <div className="flex items-center">
          <div className="flex flex-col items-end">
            <p className="text-newBlue font-bold">Interior Wale</p>
            <p className="mt-0 text-gray-800">Admin</p>
          </div>
        </div>
      </div>
    )
  );
};

export default Navbar;
