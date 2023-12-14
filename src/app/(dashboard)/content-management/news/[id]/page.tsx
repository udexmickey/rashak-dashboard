"use client";

import React from "react";
import UpdateNewsPostForm from "../../component/form/update.news.form";
import { useFetchOnenews } from "@/hooks/content-management/useNewsHook";

export const revalidate = 3600; // revalidate at most every hour

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default function NewsPost({ params }: Props) {
  const { id } = params;
  const { isLoading, data: initialNewsData } = useFetchOnenews(id);

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <UpdateNewsPostForm initialData={initialNewsData} contentId={id} />
      )}
    </div>
  );
}
