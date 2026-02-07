"use client";
import React, { useContext, useState, useRef } from "react";
import AdminContext from "../../../../Context/AdminContext";
import axios from "axios";
import BASE_URI from "../../../../../utils/urls";
import { getCookie } from "../../../../../utils/cookies";
import toast from "react-hot-toast";
import Image from "next/image";
import { useConfirm } from "../../../Components/Utils/ConfirmProvier";
import useS3Upload from "../../../Components/Utils/S3Uploader";

const ProductCategoriesPage = () => {
  const { productsCategory, refreshProductsCategory } =
    useContext(AdminContext);
  const { requestConfirm } = useConfirm();
  const { uploadToS3 } = useS3Upload();
  const [loading, setLoading] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    image: "",
  });

  const fileInputRef = useRef(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageUploading(true);
    try {
      const image_url = await uploadToS3(file);
      if (!image_url) throw new Error("Failed to upload image");

      setFormData((prev) => ({ ...prev, image: image_url }));
      toast.success("Image uploaded successfully!");
    } catch (error) {
      console.error("Image upload error:", error);
      toast.error("Image upload failed. Please try again.");
    } finally {
      setImageUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.desc || !formData.image) {
      toast.error("Please fill all fields and upload an image");
      return;
    }

    setLoading(true);
    try {
      const token = getCookie("token");
      const endpoint = editingCategory
        ? `${BASE_URI}/api/v1/admin/products/categories/update/${editingCategory._id}`
        : `${BASE_URI}/api/v1/admin/products/categories/add`;

      const method = editingCategory ? "put" : "post";

      const response = await axios[method](endpoint, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        toast.success(
          editingCategory
            ? "Category updated successfully"
            : "Category added successfully",
        );
        refreshProductsCategory();
        resetForm();
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "Operation failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (categoryId) => {
    requestConfirm(
      "Are you sure you want to delete this category?",
      async () => {
        try {
          const token = getCookie("token");
          const response = await axios.delete(
            `${BASE_URI}/api/v1/admin/products/categories/delete/${categoryId}`,
            { headers: { Authorization: `Bearer ${token}` } },
          );

          if (response.data.success) {
            toast.success("Category deleted successfully");
            refreshProductsCategory();
          }
        } catch (error) {
          toast.error(
            error.response?.data?.error || "Failed to delete category",
          );
        }
      },
    );
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setFormData({
      title: category.title,
      desc: category.desc,
      image: category.image,
    });
  };

  const resetForm = () => {
    setFormData({
      title: "",
      desc: "",
      image: "",
    });
    setEditingCategory(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Product Categories</h1>

      {/* Add/Edit Form */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <h2 className="text-lg font-semibold mb-4">
          {editingCategory ? "Edit Category" : "Add New Category"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full p-2 border rounded"
              placeholder="Enter category title"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              value={formData.desc}
              onChange={(e) =>
                setFormData({ ...formData, desc: e.target.value })
              }
              className="w-full p-2 border rounded"
              placeholder="Enter category description"
              rows={3}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Image</label>
            {formData.image ? (
              <div className="flex items-center space-x-4">
                <Image
                  src={formData.image}
                  width={100}
                  height={100}
                  alt="Category preview"
                  className="w-24 h-24 object-contain border rounded"
                />
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, image: "" })}
                  className="text-red-500 text-sm"
                >
                  Remove
                </button>
              </div>
            ) : (
              <div className="border-2 border-dashed rounded-md p-4 text-center">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  disabled={imageUploading}
                  accept="image/*"
                  className="hidden"
                  id="category-image-upload"
                />
                <label
                  htmlFor="category-image-upload"
                  className={`cursor-pointer block ${
                    imageUploading ? "opacity-50" : ""
                  }`}
                >
                  {imageUploading
                    ? "Uploading..."
                    : "Click to upload category image"}
                </label>
              </div>
            )}
          </div>

          <div className="flex space-x-2">
            <button
              type="submit"
              disabled={loading || imageUploading}
              className={`px-4 py-2 rounded-md text-white ${
                loading || imageUploading
                  ? "bg-blue-300 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading
                ? editingCategory
                  ? "Updating..."
                  : "Adding..."
                : editingCategory
                  ? "Update"
                  : "Add"}
            </button>
            {editingCategory && (
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Categories List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Image
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {productsCategory?.length > 0 ? (
                productsCategory.map((category) => (
                  <tr key={category._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {category.title}
                    </td>
                    <td className="px-6 py-4 max-w-xs">
                      <p className="truncate">{category.desc}</p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Image
                        src={category.image}
                        width={60}
                        unoptimized
                        height={60}
                        alt={`${category.title} image`}
                        className="w-15 h-15 object-contain"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap space-x-2">
                      <button
                        onClick={() => handleEdit(category)}
                        className="px-3 py-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(category._id)}
                        className="px-3 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    No categories available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductCategoriesPage;
