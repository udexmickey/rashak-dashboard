import React from "react";
import { Metadata, ResolvingMetadata } from "next";
import { List, ListItem, ListItemText } from "@mui/material";
import BackgroundLetterAvatars from "@/components/ui/stringAvatar";
import { usermanagementData } from "../usermanagementData.seed";

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

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: "Usermanagement",
    // description: "",
    alternates: {
      canonical: `/user-management/${usermanagementId}`,
    },
    openGraph: {
      images: [
        // {
        //   url: `${"/sign_up_girl.png"}`,
        //   width: 1200,
        //   height: 630,
        // },
        ...previousImages,
      ],
    },
  };
}

// +++==================The main post itself=======================

// eslint-disable-next-line @next/next/no-async-client-component
export default async function UsermanagementById({
  params,
}: {
  params: { usermanagementId: string };
}) {
  const usermanagement =
    usermanagementData &&
    usermanagementData.find((admin) => admin.id === params.usermanagementId);

  return (
    <div className="">
      <div className="flex bg-white max-w-4xl w-full max-h-[30rem] h-full rounded-3xl gap-6 p-8">
        <div className="w-full flex gap-12 flex-col">
          <BackgroundLetterAvatars
            name={usermanagement && usermanagement.title}
            width={"9rem"}
            height={"9rem"}
            fontSize={"3rem"}
          />
          <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            <ListItem>
              <ListItemText primary="Name:" />
              <ListItemText primary={usermanagement?.title} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Department:" />
              <ListItemText primary={usermanagement?.Department} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Email Address:" />
              <ListItemText primary={usermanagement?.email} />
            </ListItem>
          </List>
        </div>
      </div>
    </div>
  );
}
