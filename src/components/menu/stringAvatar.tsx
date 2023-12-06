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
  return {
    sx: {
      bgcolor: stringToColor(name && name),
    },
    children: `${name && name?.split(" ")[0][0]}${
      name && name?.split(" ")[1][0]
    }`,
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
