'use client';

import React, { useState } from 'react';
import CommentIcon from '@/images/image/commentIcon';
import LikeIcon from '@/images/image/likeIcon';
import ShareIcon from '@/images/image/shareIcon';
import { Avatar, Box, Divider, Typography, Link, Button, Modal, Paper } from '@mui/material';
import RecommendedTopics from '../recommendedTopics/recommendedTopics';
import ReplyIcon from '@/images/image/replyIcon';
import DateParser from '../DateParser';
import AddComment from '../Post/AddComment';
import { useGetCommentListQuery } from '@/lib/redux/slices/articleCommentList';

const style = {
  position: 'absolute' as 'absolute',
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

export default function LikesComments({ likesCommentsDetails, articleId }: any) {
  const ARTICLE_DETAILS = likesCommentsDetails;
  if (!articleId) {
    return null;
  }
  const { data: commentList } = useGetCommentListQuery(articleId);

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

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

  return (
    <Box sx={{ marginTop: '35px', width: '100%' }}>
      <Divider />
      <Box sx={{ display: 'flex', padding: '17px 20px' }}>
        <Button variant="text" startIcon={<LikeIcon />} sx={{ marginRight: '25px' }}>
          {formatIndianNumber(ARTICLE_DETAILS?.article?.numberOfLikes)} Likes
        </Button>
        <Button variant="text" startIcon={<CommentIcon />} sx={{ marginRight: '25px' }}>
          {formatIndianNumber(ARTICLE_DETAILS?.article?.numberOfComments)} Comments
        </Button>
        <Button variant="text" startIcon={<ShareIcon />} sx={{ marginRight: '25px' }} onClick={handleClick}>
          {formatIndianNumber(ARTICLE_DETAILS?.article?.numberOfShares)} Share
        </Button>
        <Modal open={open} onClose={handleClose}>
          <Box sx={style}>
            <Box sx={{ padding: '10px' }}>
              <AddComment avatar={ARTICLE_DETAILS?.user?.avatar} />
            </Box>
            <Box sx={{ padding: '10px', textTransform: 'capitalize' }}>
              <Typography variant="h1">{ARTICLE_DETAILS?.article?.title}</Typography>
            </Box>
            <Box sx={{ padding: '10px' }}>
              <img src={ARTICLE_DETAILS?.article?.coverPhotoPath} width={'100%'} />
            </Box>
            <Divider />
            <Box sx={{ paddingTop: '10px', display: 'flex', justifyContent: 'flex-end' }}>
              <Button variant="contained">Bookmark</Button>
            </Box>
          </Box>
        </Modal>
      </Box>
      <Divider />
      <Typography variant="h5" sx={{ marginTop: '40px' }}>
        Comments
      </Typography>
      <Box>
        {commentList &&
          commentList.map((val: any, index: number) => (
            <Box key={index}>
              <Box sx={{ display: 'flex', marginTop: '30px' }}>
                <Box>
                  <Avatar alt={val?.user?.name} src={val?.user?.avatar} sx={{ width: 60, height: 60, marginRight: '10px' }} />
                </Box>
                <Box sx={{ width: '100%' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Box>
                      <Typography variant="subtitle1" component={'span'}>
                        <Link href="#" underline="none">
                          {val?.user?.name}{' '}
                        </Link>
                        @{val?.user?.username}
                      </Typography>
                    </Box>
                    <Box>{DateParser(val?.comment?.createdDateTime)}</Box>
                  </Box>
                  <Box sx={{ width: '100%', marginTop: '15px', border: '1px solid white', borderRadius: '10px', padding: '20px' }}>
                    <Typography>{val?.comment?.content}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', margin: '20px 0px' }}>
                    <Button variant="text" startIcon={<LikeIcon />} sx={{ marginRight: '25px' }}>
                      {val?.comment?.numberOfLikes} Like
                    </Button>
                    <Button variant="text" startIcon={<ReplyIcon />} sx={{ marginRight: '25px' }}>
                      Reply
                    </Button>
                  </Box>
                </Box>
              </Box>
              {index !== commentList.length - 1 && <Divider />}
            </Box>
          ))}
      </Box>
      {/* <Box>
        <CommentList comments={commentList}/>
      </Box> */}
      <Box sx={{ marginTop: '40px', padding: '0px 19px 17px 19px', border: '1px solid white', borderRadius: '10px' }}>
        <AddComment avatar={ARTICLE_DETAILS?.user?.avatar} />
      </Box>
      <RecommendedTopics />
    </Box>
  );
}
