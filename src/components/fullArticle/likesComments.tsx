'use client';

import React, { useRef, useState } from 'react';
import { useRouter } from "next/navigation";
import CommentIcon from '@/images/image/commentIcon';
import LikeIcon from '@/images/image/likeIcon';
import ShareIcon from '@/images/image/shareIcon';
import {
  Box,
  Divider,
  Typography,
  Button,
  Modal,
} from '@mui/material';
import RecommendedTopics from '../recommendedTopics/recommendedTopics';
import AddComment from '../Post/AddComment';
import { useToast } from '../Toast/useToast';
import {
  usePostLikeStatusMutation,
  useShareArticleMutation,
  useCheckArticleIsSharedMutation,
} from '@/lib/redux/slices/articleDetails';
import Comment from "../CommentLists";
import { allRoutes } from "@/constants/allRoutes";
import Image from 'next/image';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'auto',
  maxHeight: '80vh',
  overflowY: 'scroll',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  padding: 5,
  m: 2,
};

export default function LikesComments({
  commentList,
  likesCommentsDetails,
  itemId,
  isPost = false,
  isShared = undefined,
  showComments = undefined,
}: any) {

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const [commentText, setCommentText] = useState('');

  const toast = useToast();
  const router = useRouter();
  const open = Boolean(anchorEl);
  const commentRef = useRef();

  const [updateLike] = usePostLikeStatusMutation();
  const [checkIsShared] = useCheckArticleIsSharedMutation();
  const [publishArticle] = useShareArticleMutation();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function formatIndianNumber(num: number) {
    if (num < 1000) {
      return num;
    } else if (num >= 1000 && num <= 9999) {
      return Math.floor(num / 1000) + 'K';
    } else if (num >= 10000 && num <= 999999) {
      return Math.floor(num / 1000) + 'K+';
    } else if (num >= 1000000 && num <= 9999999) {
      return Math.floor(num / 1000000) + 'M';
    } else if (num >= 10000000 && num <= 999999999) {
      return Math.floor(num / 1000000) + 'M+';
    } else {
      return num;
    }
  }

  const handlePublish = async () => {
    const result:any = await checkIsShared(itemId);
    const status: boolean = result?.data;
    const payload = {
      content: commentText,
    };
    if (status) {
      toast.error('This article has already been shared');
    } else {
      await publishArticle({ articleId: itemId, status, payload });
      toast.success('Article is Published Succesfully ');
    }
    setCommentText('')
    setAnchorEl(null);
  };

  
  const likeType = () => {
    if (isPost) {
      return 'PostLike';
    } else {
      return 'ArticleLike';
    }
  };

  const handleArticleLike = () => {
    const type: string = likeType();
    updateLike({ articleId: itemId, type });
  };

  return (
    <Box sx={{ marginTop: '35px', width: '100%' }}>
      <Divider />
      <Box sx={{ display: 'flex', padding: '17px 20px' }}>
        <Button
          variant="text"
          startIcon={<LikeIcon />}
          sx={{ marginRight: '25px' }}
          onClick={handleArticleLike}
        >
          {formatIndianNumber(likesCommentsDetails?.numberOfLikes)} Likes
        </Button>
        <Button
          variant="text"
          startIcon={<CommentIcon />}
          sx={{ marginRight: '25px' }}
          onClick={() => isPost ? router.push(`${allRoutes.post }/${itemId}`) : ''}
        >
          {formatIndianNumber(likesCommentsDetails?.numberOfComments)} Comments
        </Button>
        <Button
          variant="text"
          startIcon={<ShareIcon />}
          sx={{ marginRight: '25px' }}
          onClick={handleClick}
        >
          {formatIndianNumber(likesCommentsDetails?.numberOfShares)} Share
        </Button>
      </Box>
      <Divider />
      {!isPost && isShared === undefined && (
        <Typography variant="h5" sx={{ marginTop: '40px' }}>
          Comments
        </Typography>
      )} 
      {showComments && (
        <Box>
          {Array.isArray(commentList) &&
            commentList.map((val: any, index: number) => (
              <>
                <Comment key={index} comment={val} />
                {index !== commentList.length - 1 && <Divider />}
              </>
            ))}
        </Box>
      )}
      {showComments && <Box>
        {Array.isArray(commentList) &&
          commentList.map((val: any, index: number) => (
            <div key={index}>
              <Comment
                comment={val}
                type={isPost ? 'PostCommentLiked' : 'ArticleCommentLiked'}
                setCommentText={setCommentText}
                inputRef={commentRef}
              />
              {index !== commentList.length - 1 && <Divider />}
            </div>
        ))}
      </Box>}
      {!isPost && isShared === undefined && (
        <>
          <Box
            sx={{
              marginTop: '40px',
              padding: '0px 19px 17px 19px',
              border: '1px solid white',
              borderRadius: '10px'
            }}>
            <AddComment
              id={itemId}
              commentRef={commentRef}
              commentType="ArticleComment"
              commentText={commentText}
              setCommentText={setCommentText}
            />
          </Box>
          <RecommendedTopics />
        </>
      )}
      {isPost && !isShared && (
        <AddComment
          id={itemId}
          commentRef={commentRef}
          commentType="PostComment"
          commentText={commentText}
          setCommentText={setCommentText}
        />
      )}
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Box sx={{ padding: '10px' }}>
            <AddComment
              id={itemId}
              commentRef={commentRef}
              commentType={isPost ? "PostComment" : "ArticleComment"}
              commentText={commentText}
              setCommentText={setCommentText}
            />
          </Box>
          <Box sx={{ padding: '10px', marginTop:'10%' }}>
            <Image
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: '100%', height: '100%' }}
              src={likesCommentsDetails?.coverPhotoPath}
              alt="thumbnail"
            />
          </Box>
          <Box sx={{ padding: '10px', paddingTop:'1px',textTransform: 'capitalize' }}>
            <Typography variant="h1">{likesCommentsDetails?.title}</Typography>
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
        </Box>
      </Modal>
    </Box>
  );
}
