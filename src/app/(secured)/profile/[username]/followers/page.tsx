/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import * as React from 'react';
import {
  Box,
  Stack,
  Typography,
  useMediaQuery,
  Paper,
  useTheme,
  Skeleton,
  Avatar,
  Divider,
} from '@mui/material';
import {
  useGetCurrentProfileDetailsQuery,
  useGetUserFollowersQuery,
} from '@/lib/redux/slices/profile';
import { useParams } from 'next/navigation';
import UsernameLink from '@/components/usernameLink';
import FollowUser from '@/components/FollowUser';

const MyFollowers: React.FC = () => {
  const params = useParams();
  const { palette } = useTheme();
  const username = Array.isArray(params?.username)
    ? params?.username[0] ?? ''
    : params?.username || '';
  const { data: currentUser } = useGetCurrentProfileDetailsQuery();
  const isMobile = useMediaQuery('(max-width:480px)');
  const {
    currentData: followers = [1, 2, 3],
    isLoading,
    isUninitialized,
  } = useGetUserFollowersQuery(
    { userId: currentUser?.userId!, pageNumber: 1 },
    {
      skip: !currentUser?.userId,
    }
  );

  const loading = isLoading || isUninitialized;
  return (
    <Box mt={4}>
      <Box py={2}>
        <Typography variant="h6">My Followers</Typography>
      </Box>
      <Paper
        sx={{
          borderRadius: '10px',
          position: 'relative',
          border: `1px solid ${palette.primary.boxBorder}`,
          background: palette.primary.mainBackground,
          maxWidth: isMobile ? '100%' : '80%',
        }}
      >
        {followers.map((follower, index) => (
          <Box
            key={'follwoer-key-' + index}
            mt={1}
            pb={2.5}
            p={2}
            textAlign="center"
          >
            <Stack direction="row" spacing={{ xs: 1, sm: 1, md: 1 }}>
              <Box width="10%">
                {loading ? (
                  <Skeleton variant="circular" width="40px" height="40px" />
                ) : (
                  <Avatar
                    src={follower.avatar}
                    sx={{ width: 40, height: 40 }}
                  />
                )}
              </Box>
              <Stack width="70%" justifyContent={'center'} gap={1}>
                <Stack direction="row" gap={1}>
                  {loading ? (
                    <Skeleton variant="text" width="100px" height="40px" />
                  ) : (
                    <Typography
                      variant="body2"
                      sx={{ color: palette.primary.fontLightColor }}
                    >
                      {follower?.name}
                    </Typography>
                  )}
                  {loading ? (
                    <Skeleton variant="text" width="100px" height="40px" />
                  ) : (
                    <UsernameLink username={follower?.username ?? ''} />
                  )}
                </Stack>
                <Stack direction="row" gap={1}>
                  {loading ? (
                    <Skeleton variant="text" width="200px" height="40px" />
                  ) : (
                    <>
                      <Typography
                        variant="subtitle2"
                        sx={{ color: palette.primary.fontLightColor }}
                      >
                        Followers: {follower.numberOfFollowers}
                      </Typography>{' '}
                      |
                      <Typography
                        variant="subtitle2"
                        sx={{ color: palette.primary.fontLightColor }}
                      >
                        Posts: {follower.numberOfPosts}
                      </Typography>
                    </>
                  )}
                </Stack>
              </Stack>
              <Box width="20%">
                {loading ? (
                  <Skeleton variant="text" width="50px" height="40px" />
                ) : (
                  <FollowUser
                    isFollowed={follower.followed}
                    username={username}
                  />
                )}
              </Box>
            </Stack>

            <Box display="flex" mb={1.5}>
              <Box width="11%">&nbsp;</Box>
              <Box width="89%" textAlign="left">
                <Typography variant="subtitle2">
                  {follower.shortDescription}
                </Typography>
              </Box>
            </Box>
            <Divider />
          </Box>
        ))}
      </Paper>
    </Box>
  );
};

export default React.memo(MyFollowers);
