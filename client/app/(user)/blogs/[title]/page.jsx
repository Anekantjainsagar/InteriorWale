"use client";
import Image from "next/image";
import React, { useContext } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import AdminContext from "../../../Context/AdminContext";

const BlogPage = () => {
  const params = useParams();
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

  const truncateTitle = (title, maxLength) => {
    return title?.length > maxLength ? title.slice(0, maxLength) + "..." : title;
  };
  
  const blog = blogs?.find(
    (b) => b.title?.toLowerCase()?.replaceAll(" ", "-") === decodeURIComponent(params.title)
  );

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">Blog not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <div className="px-4 sm:px-6 lg:px-14 pt-8 md:pt-12 lg:pt-16">
        {/* Breadcrumb */}
        <nav className="mb-6 md:mb-8">
          <Link
            href="/"
            className="text-gray-500 hover:text-newOrange transition-colors text-sm md:text-base"
          >
            Home
          </Link>
          <span className="mx-2 text-gray-400">/</span>
          <Link
            href="/blogs"
            className="text-gray-500 hover:text-newOrange transition-colors text-sm md:text-base"
          >
            Blogs
          </Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-700 text-sm md:text-base">
            {blog.title}
          </span>
        </nav>

        {/* Blog Header */}
        <div className="max-w-5xl mx-auto text-center mb-8 md:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-4 md:mb-6 leading-tight">
            {blog.title}
          </h1>

          {/* Featured Image */}
          <div className="mb-8 md:mb-12">
            <Image
              src={blog.coverImage}
              alt={blog.title}
              width={1200}
              height={700}
              className="w-full h-auto rounded-2xl md:rounded-3xl"
            />
          </div>
        </div>
      </div>

      {/* Blog Content */}
      <div className="px-4 sm:px-6 lg:px-14 pb-12">
        <div className="max-w-5xl mx-auto">
          <article className="prose prose-sm sm:prose-base md:prose-lg lg:prose-xl max-w-none break-words overflow-wrap-anywhere prose-headings:font-bold prose-headings:text-black prose-h1:text-2xl sm:prose-h1:text-3xl md:prose-h1:text-4xl prose-h2:text-xl sm:prose-h2:text-2xl md:prose-h2:text-3xl prose-h3:text-lg sm:prose-h3:text-xl md:prose-h3:text-2xl prose-h4:text-base sm:prose-h4:text-lg md:prose-h4:text-xl prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4 prose-a:text-newOrange prose-a:font-medium prose-a:break-words hover:prose-a:underline prose-strong:text-black prose-strong:font-semibold prose-ul:list-disc prose-ul:ml-6 prose-ul:text-gray-700 prose-ol:list-decimal prose-ol:ml-6 prose-ol:text-gray-700 prose-li:mb-2 prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm prose-code:break-all prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:p-4 prose-pre:rounded-lg prose-pre:overflow-x-auto prose-blockquote:border-l-4 prose-blockquote:border-newOrange prose-blockquote:pl-4 prose-blockquote:italic prose-img:rounded-xl prose-img:shadow-lg prose-img:max-w-full [&_*]:break-words [&_*]:overflow-wrap-anywhere">
            <div className="break-words" dangerouslySetInnerHTML={{ __html: blog.content }} />
          </article>
        </div>
      </div>

      {/* Related Blogs Section */}
      <div className="px-4 sm:px-6 lg:px-14 py-12 md:py-16 lg:py-20 bg-gray-50 mt-12 md:mt-16">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-8 md:mb-12 text-center">
            Related Articles
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {blogs?.slice(0, 2).map((relatedBlog, index) => (
              <Link
                key={index}
                href={`/blogs/${relatedBlog.title?.toLowerCase()?.replaceAll(" ", "-")}`}
                className="group bg-white rounded-2xl md:rounded-3xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
              >
                <div className="aspect-video overflow-hidden">
                  <Image
                    src={relatedBlog.coverImage}
                    alt={relatedBlog.title}
                    width={600}
                    height={400}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-5 md:p-6">
                  <h4 className="text-lg md:text-xl font-bold text-black group-hover:text-newOrange transition-colors line-clamp-2">
                    {truncateTitle(relatedBlog.title, 50)}
                  </h4>
                  <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                    {truncateText(relatedBlog.content, 190)}
                  </p>
                  <div className="mt-4 flex justify-end">
                    <span className="bg-newOrange text-black px-4 md:px-6 py-2 text-sm md:text-base rounded-full group-hover:bg-opacity-90 transition-colors">
                      Read More
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Back to Blogs */}
      <div className="px-4 sm:px-6 lg:px-14 py-8 md:py-12 text-center">
        <Link
          href="/blogs"
          className="inline-flex items-center gap-2 bg-newOrange text-black px-6 md:px-8 py-3 md:py-4 rounded-full font-medium text-base md:text-lg hover:bg-opacity-90 transition-colors"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to All Blogs
        </Link>
      </div>
    </div>
  );
};

export default BlogPage;
