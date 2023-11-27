'use client';
import CommentIcon from '@/images/image/commentIcon';
import LikeIcon from '@/images/image/likeIcon';
import ShareIcon from '@/images/image/shareIcon';
import { Avatar, Box, Divider, Typography, Link, Button } from '@mui/material';
import RecommendedTopics from '../recommendedTopics/recommendedTopics';
import ReplyIcon from '@/images/image/replyIcon';
import DateParser from '../DateParser';
import AddComment from '../Post/AddComment';
import CommentList from '../CommentLists';
import { useGetCommentListQuery } from '@/lib/redux/slices/articleCommentList';

export default function LikesComments({ likesCommentsDetails, articleId }: any) {
  const ARTICLE_DETAILS = likesCommentsDetails;
  const {data: commentList } = useGetCommentListQuery(articleId)

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
        <Button variant="text" startIcon={<ShareIcon />} sx={{ marginRight: '25px' }}>
          {formatIndianNumber(ARTICLE_DETAILS?.article?.numberOfShares)} Share
        </Button>
      </Box>
      <Divider />
      <Typography variant="h5" sx={{ marginTop: '40px' }}>
        Comments
      </Typography>
      <Box>
        {commentList && commentList.map((val: any, index: number) => (
          <Box key={index}>
            <Box sx={{ display: 'flex', marginTop: '30px' }}>
              <Box>
                <Avatar alt={val?.user?.name} src={val?.user?.avatar} sx={{ width: 60, height: 60, marginRight: '10px' }} />
              </Box>
              <Box sx={{width:'100%'}}>
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
                <Box sx={{ width:'100%',marginTop: '15px', border: '1px solid white', borderRadius: '10px', padding: '20px' }}>
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
