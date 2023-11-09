import React from "react";
import { Metadata, ResolvingMetadata } from "next";
import Usermanagement from "./usermanagement";
import { usermanagementData } from "../usermanagementData.seed";

export const revalidate = 3600; // revalidate at most every hour

// =========SEO for single post=============
type Props = {
  params: { usermanagementId: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const { usermanagementId } = params;

  // fetch data / api data
  const usermanagement = usermanagementData?.find((data) => {
    return data.id === usermanagementId;
  });

  if(!usermanagement?.id) {
    return {
        title: 'Not Found',
        description: 'The page is not found',
        alternates: {
            canonical: `/usermanagement/${usermanagementId}`
        }
    }
  }
  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: usermanagement && usermanagement?.title,
    openGraph: {
      // images: [`${usermanagement && usermanagement.url}`, ...previousImages],
      images: [
        {
          url: `${usermanagement && usermanagement.id}`,
          width: 1200,
          height: 630, 
        },
        ...previousImages
      ],
      description: usermanagement && usermanagement.Department,
      title: usermanagement && usermanagement?.title,
    },
    alternates: {
        canonical: `/usermanagement/${usermanagementId}`
    },
    description: usermanagement && usermanagement.Department
  };
}

// +++==================The main post itself=======================

export default async function UsermanagementPost({
  params,
}: {
  params: { usermanagementId: string };
}) {
  const { usermanagementId } = params;

  const usermanagement = usermanagementData?.find((data) => {
    return data.id === usermanagementId;
  });

  return (
    <div className="max-w-7xl px-6 md:px-8 grid gap-6">
      <Usermanagement params={params} />
    </div>
  );
}
