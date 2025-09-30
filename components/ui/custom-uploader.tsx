// components/ui/custom-uploader.tsx
"use client";

import { useState } from "react";
import { useUploadThing, type AvailableEndpoint, isAvailableEndpoint } from "@/lib/uploadthing";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Upload, X, CheckCircle, File, Image, Video, AlertCircle } from "lucide-react";

interface CustomUploaderProps {
  endpoint: AvailableEndpoint;
  onUploadComplete: (url: string) => void;
  className?: string;
  buttonText?: string;
}

export function CustomUploader({
  endpoint,
  onUploadComplete,
  className = "",
  buttonText = "Upload File"
}: CustomUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Verify the endpoint is available
  if (!isAvailableEndpoint(endpoint)) {
    return (
      <div className="p-3 border border-red-200 rounded bg-red-50">
        <div className="flex items-center gap-2 text-red-700">
          <AlertCircle className="h-4 w-4" />
          <span className="text-sm">Endpoint '{endpoint}' is not available</span>
        </div>
      </div>
    );
  }

  const { startUpload } = useUploadThing(endpoint, {
    onClientUploadComplete: (res) => {
      setIsUploading(false);
      setUploadProgress(0);
      if (res?.[0]?.url) {
        setUploadedUrl(res[0].url);
        onUploadComplete(res[0].url);
      }
    },
    onUploadError: (error: Error) => {
      setIsUploading(false);
      setUploadProgress(0);
      alert(`Upload failed: ${error.message}`);
    },
    onUploadProgress: (progress) => {
      setUploadProgress(progress);
    },
  });

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type based on endpoint name (this is a simple heuristic)
    if (endpoint.includes('image') && !file.type.startsWith('image/')) {
      alert("Please select an image file");
      return;
    }
    
    if (endpoint.includes('video') && !file.type.startsWith('video/')) {
      alert("Please select a video file");
      return;
    }

    setSelectedFile(file);
    handleUpload(file);
  };

  const handleUpload = async (file: File) => {
    setIsUploading(true);
    setUploadProgress(0);
    
    try {
      await startUpload([file]);
    } catch (error) {
      setIsUploading(false);
      setUploadProgress(0);
      console.error("Upload error:", error);
    }
  };

  const clearUpload = () => {
    setUploadedUrl(null);
    setSelectedFile(null);
    setUploadProgress(0);
  };

  const getFileIcon = () => {
    if (endpoint.includes('video')) return <Video className="h-4 w-4 mr-2" />;
    return <Image className="h-4 w-4 mr-2" />;
  };

  const getAcceptType = () => {
    if (endpoint.includes('video')) return "video/*";
    if (endpoint.includes('image')) return "image/*";
    return "*/*"; // fallback
  };

  const getFilePreview = () => {
    if (!selectedFile) return null;

    if (selectedFile.type.startsWith('image/')) {
      return (
        <img
          src={URL.createObjectURL(selectedFile)}
          alt="Preview"
          className="h-16 w-16 object-cover rounded border"
        />
      );
    } else if (selectedFile.type.startsWith('video/')) {
      return (
        <div className="h-16 w-16 bg-muted rounded border flex items-center justify-center relative">
          <Video className="h-6 w-6 text-muted-foreground" />
          <span className="text-xs absolute bottom-1 right-1 bg-black/70 text-white px-1 rounded">
            video
          </span>
        </div>
      );
    } else {
      return (
        <div className="h-16 w-16 bg-muted rounded border flex items-center justify-center">
          <File className="h-6 w-6 text-muted-foreground" />
        </div>
      );
    }
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {/* File Selection and Upload */}
      <div className="flex items-center gap-3">
        <Button
          type="button"
          variant="outline"
          disabled={isUploading}
          className="relative"
        >
          {getFileIcon()}
          {isUploading ? "Uploading..." : buttonText}
          <input
            type="file"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            onChange={handleFileSelect}
            accept={getAcceptType()}
            disabled={isUploading}
          />
        </Button>

        {(uploadedUrl || selectedFile) && !isUploading && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={clearUpload}
            className="text-muted-foreground"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Selected File Info */}
      {selectedFile && !isUploading && !uploadedUrl && (
        <div className="flex items-center gap-3 p-2 border rounded bg-muted/20">
          {getFilePreview()}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{selectedFile.name}</p>
            <p className="text-xs text-muted-foreground">
              {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
            </p>
            <p className="text-xs text-blue-600">Ready to upload</p>
          </div>
        </div>
      )}

      {/* Upload Progress */}
      {isUploading && (
        <div className="space-y-2 p-3 border rounded bg-blue-50">
          <div className="flex justify-between text-sm">
            <span className="text-blue-700">Uploading...</span>
            <span className="text-blue-700 font-medium">{uploadProgress}%</span>
          </div>
          <Progress value={uploadProgress} className="h-2 bg-blue-200" />
          <p className="text-xs text-blue-600">
            {selectedFile?.name} - {(selectedFile?.size || 0) / 1024 / 1024 > 1 
              ? `${((selectedFile?.size || 0) / 1024 / 1024).toFixed(2)} MB` 
              : `${((selectedFile?.size || 0) / 1024).toFixed(2)} KB`}
          </p>
        </div>
      )}

      {/* Success State */}
      {uploadedUrl && !isUploading && (
        <div className="flex items-center justify-between p-3 border rounded bg-green-50">
          <div className="flex items-center gap-2 text-sm text-green-700">
            <CheckCircle className="h-4 w-4" />
            <span>Upload successful!</span>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={clearUpload}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Uploaded File Preview */}
      {uploadedUrl && (
        <div className="p-3 border rounded bg-muted/20">
          <p className="text-sm font-medium mb-2">Uploaded File:</p>
          {endpoint.includes('image') ? (
            <div className="space-y-2">
              <img
                src={uploadedUrl}
                alt="Uploaded preview"
                className="h-20 w-20 object-cover rounded border"
              />
              <p className="text-xs text-muted-foreground break-all bg-muted p-2 rounded">
                {uploadedUrl}
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="relative">
                <video
                  src={uploadedUrl}
                  className="h-20 w-20 object-cover rounded border"
                  muted
                  playsInline
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-black/50 rounded-full p-1">
                    <Video className="h-6 w-6 text-white" />
                  </div>
                </div>
              </div>
              <p className="text-xs text-muted-foreground break-all bg-muted p-2 rounded">
                {uploadedUrl}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}