"use client";
import React, { useContext, useState, useRef } from "react";
import AdminContext from "../../../Context/AdminContext";
import axios from "axios";
import API_URI from "../../../../utils/urls";
import { getCookie } from "../../../../utils/cookies";
import toast from "react-hot-toast";
import Image from "next/image";
import { useConfirm } from "@/app/(admin)/Components/Utils/ConfirmProvier";
import useS3Upload from "@/app/(admin)/Components/Utils/S3Uploader";

const ProductsPage = () => {
  const { productsCategory, products, refreshProducts } =
    useContext(AdminContext);
  const { requestConfirm } = useConfirm();
  const { uploadToS3 } = useS3Upload();

  const [loading, setLoading] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const [brochureUploading, setBrochureUploading] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    desc: "",
    image: "",
    brochure: [],
  });

  const imageInputRef = useRef(null);
  const brochureInputRef = useRef(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageUploading(true);
    try {
      const image_url = await uploadToS3(file);
      if (!image_url) throw new Error("Failed to upload image");

      setFormData((prev) => ({ ...prev, image: image_url }));
      toast.success("Product image uploaded successfully!");
    } catch (error) {
      console.error("Image upload error:", error);
      toast.error("Image upload failed. Please try again.");
    } finally {
      setImageUploading(false);
    }
  };

  const handleBrochureUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setBrochureUploading(true);
    try {
      const uploadPromises = files.map((file) => uploadToS3(file));
      const brochureUrls = await Promise.all(uploadPromises);

      setFormData((prev) => ({
        ...prev,
        brochure: [...prev.brochure, ...brochureUrls.filter((url) => url)],
      }));
      toast.success(`${files.length} brochure files uploaded successfully!`);
    } catch (error) {
      console.error("Brochure upload error:", error);
      toast.error("Brochure upload failed. Please try again.");
    } finally {
      setBrochureUploading(false);
      if (brochureInputRef.current) brochureInputRef.current.value = "";
    }
  };

  const removeBrochure = (index) => {
    setFormData((prev) => ({
      ...prev,
      brochure: prev.brochure.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.category ||
      !formData.desc ||
      !formData.image
    ) {
      toast.error("Please fill all required fields and upload product image");
      return;
    }

    setLoading(true);
    try {
      const token = getCookie("token");
      const endpoint = editingProduct
        ? `${API_URI}/api/v1/admin/products/update/${editingProduct._id}`
        : `${API_URI}/api/v1/admin/products/add`;

      const method = editingProduct ? "put" : "post";

      const response = await axios[method](endpoint, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        toast.success(
          editingProduct
            ? "Product updated successfully"
            : "Product added successfully"
        );
        refreshProducts();
        resetForm();
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "Operation failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (productId) => {
    requestConfirm(
      "Are you sure you want to delete this product?",
      async () => {
        try {
          const token = getCookie("token");
          const response = await axios.delete(
            `${API_URI}/api/v1/admin/products/delete/${productId}`,
            { headers: { Authorization: `Bearer ${token}` } }
          );

          if (response.data.success) {
            toast.success("Product deleted successfully");
            refreshProducts();
          }
        } catch (error) {
          toast.error(
            error.response?.data?.error || "Failed to delete product"
          );
        }
      }
    );
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      title: product.title,
      category: product.category._id,
      desc: product.desc,
      image: product.image,
      brochure: product.brochure || [],
    });
  };

  const resetForm = () => {
    setFormData({
      title: "",
      category: "",
      desc: "",
      image: "",
      brochure: [],
    });
    setEditingProduct(null);
    if (imageInputRef.current) imageInputRef.current.value = "";
    if (brochureInputRef.current) brochureInputRef.current.value = "";
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Products Management</h1>

      {/* Add/Edit Form */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <h2 className="text-lg font-semibold mb-4">
          {editingProduct ? "Edit Product" : "Add New Product"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full p-2 border rounded"
                placeholder="Enter product title"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="w-full p-2 border rounded"
                required
              >
                <option value="">Select Category</option>
                {productsCategory?.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Description *
            </label>
            <textarea
              value={formData.desc}
              onChange={(e) =>
                setFormData({ ...formData, desc: e.target.value })
              }
              className="w-full p-2 border rounded"
              placeholder="Enter product description"
              rows={3}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Product Image *
              </label>
              {formData.image ? (
                <div className="flex items-center space-x-4">
                  <Image
                    src={formData.image}
                    width={100}
                    height={100}
                    alt="Product preview"
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
                    ref={imageInputRef}
                    onChange={handleImageUpload}
                    disabled={imageUploading}
                    accept="image/*"
                    className="hidden"
                    id="product-image-upload"
                  />
                  <label
                    htmlFor="product-image-upload"
                    className={`cursor-pointer block ${
                      imageUploading ? "opacity-50" : ""
                    }`}
                  >
                    {imageUploading
                      ? "Uploading..."
                      : "Click to upload product image"}
                  </label>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Brochure Files
              </label>
              <div className="border-2 border-dashed rounded-md p-4">
                <input
                  type="file"
                  ref={brochureInputRef}
                  onChange={handleBrochureUpload}
                  disabled={brochureUploading}
                  multiple
                  className="hidden"
                  id="product-brochure-upload"
                />
                <label
                  htmlFor="product-brochure-upload"
                  className={`cursor-pointer block ${
                    brochureUploading ? "opacity-50" : ""
                  }`}
                >
                  {brochureUploading
                    ? "Uploading..."
                    : "Click to upload brochure files"}
                </label>

                {formData.brochure.length > 0 && (
                  <div className="mt-2 space-y-1">
                    {formData.brochure.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between text-sm"
                      >
                        <span className="truncate">
                          {file.split("/").pop()}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeBrochure(index)}
                          className="text-red-500"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex space-x-2">
            <button
              type="submit"
              disabled={loading || imageUploading || brochureUploading}
              className={`px-4 py-2 rounded-md text-white ${
                loading || imageUploading || brochureUploading
                  ? "bg-blue-300 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading
                ? editingProduct
                  ? "Updating..."
                  : "Adding..."
                : editingProduct
                ? "Update"
                : "Add"}
            </button>
            {editingProduct && (
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

      {/* Products List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Image
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Brochures
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products?.length > 0 ? (
                products.map((product) => (
                  <tr key={product._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Image
                        src={product.image}
                        width={60}
                        unoptimized
                        height={60}
                        alt={`${product.title} image`}
                        className="w-15 h-15 object-contain"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {product.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {product.category?.title || "N/A"}
                    </td>
                    <td className="px-6 py-4">
                      {product.brochure?.length > 0 ? (
                        <div className="space-y-1">
                          {product.brochure.map((file, index) => (
                            <a
                              key={index}
                              href={file}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block text-blue-600 hover:underline text-sm"
                            >
                              Brochure {index + 1}
                            </a>
                          ))}
                        </div>
                      ) : (
                        <span className="text-gray-400">None</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap space-x-2">
                      <button
                        onClick={() => handleEdit(product)}
                        className="px-3 py-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product._id)}
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
                    colSpan="5"
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    No products available
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

export default ProductsPage;
