import { Button } from "@mui/material";
import React from "react";

interface IContentBtn {
  label?: string;
  type?: string;
  props?: any;
}

export default function UpdateContentButton({
  label,
  props,
  type,
}: IContentBtn) {
  return (
    <>
      <Button
        variant="contained"
        style={{ backgroundColor: "#00A651", color: "#ffffff" }}
        type={type ?? "submit"}
        className="px-6 !text-base py-2 mt-12 float-right mr-8 max-w-max w-full justify-end self-end justify-self-end"
        sx={{
          "&:focus": { backgroundColor: "#00A651" },
          "&.Mui-error": { backgroundColor: "red" },
        }}
        {...props}
      >
        {label ?? "Update +"}
      </Button>
    </>
  );
}
