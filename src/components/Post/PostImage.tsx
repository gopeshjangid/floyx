// @ts-check
import { Box, Skeleton, Typography, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import moment from 'moment';
import Link from 'next/link';
import Image from 'next/image';
import Lightbox from 'react-image-lightbox-rotate-fixed';
import Post from './Post';

export default function PostImage({ image, link, shared, isShared }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const { palette } = useTheme();

  const handleOpen = () => {
    if (!isShared) {
      setOpen(true);
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  const openInNewTab = () => {
    window.open(link.url, '_blank');
  };

  const handleImageLoad = () => {
    setLoading(false);
  };

  return (
    <Box>
      {image && (
        <Box sx={{ borderRadius: '10px', overflow: 'hidden' }}>
          {loading && (
            <Skeleton variant="rounded" height={300} animation="wave" />
          )}
          <Image
            width={0}
            onLoad={handleImageLoad}
            height={0}
            sizes="100vw"
            style={{ width: '100%', height: 'auto' }}
            onClick={handleOpen}
            src={image.thumbnailPath}
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
          onClick={openInNewTab}
          sx={{ borderRadius: '10px', overflow: 'hidden', border: `1px solid ${palette.primary.boxBorder}` }}
        >
          {link.thumbnailPath && (
            <Image
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: '100%', height: 'auto' }}
              src={link.thumbnailPath}
              alt="thumbnail"
              loading="lazy" // Lazy loading
            />
          )}
          <Typography p={1}>
            {link.startDate && 
              moment(link.startDate).format('DD MMM YYYY - ')
            }
            {link.title}
          </Typography>
          <Typography p={1}>
            {link.url}
          </Typography>
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
