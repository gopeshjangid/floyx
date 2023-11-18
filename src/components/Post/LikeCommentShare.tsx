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
    alignItems: "center",
    color: `${theme.palette.text.secondary}`,
    '& .lcs-typo': {
      marginLeft: '2px',
      marginBottom: 0,
      display: { xs: 'none', md: 'block' },
    }
  },
}));

export default function LikeCommentShare({ postDetails }: any) {
  return (
    <ContainerBox>
      <Box className="lcs-box">
        <Button variant="text" startIcon={<ThumbUpOffAltOutlinedIcon />}>
          {postDetails?.numberOfLikes}
          <Typography variant="body2" color={'primary'} className="lcs-typo">
             Likes
          </Typography>
        </Button>
      </Box>
      <Box className="lcs-box">
        <Button variant="text" startIcon={<ChatBubbleOutlineOutlinedIcon />}>
          {postDetails?.numberOfComments}
          <Typography variant="body2" className="lcs-typo">
             Comments
          </Typography>
        </Button>
      </Box>
      <Box className="lcs-box">
        <Button variant="text" startIcon={<SendOutlinedIcon />}>
          {postDetails?.numberOfShares}
          <Typography variant="body2" className="lcs-typo">
             Shares
          </Typography>
        </Button>
      </Box>
    </ContainerBox>
  );
}
