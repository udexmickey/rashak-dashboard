"use client";

import React, { useState, ChangeEvent, useEffect } from "react";
import {
  TextField,
  Button,
  Paper,
  Typography,
  Box,
  IconButton,
  Stack,
} from "@mui/material";
import { IoMdPhotos } from "react-icons/io";
import Image from "next/image";
import useUnsavedFormChanges from "@/hooks/useUnsavedFormChanges";
import { UpdateNewsPostFormProps } from "@/utils/types/UpdateNewsPostFormProps";
import useUpdatePost from "@/hooks/UseUpdatePost";

const UpdateNewsPostForm: React.FC<UpdateNewsPostFormProps> = ({
  initialData,
}) => {
  const { setUnsavedChanges } = useUnsavedFormChanges();
  const { updatePost, loading, error, isError } = useUpdatePost("12" || "");

  const [title, setTitle] = useState<string>(initialData?.title);
  const [heroImage, setHeroImage] = useState<File | null>(initialData?.image);
  const [blogContent, setBlogContent] = useState<string>(
    initialData?.blogContent
  );
  const [youtubeLink, setYoutubeLink] = useState<string>(
    initialData?.youtubeLink
  );
  const [pressReleaseLinks, setPressReleaseLinks] = useState<string>(
    initialData?.pressReleaseLinks
  );

  const [relatedPictures, setRelatedPictures] = useState<File[]>(
    initialData.relatedPictures &&
      initialData?.relatedPictures?.map((file) => file || new File([], ""))
  );

  useEffect(() => {
    setUnsavedChanges(true);
  }, [
    title,
    heroImage,
    blogContent,
    youtubeLink,
    pressReleaseLinks,
    relatedPictures,
    setUnsavedChanges,
  ]);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleHeroImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setHeroImage(file);
  };

  const handleContentChange = (event: ChangeEvent<HTMLInputElement>) => {
    setBlogContent(event.target.value);
  };

  const handleRelatedPictureChange = (
    event: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const files = event.target.files;
    if (files) {
      const updatedPictures = [...relatedPictures];
      updatedPictures[index] = files[0];
      setRelatedPictures(updatedPictures);
    }
  };

  const handleYoutubeLinkChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setYoutubeLink(event.target.value);
  };

  const handlePressReleaseLinksChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPressReleaseLinks(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const updatedData = {
      title,
      youtubeLink,
      pressReleaseLinks,
      heroImage,
      blogContent,
      relatedPictures,
    };

    // Use the updatePost function from the hook
    await updatePost(updatedData);

    // Optionally, handle errors or perform other actions after updating
    if (!isError) {
      console.log("Post updated successfully");
      setUnsavedChanges(false);
    } else {
      console.error("Failed to update post:", error);
    }
  };

  return (
    <Paper elevation={3} className="p-8 max-w-7xl mx-auto w-full">
      <Typography variant="h5" align="left" gutterBottom>
        Update Post
      </Typography>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": {
            m: 1,
            width: "100%",
          },
        }}
        noValidate
        autoComplete="off"
        className="flex flex-col space-y-4 md:space-y-8"
        onSubmit={handleSubmit}
      >
        <TextField
          label="Title"
          variant="outlined"
          value={title}
          onChange={handleTitleChange}
          className="mb-4 max-w-[430px] w-full"
          InputProps={{
            style: {
              borderRadius: "2rem",
            },
          }}
        />

        <div className="px-2 max-w-[458px] w-full">
          <input
            type="file"
            accept="image/*"
            onChange={handleHeroImageChange}
            className="hidden"
            id="hero-image-update"
          />
          <label
            htmlFor="hero-image-update"
            className="mb-4 max-w-[458px] w-full"
          >
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
                  <div className="flex flex-col items-center justify-center pt-5 pb-6 max-w-[458px] w-full h-[35dvh]">
                    <svg
                      className="w-8 h-8 mb-4 text-gray-500 bg-[#D9D9D9]"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 bg-[#D9D9D9]">
                      <span className="font-semibold">Click to upload</span>
                    </p>
                    <p className="text-xs text-gray-500 bg-[#D9D9D9]">
                      PNG, or JPG (MAX. 800x400px)
                    </p>
                  </div>
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

        <div className="sm:mb-0 mb-8 flex flex-col gap-y-8 h-full w-full relative">
          <label htmlFor="news-content" className="block mb-1">
            Media Content
          </label>

          <TextField
            id="outlined-multiline-static"
            label="Media Content"
            multiline
            rows={10}
            variant="outlined"
            fullWidth
            className="w-full mx-auto"
            value={blogContent}
            onChange={handleContentChange}
            InputProps={{
              style: {
                height: "300px",
              },
            }}
          />
        </div>

        <label htmlFor="related-pictures" className="block mb-1">
          Related Pictures
        </label>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-2">
          {relatedPictures.map((picture, index) => (
            <div key={index} className="relative group">
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
                    src={URL.createObjectURL(picture)}
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
                    <div className="flex flex-col items-center justify-center pt-5 pb-6 max-w-xl w-full h-[30dvh]">
                      <svg
                        className="w-8 h-8 mb-4 text-gray-500 bg-[#D9D9D9]"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 16"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                      </svg>
                      <p className="mb-2 text-sm text-gray-500 bg-[#D9D9D9]">
                        <span className="font-semibold">Click to upload</span>
                      </p>
                      <p className="text-xs text-gray-500 bg-[#D9D9D9]">
                        PNG, or JPG (MAX. 800x400px)
                      </p>
                    </div>
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

        <div className="flex items-center flex-col md:flex-row md:justify-between justify-center md:gap-y-8">
          <TextField
            label="Youtube Link"
            variant="outlined"
            value={youtubeLink}
            onChange={handleYoutubeLinkChange}
            className="mb-4 max-w-[458px] w-full"
            InputProps={{
              style: {
                borderRadius: "2rem",
              },
            }}
          />

          <TextField
            label="Press Release Link"
            variant="outlined"
            value={pressReleaseLinks}
            onChange={handlePressReleaseLinksChange}
            className="mb-4 max-w-[458px] w-full"
            InputProps={{
              style: {
                borderRadius: "2rem",
              },
            }}
          />
        </div>

        <Button
          variant="contained"
          style={{ backgroundColor: "#00A651", color: "#ffffff" }}
          type="submit"
          className="px-6 !text-base py-2 mt-12 float-right mr-8 max-w-max w-full justify-end self-end justify-self-end"
          sx={{
            "&:focus": { backgroundColor: "#00A651" },
            "&.Mui-error": { backgroundColor: "red" },
          }}
        >
          Update +
        </Button>
      </Box>
    </Paper>
  );
};

export default UpdateNewsPostForm;
