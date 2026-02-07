"use client";

import Image from "next/image";
import React, { useContext } from "react";
import AdminContext from "../../../../Context/AdminContext";

const Numbers = () => {
  const { products } = useContext(AdminContext);
  const totalWork = products?.length || 0;

  return (
    <div className="px-4 sm:px-8 lg:px-[5vw] mb-16 sm:mb-24 lg:mb-[10vh]">
      <div className="block lg:hidden space-y-12">
        <div className="flex text-center space-y-6">
          <Image
            src="/images/portfolio/specialized.png"
            alt="Specializing in luxury"
            width={1000}
            height={1000}
            className="h-48 sm:h-64 w-fit"
          />
          <div className="flex flex-col items-start ml-5">
            <h3 className="text-5xl sm:text-6xl font-bold text-black">
              The
              <br /> 6K+
            </h3>
            <p className="text-xl sm:text-2xl font-light text-black mt-3 text-left">
              Specializing
              <br /> in luxury
            </p>
          </div>
        </div>

        <div className="w-full h-[1px] bg-black"></div>

        <div className="text-center">
          <h3 className="text-5xl sm:text-6xl font-bold text-black">{totalWork}</h3>
          <p className="text-xl sm:text-2xl font-light text-black mt-3">
            Total
            <br /> Work
          </p>
        </div>
      </div>

      <div className="hidden lg:flex items-stretch">
        <div className="flex items-end">
          <Image
            src="/images/portfolio/specialized.png"
            alt="Specializing in luxury"
            width={1000}
            height={1000}
            className="h-[42vh] xl:h-[52vh] w-fit"
          />
          <div className="mx-8 xl:mx-14">
            <h3 className="text-6xl xl:text-8xl font-bold text-black">
              The
              <br /> 6K+
            </h3>
            <p className="text-2xl xl:text-[40px] font-light text-black mt-3 xl:mt-5">
              Specializing
              <br /> in luxury
            </p>
          </div>
        </div>

        <div className="w-[1px] bg-black h-[42vh] xl:h-[52vh]"></div>

        <div className="mx-8 xl:mx-14 flex flex-col justify-end">
          <h3 className="text-6xl xl:text-8xl font-bold text-black">{totalWork}</h3>
          <p className="text-2xl xl:text-[40px] font-light text-black mt-3 xl:mt-5">
            Total
            <br /> Work
          </p>
        </div>
      </div>
    </div>
  );
};

export default Numbers;
