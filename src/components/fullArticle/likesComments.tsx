'use client';

import React, {
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { usePathname, useRouter } from 'next/navigation';
import CommentIcon from '@/images/image/commentIcon';
import LikeIcon from '@/images/image/likeIcon';
import ShareIcon from '@/images/image/shareIcon';
import { useGetCommentListQuery } from '@/lib/redux/slices/comments';
import {
  Box,
  Divider,
  Typography,
  Button,
  Stack,
  useTheme,
  Skeleton,
  useMediaQuery,
} from '@mui/material';
import AddComment from '../Post/AddComment';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {
  useLikeItemMutation,
  UserComment,
} from '@/lib/redux/slices/articleDetails';
import Comment from '../Comment';
import { allRoutes } from '@/constants/allRoutes';
import { formatIndianNumber } from '@/lib/utils';
import Link from 'next/link';
import ShareArticleModal from './shareArticleModal';
import { revalidateArticleDetail } from '@/actions/actions';
import SplitButton from '../SplitButton';

const commentLimitOptions = ['Most recent', 'All comments'];

type LikeCommentType = {
  likesCommentsDetails: any;
  itemId: string;
  isPost?: boolean;
  isShared?: boolean;
  showComments?: boolean;
  articleId: string;
  isArticle?: boolean;
};
function LikesComments({
  likesCommentsDetails,
  itemId,
  isPost = false,
  isShared = false,
  showComments = false,
  articleId,
  isArticle = false,
}: LikeCommentType) {
  const pathname = usePathname();
  const { data: commentList, isLoading } = useGetCommentListQuery(
    articleId! || '',
    { skip: !showComments }
  );
  const [generalizedComments, setGeneralizedComments] = useState<UserComment[]>(
    []
  );
  const isSmallDevice = useMediaQuery('(max-width:400px)');
  const [commentText, setCommentText] = useState('');
  const [commentLimit, setCommentLimit] = useState('Most recent');
  const [newCreatedComments, setNewCreatedComments] = useState<{
    isAdding: boolean;
    newComments: UserComment[];
  }>({
    isAdding: false,
    newComments: [],
  });
  const { palette } = useTheme();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const commentRef = useRef();
  const [isLiked, UpdateIsLiked] = useState(false);

  const [updateLike, { data, isSuccess }] = useLikeItemMutation();

  const handleClick = () => {
    setOpen(true);
  };

  useEffect(() => {
    if (isSuccess) UpdateIsLiked(Boolean(data?.likeByAuthor));
  }, [data, isSuccess]);

  const likeType = () => {
    if (isPost) {
      return 'PostLike';
    } else {
      return 'ArticleLike';
    }
  };

  useEffect(() => {
    if (commentList)
      setGeneralizedComments(
        commentList
          .slice()
          .sort((a, b) => b.comment.createdDateTime - a.comment.createdDateTime)
      );
  }, [commentList]);

  useEffect(() => {
    if (!newCreatedComments.isAdding) {
      setGeneralizedComments(comments => [
        ...newCreatedComments.newComments,
        ...comments,
      ]);
    }
  }, [newCreatedComments, setGeneralizedComments]);

  const handleArticleLike = async () => {
    const type: string = likeType();
    await updateLike({ articleId: itemId, type });
    if (isArticle) {
      revalidateArticleDetail(pathname);
    }
  };

  const commentTextHandler = useCallback(
    text => {
      setCommentText(text);
    },
    [setCommentText]
  );

  const onCreatedArticleComment = useCallback(
    commentData => {
      if (commentData && isArticle) {
        revalidateArticleDetail(pathname);
      }
    },
    [setNewCreatedComments, pathname]
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
          newComments: [commentData],
        }));
      }
    },
    [setNewCreatedComments]
  );
  const commentAction = useCallback(
    data => {
      let _comments = newCreatedComments.newComments;
      if (data?.isDeleted) {
        _comments = newCreatedComments.newComments.filter(comment => {
          return comment.comment.id !== data.id;
        });
        if (isArticle) {
          revalidateArticleDetail(pathname);
        }
      } else {
        _comments = newCreatedComments.newComments.map(comment => {
          if (comment.comment.id === data.id) {
            return { ...comment, comment: { ...comment.comment, ...data } };
          }
          return comment;
        });
      }
      setNewCreatedComments(comments => ({
        ...comments,
        newComments: _comments,
      }));
    },
    [setNewCreatedComments, newCreatedComments]
  );
  const likeCount = formatIndianNumber(likesCommentsDetails?.numberOfLikes);

  const onCommentHandler = useCallback(index => {
    setCommentLimit(commentLimitOptions[index]);
  }, []);

  return (
    <Box sx={{ marginTop: '16px', width: '100%' }}>
      {isArticle && <Divider />}
      <Stack direction="row" gap={2} py={1}>
        <Button
          variant="text"
          startIcon={
            <LikeIcon
              isLiked={likesCommentsDetails?.likedByAuthor ?? isLiked}
            />
          }
          onClick={handleArticleLike}
          sx={{ padding: 0 }}
        >
          <Typography
            component={'span'}
            color={'textPrimary'}
            textTransform={'none'}
            marginBottom={0}
            sx={{ fontSize: isSmallDevice ? '.825rem' : '1rem' }}
          >
            {likeCount}{' '}
            {Number(likesCommentsDetails.numberOfLikes) > 1 ? 'Likes' : 'Like'}
          </Typography>
        </Button>
        <Link
          href={isPost ? `${allRoutes.post}/${itemId}` : '#'}
          style={{ pointerEvents: isPost ? undefined : 'none' }}
        >
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
                sx={{ fontSize: isSmallDevice ? '.825rem' : '1rem' }}
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
            sx={{ fontSize: isSmallDevice ? '.825rem' : '1rem' }}
          >
            {formatIndianNumber(likesCommentsDetails?.numberOfShares)} Share
          </Typography>
        </Button>
      </Stack>
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
        <Box mt={2}>
          <AddComment
            id={itemId}
            commentRef={commentRef}
            commentType="PostComment"
            commentText={commentText}
            setCommentText={commentTextHandler}
            onCreatedNewComment={onCreatedNewComment}
          />
        </Box>
      )}
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
      {generalizedComments.length > 0 && (
        <Box width="100%" textAlign="right">
          <Suspense fallback="loading...">
            <SplitButton
              options={commentLimitOptions}
              handleOptions={onCommentHandler}
              actionIcon={<ArrowDropDownIcon />}
            />
          </Suspense>
        </Box>
      )}
      {showComments && (
        <Box>
          {Array.isArray(generalizedComments) &&
            (commentLimit === 'Most recent'
              ? generalizedComments.slice(0, 5)
              : generalizedComments
            ).map((val: any, index: number) => (
              <div key={'comment-list-item-' + index}>
                <Comment
                  comment={val}
                  type={isPost ? 'PostCommentLiked' : 'ArticleCommentLiked'}
                  setCommentText={commentTextHandler}
                  inputRef={commentRef}
                  onAction={commentAction}
                />
                {index !== generalizedComments.length - 1 && <Divider />}
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
                  isNewComment={true}
                />
                {index !== newCreatedComments?.newComments.length - 1 && (
                  <Divider />
                )}
              </div>
            ))}
        </Box>
      )}

      <ShareArticleModal
        open={open}
        isArticle={isArticle}
        itemId={itemId}
        commentRef={commentRef}
        isPost={isPost}
        commentText={commentText}
        commentTextHandler={commentTextHandler}
        likesCommentsDetails={likesCommentsDetails}
        revalidate={revalidateArticleDetail}
        articleId={articleId}
        setCommentText={setCommentText}
        setOpen={setOpen}
      />
    </Box>
  );
}

export default React.memo(LikesComments);
