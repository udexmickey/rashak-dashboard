"use client";

import React from "react";
import UpdateBlogPostForm from "../../component/form/update.blog.form";
import { useFetchOneblog } from "@/hooks/useFetchAllBlogs";

export const revalidate = 3600; // revalidate at most every hour

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default function BlogsPost({ params }: Props) {
  const { id } = params;
  const { isLoading, data: initialBlogsData } = useFetchOneblog(id);

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <UpdateBlogPostForm initialData={initialBlogsData} contentId={""} />
      )}
    </div>
  );
}
