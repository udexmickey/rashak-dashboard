"use client";
import React, { useState, ChangeEvent, useEffect } from "react";
import {
  TextField,
  Button,
  Paper,
  Typography,
  Box,
  Stack,
} from "@mui/material";
import Image from "next/image";
import useUnsavedFormChanges from "@/hooks/useUnsavedFormChanges";
import { usePostStory } from "@/hooks/content-management/useStoryHook";
import RichTextEditor from "../component/InputTextField/RichTextEditor";

const StoryPostForm: React.FC = () => {
  const { setUnsavedChanges } = useUnsavedFormChanges();

  const [author, setAuthor] = useState<string>("");
  const [heroImage, setHeroImage] = useState<File | null>(null);
  const [content, setContent] = useState<string>("");
  const [youtubeLink, setYoutubeLink] = useState<string>("");

  const handleAuthorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuthor((prev) => (prev = event.target.value));
    setUnsavedChanges(true);
  };

  const handleHeroImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setHeroImage((prev) => (prev = file));
    setUnsavedChanges(true);
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
    setYoutubeLink((prev) => (prev = event.target.value.trim()));
    setUnsavedChanges(true);
  };

  const {
    mutateAsync: postData,
    isError,
    error,
    isPending,
    isSuccess,
    isIdle,
    isPaused,
    reset,
  } = usePostStory();

  const formRef: any = React.useRef();

  // Inside handleSubmit
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const formData = {
      author: author,
      youtubeLink,
      file: heroImage,
      content: content,
    };

    await postData({ ...formData });
    setUnsavedChanges(false);

    formRef.current.reset();
    reset();
  };

  useEffect(() => {
    if (isSuccess && !isIdle) {
      setYoutubeLink((prev) => (prev = ""));
      setHeroImage((prev) => (prev = null));
      setContent((prev) => (prev = ""));
      setAuthor((prev) => (prev = ""));
    }
  }, [content, isIdle, isSuccess]);

  return (
    <Paper elevation={3} className="p-8 max-w-7xl mx-auto w-full">
      <Typography variant="h5" align="left" gutterBottom>
        Add New Post
      </Typography>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": {
            m: 1,
            width: "100%",
          },
        }}
        // noValidate
        autoComplete="on"
        autoCorrect="on"
        autoFocus
        className="flex flex-col space-y-4 md:space-y-8"
        onSubmit={handleSubmit}
        ref={formRef}
      >
        {/* Name */}
        <TextField
          label="Name"
          variant="outlined"
          value={author}
          onChange={handleAuthorChange}
          className="mb-4 max-w-[430px] w-full"
          InputProps={{
            style: {
              borderRadius: "2rem",
            },
          }}
          required={true}
        />

        {/* Hero Image */}
        <div className="px-2 max-w-[458px] w-full">
          <input
            type="file"
            accept="image/*"
            onChange={handleHeroImageChange}
            className="hidden"
            id="hero-image"
            // required
          />
          <label htmlFor="hero-image" className="mb-4 max-w-[458px] w-full">
            <div className="h-full cursor-grab min-h-full relative flex md:justify-start items-center justify-center mt-4 md:mt-6">
              {heroImage ? (
                <Image
                  src={URL.createObjectURL(heroImage)}
                  width={450}
                  height={350}
                  alt="File Preview"
                  className="max-w-xl w-full h-[30vh] object-cover bg-slate-200"
                />
              ) : (
                <Box
                  sx={{ bgcolor: "#D9D9D9", height: "30vh" }}
                  className="max-w-[458px] w-full"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6 max-w-[458px] w-full h-[30vh]">
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
              <label htmlFor="hero-image">Replace</label>
            </Button>
            <Button variant="outlined" onClick={() => setHeroImage(null)}>
              Delete
            </Button>
          </Stack>
        </div>

        {/* Content/Description Body */}
        <div
          className="sm:mb-0 mb-8 flex flex-col gap-y-8 max-h-[500px] h-full w-full relative"
          // style={{ height: "400px" }}
        >
          <label htmlFor="blog-content" className="block mb-1">
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
            required
          /> */}
          <RichTextEditor value={content} onChange={handleContentChange} />
        </div>

        <div>
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
                {` `} While post is submmiting...
              </span>
            </p>
          )}
          {isSuccess && (
            <p>
              Successfully: {` `}
              <span className="text-[#00A651]">{` `} posted</span>
            </p>
          )}
        </div>

        <Button
          variant="contained"
          style={{
            backgroundColor: `${"#00A651"}`,
            color: "#ffffff",
            opacity: `${isPending ? ".6" : "1"}`,
          }}
          type="submit"
          className="px-6 !text-base py-2 mt-12 float-right mr-8 max-w-max w-full justify-end self-end justify-self-end"
          sx={{
            "&:focus": { backgroundColor: "#00A651" },
            "&.Mui-error": { backgroundColor: "red" },
          }}
          disabled={isPending}
          onClick={() => formRef.current?.reportValidity()}
        >
          {isPending ? "Posting..." : "Add +"}
        </Button>
      </Box>
    </Paper>
  );
};

export default StoryPostForm;
