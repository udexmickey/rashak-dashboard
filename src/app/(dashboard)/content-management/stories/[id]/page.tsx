"use client";

import React from "react";
import UpdateStoryPostForm from "../../component/form/update.story.form";
import { useFetchOnestory } from "@/hooks/content-management/useStoryHook";

export const revalidate = 3600; // revalidate at most every hour

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default function StoryPost({ params }: Props) {
  const { id } = params;
  const { isLoading, data: initialStoryData } = useFetchOnestory(id);

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <UpdateStoryPostForm initialData={initialStoryData} contentId={id} />
      )}
    </div>
  );
}
