"use client";
import React, { useState } from "react";
import UpdateNewsPostForm from "../component/form/update.news.form";

export default function UpdateNews() {
  const url = new URL(
    "http://localhost:3000/content-management/update-news/last"
  );
  const pathSegments = url.pathname
    .split("/")
    .filter((segment) => segment !== "");

  const numberOfSegments = pathSegments.slice(pathSegments.length - 1);
  console.log("Number of path segments:", numberOfSegments);

  // Assume you have some existing data for a post
  const initialPostData = {
    title: "Your Post Title",
    heroImage: null, // File or null
    blogContent: "Your post content goes here",
    youtubeLink: "https://www.youtube.com/example", // Example link
    pressReleaseLinks: "https://example.com/press-release", // Example link
    relatedPictures: [null, null, null, null, null, null], // Array of Files or null
  };

  // State to manage the form data
  const [formData, setFormData] = useState(initialPostData);

  // Handler for updating the form data
  const handleUpdate = (updatedData: any) => {
    // Perform any necessary logic with the updated data
    // For example, you might send it to a server or update a state variable
    console.log("Updated Form Data:", updatedData);

    // Update the state with the new form data
    setFormData(updatedData);
  };

  return (
    <div>
      {/* <UpdateNewsPostForm initialData={formData} onUpdate={handleUpdate} /> */}
    </div>
  );
}
