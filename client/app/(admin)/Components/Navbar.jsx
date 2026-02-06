"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { BiWorld } from "react-icons/bi";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  return (
    pathname != "/admin/login" && (
      <div className="flex items-center justify-between px-5 bg-[#141423] py-3 border-b">
        <Link href="/" target="_blank">
          <div className="bg-gray-200 p-2 rounded-full cursor-pointer">
            <BiWorld size={20} />
          </div>
        </Link>
        <div className="flex items-center">
          <Image
            src={"/logo-text.svg"}
            width={1000}
            height={1000}
            alt="Logo"
            className="w-[7vw] mr-4"
          />
          <div className="flex flex-col items-start">
            <p className="text-newBlue font-bold">Efuel</p>
            <p className="mt-0 text-gray-50">Admin</p>
          </div>
        </div>
      </div>
    )
  );
};

export default Navbar;
