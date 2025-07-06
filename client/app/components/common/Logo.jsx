import React from "react";
import Image from "next/image";

const Logo = () => (
  <div className="flex-shrink-0">
    <Image
      src="/images/img_header_logo.png"
      width={10000}
      height={10000}
      alt="The Interior Wale Logo"
      className="w-[160px] sm:w-[180px] lg:w-[216px] h-auto"
    />
  </div>
);

export default Logo;
