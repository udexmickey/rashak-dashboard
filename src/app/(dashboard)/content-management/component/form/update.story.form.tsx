"use client";

import React, { useState, ChangeEvent, useEffect } from "react";
import { TextField, Paper, Typography, Box } from "@mui/material";
import useUnsavedFormChanges from "@/hooks/useUnsavedFormChanges";
import useUpdatePost from "@/hooks/UseUpdatePost";
import UpdateContentButton from "../button/updateContent.button";
import InputTextField from "../InputTextField/InputTextField";
import HeroImage from "../HeroImage/HeroImage";
import { UpdateStoryProps } from "@/utils/types/UpdateStoryProps";

const UpdateStoryPostForm: React.FC<UpdateStoryProps> = ({
  initialData,
  contentId,
}) => {
  const { setUnsavedChanges } = useUnsavedFormChanges();
  const { updatePost, loading, error, isError } = useUpdatePost(contentId);

  const [author, setAuthor] = useState<string>(initialData?.author);
  const [heroImage, setHeroImage] = useState<File | null>(initialData?.image);
  const [content, setContent] = useState<string>(initialData?.content);
  const [youtubeLink, setYoutubeLink] = useState<string>(
    initialData?.youtubeLink
  );

  useEffect(() => {
    setUnsavedChanges(true);
  }, [author, heroImage, content, youtubeLink, setUnsavedChanges]);

  const handleAuthorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuthor(event.target.value);
  };

  const handleHeroImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setHeroImage(file);
  };

  const handleContentChange = (event: ChangeEvent<HTMLInputElement>) => {
    setContent(event.target.value);
  };

  const handleYoutubeLinkChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setYoutubeLink(event.target.value);
  };

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

      // Optionally, handle errors or perform other actions after updating
      if (!isError) {
        console.log("Post updated successfully");
        setUnsavedChanges(false);
      }
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

        <div className="sm:mb-0 mb-8 flex flex-col gap-y-8 h-full w-full relative">
          <label htmlFor="story-content" className="block mb-1">
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
            value={content}
            onChange={handleContentChange}
            InputProps={{
              style: {
                height: "300px",
              },
            }}
          />
        </div>

        <div className="flex items-center flex-col md:flex-row md:justify-between justify-left md:gap-y-8">
          <InputTextField
            label={"Youtube Link"}
            value={youtubeLink}
            onChange={handleYoutubeLinkChange}
            maxWidth={458}
          />
        </div>

        <UpdateContentButton />
      </Box>
    </Paper>
  );
};

export default UpdateStoryPostForm;
