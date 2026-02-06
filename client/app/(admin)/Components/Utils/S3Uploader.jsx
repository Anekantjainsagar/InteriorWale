import { useState } from "react";
import AWS from "aws-sdk";

const useS3Upload = () => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const uploadToS3 = async (file) => {
    setUploading(true);
    setError(null);

    // Configure AWS
    AWS.config.update({
      accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY,
      secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_KEY,
      region: "ap-south-1",
    });

    const s3 = new AWS.S3({
      params: { Bucket: "efuel-img" },
      region: "ap-south-1",
    });

    const params = {
      Bucket: "efuel-img",
      Key: `photos/${Date.now()}_${file.name}`,
      Body: file,
      ContentType: file.type,
    };

    try {
      const data = await s3.upload(params).promise();
      return data.Location;
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
