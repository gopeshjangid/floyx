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
  Button,
} from '@mui/material';
import {
  UserProfileDetails,
  useGetProfileDetailsQuery,
  useUserFollowedAccountsQuery,
} from '@/lib/redux/slices/profile';
import { useParams } from 'next/navigation';
import UsernameLink, { ProfileName } from '@/components/usernameLink';
import FollowUser from '@/components/FollowUser';
import Link from 'next/link';
import UserAvatar from '@/components/UserAvatar';
import { useSession } from 'next-auth/react';
import InfiniteScroll from 'react-infinite-scroll-component';

export interface apiParams {
  pageNumber: number;
}

const SectionSkeleton = () => (
  <Stack p={2} gap={1}>
    <Stack direction="row" gap={1} flexWrap={'wrap'}>
      <Skeleton variant="circular" width="50px" height="50px" />
      <Skeleton variant="rectangular" width="50%" height="35px" />
      <Skeleton variant="rectangular" width="35%" height="35px" />
    </Stack>
    <Skeleton variant="rectangular" width="100%" height="80px" />
  </Stack>
);

const MyFollowers: React.FC = () => {
  const params = useParams();
  const [list, setList] = React.useState<UserProfileDetails[]>([]);
  const [apiParams, setApiParams] = React.useState<apiParams>({
    pageNumber: 1,
  });
  const { palette } = useTheme();
  const session = useSession();
  const username = Array.isArray(params?.username)
    ? params?.username[0] ?? ''
    : params?.username || '';
  const { data: currentUser, isLoading: currentLoading } =
    useGetProfileDetailsQuery({ username }, { skip: !username });
  const isMobile = useMediaQuery('(max-width:480px)');
  const {
    data,
    isLoading,
    isFetching,
    isUninitialized,
    isError: followedAccountError,
  } = useUserFollowedAccountsQuery(
    { userId: currentUser?.id!, pageNumber: apiParams.pageNumber, username },
    {
      skip: !currentUser?.id,
    }
  );

  React.useEffect(() => {
    if (data) {
      setList(items => [...items, ...data]);
    }
  }, [data]);
  const loadMore = React.useCallback(() => {
    if (data && data?.length && !isLoading) {
      setApiParams(prevParams => ({
        ...prevParams,
        pageNumber: prevParams.pageNumber + 1,
      }));
    }
  }, [data, isLoading, setApiParams]);

  const onFollowUser = React.useCallback(() => {
    setList([]);
    setApiParams({ pageNumber: 1 });
  }, [setApiParams]);

  return (
    <Box
      id="followedscrollableDiv"
      mt={4}
      gap={2}
      pt={3}
      sx={{ maxHeight: '100vh', overflowY: 'auto' }}
    >
      <Box
        sx={{
          border: `1px solid ${palette.primary.boxBorder}`,
          background: palette.primary.mainBackground,
          maxWidth: isMobile ? '100%' : '80%',
          margin: '0 auto',
          borderRadius: '10px',
        }}
        py={2}
        pl={2}
      >
        <Stack direction={'row'} alignItems={'center'} gap={1} mb={1}>
          <UserAvatar
            alt={currentUser?.name ?? ''}
            src={currentUser?.avatar ?? ''}
            sx={{ width: '50px', height: '50px' }}
          />
          <Stack>
            {currentLoading || !currentUser ? (
              <Skeleton variant="text" width="100px" height="40px" />
            ) : (
              <Typography
                variant="body2"
                sx={{ color: palette.primary.fontLightColor }}
              >
                {currentUser.name}
              </Typography>
            )}
            {currentLoading || !currentUser ? (
              <Skeleton variant="text" width="100px" height="40px" />
            ) : (
              <UsernameLink username={currentUser?.username ?? ''} />
            )}
          </Stack>
        </Stack>
        <Divider />
        {currentLoading ? (
          <Skeleton variant="text" width="60px" height="40px" />
        ) : (
          <Typography py={1} variant="h6">
            Following
          </Typography>
        )}
      </Box>
      <Box height="10px">&nbsp;</Box>
      <Box mb={2}>
        <Paper
          sx={{
            borderRadius: '10px',
            position: 'relative',
            border: `1px solid ${palette.primary.boxBorder}`,
            background: palette.primary.mainBackground,
            maxWidth: isMobile ? '100%' : '80%',
            margin: '0 auto',
          }}
        >
          {!isLoading && data && (
            <InfiniteScroll
              dataLength={list.length} //This is important field to render the next data
              next={loadMore}
              hasMore={data.length === 10}
              loader={<SectionSkeleton key="loader-ininfite" />}
              scrollableTarget="followedscrollableDiv"
              scrollThreshold={0.6}
              endMessage={
                !isFetching && (
                  <Box
                    sx={{
                      background: palette.primary.mainBackground,
                      height: '100px',
                    }}
                    p={1}
                    mt={1}
                  >
                    <Typography
                      textAlign="center"
                      variant="subtitle1"
                      color="info"
                    >
                      Yay! You have seen it all
                    </Typography>
                  </Box>
                )
              }
            >
              {list.map((follower, index) => (
                <Box
                  pb={2.5}
                  key={'follwoer-key-' + index}
                  mt={1}
                  p={2}
                  textAlign="center"
                >
                  <Stack direction="row" spacing={{ xs: 2, sm: 1, md: 1 }}>
                    <Box width="10%">
                      <Avatar
                        src={follower.avatar}
                        sx={{ width: 40, height: 40 }}
                      />
                    </Box>
                    <Stack width="60%" justifyContent={'center'} gap={1}>
                      <Stack alignItems={'center'} direction="row" gap={1}>
                        <ProfileName
                          variant="body2"
                          sx={{ color: palette.primary.fontLightColor }}
                        >
                          {follower?.name}
                        </ProfileName>
                        <UsernameLink username={follower?.username ?? ''} />
                      </Stack>
                      <Stack direction="row" gap={1}>
                        <Link href={`/profile/${follower?.username}/followers`}>
                          <Typography
                            variant="subtitle2"
                            sx={{ color: palette.primary.fontLightColor }}
                          >
                            Followers: {follower.numberOfFollowers}
                          </Typography>
                        </Link>{' '}
                        |
                        <Typography
                          variant="subtitle2"
                          sx={{ color: palette.primary.fontLightColor }}
                        >
                          Posts: {follower.numberOfPosts}
                        </Typography>{' '}
                        {follower.followed && (
                          <Typography
                            variant="subtitle2"
                            sx={{ color: palette.primary.fontLightColor }}
                          >
                            | &nbsp; Follows you
                          </Typography>
                        )}
                      </Stack>
                    </Stack>
                    <Box width="20%">
                      {session.data?.user.username !== follower.username && (
                        <FollowUser
                          isFollowed={follower.followed}
                          username={follower.username}
                          onSuccess={onFollowUser}
                        />
                      )}
                    </Box>
                  </Stack>
                  <Box display="flex" mb={1.5}>
                    <Box width="11%">&nbsp;</Box>
                    <Box width="89%" textAlign="left">
                      <Typography
                        sx={{ wordBreak: 'break-all' }}
                        variant="subtitle2"
                      >
                        {follower.shortDescription}
                      </Typography>
                    </Box>
                  </Box>
                  <Divider />
                </Box>
              ))}
            </InfiniteScroll>
          )}
          {(isLoading ||
            isUninitialized ||
            (isFetching && list.length === 0)) &&
            [1, 2, 3].map(item => (
              <Box>
                <SectionSkeleton key={'skeletinitem-' + item} />
                <Divider />
              </Box>
            ))}
          {followedAccountError && (
            <Box textAlign="center" my={2}>
              <Button variant="outlined" size="small" onClick={loadMore}>
                Load More
              </Button>
            </Box>
          )}
        </Paper>
      </Box>
    </Box>
  );
};

export default React.memo(MyFollowers);
