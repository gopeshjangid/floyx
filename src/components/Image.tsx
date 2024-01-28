'use client';
import React, { useState } from 'react';
import Image, { ImageProps } from 'next/image';

const CustomImage = (props: ImageProps) => {
  const [loading, setLoading] = useState<boolean>(true);
  if (!loading) return;
  return (
    <Image
      onLoad={result => {
        if (result.currentTarget.naturalWidth === 0) {
          setLoading(false);
        }
      }}
      onError={() => {
        setLoading(false);
      }}
      {...props}
    />
  );
};

export default CustomImage;
