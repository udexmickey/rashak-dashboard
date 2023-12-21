"use client";

import React, { useState, ChangeEvent, useEffect } from "react";
import { TextField, Paper, Typography, Box } from "@mui/material";
import useUnsavedFormChanges from "@/hooks/useUnsavedFormChanges";
import { UpdateNewsProps } from "@/utils/types/UpdateNewsType";
import useUpdatePost from "@/hooks/UseUpdatePost";
import { NewsImageGalleryProps } from "@/utils/types/PostData.types";
import UpdateContentButton from "../button/updateContent.button";
import InputTextField from "../InputTextField/InputTextField";
import HeroImage from "../HeroImage/HeroImage";
import RelatedPicturesUpdate from "../RelatedPictures/RelatedPicturesUpdate";
import RichTextEditor from "../InputTextField/RichTextEditor";
import { useUpdateOneNews } from "@/hooks/content-management/useNewsHook";

const UpdateNewsPostForm: React.FC<UpdateNewsProps> = ({
  initialData,
  contentId,
}) => {
  const { setUnsavedChanges } = useUnsavedFormChanges();

  const [title, setTitle] = useState<string>(initialData?.title);
  const [heroImage, setHeroImage] = useState<File | null>(initialData?.media);
  const [content, setContent] = useState<string>(initialData?.content);
  const [youtubeLink, setYoutubeLink] = useState<string>(
    initialData?.youtubeLink
  );
  const [pressReleaseLinks, setPressReleaseLinks] = useState<string>(
    initialData?.pressReleaseLink
  );

  const defaultImage = new File([], ""); // Replace with your default image file

  const [relatedPictures, setRelatedPictures] = useState<
    (File | NewsImageGalleryProps | null)[]
  >(initialData.imageGallery?.map((file: any) => file || defaultImage) || []);

  useEffect(() => {
    setUnsavedChanges(true);
  }, [
    title,
    heroImage,
    content,
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

  // const handleContentChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   setContent((prev) => (prev = event.target.value));
  // };

  const handleContentChange = (value: string) => {
    setContent(value);
  };

  const handleRelatedPictureChange = (
    event: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      // Assuming you want to update only the selected index
      const updatedPictures = [...relatedPictures];
      updatedPictures[index] = files[0]; // Assuming you allow only single file selection
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

  const {
    mutateAsync: updatePost,
    isPending,
    isSuccess,
    error,
    isError,
    reset,
  } = useUpdateOneNews(contentId);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const updatedData = {
        title,
        youtubeLink,
        pressReleaseLinks,
        heroImage,
        content,
        relatedPictures,
        mediaType: "image",
      };

      // Use the updatePost function from the hook
      await updatePost(updatedData);
      reset();
    } catch (error: any) {
      throw new Error("Failed to update post:", error);
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
        <InputTextField
          label={"Title"}
          value={title}
          onChange={handleTitleChange}
          maxWidth={430}
        />

        <HeroImage
          heroImage={heroImage}
          handleHeroImageChange={handleHeroImageChange}
          setHeroImage={setHeroImage}
        />

        <div className="sm:mb-0 mb-8 flex flex-col gap-y-8 max-h-[500px] h-full w-full relative">
          <label htmlFor="news-content" className="block mb-1">
            Media Content
          </label>
          {/* <TextField
            id="outlined-multiline-static"
            label="Media Content"
            multiline
            rows={10}
            variant="outlined"
            fullWidth
            className="w-full mx-auto"
            value={content}
            onChange={handleContentChange}
            InputProps={{
              style: {
                height: "300px",
              },
            }}
          /> */}
          <RichTextEditor value={content} onChange={handleContentChange} />
        </div>

        {/* Replace the RelatedPictures section with the RelatedPictures component */}
        <label htmlFor="related-pictures" className="block mb-1">
          Related Pictures
        </label>
        <RelatedPicturesUpdate
          relatedPictures={relatedPictures}
          handleRelatedPictureChange={handleRelatedPictureChange}
        />

        <div className="flex items-center flex-col md:flex-row md:justify-between justify-center md:gap-y-8">
          <InputTextField
            label={"Youtube Link"}
            value={youtubeLink}
            onChange={handleYoutubeLinkChange}
            maxWidth={458}
          />

          <InputTextField
            label={"Press Release Link"}
            value={pressReleaseLinks}
            onChange={handlePressReleaseLinksChange}
            maxWidth={458}
          />
        </div>

        {isError && (
          <p>
            Error: {` `}
            <span className="text-[#ff0000]">
              {` `} {error?.message}
            </span>
          </p>
        )}
        {isPending && (
          <p>
            Please wait: {` `}
            <span className="text-[#f1c557]">
              {` `} While post is updating...
            </span>
          </p>
        )}
        {isSuccess && (
          <p>
            Successfully: {` `}
            <span className="text-[#00A651]">{` `} Updated</span>
          </p>
        )}
        <UpdateContentButton />
      </Box>
    </Paper>
  );
};

export default UpdateNewsPostForm;
