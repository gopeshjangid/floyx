'use client';
import {
  Box,
  Typography,
  useTheme,
  Avatar,
  Stack,
  Button,
  Skeleton,
  LinearProgress,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import UsernameLink from './usernameLink';
import {
  useFollowUserMutation,
  useGetPopularAccountsToFollowQuery,
} from '@/lib/redux/slices/profile';

const AccountBox = styled(Stack)(({ theme }) => ({
  border: `1px solid ${theme.palette.primary.boxBorder}`,
  borderRadius: '10px',
  width: '25%',
  minWidth: '250px',
  background: theme.palette.background.paper,
}));

export default function FollowNewAccounts() {
  const theme = useTheme();
  const [followUser, { isLoading: isFollowing, isError: followError }] =
    useFollowUserMutation();
  const { data, isLoading, isError } = useGetPopularAccountsToFollowQuery({
    param: '?forHome=true',
  });

  if (isLoading) return null;

  return (
    <Box mt={2}>
      <Typography variant="h6">Start Follow Some Accounts</Typography>
      {(isError || followError) && (
        <Typography variant="body2" color="error">
          Something went wrong!
        </Typography>
      )}
      {isFollowing && (
        <Box width="100%">
          <LinearProgress />
        </Box>
      )}
      <Stack direction="row" gap={1} my={2} sx={{ overflowX: 'auto' }}>
        {!isLoading && data ? (
          data?.result?.map((account, index) => (
            <AccountBox
              p={2}
              justifyContent="center"
              alignItems={'center'}
              gap={2}
              key={`follow-account-${index}`}
            >
              <Avatar src={account.avatar} />
              <Stack direction="row" gap={1}>
                <Typography variant="body1">{account.name}</Typography>
                <UsernameLink username={account.username ?? 'suername'} />
              </Stack>
              <Stack direction="row" gap={1} alignItems="flex-start">
                <Typography variant="caption">
                  Followers{'  '}
                  <span style={{ color: theme.palette.primary.main }}>
                    {account.numberOfFollowers}
                  </span>
                </Typography>
                <Typography variant="caption">
                  Following{'  '}
                  <span style={{ color: theme.palette.primary.main }}>
                    {' '}
                    {account.numberOfFollowing}
                  </span>
                </Typography>
              </Stack>
              <Button
                onClick={() => followUser({ username: account.username })}
                variant="outlined"
                disabled={isFollowing}
              >
                Follow
              </Button>
            </AccountBox>
          ))
        ) : (
          <Skeleton variant="rectangular" width="100%" height="150px" />
        )}
      </Stack>
    </Box>
  );
}
