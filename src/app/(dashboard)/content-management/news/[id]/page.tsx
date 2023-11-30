"use client";

import React from "react";
import useFetchData from "@/hooks/useFetchData";
import UpdateNewsPostForm from "../../component/form/update.news.form";

export const revalidate = 3600; // revalidate at most every hour

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default function NewsPost({ params }: Props) {
  const { id } = params;
  const { loading, data } = useFetchData();

  const initialNewsData =
    data &&
    data?.find((data) => {
      return data.id === id;
    });

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <UpdateNewsPostForm initialData={initialNewsData} />
      )}
    </div>
  );
}
