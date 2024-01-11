'use client';

import React, { useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import { Avatar } from '@mui/material';
import { SVGUser } from '@/assets/images';
import { useSession } from 'next-auth/react';

interface UserAvatarProps {
  src: string | StaticImageData;
  alt: string;
  sx?: {
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
  const { status } = useSession();
  const [loading, setLoading] = useState<boolean>(true);

  return (
    <Avatar sx={sx}>
      {(!loading || status === 'loading') && <SVGUser />}
      {loading && status !== 'loading' && (
        <Image
          src={src}
          alt={alt}
          fill
          onLoad={result => {
            if (result.currentTarget.naturalWidth === 0) {
              setLoading(false);
            }
          }}
          onError={() => {
            setLoading(false);
          }}
        />
      )}
    </Avatar>
  );
};

export default UserAvatar;
