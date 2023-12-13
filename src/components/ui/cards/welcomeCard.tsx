import React from "react";
import BackgroundLetterAvatars from "../../menu/stringAvatar";
import { Typography } from "@mui/material";
import { useFetchOneprofile } from "@/hooks/useProfile";

export default function WelcomeCard() {
  const { data, isError } = useFetchOneprofile();

  const loggedInAdmin = {
    name: "Rashak Admin",
  };

  return (
    <div>
      <div className="bg-white h-full pb-4">
        <div className="w-full flex flex-col justify-center items-center gap-y-2">
          <BackgroundLetterAvatars
            name={isError ? loggedInAdmin?.name : data && data?.name}
            width={"7rem"}
            height={"7rem"}
            fontSize={"3rem"}
            className="font-bold text-5xl h-28 w-28"
          />
          <div className="flex flex-col justify-center items-center text-center">
            <Typography
              component={"small"}
              className="font-light text-black text-xs"
            >
              Welcome Back,
            </Typography>
            <Typography
              component={"small"}
              className="text-black text-xl font-medium"
            >
              {isError ? loggedInAdmin?.name : data && data?.name}
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
}
