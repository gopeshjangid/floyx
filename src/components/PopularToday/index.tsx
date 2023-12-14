'use client';
import {
  Box,
  Typography,
  Container,
  Divider,
  Skeleton,
  Avatar,
  Stack,
} from '@mui/material';

import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';

const PopularTodaySection = styled(Box)(() => ({
  alignItems: 'center',
  marginTop: '1rem',
}));

const PopularTodayListSection = styled(Container)(({ theme }) => ({
  border: `1px solid ${theme.palette.primary.boxBorder}`,
  borderRadius: '10px',
  marginTop: '25px',
  maxHeight: '35vh',
  overflowY: 'auto',
  '& .box': {
    marginTop: '10px',
    '& .boxdata': {
      // padding: '5px',
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

export default function PopularToday() {
  const [popularPosts, setPopularPosts] = useState<PostObject[] | null>(null);

  useEffect(() => {
    setTimeout(() => setPopularPosts(POPULAR_POSTS), 1000);
  }, []);

  return (
    <PopularTodaySection>
      <Typography variant="body1">Recent Articles</Typography>
      <PopularTodayListSection>
        {popularPosts ? (
          popularPosts.map((val, index) => (
            <Box className="box" key={`popularToday${index}`}>
              <Stack py={1} direction="row" gap={2}>
                <Avatar />
                <Box>
                  <Typography variant="body2">{val.postName}</Typography>
                  <Typography sx={{ opacity: 0.6 }} variant="caption">
                    hkhjkhjkhkh
                  </Typography>
                </Box>
              </Stack>
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
