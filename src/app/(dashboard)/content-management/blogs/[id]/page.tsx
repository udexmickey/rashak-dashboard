"use client";

import React from "react";
import useFetchData from "@/hooks/useFetchData";
import UpdateBlogPostForm from "../../component/form/update.blog.form";

export const revalidate = 3600; // revalidate at most every hour

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default function BlogsPost({ params }: Props) {
  const { id } = params;
  const { loading, data } = useFetchData();

  const initialBlogsData =
    data &&
    data?.find((data) => {
      return data.id === id;
    });

  console.log("params", params);
  console.log("initialBlogsData", initialBlogsData);
  console.log("data", data);

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <UpdateBlogPostForm initialData={initialBlogsData} />
      )}
    </div>
  );
}
