"use client";
import React from "react";
import { Metadata, ResolvingMetadata } from "next";
import { List, ListItem, ListItemText } from "@mui/material";
import BackgroundLetterAvatars from "@/components/menu/stringAvatar";
import { useFetchOneadmin } from "@/hooks/admin/useAdminsHook";

type Props = {
  params: { usermanagementId: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
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
      images: [...previousImages],
    },
  };
}

// +++==================The main post itself=======================

export default function UsermanagementById({
  params,
}: {
  params: { usermanagementId: string };
}) {
  const { usermanagementId } = params;

  console.log("usermanagementId", usermanagementId);

  const {
    data: usermanagementData,
    isLoading,
    isError,
    error,
  } = useFetchOneadmin(usermanagementId);

  return (
    <div className="">
      <div className="flex bg-white max-w-4xl w-full max-h-[30rem] h-full rounded-3xl gap-6 p-8">
        <div className="w-full flex gap-12 flex-col">
          <BackgroundLetterAvatars
            name={usermanagementData && usermanagementData.name}
            width={"9rem"}
            height={"9rem"}
            fontSize={"3rem"}
          />
          <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            <ListItem>
              <ListItemText primary="Name:" />
              <ListItemText
                primary={usermanagementData && usermanagementData?.name}
              />
            </ListItem>
            <ListItem>
              <ListItemText primary="Department:" />
              <ListItemText
                primary={usermanagementData && usermanagementData?.department}
              />
            </ListItem>
            <ListItem>
              <ListItemText primary="Email Address:" />
              <ListItemText
                primary={usermanagementData && usermanagementData?.email}
              />
            </ListItem>
          </List>
        </div>
      </div>
    </div>
  );
}
