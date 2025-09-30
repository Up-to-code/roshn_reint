// components/debug-uploadthing.tsx
"use client";

import { getAvailableEndpoints } from "@/lib/uploadthing";

export function DebugUploadThing() {
  const endpoints = getAvailableEndpoints();
  
  return (
    <div className="p-4 border rounded bg-yellow-50">
      <h3 className="font-medium text-yellow-800 mb-2">Available UploadThing Endpoints:</h3>
      {endpoints.length === 0 ? (
        <p className="text-sm text-yellow-700">No endpoints found</p>
      ) : (
        <ul className="list-disc list-inside">
          {endpoints.map((endpoint) => (
            <li key={endpoint} className="text-sm text-yellow-700">
              {endpoint}
            </li>
          ))}
        </ul>
      )}
      <p className="text-xs text-yellow-600 mt-2">
        Check your app/api/uploadthing/core.ts file to add more endpoints.
      </p>
    </div>
  );
}