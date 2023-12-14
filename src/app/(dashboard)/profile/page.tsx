"use client";
import React from "react";
import { Metadata, ResolvingMetadata } from "next";
import { List, ListItem, ListItemText } from "@mui/material";
import BackgroundLetterAvatars from "@/components/menu/stringAvatar";
import { useFetchOneadmin } from "@/hooks/admin/useAdminsHook";
import { useFetchOneprofile } from "@/hooks/useProfile";

export default function Profile() {
  const {
    data: usermanagementData,
    isLoading,
    isError,
    error,
  } = useFetchOneprofile();

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
