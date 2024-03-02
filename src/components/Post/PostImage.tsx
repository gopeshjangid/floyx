// @ts-check
import { Box, Skeleton, Typography, useTheme } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import Lightbox from 'react-image-lightbox-rotate-fixed';
import Post from './Post';
import CustomImage from '../Image';

 function PostImage({ image, link, shared, isShared }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const { palette } = useTheme();

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if(!image) return;

    const img = new window.Image();
    img.onload = () => {
      setDimensions({ width: img.naturalWidth, height: img.naturalHeight });
    };
    img.src = image.thumbnailPath;
  }, [image]);

  const handleOpen = () => {
    if (!isShared) {
      setOpen(true);
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  // const openInNewTab = () => {
  //   //window.open(link.url, '_blank');
  // };

  const handleImageLoad = () => {
    setLoading(false);
  };
  const getUrlHostName = useMemo(
    () => url => {
      try {
        const parsedUrl = new URL(url);
        return parsedUrl.hostname;
      } catch (e) {
        return ''; // Return an empty string or handle the error as needed
      }
    },
    []
  );

  const height = dimensions.height > 900 ? 900 : dimensions.height;

  return (
    <Box>
      {image && (
        <Box sx={{ borderRadius: '10px', overflow: 'hidden', position:'relative' }}>
          {loading && (
            <Skeleton variant="rounded" height={300} animation="wave" />
          )}
          <CustomImage
            onLoad={handleImageLoad}
            width={500}
            height={height}
            layout="responsive"
            style={{borderRadius: '10px'}}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
            onClick={handleOpen}
            src={image?.path ?? image.thumbnailPath}
            alt="thumbnail"
            loading="lazy" // Lazy loading
          />
          {open && mounted && (
            <Lightbox
              mainSrc={image.path}
              onCloseRequest={() => setOpen(false)}
            />
          )}
        </Box>
      )}
      {link && !isShared && (
        <Box
          //onClick={openInNewTab}
          pb={2}
          sx={{
            overflow: 'hidden',
            position: 'relative',
            border: `1px solid ${palette.primary.boxBorder}`,
          }}
        >
          {link.thumbnailPath && (
            <CustomImage
              width={500}
              height={height}
              style={{borderRadius: '10px'}}
              layout="responsive"
              src={link?.path ?? link?.thumbnailPath}
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
              alt="thumbnail"
              loading="lazy" // Lazy loading
            />
          )}
          <Box pl={1}>
            <Typography variant="subtitle2">
              {link.url ? getUrlHostName(link.url) : window.location.host}
            </Typography>
            <Link target='__blank' href={link.url}>{link.title}</Link>
          </Box>
        </Box>
      )}
      {shared && !isShared && shared?.author?.username && (
        <Link href={`/post/${shared?.post?.id}`}>
          <Post
            name={shared?.author?.name || ''}
            username={shared?.author?.username || ''}
            createdDateTime={shared?.post?.createdDateTime}
            content={shared?.post?.content}
            shared={shared?.post?.shared}
            image={shared?.post?.image}
            link={shared?.post?.link}
            postId={shared?.post?.id}
            isShared={true}
          />
        </Link>
      )}
    </Box>
  );
}


export default React.memo(PostImage);