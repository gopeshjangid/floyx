import React from 'react';
import Image, { StaticImageData } from 'next/image';
import { Avatar } from '@mui/material';

interface UserAvatarProps {
  src: string | StaticImageData;
  alt: string;
  sx: {
    width:
      | {
          md?: string;
          xs?: string;
        }
      | string;
    height:
      | {
          md?: string;
          xs?: string;
        }
      | string;
  };
}
const UserAvatar = ({ src, alt, sx }: UserAvatarProps) => {
  return (
    <Avatar sx={sx}>
      <Image src={src} alt={alt} layout="fill" />
    </Avatar>
  );
};

export default UserAvatar;
