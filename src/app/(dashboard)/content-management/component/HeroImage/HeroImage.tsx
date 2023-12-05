// HeroImage.tsx

import React from "react";
import { Button, Stack, Box } from "@mui/material";
import Image from "next/image";
import DefaultContentImageUI from "../defaultContentImage/defaultContentImage";

interface HeroImageProps {
  heroImage: File | null;
  handleHeroImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setHeroImage: React.Dispatch<React.SetStateAction<File | null>>;
}

const HeroImage: React.FC<HeroImageProps> = ({
  heroImage,
  handleHeroImageChange,
  setHeroImage,
}) => {
  return (
    <div className="px-2 max-w-[458px] w-full">
      <input
        type="file"
        accept="image/*"
        onChange={handleHeroImageChange}
        className="hidden"
        id="hero-image-update"
      />
      <label htmlFor="hero-image-update" className="mb-4 max-w-[458px] w-full">
        <div className="h-full cursor-grab min-h-full relative flex md:justify-start items-center justify-center">
          {heroImage ? (
            <Image
              src={
                typeof heroImage === "string"
                  ? heroImage
                  : URL.createObjectURL(heroImage)
              }
              width={450}
              height={450}
              priority
              quality={100}
              alt="File Preview"
              className="max-w-xl w-full h-[35dvh] object-cover bg-slate-200"
            />
          ) : (
            <Box
              sx={{ bgcolor: "#D9D9D9", height: "35dvh" }}
              className="max-w-[458px] w-full"
            >
              {/* ... Default Image UI ... */}
              <DefaultContentImageUI maxWidth={458} height={35} />
            </Box>
          )}
        </div>
      </label>

      <Stack spacing={4} direction="row" className="my-4">
        <Button variant="outlined">
          <label htmlFor="hero-image-update">Replace</label>
        </Button>
        <Button variant="outlined" onClick={() => setHeroImage(null)}>
          Delete
        </Button>
      </Stack>
    </div>
  );
};

export default HeroImage;
