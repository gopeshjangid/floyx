'use client';

import React, { useEffect } from 'react';
import CommentIcon from '@/images/image/commentIcon';
import LikeIcon from '@/images/image/likeIcon';
import ShareIcon from '@/images/image/shareIcon';
import {
  Avatar,
  Box,
  Divider,
  Typography,
  Link,
  Button,
  Modal,
} from '@mui/material';
import RecommendedTopics from '../recommendedTopics/recommendedTopics';
import ReplyIcon from '@/images/image/replyIcon';
import DateParser from '../DateParser';
import AddComment from '../Post/AddComment';
import {
  useCheckArticleIsSharedMutation,
  useGetCommentListQuery,
  useGetLikeStatusMutation,
  useShareArticleMutation,
} from '@/lib/redux/slices/articleDetails';
import { useToast } from '../Toast/useToast';

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
  likesCommentsDetails,
  articleId,
}: any) {
  const toast = useToast();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const open = Boolean(anchorEl);
  const { data: commentList } = useGetCommentListQuery(articleId);
  const [updateLike] = useGetLikeStatusMutation();
  const [checkIsShared, result] = useCheckArticleIsSharedMutation();
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

  const handleArticleLike = () => {
    const type: string = 'ArticleLike';
    updateLike({ articleId, type });
  };

  const handlePublish = async () => {
    const result = await checkIsShared(articleId);
    const status: boolean = result.data 
    if (status){
      toast.error('This article has already been shared');

    }
    const payload = {
      content: '',
    };
    await publishArticle({ articleId, status, payload });
    setAnchorEl(null);

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
          {formatIndianNumber(likesCommentsDetails?.article?.numberOfLikes)}{' '}
          Likes
        </Button>
        <Button
          variant="text"
          startIcon={<CommentIcon />}
          sx={{ marginRight: '25px' }}
        >
          {formatIndianNumber(likesCommentsDetails?.article?.numberOfComments)}{' '}
          Comments
        </Button>
        <Button
          variant="text"
          startIcon={<ShareIcon />}
          sx={{ marginRight: '25px' }}
          onClick={handleClick}
        >
          {formatIndianNumber(likesCommentsDetails?.article?.numberOfShares)}{' '}
          Share
        </Button>
        <Modal open={open} onClose={handleClose}>
          <Box sx={style}>
            <Box sx={{ padding: '10px' }}>
              <AddComment avatar={likesCommentsDetails?.user?.avatar} />
            </Box>
            <Box sx={{ padding: '10px', textTransform: 'capitalize' }}>
              <Typography variant="h1">
                {likesCommentsDetails?.article?.title}
              </Typography>
            </Box>
            <Box sx={{ padding: '10px' }}>
              <img
                src={likesCommentsDetails?.article?.coverPhotoPath}
                width={'100%'}
              />
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
      <Divider />
      <Typography variant="h5" sx={{ marginTop: '40px' }}>
        Comments
      </Typography>
      <Box>
        {Array.isArray(commentList) &&
          commentList.map((val: any, index: number) => (
            <Box key={index}>
              <Box sx={{ display: 'flex', marginTop: '30px' }}>
                <Box>
                  <Avatar
                    alt={val?.user?.name}
                    src={val?.user?.avatar}
                    sx={{ width: 60, height: 60, marginRight: '10px' }}
                  />
                </Box>
                <Box sx={{ width: '100%' }}>
                  <Box
                    sx={{ display: 'flex', justifyContent: 'space-between' }}
                  >
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
                  <Box
                    sx={{
                      width: '100%',
                      marginTop: '15px',
                      border: '1px solid white',
                      borderRadius: '10px',
                      padding: '20px',
                    }}
                  >
                    <Typography>{val?.comment?.content}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', margin: '20px 0px' }}>
                    <Button
                      variant="text"
                      startIcon={<LikeIcon />}
                      sx={{ marginRight: '25px' }}
                    >
                      {val?.comment?.numberOfLikes} Like
                    </Button>
                    <Button
                      variant="text"
                      startIcon={<ReplyIcon />}
                      sx={{ marginRight: '25px' }}
                    >
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
      <Box
        sx={{
          marginTop: '40px',
          padding: '0px 19px 17px 19px',
          border: '1px solid white',
          borderRadius: '10px',
        }}
      >
        <AddComment avatar={likesCommentsDetails?.user?.avatar} />
      </Box>
      <RecommendedTopics />
    </Box>
  );
}
