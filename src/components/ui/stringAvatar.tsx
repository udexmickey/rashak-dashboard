import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

function stringToColor(string: string) {
  let hash = 0;
  let i;

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#00A651';

  return color;
}

function stringAvatar(name: string) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}

export default function BackgroundLetterAvatars({ name, width, height, fontSize } : { name: string | undefined, width: string, fontSize: string, height: string }) {
  return (
    <Stack direction="row" spacing={2}>
      <Avatar style={{ height, width, fontSize }} {...stringAvatar(name as string)} />
    </Stack>
  );
}
