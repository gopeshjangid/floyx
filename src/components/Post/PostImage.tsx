// @ts-check
import { Box, Skeleton, Typography, useTheme } from '@mui/material';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
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
    if (!image) return;

    const img = new window.Image();
    img.onload = () => {
      setDimensions({ width: img.naturalWidth, height: img.naturalHeight });
    };
    img.src = image?.path ?? image.thumbnailPath;
  }, [image]);

  const handleOpen = useCallback(() => {
    if (!isShared) {
      setOpen(true);
    }
  }, [isShared]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleImageLoad = useCallback(() => {
    setLoading(false);
  }, [setLoading]);
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

  const sizeType = dimensions.width < 600 && dimensions.height > 1200 ? 'verticle' : 'normal';
  const height = dimensions.height > 1300 ? 800 : dimensions.height;

  const getImageContainer = useMemo(() => (imageSource) => {
    if(!imageSource) return null;

    if (sizeType === 'verticle') return <CustomImage
      onLoad={handleImageLoad}
      fill
      className='post-image'
      quality={100}
      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
      onClick={handleOpen}
      style={{ borderRadius: '10px' }}
      blurDataURL={imageSource?.thumbnailPath}
      src={imageSource?.path ?? imageSource?.thumbnailPath}
      alt="thumbnail"
      loading="lazy" // Lazy loading
    />;


    return (<CustomImage
      onLoad={handleImageLoad}
      width={0}
      height={0}
      layout="responsive"
      quality={100}
      style={{ borderRadius: '10px' }}
      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
      onClick={handleOpen}
      blurDataURL={imageSource?.thumbnailPath}
      src={imageSource?.path ?? imageSource?.thumbnailPath}
      alt="thumbnail"
      loading="lazy" // Lazy loading
    />);
  }, [image, handleImageLoad, handleOpen, sizeType]);

 
  return (
    <Box>
      {image && (
        <Box sx={{ width: '100%', height: sizeType === 'verticle' ? height : 'auto', display: 'block', borderRadius: '10px', overflow: 'hidden', position: 'relative' }}>
          {loading && (
            <Skeleton variant="rounded" height={300} animation="wave" />
          )}
          {getImageContainer(image)}
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
          pb={2}
          sx={{
            overflow: 'hidden',
            position: 'relative',
            border: `1px solid ${palette.primary.boxBorder}`,
          }}
        >
          {link.thumbnailPath && (
            <Box sx={{ width: '100%', height: sizeType === 'verticle' ? height : 'auto', display: 'block', borderRadius: '10px', overflow: 'hidden', position: 'relative' }}>
              {getImageContainer(link)}
            </Box>
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
        <div style={{ cursor: 'pointer' }} onClick={(event) => {
          if (!(event.target as Element).closest('.specific_item')) {
            window.location.href = (`/post/${shared?.post?.id}`)
          }
        }} >
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
        </div>
      )}
    </Box>
  );
}


export default React.memo(PostImage);