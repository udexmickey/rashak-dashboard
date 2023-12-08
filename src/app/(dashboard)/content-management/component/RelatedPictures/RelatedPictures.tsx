"use client";
// RelatedGallery.tsx

import React, { useState } from "react";
import Image from "next/image";

interface RelatedGalleryProps {
  selectedImages: File[];
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const RelatedGallery: React.FC<RelatedGalleryProps> = ({
  selectedImages,
  handleFileChange,
}) => {
  return (
    <div className="related-gallery">
      <input type="file" multiple onChange={handleFileChange} />

      {/* Preview selected images */}
      <div className="gallery-preview">
        {selectedImages.map((file, index) => (
          <div key={index} className="gallery-item">
            <Image
              src={URL.createObjectURL(file)}
              alt={`Preview ${index}`}
              width={100}
              height={100}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedGallery;
