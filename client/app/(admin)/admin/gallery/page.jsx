"use client";
import axios from "axios";
import Image from "next/image";
import toast from "react-hot-toast";
import API_URI from "../../../../utils/urls";
import { getCookie } from "../../../../utils/cookies";
import AdminContext from "../../../Context/AdminContext";
import useS3Upload from "../../Components/Utils/S3Uploader";
import React, { useContext, useState, useRef } from "react";
import { FiPlus, FiUpload, FiEdit2, FiTrash2 } from "react-icons/fi";

const Gallery = () => {
  const fileInputRef = useRef(null);
  const { uploadToS3 } = useS3Upload();
  const [previewUrl, setPreviewUrl] = useState("");
  const [editingItem, setEditingItem] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  // Get context and loading state
  const { gallery, refreshGallery, loading } = useContext(AdminContext);

  const handleAddClick = () => {
    setIsUploadOpen(true);
    setEditingItem(null);
    setSelectedFile(null);
    setPreviewUrl("");
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const uploadImage = async (file, itemId = null) => {
    const token = getCookie("token");
    const image_url = await uploadToS3(file);

    try {
      const endpoint = itemId
        ? `${API_URI}/api/v1/admin/gallery/update/${itemId}`
        : `${API_URI}/api/v1/admin/gallery/add`;

      const method = itemId ? "PUT" : "POST";

      const response = await axios({
        method,
        url: endpoint,
        data: { photo: image_url },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        toast.success(
          itemId ? "Image updated successfully" : "Image uploaded successfully"
        );
        await refreshGallery();
        return true;
      } else {
        toast.error(response.data.error || "Operation failed");
        return false;
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "An error occurred");
      console.error("Upload error:", error);
      return false;
    }
  };

  const deleteImage = async (itemId) => {
    const token = getCookie("token");

    try {
      const response = await axios.delete(
        `${API_URI}/api/v1/admin/gallery/delete/${itemId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        toast.success("Image deleted successfully");
        await refreshGallery();
      } else {
        toast.error(response.data.error || "Deletion failed");
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "An error occurred");
      console.error("Delete error:", error);
    }
  };

  const handleUpload = async () => {
    if (editingItem && !selectedFile) {
      // If editing but no new file selected, just close the modal
      handleCancel();
      return;
    }

    if (!selectedFile && !editingItem) {
      toast.error("Please select an image to upload");
      return;
    }

    const success = await uploadImage(selectedFile, editingItem?._id);

    if (success) {
      handleCancel();
    }
  };

  const handleCancel = () => {
    setIsUploadOpen(false);
    setSelectedFile(null);
    setPreviewUrl("");
    setEditingItem(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Reset file input
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setIsUploadOpen(true);
    setPreviewUrl(item.photo);
    setSelectedFile(null); // Clear any previously selected file
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Reset file input
    }
  };

  const handleDelete = (itemId) => {
    if (confirm("Are you sure you want to delete this image?")) {
      deleteImage(itemId);
    }
  };

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-[300px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading gallery...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Media Gallery</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {/* Gallery Items */}
        {gallery &&
          Array.isArray(gallery) &&
          gallery.map((item, i) => (
            <div
              key={i}
              className="relative group overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="aspect-square bg-gray-100">
                <Image
                  src={item.photo}
                  alt={`Gallery item ${item._id}`}
                  fill
                  unoptimized
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                <button
                  onClick={() => handleEdit(item)}
                  className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
                  title="Edit"
                >
                  <FiEdit2 className="text-blue-500" />
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
                  title="Delete"
                >
                  <FiTrash2 className="text-red-500" />
                </button>
              </div>
            </div>
          ))}

        {/* Add/Edit Item Box - Always visible at the end */}
        {isUploadOpen ? (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center aspect-square">
            {/* Always include the file input here */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />

            {previewUrl ? (
              <>
                <div className="relative w-full h-4/5 mb-2">
                  <Image
                    src={previewUrl}
                    alt="Preview"
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="flex gap-2 mt-auto">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
                  >
                    Change Image
                  </button>
                  <button
                    onClick={handleUpload}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2"
                    disabled={!selectedFile && !editingItem}
                  >
                    <FiUpload /> {editingItem ? "Update" : "Upload"}
                  </button>
                  <button
                    onClick={handleCancel}
                    className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="p-4 bg-gray-100 rounded-full mb-4 hover:bg-gray-200 transition-colors"
                >
                  <FiUpload className="text-gray-600 text-2xl" />
                </button>
                <p className="text-gray-600 text-center mb-4">
                  Click to select an image
                </p>
                <p className="text-gray-400 text-sm text-center">
                  JPG, PNG up to 5MB
                </p>
              </>
            )}
          </div>
        ) : (
          <button
            onClick={handleAddClick}
            className="border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors flex flex-col items-center justify-center aspect-square"
          >
            <FiPlus className="text-gray-400 text-4xl mb-2" />
            <span className="text-gray-500">Add New</span>
          </button>
        )}
      </div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
    </div>
  );
};

export default Gallery;
