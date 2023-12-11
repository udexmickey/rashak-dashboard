import React from "react";
import { Metadata, ResolvingMetadata } from "next";
import { membersData } from "../membersData.seed";
import MembersById from "./members";

export const revalidate = 3600; // revalidate at most every hour

// =========SEO for single post=============
type Props = {
  params: { membersId: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const { membersId } = params;

  // fetch data / api data
  const members = membersData?.find((data) => {
    return data._id === membersId;
  });

  if (!members?._id) {
    return {
      title: "Not Found",
      description: "The page is not found",
      alternates: {
        canonical: `/members/${membersId}`,
      },
    };
  }
  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: members && members?.name,
    openGraph: {
      // images: [`${members && members.url}`, ...previousImages],
      images: [
        {
          url: `${members && members._id}`,
          width: 1200,
          height: 630,
        },
        ...previousImages,
      ],
      description: members && members.Department,
      title: members && members?.name,
    },
    alternates: {
      canonical: `/members/${membersId}`,
    },
    description: members && members.Department,
  };
}

// +++==================The main post itself=======================

export default async function MembersPost({
  params,
}: {
  params: { membersId: string };
}) {
  const { membersId } = params;

  const members = membersData?.find((data) => {
    return data._id === membersId;
  });

  return (
    <div className="max-w-7xl px-6 md:px-8 grid gap-6 py-6">
      <MembersById params={params} />
    </div>
  );
}
