'use client';

import React from 'react';
import CommentIcon from '@/images/image/commentIcon';
import LikeIcon from '@/images/image/likeIcon';
import ShareIcon from '@/images/image/shareIcon';
import { Avatar, Box, Divider, Typography, Link, Button, Modal } from '@mui/material';
import RecommendedTopics from '../recommendedTopics/recommendedTopics';
import ReplyIcon from '@/images/image/replyIcon';
import DateParser from '../DateParser';
import AddComment from '../Post/AddComment';
import { useGetCommentListQuery, useGetLikeStatusMutation, useLazyGetCommentListQuery } from '@/lib/redux/slices/articleDetails';
import Comment from "../CommentLists";

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

export default function LikesComments({ commentList, likesCommentsDetails, itemId, isPost = false, isShared = undefined, isPostDetail = undefined }: any) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);
  const [updateLike] = useGetLikeStatusMutation()


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

  const likeType = () => {
    if (isPost) {
      return 'PostLike'
    } else {
      return 'ArticleLike';
    }
  }

  const handleArticleLike = () => {
    const type: string = likeType();
    updateLike({articleId: itemId, type})
  }

  return (
    <Box sx={{ marginTop: '35px', width: '100%' }}>
      <Divider />
      <Box sx={{ display: 'flex', padding: '17px 20px' }}>
        <Button variant="text" startIcon={<LikeIcon />} sx={{ marginRight: '25px' }} onClick={handleArticleLike}>
          {formatIndianNumber(likesCommentsDetails?.numberOfLikes)} Likes
        </Button>
        <Button variant="text" startIcon={<CommentIcon />} sx={{ marginRight: '25px' }}>
          {formatIndianNumber(likesCommentsDetails?.numberOfComments)} Comments
        </Button>
        <Button variant="text" startIcon={<ShareIcon />} sx={{ marginRight: '25px' }} onClick={handleClick}>
          {formatIndianNumber(likesCommentsDetails?.numberOfShares)} Share
        </Button>
        
      </Box>
      <Divider />
      {!isPost && isShared === undefined && (
        <Typography variant="h5" sx={{ marginTop: '40px' }}>
          Comments
        </Typography>
      )}
      {isPostDetail && <Box>
        {Array.isArray(commentList) &&
          commentList.map((val: any, index: number) => (
            <>
              <Comment key={index} comment={val} />
              {index !== commentList.length - 1 && <Divider />}
            </>
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
            <AddComment id={itemId} commentType="ArticleComment" />
          </Box>
          <RecommendedTopics />
        </>
      )}
      {isPost && !isShared && (
          <AddComment id={itemId} commentType="PostComment" />
      )}
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Box sx={{ padding: '10px' }}>
            <AddComment id={itemId} commentType={isPost ? "PostComment" : "ArticleComment"} />
          </Box>
          <Box sx={{ padding: '10px', textTransform: 'capitalize' }}>
            <Typography variant="h1">{likesCommentsDetails?.title}</Typography>
          </Box>
          <Box sx={{ padding: '10px' }}>
            <img src={likesCommentsDetails?.coverPhotoPath} width={'100%'} />
          </Box>
          <Divider />
          <Box sx={{ paddingTop: '10px', display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="contained">Publish</Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
