import Image from "next/image";
import React from "react";

const BlogCards = () => {
  const blogs = [
    {
      img: "/images/blogs/home.png",
      title: "Luxurious Interior And Industrial Design",
      description:
        "A limited edition of wirk by the interior wale makes us the only one in pune to provide such good services.",
    },
    {
      img: "/images/blogs/1.png",
      title:
        "Brand strategy to create stunning interior to attract more customers ...",
      description:
        "If you see this site regularly and would like to help keep the site on the Internet, please consider donating a small sum to help pay for the hosting and bandwidth bill. There is no minimum donation, any sum is appreciated - click base to donate using PayPal. Thank you for your support. Donate bitcoin: 1610Lq1zHZ2CfWnhygmV6p4bAb2CDj4fbyF",
    },
    {
      img: "/images/blogs/2.png",
      title:
        "Brand strategy to create stunning interior to attract more customers ...",
      description:
        "If you see this site regularly and would like to help keep the site on the Internet, please consider donating a small sum to help pay for the hosting and bandwidth bill. There is no minimum donation, any sum is appreciated - click base to donate using PayPal. Thank you for your support. Donate bitcoin: 1610Lq1zHZ2CfWnhygmV6p4bAb2CDj4fbyF",
    },
  ];

  return (
    <div className="mt-[8vh] md:mt-[10vh] px-4 sm:px-6 lg:px-14 py-6 sm:py-8 lg:py-7">
      {/* Featured Blog (First Blog) */}
      <div className="px-0 md:px-[5vw] mb-10 md:mb-16">
        <div className="flex flex-col lg:flex-row items-start gap-6 lg:gap-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-semibold lg:w-8/12">
            {blogs[0].title}
          </h1>
          <div className="lg:w-4/12">
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-light mb-4">
              {blogs[0].description}
            </p>
            <button className="bg-newOrange text-black py-2 px-6 sm:px-8 md:px-10 lg:px-12 font-medium text-base sm:text-lg rounded-full hover:bg-opacity-90 transition-colors">
              Read full blog
            </button>
          </div>
        </div>
        <div className="mt-6 md:mt-10">
          <Image
            src={blogs[0].img}
            alt={blogs[0].title + " Image"}
            width={1000}
            height={600}
            className="w-full h-auto rounded-2xl md:rounded-3xl"
          />
        </div>
      </div>

      {/* Additional Blogs */}
      <div className="px-0 md:px-[5vw]">
        {blogs?.slice(1).map((blog, index) => (
          <div
            key={index}
            className="mb-6 md:mb-8 bg-[#EBEBEB] p-5 sm:p-6 md:p-7 lg:p-9 rounded-3xl md:rounded-[50px] flex flex-col sm:flex-row items-center gap-5 md:gap-7"
          >
            <div className="w-full sm:w-[40%] md:w-[30%] lg:w-[23%]">
              <Image
                src={blog?.img}
                alt={blog?.title + " Image"}
                width={400}
                height={300}
                className="w-full h-auto aspect-video sm:aspect-square object-cover rounded-2xl"
              />
            </div>
            <div className="w-full sm:w-[60%] md:w-[70%] lg:w-[77%] sm:pl-0 md:pl-5 lg:pl-9">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 md:mb-3">
                {blog.title}
              </h2>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl mt-2 line-clamp-3 md:line-clamp-4">
                {blog.description}
              </p>
              <div className="mt-4 md:mt-6 flex justify-end">
                <button className="bg-newOrange text-black py-2 px-6 sm:py-2.5 sm:px-8 md:py-3 md:px-10 text-sm sm:text-base md:text-lg rounded-full hover:bg-opacity-90 transition-colors">
                  Read full blog
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogCards;
