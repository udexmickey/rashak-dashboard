import React from "react";
import { Metadata, ResolvingMetadata } from "next";
import { List, ListItem, ListItemText } from "@mui/material";
import BackgroundLetterAvatars from "@/components/menu/stringAvatar";
import { membersData } from "../membersData.seed";

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

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: "members",
    // description: "",
    alternates: {
      canonical: `/members/${membersId}`,
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

export default async function MembersById({
  params,
}: {
  params: { membersId: string };
}) {
  const members =
    membersData && membersData.find((admin) => admin._id === params.membersId);

  return (
    <div className="">
      <div className="flex bg-white max-w-4xl w-full max-h-[30rem] h-full rounded-3xl gap-6 p-8">
        <div className="w-full flex gap-12 flex-col">
          <BackgroundLetterAvatars
            name={members && members.name}
            width={"9rem"}
            height={"9rem"}
            fontSize={"3rem"}
          />
          <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            <ListItem>
              <ListItemText primary="Name:" />
              <ListItemText primary={members?.name} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Department:" />
              <ListItemText primary={members?.Department} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Email Address:" />
              <ListItemText primary={members?.email} />
            </ListItem>
          </List>
        </div>
      </div>
    </div>
  );
}
