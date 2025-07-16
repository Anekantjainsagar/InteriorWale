"use client";

import Image from "next/image";

const portfolioItems = [
  {
    id: 1,
    title: "Living Room Design",
    description:
      "Britto living room design completed and drafted by The Interior wale, in Kharadi Pune. Those sofa and window shades are handcrafted by the Aslius and final finish by designer Sarthak Himself.",
    imageSrc: "/images/portfolio/Subtract.png",
  },
  {
    id: 2,
    title: "Living Room Design",
    description:
      "Britto living room design completed and drafted by The Interior wale, in Kharadi Pune. Those sofa and window shades are handcrafted by the Aslius and final finish by designer Sarthak Himself.",
    imageSrc: "/images/portfolio/Subtract (1).png",
  },
];

const PortfolioSection = () => {
  return (
    <section className="bg-white px-[5vw] grid gap-y-[8vh] mb-[8vh]">
      {portfolioItems.map((item) => (
        <div
          key={item.id}
          className="flex gap-8 items-center justify-between rounded-xl"
        >
          <div className="w-4/12">
            <h2 className="text-7xl font-semibold text-neutral-900 leading-tight">
              {item.title}
            </h2>
            <p className="text-neutral-700 text-2xl tracking-wide font-light mt-4 mb-[5vh]">
              {item.description}
            </p>
            <button className="px-10 py-4 bg-black text-lg text-newOrange font-medium rounded-full hover:bg-neutral-800 transition-all">
              Get yours now!
            </button>
          </div>

          <div className="w-5/12 overflow-hidden">
            <Image
              src={item.imageSrc}
              alt={item.title}
              width={800}
              height={600}
              className="w-full h-full object-cover"
              priority
            />
          </div>
        </div>
      ))}
    </section>
  );
};

export default PortfolioSection;
