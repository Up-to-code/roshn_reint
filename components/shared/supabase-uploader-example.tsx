"use client";

import { CustomUploader } from "./custom-uploader";

// Example usage of the Supabase-based CustomUploader
export function SupabaseUploaderExample() {
  const handleImageUpload = (url: string) => {
    console.log("Image uploaded:", url);
    // Handle the uploaded image URL
  };

  const handleVideoUpload = (url: string) => {
    console.log("Video uploaded:", url);
    // Handle the uploaded video URL
  };

  const handleFileUpload = (url: string) => {
    console.log("File uploaded:", url);
    // Handle the uploaded file URL
  };

  return (
    <div className="space-y-8 p-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Image Upload</h3>
        <CustomUploader
          bucket="IMAGES"
          acceptedFileTypes="image"
          buttonText="Upload Image"
          onUploadComplete={handleImageUpload}
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Video Upload</h3>
        <CustomUploader
          bucket="VIDEOS"
          acceptedFileTypes="video"
          buttonText="Upload Video"
          onUploadComplete={handleVideoUpload}
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Any File Upload</h3>
        <CustomUploader
          bucket="FILES"
          acceptedFileTypes="all"
          buttonText="Upload File"
          onUploadComplete={handleFileUpload}
        />
      </div>
    </div>
  );
}
