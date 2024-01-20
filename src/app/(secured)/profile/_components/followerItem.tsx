import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import InfiniteScroll from 'react-infinite-scroll-component';
import {
  Box,
  Stack,
  Typography,
  Paper,
  Skeleton,
  Avatar,
  Divider,
  useMediaQuery,
  useTheme,
  Button,
} from '@mui/material';
import {
  UserProfileDetails,
  useGetProfileDetailsQuery,
  useUserFollowedAccountsQuery,
} from '@/lib/redux/slices/profile';
import UsernameLink from '@/components/usernameLink';
import FollowUser from '@/components/FollowUser';
import Link from 'next/link';

interface ApiParams {
  pageNumber: number;
}

interface FollowerItemProps {
  follower: UserProfileDetails;
  isLoading: boolean;
}

const FollowerItem: React.FC<FollowerItemProps> = ({ follower, isLoading }) => {
  const { palette } = useTheme();
  const session = useSession();

  if (isLoading) {
    return (
      <Box pb={2.5} mt={1} p={2} textAlign="center">
        <Skeleton variant="rectangular" width="100%" height={118} />
      </Box>
    );
  }

  return (
    <Box pb={2.5} mt={1} p={2} textAlign="center">
      <Stack direction="row" spacing={{ xs: 2, sm: 1, md: 1 }}>
        <Box width="10%">
          <Avatar src={follower.avatar} sx={{ width: 40, height: 40 }} />
        </Box>
        <Stack width="60%" justifyContent={'center'} gap={1}>
          <Stack direction="row" gap={1}>
            <Typography
              variant="body2"
              sx={{ color: palette.primary.fontLightColor }}
            >
              {follower.name}
            </Typography>
            <UsernameLink username={follower.username} />
          </Stack>
          <Stack direction="row" gap={1}>
            <Link href={`/profile/${follower.username}/followers`}>
              <Typography
                variant="subtitle2"
                sx={{ color: palette.primary.fontLightColor }}
              >
                Followers: {follower.numberOfFollowers}
              </Typography>
            </Link>
            <Typography
              variant="subtitle2"
              sx={{ color: palette.primary.fontLightColor }}
            >
              Posts: {follower.numberOfPosts}
            </Typography>
          </Stack>
        </Stack>
        <Box width="20%">
          {session.data?.user.username !== follower.username && (
            <FollowUser
              isFollowed={follower.followed}
              username={follower.username}
            />
          )}
        </Box>
      </Stack>
      <Box display="flex" mb={1.5}>
        <Box width="11%">&nbsp;</Box>
        <Box width="89%" textAlign="left">
          <Typography sx={{ wordBreak: 'break-all' }} variant="subtitle2">
            {follower.shortDescription}
          </Typography>
        </Box>
      </Box>
      <Divider />
    </Box>
  );
};

const MyFollowers: React.FC = () => {
  const params = useParams();
  const [followingList, setFollowingList] = useState<UserProfileDetails[]>([]);
  const [apiParams, setApiParams] = useState<ApiParams>({ pageNumber: 0 });
  const [hasMore, setHasMore] = useState(true);
  const [loadingError, setLoadingError] = useState(false);
  const { palette } = useTheme();
  const isMobile = useMediaQuery('(max-width:480px)');

  const username = Array.isArray(params?.username)
    ? params?.username[0] ?? ''
    : params?.username || '';

  const { data: currentUser, isLoading: currentLoading } =
    useGetProfileDetailsQuery({ username }, { skip: !username });
  const { data, isLoading, isUninitialized } = useUserFollowedAccountsQuery(
    { userId: currentUser?.id!, pageNumber: apiParams.pageNumber, username },
    { skip: !currentUser?.id }
  );

  console.log('rendering');
  useEffect(() => {
    if (data) {
      setFollowingList(prev => [...prev, ...data]);
      setHasMore(data.length === 10); // Assuming 10 is the pagination size
    }
  }, [data]);

  useEffect(() => {
    if (isLoading) {
      setLoadingError(false);
    }
  }, [isLoading]);

  const loadMore = useCallback(() => {
    if (hasMore && !isLoading) {
      setApiParams(prev => ({ ...prev, pageNumber: prev.pageNumber + 1 }));
    }
  }, [hasMore, isLoading]);

  const handleLoadMoreClick = () => {
    loadMore();
  };

  return (
    <Box mt={4} gap={2} pt={3} sx={{ maxHeight: '100vh', overflowY: 'auto' }}>
      <Paper
        sx={{
          borderRadius: '10px',
          border: `1px solid ${palette.primary.boxBorder}`,
          background: palette.primary.mainBackground,
          maxWidth: isMobile ? '100%' : '80%',
          margin: '0 auto',
        }}
      >
        <InfiniteScroll
          dataLength={followingList.length}
          next={loadMore}
          hasMore={hasMore && !loadingError}
          loader={<Skeleton variant="rectangular" width="100%" height={118} />}
          endMessage={
            <Typography textAlign="center" variant="subtitle1" color="info">
              Yay! You have seen it all
            </Typography>
          }
        >
          {followingList.map((follower, index) => (
            <FollowerItem
              key={index + '-follow-item'}
              follower={follower}
              isLoading={isLoading || isUninitialized}
            />
          ))}
        </InfiniteScroll>
        {loadingError && (
          <Box textAlign="center" my={2}>
            <Button onClick={handleLoadMoreClick}>Load More</Button>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default React.memo(MyFollowers);
