import Image from "next/image";
import React from "react";

const Numbers = () => {
  return (
    <div className="px-[5vw] flex items-stratch mb-[10vh]">
      {/* First row */}
      <div className="flex items-end">
        <Image
          src="/images/portfolio/specialized.png"
          alt="Specializing in luxury"
          width={1000}
          height={1000}
          className="h-[52vh] w-fit"
        />
        <div className="mx-14">
          <h3 className="text-8xl font-bold text-black">
            The
            <br /> 6K+
          </h3>
          <p className="text-[40px] font-light text-black mt-5">
            Specializing
            <br /> in luxury
          </p>
        </div>
      </div>
      <div className="w-[1px] bg-black h-[52vh]"></div>

      <div className="mx-14 flex flex-col justify-end">
        <h3 className="text-8xl font-bold text-black">12</h3>
        <p className="text-[40px] font-light text-black mt-5">
          Total
          <br /> Work
        </p>
      </div>
    </div>
  );
};

export default Numbers;
