import React from "react";
import BackgroundLetterAvatars from "../../menu/stringAvatar";
import { Typography } from "@mui/material";

export default function WelcomeCard() {
  const loggedInAdmin = {
    name: "Azeez Saliu",
  };

  return (
    <div>
      <div className="bg-white h-full pb-4">
        <div className="w-full flex flex-col justify-center items-center gap-y-2">
          <BackgroundLetterAvatars
            name={loggedInAdmin && loggedInAdmin.name}
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
              {loggedInAdmin && loggedInAdmin.name}
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
}
