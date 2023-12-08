import { Button } from "@mui/material";
import Link from "next/link";
import React from "react";
import { BiPlus } from "react-icons/bi";
// import { IconType } from "react-icons/lib";

interface IContentBtn {
  label?: string;
  //   icon: IconType;
  href: string;
  type?: string;
  props?: any;
}

export default function AddContentBtn({
  label,
  href,
  props,
  type,
}: IContentBtn) {
  return (
    <>
      <Link
        variant="contained"
        // LinkComponent={"a"}
        href={href}
        style={{ backgroundColor: "#00A651", color: "#ffffff" }}
        type={type ?? "submit"}
        className="px-6 !text-base py-2 capitalize float-right hover:opacity-80 duration-300 ease-in-out"
        sx={{
          "&:focus": { backgroundColor: "#00A651" },
          "&.Mui-error": { backgroundColor: "red" },
        }}
        {...props}
      >
        <span>
          {label ?? "Add New post"} {` `}
        </span>
        <span>{/* <BiPlus size={25} /> */}</span>
      </Link>
    </>
  );
}
