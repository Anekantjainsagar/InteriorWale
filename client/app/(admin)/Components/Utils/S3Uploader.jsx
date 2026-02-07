import { useState } from "react";

const useS3Upload = () => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const uploadToS3 = async (file) => {
    setUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "interior");
    formData.append("folder", "photos");

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dyu0t5ec6/image/upload`,
        {
          method: "POST",
          body: formData,
        },
      );

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();
      return data.secure_url;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setUploading(false);
    }
  };

  return { uploadToS3, uploading, error };
};

export default useS3Upload;
