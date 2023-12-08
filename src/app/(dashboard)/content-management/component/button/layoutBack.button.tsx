"use client";
import React from "react";
import { HiArrowNarrowLeft } from "react-icons/hi";
import { Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

function LayoutBackButton() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <Button
      className="text-[#00A651] text-[1.08588rem] flex items-center gap-x-2 bg-transparent"
      onClick={handleBack}
      startIcon={<HiArrowNarrowLeft />}
      style={{
        color: "#00A651",
      }}
    >
      <span>Go back</span>
    </Button>
  );
}

export default LayoutBackButton;
