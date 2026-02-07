"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import AdminContext from "../../../../Context/AdminContext";

const PortfolioSection = () => {
  const history = useRouter();
  const { products } = useContext(AdminContext);

  return (
    <section className="bg-white px-4 sm:px-6 md:px-8 lg:px-[5vw] grid gap-y-8 md:gap-y-12 lg:gap-y-[8vh] mb-8 md:mb-12 lg:mb-[8vh]">
      {products?.map((item) => (
        <div
          key={item._id}
          className="flex flex-col lg:flex-row gap-6 md:gap-8 items-center justify-between rounded-xl"
        >
          <div className="w-full lg:w-4/12 order-2 lg:order-1">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold text-neutral-900 leading-tight">
              {item.title}
            </h2>
            <p className="text-neutral-700 text-base sm:text-lg md:text-xl lg:text-2xl tracking-wide font-light mt-3 md:mt-4 mb-4 md:mb-6 lg:mb-[5vh]">
              {item.desc}
            </p>
            <button
              onClick={() => {
                history.push("/#contact");
              }}
              className="px-6 sm:px-8 md:px-10 py-3 sm:py-3.5 md:py-4 bg-black text-sm sm:text-base md:text-lg text-newOrange font-medium rounded-full hover:bg-neutral-800 transition-all w-full sm:w-auto"
            >
              Get yours now!
            </button>
          </div>

          <div className="w-full lg:w-7/12 xl:w-5/12 overflow-hidden order-1 lg:order-2">
            <Image
              src={item.image}
              alt={item.title}
              width={800}
              height={600}
              className="w-full h-auto object-cover rounded-lg"
              priority
            />
          </div>
        </div>
      ))}
    </section>
  );
};

export default PortfolioSection;
