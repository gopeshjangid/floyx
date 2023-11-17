'use client';

import { Box, Button, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import BookmarkBorderRoundedIcon from '@mui/icons-material/BookmarkBorderRounded';
import UserAvatar from '@/components/UserAvatar';
import moment from 'moment';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';

const ArticleContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  marginTop: '40px',
  borderRadius: '10px',
  '& .thumbnail': {
    width: '50%',
    img: {
      width: '100%',
      aspectRatio: '1/1',
    },
  },
  '& .details': {
    width: '100%',
    padding: '18px',
    border: `1px solid ${theme.palette.text.disabled}`,
    borderRadius: '0 10px 10px 0',
    '& .date': {
      display: 'flex',
      justifyContent: 'centre',
      alignItems: 'end',
      color: `${theme.palette.text.disabled}`,
    },
    '& .top': {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'centre',
      color: `${theme.palette.text.secondary}`,
    },
    '& .middle': { width: '70%', color: `${theme.palette.text.disabled}` },
    '& .bottom': {
      marginTop: '40px',
      display: 'flex',
      justifyContent: 'space-between',
      bottom: '0',
      '& .author-details': {
        display: 'flex',
      },
    },
  },
}));

export default function ArticleContainer({ linkDetails, authorDetails }: any) {
  return (
    <ArticleContent>
      <Box className="thumbnail">
        <img src={linkDetails?.thumbnailPath} alt="thumbnail" />
      </Box>
      <Box className="details">
        <Box className="top">
          <Box>
            <Typography variant="h5">{linkDetails?.title}</Typography>
          </Box>
          <Button>
            <BookmarkBorderRoundedIcon />
          </Button>
        </Box>
        <Box className="middle">
          <Typography variant="body2">{linkDetails?.description}</Typography>
        </Box>
        <Box className="bottom">
          <Box className="author-details">
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <UserAvatar
                alt="Travis Howard"
                src={authorDetails?.avatar}
                sx={{
                  width: { md: '40px', xs: '40px' },
                  height: { md: '40px', xs: '40px' },
                }}
              />
            </Box>
            <Box>
              <Typography variant="subtitle2">{authorDetails?.name}</Typography>
              <Typography variant="caption">{authorDetails?.username}</Typography>
            </Box>
          </Box>
          <Box className="date">
            <CalendarMonthOutlinedIcon fontSize='small'/>
            <Typography variant="caption" sx={{marginBottom:'0px'}}>{moment(linkDetails?.publishedDate).format('MMM DD, YY')}</Typography>
          </Box>
        </Box>
      </Box>
      {/* <SplitButton /> */}
    </ArticleContent>
  );
}
