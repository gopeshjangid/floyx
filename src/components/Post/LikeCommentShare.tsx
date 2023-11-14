import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
import ThumbUpOffAltOutlinedIcon from '@mui/icons-material/ThumbUpOffAltOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';

const ContainerBox = styled(Box)(({ theme }) => ({
  paddingLeft: '0px',
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: '30px',
  width: '65%',
  '& .lcs-box': {
    display: 'flex',
    color:`${theme.palette.text.secondary}`,
  },
}));

export default function LikeCommentShare({ postDetails }: any) {
  return (
    <ContainerBox>
      <Box className="lcs-box">
        <Button variant="text" startIcon={<ThumbUpOffAltOutlinedIcon />}>
          <Typography variant="body2" color={'primary'}>
            {postDetails?.numberOfLikes} Likes
          </Typography>
        </Button>
      </Box>
      <Box className="lcs-box">
        <Button variant="text" startIcon={<ChatBubbleOutlineOutlinedIcon />}>
          <Typography variant="body2">
            {postDetails?.numberOfComments} Comments
          </Typography>
        </Button>
      </Box>
      <Box className="lcs-box">
        <Button variant="text" startIcon={<SendOutlinedIcon />}>
          <Typography variant="body2">
            {postDetails?.numberOfShares} Shares
          </Typography>
        </Button>
      </Box>
    </ContainerBox>
  );
}
