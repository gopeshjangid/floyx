'use client';

import React, { useCallback, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import CommentIcon from '@/images/image/commentIcon';
import LikeIcon from '@/images/image/likeIcon';
import ShareIcon from '@/images/image/shareIcon';
import { useGetCommentListQuery } from '@/lib/redux/slices/comments';
import {
  Box,
  Divider,
  Typography,
  Button,
  Modal,
  Stack,
  useTheme,
  Skeleton,
} from '@mui/material';
import AddComment from '../Post/AddComment';
import { useToast } from '../Toast/useToast';
import {
  useLikeItemMutation,
  useShareArticleMutation,
  useCheckArticleIsSharedMutation,
  UserComment,
} from '@/lib/redux/slices/articleDetails';
import Comment from '../CommentLists';
import { allRoutes } from '@/constants/allRoutes';
import Image from 'next/image';
import Post from "../Post/Post";
import { formatIndianNumber } from '@/lib/utils';
import { useSharePostMutation } from '@/lib/redux';
import Link from "next/link";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'auto',
  maxHeight: '80vh',
  minWidth: '50vw',
  overflowY: 'scroll',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  padding: 5,
  m: 2,
};

type LikeCommentType = {
  likesCommentsDetails: any;
  itemId: string;
  isPost?: boolean;
  isShared?: boolean;
  showComments?: boolean;
  articleId: string;
  isArticle?: boolean;
  revalidate?: any,
};
function LikesComments({
  likesCommentsDetails,
  itemId,
  isPost = false,
  isShared = false,
  showComments = false,
  articleId,
  isArticle = false,
  revalidate
}: LikeCommentType) {
  const {
    data: commentList,
    isLoading,
  } = useGetCommentListQuery(articleId! || '', { skip: !showComments });
  const [commentText, setCommentText] = useState('');
  const [newCreatedComments, setNewCreatedComments] = useState<{
    isAdding: boolean;
    newComments: UserComment[];
  }>({
    isAdding: false,
    newComments: [],
  });
  const { palette } = useTheme();
  const toast = useToast();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const commentRef = useRef();

  const [updateLike] = useLikeItemMutation();
  const [checkIsShared] = useCheckArticleIsSharedMutation();
  const [publishArticle] = useShareArticleMutation();
  const [publishPost] = useSharePostMutation();

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePublish = async () => {
    const result: any = await checkIsShared(itemId);
    const status: boolean = result?.data;
    const payload = {
      content: commentText,
    };
    if (status) {
      if (isArticle) {
        toast.error('This article has already been shared');
      } else {
        toast.error('This post has already been shared');
      }
    } else {
      if (isArticle) {
        revalidate()
        await publishArticle({ articleId: itemId, status, payload });
        toast.success('Article is Published Succesfully ');
      } else {
        await publishPost({ postId: itemId, payload });
        toast.success('Post is Published Succesfully ');
      }
    }
    setCommentText('');
    setOpen(false);
  };

  const likeType = () => {
    if (isPost) {
      return 'PostLike';
    } else {
      return 'ArticleLike';
    }
  };

  const handleArticleLike = async () => {
    const type: string = likeType();
    await updateLike({ articleId: itemId, type });
    if (isArticle) {
      revalidate();
    }
  };

  const commentTextHandler = useCallback(
    text => {
      setCommentText(text);
    },
    [setCommentText]
  );

  const onCreatedArticleComment = useCallback(
    (commentData) => {
      if (commentData && isArticle) {
        revalidate();
      } 
    },
    [setNewCreatedComments]
  );

  const onCreatedNewComment = useCallback(
    (commentData, isLoading) => {
      if (isLoading) {
        setNewCreatedComments(comments => ({
          ...comments,
          isAdding: isLoading,
        }));
      } else if (commentData) {
        setNewCreatedComments(comments => ({
          ...comments,
          isAdding: false,
          newComments: [...comments.newComments, commentData],
        }));
      }
    },
    [setNewCreatedComments]
  );
  const commentAction = useCallback(
    data => {
      const _comments = newCreatedComments.newComments.map(comment => {
        if (comment.comment.id === data.id) {
          return { ...comment, comment: { ...comment.comment, ...data } };
        }
        return comment;
      });

      setNewCreatedComments(comments => ({
        ...comments,
        newComments: _comments,
      }));
    },
    [setNewCreatedComments, newCreatedComments]
  );
  return (
    <Box sx={{ marginTop: '35px', width: '100%' }}>
      {isArticle && <Divider />}
      <Stack direction="row" gap={2} py={1}>
        <Button
          variant="text"
          startIcon={<LikeIcon />}
          onClick={handleArticleLike}
          sx={{ padding: 0 }}
        >
          <Typography
            component={'span'}
            color={'textPrimary'}
            textTransform={'none'}
            marginBottom={0}
          >
            {formatIndianNumber(likesCommentsDetails?.numberOfLikes)} Likes
          </Typography>
        </Button>
        <Link href={
          isPost ? `${allRoutes.post}/${itemId}` : '#'
        }>
          <Button
          variant="text"
          startIcon={<CommentIcon />}
          sx={{ padding: 0 }}
          onClick={() =>
            isPost ? router.push(`${allRoutes.post}/${itemId}`) : ''
          }
        >
          {newCreatedComments?.isAdding ? (
            <Skeleton variant="text" width="100%" height="40px" />
          ) : (
            <Typography
              component={'span'}
              color={'textPrimary'}
              textTransform={'none'}
              marginBottom={0}
            >
              {formatIndianNumber(likesCommentsDetails?.numberOfComments)}{' '}
              Comments
            </Typography>
          )}
          </Button>
        </Link>
        <Button
          sx={{ padding: 0 }}
          variant="text"
          startIcon={<ShareIcon />}
          onClick={handleClick}
        >
          <Typography
            component={'span'}
            color={'textPrimary'}
            textTransform={'none'}
            marginBottom={0}
          >
            {formatIndianNumber(likesCommentsDetails?.numberOfShares)} Share
          </Typography>
        </Button>
      </Stack>
      {isArticle && <Divider />}
      {!isPost && !isShared && (
        <Typography variant="h5" sx={{ marginTop: '40px' }}>
          Comments
        </Typography>
      )}
      {isLoading && (
        <Stack gap={1}>
          <Skeleton width="100%" height="50px" />
          <Skeleton width="100%" height="50px" />
        </Stack>
      )}
      {showComments && (
        <Box>
          {Array.isArray(commentList) &&
            commentList.map((val: any, index: number) => (
              <div key={'comment-list-item-' + index}>
                <Comment
                  comment={val}
                  type={isPost ? 'PostCommentLiked' : 'ArticleCommentLiked'}
                  setCommentText={commentTextHandler}
                  inputRef={commentRef}
                />
                {index !== commentList.length - 1 && <Divider />}
              </div>
            ))}
        </Box>
      )}
      {newCreatedComments?.newComments.length > 0 && (
        <Box>
          {Array.isArray(newCreatedComments?.newComments) &&
            newCreatedComments?.newComments.map((val: any, index: number) => (
              <div key={'new-comment-list-item-' + index}>
                <Comment
                  comment={val}
                  type={isPost ? 'PostCommentLiked' : 'ArticleCommentLiked'}
                  setCommentText={commentTextHandler}
                  inputRef={commentRef}
                  onAction={commentAction}
                />
                {index !== newCreatedComments?.newComments.length - 1 && (
                  <Divider />
                )}
              </div>
            ))}
        </Box>
      )}
      {!isPost && !isShared && (
        <>
          <Box
            sx={{
              padding: '20px',
              borderRadius: '10px',
              background: palette.background.paper,
              border: `1px solid ${palette.primary.boxBorder}`,
            }}
          >
            <AddComment
              id={itemId}
              commentRef={commentRef}
              commentType="ArticleComment"
              commentText={commentText}
              setCommentText={commentTextHandler}
              onCreatedNewComment={onCreatedArticleComment}
            />
          </Box>
          {/* <RecommendedTopics /> */}
        </>
      )}
      {isPost && !isShared && (
        <AddComment
          id={itemId}
          commentRef={commentRef}
          commentType="PostComment"
          commentText={commentText}
          setCommentText={commentTextHandler}
          onCreatedNewComment={onCreatedNewComment}
        />
      )}
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          {isArticle && (
            <>
              <Box sx={{ padding: '10px' }}>
                <AddComment
                  id={itemId}
                  commentRef={commentRef}
                  commentType={isPost ? 'PostComment' : 'ArticleComment'}
                  commentText={commentText}
                  setCommentText={commentTextHandler}
                />
              </Box>
              {likesCommentsDetails?.coverPhotoPath && (
                <Box sx={{ padding: '10px', marginTop: '10%' }}>
                  <Image
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ width: '100%', height: '100%' }}
                    src={likesCommentsDetails?.coverPhotoPath}
                    alt="thumbnail"
                  />
                </Box>
              )}
              <Box
                sx={{
                  padding: '10px',
                  paddingTop: '1px',
                  textTransform: 'capitalize',
                }}
              >
                <Typography variant="h1">
                  {likesCommentsDetails?.title}
                </Typography>
              </Box>
              <Divider />
              <Box
                sx={{
                  paddingTop: '10px',
                  display: 'flex',
                  justifyContent: 'flex-end',
                }}
              >
                <Button variant="contained" onClick={handlePublish}>
                  Publish
                </Button>
              </Box>
            </>
          )}
          {!isArticle && (
            <>
              <AddComment
                id={itemId}
                commentRef={commentRef}
                commentType={isPost ? 'PostComment' : 'ArticleComment'}
                commentText={commentText}
                setCommentText={commentTextHandler}
              />
              <Post
                name={likesCommentsDetails?.name}
                username={likesCommentsDetails?.username}
                createdDateTime={likesCommentsDetails?.createdDateTime}
                content={likesCommentsDetails?.content}
                shared={likesCommentsDetails?.shared}
                image={likesCommentsDetails?.image}
                link={likesCommentsDetails?.link}
                isShared={true}
                postDetails={likesCommentsDetails}
                postId={articleId}
                showComments={false}
              />
              <Box
                sx={{
                  paddingTop: '10px',
                  display: 'flex',
                  justifyContent: 'flex-end',
                }}
              >
                <Button variant="contained" onClick={handlePublish}>
                  Publish
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Modal>
    </Box>
  );
}

export default React.memo(LikesComments);
