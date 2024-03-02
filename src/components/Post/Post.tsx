'use client';

import { Box, CircularProgress, Typography, useTheme } from '@mui/material';
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
import { addLinks, copyTextToClipboard } from '@/lib/utils';
import { useToast } from '../Toast/useToast';
import CollapseDescription from '../collapseText';
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
  const toast = useToast();
  const { palette } = useTheme();
  const userDetail = (session as any)?.data?.user?.username;
  const pathname = usePathname();
  const router = useRouter();
  const [buttonOptions, setButtonOptions] = useState(['Direct Link']);
  const [buttonAction, setButtonAction] = useState('');
  const [open, setOpen] = useState<boolean>(false);

  const onCopied = () => toast.info('Copied');

  const handleOptions = useCallback((val: any, options: Array<string>) => {
    setButtonAction(options[val]);
    if (options[val] === 'Delete Post') {
      setOpen(true);
    } else if (options[val] === 'Direct Link') {
      const protocol = window.location.protocol;
      const host = window.location.host;
      const text = `${protocol}//${host}${allRoutes.post}/${postId}`;
      copyTextToClipboard(text, onCopied);
    }
  },[setButtonAction,setOpen,copyTextToClipboard]);

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
           <Suspense fallback={<CircularProgress size={'small'} />}>
              <SplitButton
                options={buttonOptions}
                handleOptions={(event: any) =>
                  handleOptions(event, buttonOptions)
                }
                username={username}
                contentId={postId}
                isAuthor={username === userDetail}
              />
            </Suspense>
          </Box>
        </Box>
        <Box pb={1}>
          <CollapseDescription
            allowLength={300}
            variant="h6"
            text={addLinks(content)}
            sx={{ color: palette.primary.titleColor }}
            isDangerouslySetInnerHTML
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
