"use client";
import React, { useContext, useState, useRef } from "react";
import AdminContext from "../../../Context/AdminContext";
import axios from "axios";
import BASE_URI from "../../../../utils/urls";
import { getCookie } from "../../../../utils/cookies";
import toast from "react-hot-toast";
import Image from "next/image";
import { useConfirm } from "../../Components/Utils/ConfirmProvier";
import useS3Upload from "../../Components/Utils/S3Uploader";

const ProductsPage = () => {
  const { products, refreshProducts } = useContext(AdminContext);
  const { requestConfirm } = useConfirm();
  const { uploadToS3 } = useS3Upload();

  const [loading, setLoading] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    image: "",
  });

  const imageInputRef = useRef(null);

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
      const endpoint = editingProduct
        ? `${BASE_URI}/api/v1/admin/products/update/${editingProduct._id}`
        : `${BASE_URI}/api/v1/admin/products/add`;

      const method = editingProduct ? "put" : "post";

      const response = await axios[method](endpoint, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        toast.success(editingProduct ? "Product updated" : "Product added");
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
            `${BASE_URI}/api/v1/admin/products/delete/${productId}`,
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
      desc: product.desc,
      image: product.image,
    });
  };

  const resetForm = () => {
    setFormData({ title: "", desc: "", image: "" });
    setEditingProduct(null);
    if (imageInputRef.current) imageInputRef.current.value = "";
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Products</h1>

        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-6">
            {editingProduct ? "Edit Product" : "Add Product"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter product title"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={formData.desc}
                onChange={(e) =>
                  setFormData({ ...formData, desc: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter product description"
                rows={4}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image
              </label>
              {formData.image ? (
                <div className="flex items-center gap-4">
                  <Image
                    src={formData.image}
                    width={120}
                    height={120}
                    alt="Preview"
                    className="w-32 h-32 object-cover rounded-lg border"
                  />
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, image: "" })}
                    className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition">
                  <input
                    type="file"
                    ref={imageInputRef}
                    onChange={handleImageUpload}
                    disabled={imageUploading}
                    accept="image/*"
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className="cursor-pointer block"
                  >
                    <div className="text-gray-600">
                      {imageUploading ? (
                        <span className="text-blue-600">Uploading...</span>
                      ) : (
                        <>
                          <svg
                            className="mx-auto h-12 w-12 text-gray-400"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 48 48"
                          >
                            <path
                              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <p className="mt-2">Click to upload image</p>
                        </>
                      )}
                    </div>
                  </label>
                </div>
              )}
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={loading || imageUploading}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
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
                  className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {products?.length > 0 ? (
              products.map((product) => (
                <div
                  key={product._id}
                  className="border rounded-lg overflow-hidden hover:shadow-lg transition"
                >
                  <div className="relative h-48 bg-gray-100">
                    <Image
                      src={product.image}
                      fill
                      unoptimized
                      alt={product.title}
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg text-gray-800 mb-2">
                      {product.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {product.desc}
                    </p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(product)}
                        className="flex-1 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition text-sm font-medium"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="flex-1 px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition text-sm font-medium"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12 text-gray-500">
                No products available
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
