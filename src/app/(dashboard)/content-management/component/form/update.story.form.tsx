"use client";

import React, { useState, ChangeEvent, useEffect } from "react";
import { TextField, Paper, Typography, Box } from "@mui/material";
import useUnsavedFormChanges from "@/hooks/useUnsavedFormChanges";
import useUpdatePost from "@/hooks/UseUpdatePost";
import UpdateContentButton from "../button/updateContent.button";
import InputTextField from "../InputTextField/InputTextField";
import HeroImage from "../HeroImage/HeroImage";
import { UpdateStoryProps } from "@/utils/types/UpdateStoryProps";
import RichTextEditor from "../InputTextField/RichTextEditor";
import { useUpdateOneStory } from "@/hooks/content-management/useStoryHook";

const UpdateStoryPostForm: React.FC<UpdateStoryProps> = ({
  initialData,
  contentId,
}) => {
  const [author, setAuthor] = useState<string>(initialData?.author);
  const [heroImage, setHeroImage] = useState<File | null>(initialData?.image);
  const [content, setContent] = useState<string>(initialData?.content);
  const [youtubeLink, setYoutubeLink] = useState<string>(
    initialData?.youtubeLink
  );

  const handleAuthorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuthor(event.target.value);
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

  const handleYoutubeLinkChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setYoutubeLink(event.target.value);
  };

  const { setUnsavedChanges } = useUnsavedFormChanges();
  const {
    mutateAsync: updatePost,
    isPending,
    isSuccess,
    error,
    isError,
    reset,
  } = useUpdateOneStory(contentId);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const updatedData = {
        author,
        youtubeLink,
        heroImage,
        content,
      };

      // Use the updatePost function from the hook
      await updatePost(updatedData);
    } catch (error: any) {
      throw new Error("Failed to update post:", error);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        reset();
      }, 3000);
    }
    setUnsavedChanges(true);
  }, [
    author,
    heroImage,
    content,
    youtubeLink,
    setUnsavedChanges,
    isSuccess,
    reset,
  ]);

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
          label={"Author"}
          value={author}
          onChange={handleAuthorChange}
          maxWidth={430}
        />

        <HeroImage
          heroImage={heroImage}
          handleHeroImageChange={handleHeroImageChange}
          setHeroImage={setHeroImage}
        />

        <div
          className="sm:mb-0 mb-8 flex flex-col gap-y-8 max-h-[500px] h-full w-full relative"
          // style={{ height: "400px" }}
        >
          <label htmlFor="blog-content" className="block mb-1">
            Media Content
          </label>

          {/* <div className="sm:mb-0 mb-8 flex flex-col gap-y-8 h-full w-full relative">
          <label htmlFor="story-content" className="block mb-1">
            Media Content
          </label> */}
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

        {/* //Since we'll be using the RichTextEditor there is no need to change the youtube link and the rich editor */}
        <div className="flex items-center flex-col md:flex-row md:justify-between justify-left md:gap-y-8">
          <InputTextField
            label={"Youtube Link"}
            value={youtubeLink}
            onChange={handleYoutubeLinkChange}
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

export default UpdateStoryPostForm;
