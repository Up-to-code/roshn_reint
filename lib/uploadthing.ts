// utils/uploadthing.ts
import {
  generateUploadButton,
  generateUploadDropzone,
  generateUploader,
} from "@uploadthing/react";
import { generateReactHelpers } from "@uploadthing/react/";

import type { OurFileRouter } from "@/app/api/uploadthing/core";

export const UploadButton = generateUploadButton<OurFileRouter>();
export const UploadDropzone = generateUploadDropzone<OurFileRouter>();
export const Uploader = generateUploader<OurFileRouter>();

export const { useUploadThing, uploadFiles } = generateReactHelpers<OurFileRouter>();

// Get the actual available endpoints
export type AvailableEndpoint = keyof OurFileRouter;

// Helper to check what endpoints are available
export function getAvailableEndpoints(): AvailableEndpoint[] {
  return Object.keys({} as OurFileRouter) as AvailableEndpoint[];
}

// Check if a specific endpoint is available
export function isEndpointAvailable(endpoint: string): endpoint is AvailableEndpoint {
  const available = getAvailableEndpoints();
  return available.includes(endpoint as AvailableEndpoint);
}