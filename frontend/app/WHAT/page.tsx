"use client";

import { CldUploadButton, CldImage } from "next-cloudinary";

export default function Home() {
  return (
    <div className="flex justify-center w-full">
      <CldUploadButton
        className="border border-red-500"
        uploadPreset="hi_bro"
        onSuccess={(results) => {
          console.log(results);
        }}
      />
    </div>
  );
}
