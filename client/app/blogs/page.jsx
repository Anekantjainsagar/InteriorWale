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
    <div className="px-2 sm:px-3 lg:px-14 py-7 sm:py-8 lg:py-7">
      {blogs.map((blog, index) => (
        <div key={index} className="mb-8 bg-[#EBEBEB] p-9 rounded-[50px] flex">
          <Image
            src={blog?.img}
            alt={blog?.title + " Image"}
            width={10000}
            height={10000}
            className="w-[23%] aspect-squre"
          />
          <div className="pb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {blog.title}
            </h2>
            <p className="text-gray-600 mb-4">{blog.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogCards;
