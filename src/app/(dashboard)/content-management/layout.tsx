import React from "react";
import { Typography } from "@mui/material";
import LayoutBackButton from "./component/button/layoutBack.button";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-7xl w-full grid gap-y-8">
      <div className="flex justify-between items-center">
        <Typography component={"p"} className="text-[#484848] text-xl">
          Content Management
        </Typography>

        <Typography
          component={"div"}
          className="justify-self-end cursor-pointer sm:mb-0 mb-4"
        >
          <LayoutBackButton />
        </Typography>
      </div>
      <div>{children}</div>
    </div>
  );
}
