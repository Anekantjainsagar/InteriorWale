import Image from "next/image";
import React from "react";
import Link from "next/link";

const BlogPage = ({ blogData }) => {
  // Sample blog data - you would pass this as props or fetch from API
  const defaultBlogData = {
    title: "Luxurious Interior And Industrial Design",
    description:
      "A limited edition of work by the interior wale makes us the only one in pune to provide such good services.",
    image: "/images/blogs/home.png",
    content: [
      {
        type: "paragraph",
        text: "In the world of interior design, the fusion of luxury and industrial elements creates spaces that are both sophisticated and raw, elegant yet edgy. This unique approach to design has revolutionized how we perceive modern living spaces, bringing together the best of both worlds to create environments that are truly extraordinary.",
      },
      {
        type: "heading",
        text: "The Art of Luxury Meets Industrial",
      },
      {
        type: "paragraph",
        text: "Luxury interior design traditionally emphasizes comfort, elegance, and high-end materials. When combined with industrial design elements – exposed brick, steel beams, concrete surfaces, and vintage machinery – the result is a space that tells a story of both refinement and authenticity.",
      },
      {
        type: "image",
        src: "/images/blogs/1.png",
        alt: "Luxury Industrial Interior Example",
        caption:
          "A perfect blend of luxury finishes with industrial structural elements",
      },
      {
        type: "paragraph",
        text: "Our approach to this design style focuses on creating harmony between contrasting elements. Soft leather furniture against rough concrete walls, crystal chandeliers suspended from exposed steel beams, and marble countertops paired with industrial pipe fixtures create visual interest and depth.",
      },
      {
        type: "heading",
        text: "Key Elements of Luxurious Industrial Design",
      },
      {
        type: "list",
        items: [
          "Exposed structural elements (beams, pipes, brick walls)",
          "High-end materials (marble, leather, premium woods)",
          "Statement lighting fixtures",
          "Neutral color palettes with metallic accents",
          "Vintage or reclaimed furniture pieces",
          "Large windows and open floor plans",
        ],
      },
      {
        type: "paragraph",
        text: "The beauty of this design philosophy lies in its flexibility. Whether you're working with a converted warehouse loft or a modern apartment, industrial luxury can be adapted to suit any space. The key is finding the right balance between raw and refined elements.",
      },
      {
        type: "heading",
        text: "Why Choose Interior Wale?",
      },
      {
        type: "paragraph",
        text: "As Pune's premier interior design firm specializing in luxury industrial spaces, we bring years of expertise and a unique vision to every project. Our team understands how to blend these contrasting styles seamlessly, creating spaces that are both functional and breathtakingly beautiful.",
      },
      {
        type: "paragraph",
        text: "From concept to completion, we work closely with our clients to ensure their vision comes to life. Our attention to detail, commitment to quality, and innovative design solutions set us apart in the industry.",
      },
    ],
    author: "Interior Wale Team",
    publishedDate: "March 15, 2024",
    readTime: "8 min read",
    tags: ["Interior Design", "Luxury", "Industrial", "Pune", "Home Decor"],
    relatedBlogs: [
      {
        title:
          "Brand strategy to create stunning interior to attract more customers",
        image: "/images/blogs/1.png",
        slug: "brand-strategy-stunning-interior",
      },
      {
        title: "Modern Minimalism: Less is More in Interior Design",
        image: "/images/blogs/2.png",
        slug: "modern-minimalism-interior-design",
      },
    ],
  };

  const blog = blogData || defaultBlogData;

  const renderContent = (contentItem, index) => {
    switch (contentItem.type) {
      case "paragraph":
        return (
          <p
            key={index}
            className="text-gray-700 text-base sm:text-lg md:text-xl leading-relaxed mb-6 md:mb-8"
          >
            {contentItem.text}
          </p>
        );

      case "heading":
        return (
          <h2
            key={index}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-4 md:mb-6 mt-8 md:mt-12"
          >
            {contentItem.text}
          </h2>
        );

      case "image":
        return (
          <div key={index} className="my-8 md:my-12">
            <Image
              src={contentItem.src}
              alt={contentItem.alt}
              width={1000}
              height={600}
              className="w-full h-auto rounded-2xl md:rounded-3xl"
            />
            {contentItem.caption && (
              <p className="text-sm md:text-base text-gray-500 text-center mt-3 italic">
                {contentItem.caption}
              </p>
            )}
          </div>
        );

      case "list":
        return (
          <ul
            key={index}
            className="list-disc list-inside space-y-2 md:space-y-3 mb-6 md:mb-8 text-gray-700 text-base sm:text-lg md:text-xl"
          >
            {contentItem.items.map((item, itemIndex) => (
              <li key={itemIndex} className="leading-relaxed">
                {item}
              </li>
            ))}
          </ul>
        );

      default:
        return null;
    }
  };

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
        <div className="max-w-4xl mx-auto text-center mb-8 md:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-4 md:mb-6 leading-tight">
            {blog.title}
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-6 md:mb-8 leading-relaxed">
            {blog.description}
          </p>

          {/* Blog Meta Info */}
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6 text-sm md:text-base text-gray-500 mb-8 md:mb-12">
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
              By {blog.author}
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clipRule="evenodd"
                />
              </svg>
              {blog.publishedDate}
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                  clipRule="evenodd"
                />
              </svg>
              {blog.readTime}
            </span>
          </div>

          {/* Featured Image */}
          <div className="mb-8 md:mb-12">
            <Image
              src={blog.image}
              alt={blog.title}
              width={1200}
              height={700}
              className="w-full h-auto rounded-2xl md:rounded-3xl"
            />
          </div>
        </div>
      </div>

      {/* Blog Content */}
      <div className="px-4 sm:px-6 lg:px-14">
        <div className="max-w-4xl mx-auto">
          <article className="prose prose-lg md:prose-xl max-w-none">
            {blog.content.map((contentItem, index) =>
              renderContent(contentItem, index)
            )}
          </article>

          {/* Tags */}
          <div className="mt-12 md:mt-16 pt-8 border-t border-gray-200">
            <h3 className="text-lg md:text-xl font-semibold text-black mb-4">
              Tags:
            </h3>
            <div className="flex flex-wrap gap-2 md:gap-3">
              {blog.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-100 text-gray-700 px-3 md:px-4 py-1.5 md:py-2 rounded-full text-sm md:text-base hover:bg-newOrange hover:text-black transition-colors cursor-pointer"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Related Blogs Section */}
      <div className="px-4 sm:px-6 lg:px-14 py-12 md:py-16 lg:py-20 bg-gray-50 mt-12 md:mt-16">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-8 md:mb-12 text-center">
            Related Articles
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {blog.relatedBlogs.map((relatedBlog, index) => (
              <Link
                key={index}
                href={`/blogs/${relatedBlog.slug}`}
                className="group bg-white rounded-2xl md:rounded-3xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
              >
                <div className="aspect-video overflow-hidden">
                  <Image
                    src={relatedBlog.image}
                    alt={relatedBlog.title}
                    width={600}
                    height={400}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-5 md:p-6">
                  <h4 className="text-lg md:text-xl font-bold text-black group-hover:text-newOrange transition-colors line-clamp-2">
                    {relatedBlog.title}
                  </h4>
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
