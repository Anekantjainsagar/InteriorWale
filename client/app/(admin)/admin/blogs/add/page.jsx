"use client";
import React, { useContext, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";
import axios from "axios";
import BASE_URI from "../../../../../utils/urls";
import { useRouter } from "next/navigation";
import { Editor } from "@tinymce/tinymce-react";
import { getCookie } from "../../../../../utils/cookies";
import AdminContext from "../../../../Context/AdminContext";
import useS3Upload from "@/app/(admin)/Components/Utils/S3Uploader";

const AddBlog = () => {
  const router = useRouter();
  const { uploadToS3 } = useS3Upload();

  const editorRef = useRef(null);
  const { setBlogs, blogs } = useContext(AdminContext);

  const [blogData, setBlogData] = useState({
    title: "",
    coverImage: "",
    content: "",
  });
  const [uploadingImage, setUploadingImage] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const image_url = await uploadToS3(file);

    setUploadingImage(true);
    try {
      setBlogData((prev) => ({ ...prev, coverImage: image_url }));
      toast.success("Image uploaded successfully!");
    } catch (error) {
      console.error("Image upload error:", error);
      toast.error("Image upload failed. Please try again.");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async () => {
    const content = editorRef.current?.getContent();
    const { title, coverImage } = blogData;

    if (!title.trim() || !coverImage || !content) {
      toast.error("Please fill all the required fields.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await axios.post(
        `${BASE_URI}/api/v1/admin/blogs/add`,
        {
          coverImage,
          title: title.trim(),
          content,
        },
        {
          headers: {
            Authorization: `Bearer ${getCookie("token")}`,
          },
        }
      );

      if (response.status === 201) {
        setBlogs([...blogs, response.data.data]);
        toast.success("Blog added successfully!");
        router.push("/admin/blogs");
      }
    } catch (error) {
      console.error("Blog submission error:", error);
      toast.error(error?.response?.data?.message || "Failed to save blog");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="h-[85vh] overflow-y-auto">
      <Toaster />
      <h1 className="text-3xl font-bold mb-4 cursor-pointer gradientHover w-fit text-newBlue">
        Add New Blog
      </h1>

      <div className="px-2">
        {/* Blog Title Input */}
        <input
          type="text"
          value={blogData.title}
          onChange={(e) => setBlogData({ ...blogData, title: e.target.value })}
          className="px-4 border w-full outline-none py-1.5 rounded-md mb-4"
          placeholder="Enter Blog Title *"
        />

        {/* Rich Text Editor */}
        <Editor
          apiKey="v5g5xmda9fvo0yeamk1rlz044km4taq3tlbvkuw0ljtbqiy7"
          onInit={(evt, editor) => (editorRef.current = editor)}
          init={{
            height: 500,
            menubar: false,
            plugins: [
              "advlist",
              "autolink",
              "lists",
              "link",
              "image",
              "charmap",
              "preview",
              "anchor",
              "searchreplace",
              "visualblocks",
              "code",
              "fullscreen",
              "insertdatetime",
              "media",
              "table",
              "help",
              "wordcount",
            ],
            toolbar:
              "undo redo | blocks | bold italic forecolor | alignleft aligncenter " +
              "alignright alignjustify | bullist numlist outdent indent | removeformat | help",
            content_style: 'body {font-family: "Vilsuve"; font-size:14px }',
          }}
        />

        {/* Image Upload Section */}
        <div className="w-8/12 mt-4 mx-auto">
          {blogData.coverImage ? (
            <Image
              width={100}
              height={100}
              src={blogData.coverImage}
              className="object-cover w-full object-center rounded-md"
              alt="Blog cover preview"
            />
          ) : (
            <div className="h-[50vh] bg-gray-200 rounded-md flex items-center justify-center text-gray-500">
              {uploadingImage ? "Uploading..." : "Image Preview"}
            </div>
          )}
          <input
            type="file"
            className="my-3"
            onChange={handleImageUpload}
            disabled={uploadingImage}
            accept="image/*"
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={uploadingImage || isSubmitting}
          className={`w-full py-1.5 rounded-md text-white ${
            isSubmitting || uploadingImage
              ? "bg-blue-300 cursor-not-allowed"
              : "bg-newBlue hover:bg-blue-700 transition-colors"
          }`}
        >
          {isSubmitting ? "Saving Blog..." : "Save Blog"}
        </button>
      </div>
    </div>
  );
};

export default AddBlog;
