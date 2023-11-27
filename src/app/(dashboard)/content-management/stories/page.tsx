"use client";
import React, { useState, ChangeEvent } from "react";
import {
  TextField,
  Button,
  Paper,
  Typography,
  Box,
  Stack,
} from "@mui/material";
import Image from "next/image";
// import "react-quill/dist/quill.snow.css";
import useUnsavedFormChanges from "@/hooks/useUnsavedFormChanges";

const StoryPostForm: React.FC = () => {
  const { setUnsavedChanges } = useUnsavedFormChanges();

  const [name, setName] = useState<string>("");
  const [heroImage, setHeroImage] = useState<File | null>(null);
  const [blogContent, setBlogContent] = useState<string>("");
  const [youtubeLink, setYoutubeLink] = useState<string>("");
  const [pressReleaseLinks, setPressReleaseLinks] = useState<string>("");

  const [relatedPictures, setRelatedPictures] = useState<(File | null)[]>(
    Array.from({ length: 6 }, () => null)
  );

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    setUnsavedChanges(true);
  };

  const handleHeroImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setHeroImage(file);
    setUnsavedChanges(true);
  };

  const handleContentChange = (value: string) => {
    setBlogContent(value);
  };

  // Inside handleRelatedPictureChange
  const handleRelatedPictureChange = (
    event: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const files = event.target.files;
    if (files) {
      setRelatedPictures((prevPictures) => {
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
    setYoutubeLink(event.target.value);
    setUnsavedChanges(true);
  };

  const handlePressReleaseLinksChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPressReleaseLinks(event.target.value);
    setUnsavedChanges(true);
  };

  // Inside handleSubmit
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const formDataObject = relatedPictures.reduce((acc, picture, index) => {
      acc[`related-picture-${index}`] = picture;
      return acc;
    }, {} as Record<string, File | null>);

    const formData = {
      name,
      youtubeLink,
      pressReleaseLinks,
      heroImage,
      blogContent,
      relatedPictures: formDataObject,
    };

    console.log("Form Data:", formData);
    console.log("name", name);
    setUnsavedChanges(false);
  };

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
            width: "100ch",
          },
        }}
        noValidate
        autoComplete="off"
        className="flex flex-col space-y-4 md:space-y-8"
        onSubmit={handleSubmit}
      >
        {/* Name */}
        <TextField
          label="Name"
          variant="outlined"
          value={name}
          onChange={handleNameChange}
          className="mb-4 max-w-[458px] w-full"
          InputProps={{
            style: {
              borderRadius: "2rem",
            },
          }}
        />

        {/* Hero Image */}
        <div className="px-2 max-w-[458px] w-full">
          <input
            type="file"
            accept="image/*"
            onChange={handleHeroImageChange}
            className="hidden"
            id="hero-image"
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
                  //   width={400}ß
                  className="max-w-[458px] w-full md:aspect-square"
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
          className="sm:mb-0 mb-8 flex flex-col gap-y8"
          style={{ height: "200px" }}
        >
          <label htmlFor="blog-content" className="block mb-1">
            Story Content
          </label>
          {/* <TextareaAutosize maxRows={4} /> */}

          {/* <label htmlFor="message" className="block mb-2 text-sm font-medium">
            Your message
          </label> */}
          <textarea
            id="blog-content"
            rows={8}
            className="block p-2.5 w-full text-sm rounded-lg border border-gray-300 placeholder-gray-400 ring-[#00A651]"
            placeholder="Write farmers story here..."
          ></textarea>
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
          Add +
        </Button>
      </Box>
    </Paper>
  );
};

export default StoryPostForm;
