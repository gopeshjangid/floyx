'use client';
import { Box, Typography, Container, Divider, Skeleton } from '@mui/material';

import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';

const PopularTodaySection = styled(Box)(({ theme }) => ({
  marginLeft: '10px',
  alignItems: 'center',
  marginTop: '40px',
}));

const PopularTodayListSection = styled(Container)(({ theme }) => ({
  border: '1px solid ',
  borderRadius: '10px',
  marginTop: '45px',
  padding: '20px',
  maxHeight: '200px',
  overflowY: 'scroll',
  '& .box': {
    margin: '5px',
    '& .boxdata': {
      padding: '5px',
      display: 'flex',
    },
  },
}));

const POPULAR_POSTS = [
  {
    postName: 'AirDrops 2023',
    postNumbers: 872981,
  },
  {
    postName: 'Cars',
    postNumbers: 87828931,
  },
  {
    postName: 'Anime',
    postNumbers: 9298112,
  },
  {
    postName: 'Bikes',
    postNumbers: 872361891,
  },
  {
    postName: 'Dancers',
    postNumbers: 872361891,
  },
  {
    postName: 'Airplanes',
    postNumbers: 872361891,
  },
  {
    postName: 'Random',
    postNumbers: 872361891,
  },
];

interface PostObject {
  postName: string; // I assume ID is defined elsewhere
  postNumbers: number;
}

export default function PopularToday({}) {
  const [popularPosts, setPopularPosts] = useState<PostObject[] | null>(null);

  useEffect(() => {
    setTimeout(() => setPopularPosts(POPULAR_POSTS), 1000);
  }, []);

  return (
    <PopularTodaySection>
      <Typography variant="body1">Your friend’s activities</Typography>
      <PopularTodayListSection>
        {popularPosts ? (
          popularPosts.map((val, index) => (
            <Box className="box">
              <Box className="boxdata" sx={{}}>
                <Box>
                  <Typography variant="h5">{index + 1}.</Typography>
                </Box>
                <Box>
                  <Typography variant="h5">{val.postName}</Typography>
                  <Typography variant="body2">
                    {val.postNumbers.toLocaleString('en-IN')} Posts
                  </Typography>
                </Box>
              </Box>
              <Divider />
            </Box>
          ))
        ) : (
          <>
            <Box className="box">
              <Skeleton
                variant="text"
                height={35}
                width={'70%'}
                animation="wave"
              />
              <Skeleton
                variant="text"
                height={30}
                width={'50%'}
                animation="wave"
              />
              <Divider />
            </Box>
            <Box className="box">
              <Skeleton
                variant="text"
                height={35}
                width={'70%'}
                animation="wave"
              />
              <Skeleton
                variant="text"
                height={30}
                width={'50%'}
                animation="wave"
              />
              <Divider />
            </Box>
            <Box className="box">
              <Skeleton
                variant="text"
                height={35}
                width={'70%'}
                animation="wave"
              />
              <Skeleton
                variant="text"
                height={30}
                width={'50%'}
                animation="wave"
              />
            </Box>
          </>
        )}
      </PopularTodayListSection>
    </PopularTodaySection>
  );
}
