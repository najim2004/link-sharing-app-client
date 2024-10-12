import { useState } from "react";
import axios from "axios";

const useImageUpload = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const [uploadError, setUploadError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const uploadImage = async (file) => {
    const validImageTypes = ["image/jpeg", "image/png", "image/gif"];
    if (!validImageTypes.includes(file.type)) {
      setUploadError(
        "Invalid file type. Please upload a JPEG, PNG, or GIF image."
      );
      return;
    }

    setIsLoading(true);
    setUploadError(null);
    setIsSuccess(false);
    setImageUrl(null);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_IMGBB_API_KEY
        }`,
        formData
      );

      const uploadedUrl = response.data.data.url;
      setImageUrl(uploadedUrl);
      setIsSuccess(true);
      console.log("Image successfully uploaded:", uploadedUrl);
    } catch (error) {
      console.error("Error uploading the image:", error);
      setUploadError("Image upload failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    uploadImage,
    imageUrl,
    uploadError,
    isLoading,
    isSuccess,
  };
};

export default useImageUpload;
