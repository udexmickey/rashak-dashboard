import React, { ChangeEvent } from "react";
import { Box, IconButton } from "@mui/material";
import { IoMdPhotos } from "react-icons/io";
import {
  BlogImageGalleryProps,
  NewsImageGalleryProps,
} from "@/utils/types/PostData.types";
import Image from "next/image";
import DefaultContentImageUI from "../defaultContentImage/defaultContentImage";

interface RelatedPicturesProps {
  relatedPictures:
    | (File | NewsImageGalleryProps | null)[]
    | (File | BlogImageGalleryProps | null)[];
  handleRelatedPictureChange: (
    event: ChangeEvent<HTMLInputElement>,
    index: number
  ) => void;
}

const RelatedPictures: React.FC<RelatedPicturesProps> = ({
  relatedPictures,
  handleRelatedPictureChange,
}) => {
  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-2">
      {relatedPictures &&
        relatedPictures.map((picture, index) => (
          <div key={index} className="relative group">
            {/* ... File Input and Label ... */}
            <input
              type="file"
              id={`related-picture-update-${index}`}
              className="hidden"
              accept="image/*"
              onChange={(e) => handleRelatedPictureChange(e, index)}
              multiple
            />
            <label
              htmlFor={`related-picture-update-${index}`}
              className="w-full h-full cursor-pointer"
            >
              {picture ? (
                <Image
                  src={
                    (typeof picture === "object" && "media" in picture) ||
                    (typeof picture === "object" && "image" in picture)
                      ? (picture as NewsImageGalleryProps)["media"] ??
                        (picture as unknown as BlogImageGalleryProps)["image"]
                      : URL.createObjectURL(new Blob([picture as File]))
                  }
                  width={250}
                  height={350}
                  alt={`File Preview ${index + 1}`}
                  className="max-w-xl w-full h-[30dvh] object-cover bg-slate-200"
                />
              ) : (
                <Box
                  sx={{ bgcolor: "#D9D9D9", height: "30dvh" }}
                  className="max-w-sm w-full"
                >
                  {/* ... Default Image UI ... */}
                  <DefaultContentImageUI maxWidth={458} height={30} />
                </Box>
              )}
            </label>
            {picture && (
              <div className="absolute bottom-0 right-0">
                <IconButton
                  size="small"
                  color="primary"
                  onClick={(e) => handleRelatedPictureChange(e as any, index)}
                >
                  <IoMdPhotos />
                </IconButton>
              </div>
            )}
          </div>
        ))}
    </div>
  );
};

export default RelatedPictures;
