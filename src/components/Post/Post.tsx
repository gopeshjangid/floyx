'use client';

import { Box, Typography } from '@mui/material';
import UserCard from '../UserCard';
import { PostBox } from './styledPostBox';
import SplitButton from '../SplitButton';
import PostImage from './PostImage';
import React, { Suspense, useCallback, useEffect, useState } from 'react';
import PostActionModal from './PostActionModal';
import { usePathname, useRouter } from 'next/navigation';
import { allRoutes } from '@/constants/allRoutes';
import { Post as PostDetail } from '@/lib/redux';
import { useSession } from 'next-auth/react';
import LikesComments from '../fullArticle/likesComments';
import { addLinks } from '@/lib/utils';
// import { useSession } from "next-auth/react";
interface postDetail {
  name: string;
  username: string;
  createdDateTime: number;
  content: string;
  shared: null | string;
  image: {
    thumbnailPath: string;
    path: string;
  };
  link: null | string;
  isShared?: boolean;
  postDetails?: PostDetail;
  postId: string;
  showComments?: boolean | undefined;
}

function Post({
  name,
  username,
  createdDateTime,
  content,
  shared,
  image,
  link,
  isShared,
  postDetails,
  postId,
  showComments,
}: postDetail) {
  const session = useSession();
  const userDetail = (session as any)?.data?.user?.username;
  const pathname = usePathname();
  const router = useRouter();
  const [buttonOptions, setButtonOptions] = useState(['Direct Link']);
  const [buttonAction, setButtonAction] = useState('');
  const [open, setOpen] = useState<boolean>(false);

  const handleOptions = (val: any, options: Array<string>) => {
    setButtonAction(options[val]);
    if (options[val] === 'Delete Post') {
      setOpen(true);
    } else if (options[val] === 'Direct Link') {
      router.push(`${allRoutes.post}/${postId}`);
    }
  };
  useEffect(() => {
    if (username === userDetail) {
      const actions = ['Delete Post'];
      if (pathname.indexOf('post') === -1) {
        actions.push('Direct Link');
      }
      setButtonOptions(actions);
    }
  }, [username]);

  const onDeletedPost = useCallback(() => {
    if (pathname.indexOf('post') > -1) {
      router.push('/');
    }
  }, []);

  return (
    <PostBox>
      <Box sx={{ margin: '0rem 1rem 1rem' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <UserCard
            name={name}
            username={username}
            timestamp={createdDateTime}
            shared={shared}
            isPost={true}
          />
          <Box sx={{ padding: '20px 0' }}>
            <SplitButton
              options={buttonOptions}
              handleOptions={(event: any) =>
                handleOptions(event, buttonOptions)
              }
            />
          </Box>
        </Box>
        <Box>
          <Typography
            sx={{ wordWrap: 'break-word' }}
            variant="h6"
            dangerouslySetInnerHTML={{
              __html: addLinks(content),
            }}
          />
        </Box>
        <PostImage
          image={image}
          link={link}
          shared={shared}
          isShared={isShared}
        />
        {(!isShared || showComments) && (
          <LikesComments
            likesCommentsDetails={
              isShared
                ? postDetails?.shared
                : { ...postDetails, name, username }
            }
            itemId={postId}
            articleId={postId}
            isPost={true}
            isShared={isShared}
            showComments={showComments}
          />
        )}
      </Box>
      <React.Suspense
        fallback={<Typography variant="overline">Loading...</Typography>}
      >
        <PostActionModal
          open={open}
          setOpen={setOpen}
          action={buttonAction}
          postId={postId}
          onDeleted={onDeletedPost}
        />
      </React.Suspense>
    </PostBox>
  );
}

export default React.memo(Post);
