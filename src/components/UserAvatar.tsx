"use client";

import React, { useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import { Avatar } from '@mui/material';
import { SVGUser } from "@/assets/images";

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
  const [loading, setLoading] = useState<boolean>(true);

  return (
    <Avatar sx={sx}>
      {!loading && <SVGUser />}
      {loading && <Image
        src={src}
        alt={alt}
        layout="fill"
        onLoadingComplete={(result) => {
          if (result.naturalWidth === 0) {
            setLoading(false);
          }
        }}
        onError={() => {
          setLoading(false);
        }}
      />}
    </Avatar>
  );
};

export default UserAvatar;
