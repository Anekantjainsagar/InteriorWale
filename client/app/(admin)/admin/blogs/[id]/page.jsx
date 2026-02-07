"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";
import axios from "axios";
import BASE_URI from "../../../../../utils/urls";
import { useRouter } from "next/navigation";
import { Editor } from "@tinymce/tinymce-react";
import AdminContext from "../../../../Context/AdminContext";
import { getCookie } from "../../../../../utils/cookies";
import useS3Upload from "../../../Components/Utils/S3Uploader";

const EditBlog = ({ params }) => {
  const { id } = params;
  const router = useRouter();
  const editorRef = useRef(null);
  const { uploadToS3 } = useS3Upload();
  const { blogs, refreshBlogs } = useContext(AdminContext);

  const [blogData, setBlogData] = useState({
    title: "",
    content: "",
    _id: "",
    coverImage: "",
  });
  const [loading, setLoading] = useState(true);
  const [imageUploading, setImageUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        // If blogs context is available, use it
        if (blogs && blogs.length > 0) {
          const decodedId = decodeURIComponent(id);
          const currentBlog = blogs.find(
            (blog) =>
              blog?.title?.toLowerCase()?.replace(/\s+/g, "-") ===
              decodedId.toLowerCase(),
          );

          if (currentBlog) {
            setBlogData({
              title: currentBlog.title,
              content: currentBlog.content,
              _id: currentBlog._id,
              coverImage: currentBlog.coverImage,
            });
            setLoading(false);
            return;
          }
        }

        // Fallback: Fetch the blog directly if not found in context
        const response = await axios.get(
          `${BASE_URI}/api/v1/admin/blogs/${id}`,
        );
        if (response.data) {
          setBlogData({
            title: response.data.title,
            content: response.data.content,
            _id: response.data._id,
            coverImage: response.data.coverImage,
          });
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
        toast.error("Failed to load blog data");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogData();
  }, [id, blogs]);

  // Initialize editor content when blogData is ready
  useEffect(() => {
    if (!loading && blogData.content && editorRef.current) {
      editorRef.current.setContent(blogData.content);
    }
  }, [loading, blogData.content]);

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const image_url = await uploadToS3(file);

    setImageUploading(true);
    try {
      setBlogData((prev) => ({ ...prev, coverImage: image_url }));
      toast.success("Image uploaded successfully!");
    } catch (error) {
      console.error("Image upload error:", error);
      toast.error("Image upload failed. Please try again.");
    } finally {
      setImageUploading(false);
    }
  };

  const handleSubmit = async () => {
    const editorContent = editorRef.current?.getContent();
    const { title, coverImage, _id } = blogData;

    if (!title.trim() || !coverImage || !editorContent) {
      toast.error("Please fill all required fields");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await axios.put(
        `${BASE_URI}/api/v1/admin/blogs/update/${_id}`,
        {
          coverImage,
          title: title.trim(),
          content: editorContent,
        },
        {
          headers: {
            Authorization: `Bearer ${getCookie("token")}`,
          },
        },
      );

      if (response.status === 200) {
        toast.success("Blog updated successfully");
        refreshBlogs();
        router.push("/admin/blogs");
      }
    } catch (error) {
      console.error("Blog update error:", error);
      toast.error(error.response?.data?.message || "Failed to update blog");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="h-[82vh] flex items-center justify-center">
        <p className="text-gray-500">Loading blog data...</p>
      </div>
    );
  }

  if (!blogData._id) {
    return (
      <div className="h-[82vh] flex items-center justify-center">
        <p className="text-gray-500">Blog not found</p>
      </div>
    );
  }

  return (
    <div className="h-[85vh] overflow-y-auto px-3">
      <Toaster />
      <h1 className="text-xl font-bold mb-2 cursor-pointer gradientHover w-fit text-newBlue">
        Update Blog
      </h1>

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
        apiKey="b887tqysd247td71uhou47927s7mrfwtpciezsx7sndajlol"
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue={blogData.content}
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
            "code",
            "help",
            "wordcount",
          ],
          toolbar:
            "undo redo | blocks | bold italic forecolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | removeformat | help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
      />

      {/* Image Upload Section */}
      <div className="w-8/12 mt-4 mx-auto">
        {blogData.coverImage ? (
          <Image
            width={500}
            height={300}
            src={blogData.coverImage}
            className="object-cover w-full h-auto object-center rounded-md"
            alt={`${blogData.title} cover image`}
          />
        ) : (
          <div className="h-[50vh] bg-gray-200 rounded-md flex items-center justify-center text-gray-500">
            {imageUploading ? "Uploading..." : "No image selected"}
          </div>
        )}

        <input
          type="file"
          className="my-3"
          onChange={handleImageUpload}
          disabled={imageUploading}
          accept="image/*"
        />
        {imageUploading && (
          <p className="text-sm text-center text-gray-500">
            Uploading image...
          </p>
        )}
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className={`w-full py-1.5 rounded-md mt-4 ${
          isSubmitting || imageUploading
            ? "bg-blue-300 cursor-not-allowed"
            : "bg-[#000] text-white hover:bg-blue-700"
        }`}
        disabled={isSubmitting || imageUploading}
      >
        {isSubmitting ? "Updating..." : "Update Blog"}
      </button>
    </div>
  );
};

export default EditBlog;
