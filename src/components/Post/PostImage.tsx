// @ts-check
import { Box, Skeleton, Typography } from '@mui/material';
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
      {link && (
        <Box
          onClick={openInNewTab}
          sx={{ borderRadius: '10px', overflow: 'hidden' }}
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
          <Box mt={1}>
            <Typography component="span" sx={{ wordWrap: 'break-word' }}>
              {link.startDate &&
                moment(link.startDate).format('DD MMM YYYY - ')}{' '}
              {link.title}
            </Typography>
            <Typography sx={{ wordWrap: 'break-word' }}>{link.url}</Typography>
          </Box>
        </Box>
      )}
      {shared && !isShared && (
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
