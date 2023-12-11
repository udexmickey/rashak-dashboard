import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";

function stringToColor(string: string) {
  let hash = 0;
  let i;

  for (i = 0; i < string?.length; i += 1) {
    hash = string?.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#00A651";

  return color;
}

function stringAvatar(name: string) {
  const words = name?.split(" ");

  // Handle the case where there's only one word
  if (words && words.length === 1) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name[0]}`,
    };
  }

  // Handle the case where there are more than two words
  if (words && words.length > 1) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${words[0][0]}${words[1][0]}`,
    };
  }

  // Default case (empty or undefined name)
  return {
    sx: {
      bgcolor: "#00A651",
    },
    children: "",
  };
}

export default function BackgroundLetterAvatars({
  name,
  width,
  height,
  fontSize,
  className,
}: {
  name: string | undefined;
  width: string;
  fontSize: string;
  height: string;
  className?: string;
}) {
  return (
    <Stack direction="row" spacing={2}>
      <Avatar
        style={{ height, width, fontSize }}
        {...stringAvatar((name && name) as string)}
        className={className}
      />
    </Stack>
  );
}
