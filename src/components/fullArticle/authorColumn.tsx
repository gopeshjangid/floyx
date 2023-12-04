'use client';

import ArticleIcon from '@/images/image/articleIcon';
import LinkIcon from '@/images/image/linkIcon';
import ProfileTickIcon from '@/images/image/profileTick';
import { useGetFollowStatusMutation } from '@/lib/redux/slices/articleDetails';
import { Avatar, Box, Button, Typography, Link, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';

export const AuthorDetailBox = styled(Box)(() => ({
  width: '100%',
  marginTop: '35px',
  border: '1px solid white',
  padding: '20px 30px',
  borderRadius: '10px',
  '& .header': {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    '& .position-center': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
  '& .author-box': {
    marginTop: '10px',
    display: 'flex',
    alignItems: 'center',
    '& .name': {
      display: 'flex',
      alignItems: 'center',
    },
  },
  '& .author-about': {
    marginTop: '20px',
  },
  '& .more-about-auhtor': {
    marginTop: '35px',
    marginBottom: '45px',
  },
}));

export default function AuthorCoulmn({ details }: any) {

  const [updatePost] = useGetFollowStatusMutation();

  return (
    <AuthorDetailBox>
      <Box className="header">
        <Box>
          <Typography variant="h5">About Author</Typography>
        </Box>
        <Box className="position-center">
          <Box>
            <Button variant="outlined" size="small" sx={{ borderRadius: '30px', padding: '4px 14px' }}>
              Message
            </Button>
          </Box>
          <Box sx={{ margin: '0px 10px', color: 'white' }}>|</Box>
          <Box>
            <Button
              variant="outlined"
              size="small"
              sx={{ borderRadius: '30px', padding: '3px 15px' }}
              onClick={() => {
                updatePost(details?.user?.username);
              }}
            >
              {details?.user?.isFollowed ? 'Follow' : 'UnFollow'}
            </Button>
          </Box>
        </Box>
      </Box>
      <Box className="author-box">
        <Box>
          <Avatar alt={details?.user?.name} src={details?.user?.avatar} sx={{ width: 60, height: 60, marginRight: '10px' }} />
        </Box>
        <Box>
          <Box className="name">
            <Typography variant="subtitle1" component={'span'}>
              <Link href="#" underline="none">
                {details?.user?.name}
              </Link>
              @{details?.user?.username}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
            <Box sx={{ display: 'flex', marginRight: '30px' }}>
              <ProfileTickIcon />
              <Typography variant="body2" sx={{ margin: '0px 5px' }}>
                Followers:
              </Typography>
              <Typography variant="body2">{details?.user?.numberOfFollowers}</Typography>
            </Box>
            <Box sx={{ display: 'flex' }}>
              <ArticleIcon />
              <Typography variant="body2" sx={{ margin: '0px 5px' }}>
                Articles:
              </Typography>
              <Typography variant="body2">{details?.user?.numberOfArticles}</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box className="author-about">
        <Typography variant="body1">{details?.user?.shortDescription}</Typography>
        <Box sx={{ display: 'flex' }}>
          <Box sx={{ marginRight: '25px' }}>
            <Typography variant="subtitle2">{details?.user?.nationality || 'Canada'}</Typography>
          </Box>
          <Box>
            <Link href="#" underline="none" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              {<LinkIcon />}
              {details?.user?.websites || 'www.website.com'}
            </Link>
          </Box>
        </Box>
      </Box>
      <Box className="more-about-auhtor">
        <Typography variant="h5">More From Author</Typography>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} sx={{ paddingTop: '20px' }}>
          {/* {authorDetails?.user && authorDetails?.user?.more && (authorDetails?.user?.more).length && (authorDetails?.user?.more).map((val: any, index: number) => (
            <Grid item xs={2} sm={4} md={6} key={index}>
              <Box sx={{ display: 'flex', border: '1px solid white', borderRadius: '10px', padding: '15px 10px' }}>
                <Box sx={{ marginRight: '15px' }}>
                  <img src={val?.thumbnail} width={60} height={60} />
                </Box>
                <Box>
                  <Box>
                    <Typography variant="subtitle2">{val?.title}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex' }}>
                    <Box>
                      <Avatar alt={details?.user?.name} src={details?.user?.avatar} sx={{ width: 20, height: 20, marginRight: '10px' }} />
                    </Box>
                    <Box>
                      <Typography variant="caption">by {details?.user?.name}</Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Grid>
          ))} */}
        </Grid>
      </Box>
    </AuthorDetailBox>
  );
}
