
"use client";

import React, { useState } from "react";
import { toast } from "react-toastify";
import imageCompression from "browser-image-compression";

const CLOUD_NAME = "dxcrlpike";
const UPLOAD_PRESET = "LeoTechSl Projects";

const MAX_FILE_SIZE_MB = 5;

const ALLOWED_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/gif",
  "image/webp",
];

const CloudinaryImageUploader = ({
  onUploadSuccess,
  onUploadStart,
  onUploadProgress,
  onUploadComplete,
  folder = "SchoolApp/Uploads",
}) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);

  // Validate selected image.
  const validateFile = (selectedFile) => {
    if (!selectedFile) {
      return false;
    }

    if (!ALLOWED_TYPES.includes(selectedFile.type)) {
      toast.error(
        "Invalid image type. Please select JPG, PNG, GIF or WebP."
      );
      return false;
    }

    if (selectedFile.size / 1024 / 1024 > MAX_FILE_SIZE_MB) {
      toast.error(
        `File too large. Maximum size is ${MAX_FILE_SIZE_MB}MB.`
      );
      return false;
    }

    return true;
  };

  // Compress image before uploading.
  const compressImage = async (selectedFile) => {
    try {
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1024,
        useWebWorker: true,
      };

      return await imageCompression(selectedFile, options);
    } catch (err) {
      console.error("Image compression failed:", err);

      // Continue with the original file if compression fails.
      return selectedFile;
    }
  };

  // Upload image to Cloudinary.
  const uploadFile = async (selectedFile) => {
    setUploading(true);
    setProgress(0);
    setError(null);

    if (onUploadStart) {
      onUploadStart();
    }

    try {
      const formData = new FormData();

      formData.append("file", selectedFile);
      formData.append("upload_preset", UPLOAD_PRESET);
      formData.append("folder", folder);

      const xhr = new XMLHttpRequest();

      let completed = false;

      const finishUpload = () => {
        if (completed) return;

        completed = true;
        setUploading(false);

        if (onUploadComplete) {
          onUploadComplete();
        }
      };

      // Track upload progress.
      xhr.upload.addEventListener("progress", (event) => {
        if (event.lengthComputable) {
          const percent = Math.round(
            (event.loaded / event.total) * 100
          );

          setProgress(percent);

          if (onUploadProgress) {
            onUploadProgress(percent);
          }
        }
      });

      // Handle upload response.
      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const data = JSON.parse(xhr.responseText);

            if (!data.secure_url) {
              throw new Error(
                "Cloudinary did not return an image URL."
              );
            }

            setProgress(100);

            if (onUploadProgress) {
              onUploadProgress(100);
            }

            // Return the image URL and public ID to the parent.
            if (onUploadSuccess) {
              onUploadSuccess(data.secure_url, data.public_id);
            }

            setFile(null);
            setError(null);

            toast.success("Image uploaded successfully!");
          } catch (err) {
            console.error("Cloudinary response error:", err);

            const message =
              "Unable to process the Cloudinary response.";

            setError(message);
            toast.error(message);
          }
        } else {
          let errorMessage = "Image upload failed.";

          try {
            const errorData = JSON.parse(xhr.responseText);

            if (errorData?.error?.message) {
              errorMessage = errorData.error.message;
            }
          } catch {
            // Keep the default error message.
          }

          console.error(
            "Cloudinary upload failed:",
            xhr.status,
            xhr.responseText
          );

          setError(errorMessage);
          toast.error(errorMessage);
        }

        finishUpload();
      };

      // Handle network errors.
      xhr.onerror = () => {
        const message =
          "Network error. Please check your internet connection.";

        setError(message);
        toast.error(message);
        finishUpload();
      };

      // Handle cancelled requests.
      xhr.onabort = () => {
        const message = "Image upload was cancelled.";

        setError(message);
        toast.error(message);
        finishUpload();
      };

      xhr.open(
        "POST",
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`
      );

      xhr.send(formData);
    } catch (err) {
      console.error("Upload error:", err);

      const message = "Upload failed. Please try again.";

      setError(message);
      setUploading(false);
      toast.error(message);

      if (onUploadComplete) {
        onUploadComplete();
      }
    }
  };

  // Handle image selection.
  const handleFileChange = async (event) => {
    const input = event.target;
    const selectedFile = input.files?.[0];

    if (!selectedFile) {
      return;
    }

    if (!validateFile(selectedFile)) {
      input.value = "";
      return;
    }

    setFile(selectedFile);
    setError(null);

    try {
      const compressedFile = await compressImage(selectedFile);

      await uploadFile(compressedFile);
    } catch (err) {
      console.error("File processing failed:", err);

      setFile(null);

      const message = "Unable to process the selected image.";

      setError(message);
      toast.error(message);
    } finally {
      // Allow the same image to be selected again.
      input.value = "";
    }
  };

  return (
    <div className="border border-dashed border-gray-300 rounded-md p-4 text-center">
      <label
        htmlFor="image-upload-input"
        className={`font-medium ${
          uploading
            ? "text-gray-400 cursor-not-allowed"
            : "text-indigo-600 hover:text-indigo-800 cursor-pointer"
        }`}
      >
        {uploading
          ? `Uploading ${file?.name || "photo"}...`
          : "Click to select image"}

        <input
          id="image-upload-input"
          type="file"
          accept="image/jpeg,image/png,image/gif,image/webp"
          onChange={handleFileChange}
          disabled={uploading}
          className="hidden"
        />
      </label>

      {/* Upload progress */}
      {uploading && (
        <div className="w-full mt-3">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-indigo-500 h-2 rounded-full transition-all duration-200"
              style={{ width: `${progress}%` }}
            />
          </div>

          <p className="text-xs text-gray-600 mt-1">
            {progress}% uploaded
          </p>
        </div>
      )}

      {/* Error message */}
      {error && (
        <p className="text-red-500 text-sm mt-2" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};

export default CloudinaryImageUploader;
