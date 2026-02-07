"use client";
import Link from "next/link";
import React, { useContext } from "react";
import { MdSupport } from "react-icons/md";
import AdminContext from "../../Context/AdminContext";
import { BsNewspaper, BsBoxSeam } from "react-icons/bs";
import {
  FiUsers,
  FiMail,
  FiImage,
  FiMap,
  FiFileText,
  FiLayers,
  FiGlobe,
} from "react-icons/fi";

const DashboardPage = () => {
  const {
    loading,
    gallery,
    contact,
    queries,
    subscribers,
    blogs,
    maps,
    supportLogos,
    products,
    productsCategory,
  } = useContext(AdminContext);

  const stats = [
    {
      title: "Queries",
      value: queries?.length || 0,
      icon: <FiMail className="text-green-500 text-2xl" />,
      link: "/admin/queries",
    },
    {
      title: "Subscribers",
      value: subscribers?.length || 0,
      icon: <FiUsers className="text-purple-500 text-2xl" />,
      link: "/admin/subscribers",
    },
    {
      title: "Blogs",
      value: blogs?.length || 0,
      icon: <BsNewspaper className="text-red-500 text-2xl" />,
      link: "/admin/blogs",
    },
    {
      title: "Product Categories",
      value: productsCategory?.length || 0,
      icon: <FiLayers className="text-teal-500 text-2xl" />,
      link: "/admin/product/categories",
    },
    {
      title: "Products",
      value: products?.length || 0,
      icon: <BsBoxSeam className="text-orange-500 text-2xl" />,
      link: "/admin/product",
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...stats]
          .sort((a, b) => a.title.localeCompare(b.title))
          .map((stat, index) => (
            <Link href={stat.link} key={index}>
              <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">{stat.title}</p>
                    <p className="text-2xl font-bold mt-1">{stat.value}</p>
                  </div>
                  <div className="p-3 bg-gray-100 rounded-full">
                    {stat.icon}
                  </div>
                </div>
                <div className="mt-4 text-sm text-blue-600 hover:text-blue-800">
                  View all →
                </div>
              </div>
            </Link>
          ))}
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <FiMail className="mr-2 text-blue-500" />
            Recent Queries
          </h2>
          <div className="space-y-4">
            {queries?.slice(0, 5).map((query, index) => (
              <div key={index} className="border-b pb-2">
                <p className="font-medium">{query.name}</p>
                <p className="text-sm text-gray-500 truncate">
                  {query.message}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {new Date(query.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
            {queries?.length === 0 && (
              <p className="text-gray-500">No recent queries</p>
            )}
          </div>
          <Link
            href="/admin/queries"
            className="mt-4 inline-block text-sm text-blue-600 hover:text-blue-800"
          >
            View all queries →
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <BsNewspaper className="mr-2 text-red-500" />
            Latest Blogs
          </h2>
          <div className="space-y-4">
            {blogs?.slice(0, 5).map((blog, index) => (
              <div key={index} className="border-b pb-2">
                <p className="font-medium">{blog.title}</p>
                <p className="text-sm text-gray-500 truncate">
                  {blog.content.replace(/<[^>]*>/g, "").substring(0, 60)}...
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Created: {new Date(blog.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
            {blogs?.length === 0 && (
              <p className="text-gray-500">No blogs available</p>
            )}
          </div>
          <Link
            href="/admin/blogs"
            className="mt-4 inline-block text-sm text-blue-600 hover:text-blue-800"
          >
            View all blogs →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
