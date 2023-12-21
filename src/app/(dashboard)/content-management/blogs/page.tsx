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
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
import useUnsavedFormChanges from "@/hooks/useUnsavedFormChanges";
import { usePostBlog } from "@/hooks/content-management/useBlogHook";
import RichTextEditor from "../component/InputTextField/RichTextEditor";

const BlogPostForm: React.FC = () => {
  const { setUnsavedChanges } = useUnsavedFormChanges();
  const {
    mutateAsync: postData,
    isError,
    error,
    isPending,
    isSuccess,
    isIdle,
    isPaused,
    reset,
  } = usePostBlog();

  const [title, setTitle] = useState<string>("");
  const [heroImage, setHeroImage] = useState<File | null>(null);
  const [content, setContent] = useState<string>("");
  const [youtubeLink, setYoutubeLink] = useState<string>("");
  const [pressReleaseLink, setPressReleaseLink] = useState<string>("");

  const [imageGallery, setImageGallery] = useState<(File | null)[]>(
    Array.from({ length: 6 }, () => null)
  );

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle((prev) => (prev = event.target.value));
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

  // Inside handleRelatedPictureChange
  const handleRelatedPictureChange = (
    event: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const files = event.target.files;
    if (files) {
      setImageGallery((prevPictures) => {
        const updatedPictures = [...prevPictures];
        // Assuming you only want the first file
        updatedPictures[index] = Array.from(files)[0];
        return updatedPictures;
      });
    }
  };

  const handleYoutubeLinkChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setYoutubeLink((prev) => (prev = event.target.value.trim()));
    setUnsavedChanges(true);
  };

  const handlePressReleaseLinkChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPressReleaseLink((prev) => (prev = event.target.value.trim()));
    setUnsavedChanges(true);
  };

  const formRef: any = React.useRef();

  // Inside handleSubmit
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const imageGalleryFiles = imageGallery.filter((image) => ({
      imageGallery: image !== null,
    }));

    // Filter out null values and create an array of objects with 'imageGallery' property
    const imageGalleryObjects = imageGallery
      .filter((image) => image !== null)
      .map((image) => ({ imageGallery: image }));

    const formData = {
      title,
      youtubeLink,
      pressReleaseLink,
      image: heroImage,
      content: content,
      author: "Rashak Agro",
      // imageGallery: imageGalleryFiles,
      ...Object.assign({}, ...imageGalleryObjects),
    };

    console.log("formData object", formData);

    await postData({ ...formData });
    setUnsavedChanges(false);

    formRef.current.reset();
  };

  useEffect(() => {
    if (isSuccess && !isIdle) {
      setYoutubeLink((prev) => (prev = ""));
      setPressReleaseLink((prev) => (prev = ""));
      setHeroImage((prev) => (prev = null));
      setImageGallery((prev) => (prev = [null]));
      setContent((prev) => (prev = ""));
      setTitle((prev) => (prev = ""));
    }
  }, [isIdle, isSuccess]);

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
        {/* Title */}
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
        <div className="mb-8 flex flex-col gap-y-8 max-h-[500px] h-full w-full relative box-border">
          <label htmlFor="blog-content" className="block">
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

        {/* Related Pictures */}
        <div className="mt-4">
          <label htmlFor="related-pictures" className="block mb-1">
            Related Pictures
          </label>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-2">
            {imageGallery.map((picture, index) => (
              <div key={index} className="relative group">
                <input
                  type="file"
                  id={`related-picture-${index}`}
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => handleRelatedPictureChange(e, index)}
                  multiple
                  // required
                />
                <label
                  htmlFor={`related-picture-${index}`}
                  className="w-full h-full cursor-pointer"
                >
                  {picture ? (
                    <Image
                      src={URL.createObjectURL(picture)}
                      width={250}
                      height={350}
                      alt={`File Preview ${index + 1}`}
                      className="max-w-xl w-full h-[30vh] object-cover bg-slate-200"
                    />
                  ) : (
                    <Box
                      sx={{ bgcolor: "#D9D9D9", height: "30vh" }}
                      // width={400}
                      className="max-w-sm w-full"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6 max-w-xl w-full h-[30vh]">
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
                      onClick={(e) =>
                        handleRelatedPictureChange(e as any, index)
                      }
                    >
                      <IoMdPhotos />
                    </IconButton>
                  </div>
                )}
              </div>
            ))}
          </div>
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

            <TextField
              label="Press Release Link"
              variant="outlined"
              value={pressReleaseLink}
              onChange={handlePressReleaseLinkChange}
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

export default BlogPostForm;
