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
    <div className="mt-[10vh] px-2 sm:px-3 lg:px-14 py-7 sm:py-8 lg:py-7">
      <div className="px-[5vw]">
        <div className="flex items-start">
          <h1 className="text-8xl w-8/12 font-semibold">{blogs[0].title}</h1>
          <div className="w-4/12">
            <p className="text-3xl font-light mb-4">{blogs[0].description}</p>
            <button className="bg-newOrange text-black py-2 font-medium px-12 text-lg rounded-full">
              Read full blog
            </button>
          </div>
        </div>
        <Image
          src={blogs[0].img}
          alt={blogs[0].title + " Image"}
          width={10000}
          height={10000}
          className="my-10"
        />
      </div>
      <div className="px-[5vw]">
        {blogs?.slice(1).map((blog, index) => (
          <div
            key={index}
            className="mb-8 bg-[#EBEBEB] p-9 rounded-[50px] flex items-center"
          >
            <Image
              src={blog?.img}
              alt={blog?.title + " Image"}
              width={10000}
              height={10000}
              className="w-[23%] aspect-squre"
            />
            <div className="pl-9">
              <h2 className="text-3xl font-bold mb-2">{blog.title}</h2>
              <p className="text-xl mt-2">{blog.description}</p>
              <div className="mt-4 flex justify-end">
                <button className="bg-newOrange text-black py-3 px-10 text-lg rounded-full">
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
