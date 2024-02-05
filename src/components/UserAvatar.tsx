'use client';

import React, { useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import { Avatar } from '@mui/material';
import { SVGUser } from '@/assets/images';
import { useSession } from 'next-auth/react';
import Link from "next/link";

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
  restrictNavigation?: boolean;
}
const UserAvatar = ({
  src,
  alt,
  sx,
  restrictNavigation = false,
}: UserAvatarProps) => {
  const { status } = useSession();
  const [loading, setLoading] = useState<boolean>(true);
  let linkSrc = typeof src === 'string' ? src.split('/') : [];
  const userName = linkSrc.length > 0 ? linkSrc[linkSrc.length - 1] : '';
  return (
    <Avatar sx={sx}>
      {(!loading || status === 'loading') && <SVGUser />}
      {loading &&
        status !== 'loading' &&
        (!restrictNavigation ? (
          <Link
            href={userName !== '' ? `/profile/${userName}` : ''}
            passHref
            style={{ pointerEvents: userName === '' ? 'none' : undefined }}
          >
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
          </Link>
        ) : (
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
        ))}
    </Avatar>
  );
};

export default UserAvatar;
