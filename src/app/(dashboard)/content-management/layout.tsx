import React from "react";
import Link from "next/link";
import { HiArrowNarrowLeft } from "react-icons/hi";
import { Button, Typography } from "@mui/material";

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
          <Button
            LinkComponent={"a"}
            href={"/content-management"}
            className="text-[#00A651] text-[1.08588rem] flex items-center gap-x-2"
          >
            <span>
              <HiArrowNarrowLeft className="text-[1.08588rem]" />
            </span>
            <span>Go back</span>
          </Button>
        </Typography>
      </div>
      <div>{children}</div>
    </div>
  );
}
