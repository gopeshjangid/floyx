'use client';
import {
  Box,
  Typography,
  useTheme,
  Divider,
  Skeleton,
  Avatar,
  Stack,
  Button,
} from '@mui/material';

import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import UsernameLink from './usernameLink';

const AccountBox = styled(Stack)(({ theme }) => ({
  border: `1px solid ${theme.palette.primary.boxBorder}`,
  borderRadius: '10px',
  width: '25%',
  minWidth: '250px',
  background: theme.palette.background.paper,
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
    postName: 'Anime',
    postNumbers: 9298112,
  },
];

interface PostObject {
  postName: string; // I assume ID is defined elsewhere
  postNumbers: number;
}

export default function FollowNewAccounts() {
  const [popularPosts, setPopularPosts] = useState<PostObject[] | []>([]);
  const theme = useTheme();
  useEffect(() => {
    setTimeout(() => setPopularPosts(POPULAR_POSTS), 1000);
  }, []);

  const accounts = [1, 2, 3];

  return (
    <Box mt={2}>
      <Typography variant="h6">Start Follow Some Accounts</Typography>
      <Stack direction="row" gap={1} my={2} sx={{ overflowX: 'auto' }}>
        {popularPosts.map((val, index) => (
          <AccountBox
            p={2}
            justifyContent="center"
            alignItems={'center'}
            gap={2}
            key={`follow-account-${index}`}
          >
            <Avatar />
            <Stack direction="row" gap={1}>
              <Typography variant="body1">{val.postName}</Typography>
              <UsernameLink username={val.username ?? 'suername'} />
            </Stack>
            <Stack direction="row" gap={1} alignItems="flex-start">
              <Typography variant="caption">
                Followers{'  '}
                <span style={{ color: theme.palette.primary.main }}>9</span>
              </Typography>
              <Typography variant="caption">
                Following{'  '}
                <span style={{ color: theme.palette.primary.main }}>9</span>
              </Typography>
            </Stack>
            <Button variant="outlined">Follow</Button>
          </AccountBox>
        ))}
      </Stack>
    </Box>
  );
}
