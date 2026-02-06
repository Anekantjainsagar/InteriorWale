"use client";
import { getCookie } from "../../../../utils/cookies";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineEdit, AiOutlineEye } from "react-icons/ai";
import toast, { Toaster } from "react-hot-toast";
import BASE_URI, { ACTUAL_URI } from "../../../../utils/urls";
import axios from "axios";
import Link from "next/link";
import Select from "../../Components/Utils/Select";
import AdminContext from "../../../Context/AdminContext";
import { IoReload } from "react-icons/io5";
import { useConfirm } from "../../Components/Utils/ConfirmProvier";

const Blogs = () => {
  const [spinning, setSpinning] = useState(false);
  const { getBlogs, blogs } = useContext(AdminContext);
  const [sortStore, setSortStore] = useState("Sort By");

  const handleReload = async () => {
    setSpinning(true);
    await getBlogs();
    setTimeout(() => setSpinning(false), 500);
  };

  const sortedBlogs = blogs?.sort((a, b) => {
    if (sortStore === "Descending") {
      const fa = a?.title?.toLowerCase();
      const fb = b?.title?.toLowerCase();
      if (fa < fb) return 1;
      if (fa > fb) return -1;
      return 0;
    } else if (sortStore === "Ascending") {
      const fa = a?.title?.toLowerCase();
      const fb = b?.title?.toLowerCase();
      if (fa < fb) return -1;
      if (fa > fb) return 1;
      return 0;
    } else if (sortStore === "Oldest") {
      const fa = new Date(a.date);
      const fb = new Date(b.date);
      return fb - fa;
    } else if (sortStore === "Newest") {
      const fa = new Date(a.date);
      const fb = new Date(b.date);
      return fa - fb;
    }
    return 0;
  });

  return (
    <div className="bg-gray-100">
      <Toaster />
      <div className="bg-white border rounded-md pt-4 overflow-y-auto h-[85vh] shadow-md shadow-gray-200">
        <div className="text-black flex items-center justify-between px-4 border-b pb-2">
          <p className="font-bold text-2xl">All Blogs ({blogs?.length})</p>
          <div className="gap-x-4 flex items-center">
            <IoReload
              title="Refresh Data"
              className={`text-xl cursor-pointer transition-transform ${
                spinning ? "animate-spin" : ""
              }`}
              onClick={handleReload}
            />
            <Select
              value={sortStore}
              onChange={(e) => setSortStore(e.target.value)}
              options={[
                "Sort By",
                "Ascending",
                "Descending",
                "Oldest",
                "Newest",
              ]}
            />
          </div>
        </div>
        <div className="px-2 pt-2">
          {sortedBlogs?.map((blog, index) => (
            <BlogItem data={blog} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

const BlogItem = ({ data }) => {
  const router = useRouter();
  const { requestConfirm } = useConfirm();
  const { blogs, setBlogs } = useContext(AdminContext);

  const createMarkup = () => {
    return { __html: data?.content?.slice(0, 150) + "..." };
  };

  const handleDelete = () => {
    requestConfirm(
      `Are you sure you want to delete ${data?.title}?`,
      async () => {
        try {
          const response = await axios.delete(
            `${BASE_URI}/api/v1/admin/blogs/delete/${data?._id}`,
            {
              headers: {
                Authorization: `Bearer ${getCookie("token")}`,
              },
            },
          );

          if (response.status === 200) {
            setBlogs(blogs?.filter((blog) => blog?._id !== data?._id));
            toast.success("Deleted successfully");
          }
        } catch (error) {
          toast.error("Failed to delete blog");
        }
      },
    );
  };

  const blogSlug = data?.title?.toLowerCase()?.replaceAll(" ", "-");

  return (
    <div className="rounded-md flex items-center justify-between mb-3 cursor-pointer shadow-sm shadow-gray-200 p-2 hover:shadow-md transition-shadow">
      <div className="flex w-[68vw] items-center justify-between">
        <div className="w-2/12">
          <Image
            src={data?.coverImage}
            width={100}
            height={100}
            alt={data?.title}
            className="w-[10vw] rounded-md object-cover object-center"
          />
        </div>
        <div className="py-1 w-10/12 ml-3">
          <p className="text-black text-xl font-bold">{data?.title}</p>
          <div
            className="mx-0 px-0 text-gray-600"
            dangerouslySetInnerHTML={createMarkup()}
          />
        </div>
      </div>
      <div className="flex items-center space-x-3">
        <Link href={`${ACTUAL_URI}/blogs/${blogSlug}`} target="_blank">
          <AiOutlineEye
            className="text-oceanGreen bg-lightOceanGreen p-2 rounded-full hover:text-white hover:bg-oceanGreen transition-all"
            size={35}
            title="View Blog"
          />
        </Link>
        <button
          onClick={() => router.push(`/admin/blogs/${blogSlug}`)}
          title="Edit Blog"
        >
          <AiOutlineEdit
            className="text-blue-500 bg-blue-50 p-2 rounded-full hover:text-white hover:bg-blue-500 transition-all"
            size={35}
          />
        </button>
        <button onClick={handleDelete} title="Delete Blog">
          <AiOutlineDelete
            className="text-red-500 bg-red-50 p-2 rounded-full hover:text-white hover:bg-red-500 transition-all"
            size={35}
          />
        </button>
      </div>
    </div>
  );
};

export default Blogs;
