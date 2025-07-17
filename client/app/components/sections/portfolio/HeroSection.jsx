import Image from "next/image";
import React from "react";

const HeroSection = () => {
  return (
    <div className="px-[5vw] mt-[3vw] mb-[6vw] relative">
      <p className="bg-black text-white text-xl py-3 px-10 rounded-full border-[10px] border-newOrange w-fit absolute left-1/2 -translate-x-1/2 -top-8">
        Best of the Year
      </p>
      <Image
        src={"/images/portfolio/hero.png"}
        alt="Hero Portfolio Interior Wale"
        width={10000}
        height={10000}
      />
      <div className="flex flex-col items-end absolute right-[8vw] -bottom-[15vh]">
        <Image
          src="/images/aman.png"
          alt="Founder of Interior Wale"
          width={1000}
          height={1000}
          className="w-[7vw]"
        />
        <h4 className="text-[30px] font-semibold">Founder</h4>
        <p className="text-3xl font-light">Prasad Vitkar</p>
      </div>
    </div>
  );
};

export default HeroSection;
