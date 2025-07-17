import React from "react";
import Image from "next/image";

const Logo = () => (
  <div className="flex-shrink-0">
    <Image
      src="/images/img_header_logo.png"
      width={216}
      height={60}
      alt="The Interior Wale Logo"
      className="w-[160px] lg:w-[216px] h-auto"
      priority
    />
  </div>
);

export default Logo;
