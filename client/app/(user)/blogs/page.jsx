"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";
import AdminContext from "../../Context/AdminContext";

const BlogCards = () => {
  const history = useRouter();
  const { blogs } = useContext(AdminContext);

  const stripHtml = (html) => {
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  const truncateText = (html, maxLength) => {
    const text = stripHtml(html);
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  const navigateToBlog = (blog) => {
    history.push(`/blogs/${blog?.title?.toLowerCase()?.replaceAll(" ", "-")}`);
  };

  return (
    <div className="mt-[8vh] md:mt-[10vh] px-4 sm:px-6 lg:px-14 py-6 sm:py-8 lg:py-7">
      {/* Featured Blog (First Blog) */}
      {blogs?.length > 0 && (
        <div className="px-0 md:px-[5vw] mb-10 md:mb-16">
          <div className="flex flex-col lg:flex-row items-start gap-6 lg:gap-10">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-semibold lg:w-8/12">
              {truncateText(blogs[0].title, 30)}
            </h1>
            <div className="lg:w-4/12">
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-light mb-4">
                {truncateText(blogs[0].content, 50)}
              </p>
              <button
                onClick={() => {
                  navigateToBlog(blogs[0]);
                }}
                className="bg-newOrange text-black py-2 px-6 sm:px-8 md:px-10 lg:px-12 font-medium text-base sm:text-lg rounded-full hover:bg-opacity-90 transition-colors"
              >
                Read full blog
              </button>
            </div>
          </div>
          <div className="mt-6 md:mt-10">
            <Image
              src={blogs[0].coverImage}
              alt={blogs[0].title + " Image"}
              width={1000}
              height={600}
              className="w-full h-auto rounded-2xl md:rounded-3xl border border-gray-500/50"
            />
          </div>
        </div>
      )}

      {/* Additional Blogs */}
      <div className="px-0 md:px-[5vw]">
        {blogs?.slice(1).map((blog, index) => (
          <div
            key={index}
            className="mb-6 md:mb-8 bg-[#EBEBEB] p-5 sm:p-6 md:p-7 lg:p-9 rounded-3xl md:rounded-[50px] flex flex-col sm:flex-row items-center gap-5 md:gap-7"
          >
            <div className="w-full sm:w-[40%] md:w-[30%] lg:w-[23%]">
              <Image
                src={blog?.coverImage || blog?.img}
                alt={blog?.title + " Image"}
                width={400}
                height={300}
                className="w-full h-auto aspect-video sm:aspect-square object-cover rounded-2xl"
              />
            </div>
            <div className="w-full sm:w-[60%] md:w-[70%] lg:w-[77%] sm:pl-0 md:pl-5 lg:pl-9">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 md:mb-3">
                {truncateText(blog.title, 100)}
              </h2>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl mt-2 line-clamp-3 md:line-clamp-4">
                {truncateText(blog.content, 190)}
              </p>
              <div className="mt-4 md:mt-6 flex justify-end">
                <button
                  onClick={() => {
                    navigateToBlog(blog);
                  }}
                  className="bg-newOrange text-black py-2 px-6 sm:py-2.5 sm:px-8 md:py-3 md:px-10 text-sm sm:text-base md:text-lg rounded-full hover:bg-opacity-90 transition-colors"
                >
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
